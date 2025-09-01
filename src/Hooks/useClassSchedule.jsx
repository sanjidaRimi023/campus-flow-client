import React from "react";
import useAxios from "./axiosInstance";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const axiosInstance = useAxios();


// const fetchClasses = async () => {
//   const { data } = await axiosInstance.get("/api/classes");
//   return data;
// };
const fetchClasses = async () => {
  try {
    const response = await axiosInstance.get('/api/classes');

    // যদি রেসপন্স সফল হয় এবং data থাকে, তাহলে data রিটার্ন করুন
    if (response.data && response.data.success) {
      // ডেটা খালি অ্যারে হলেও সমস্যা নেই, সফলভাবে রিটার্ন হবে
      return response.data.data; 
    }
    
    // যদি API সফল না বলে (success: false), তাহলে একটি error থ্রো করুন
    // এতে Tanstack Query এটিকে error হিসেবে ধরবে এবং UI-তে "Failed to load" দেখাবে
    throw new Error(response.data.error || 'Failed to fetch classes');

  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};


const postClass = async () => {
  if (newClass.id) {
    const { data } = await axiosInstance.put(
      `/api/classes/${newClass.id}`,
      newClass
    );
    return data;
  }
  const { data } = await axiosInstance.post("/api/classes", newClass);
  return data;
};

export const useClassSchedule = () => {
     const queryClient = useQueryClient();
  const {
    data: classes = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["classes"],
    queryFn: fetchClasses,
  });

  const { mutate: saveClass } = useMutation({
    mutationFn: postClass,
    onSuccess: () => {
      // When the mutation is successful, invalidate the 'classes' query to refetch fresh data.
      queryClient.invalidateQueries({ queryKey: ["classes"] })
      },
      onError: (error) => {
        console.log('falling to save class', error);
    }
  });
    return {classes, isLoading, isError, saveClass}
};
