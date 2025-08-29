import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import StudyPlanner from "../Pages/StudyPlanner";
import BudgetTracker from "../Pages/BudgetTracker";
import ExamQA from "../Pages/ExamQA";
import ScheduleTracker from "../Pages/ScheduleTracker";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        path: "/",
        element: <Home />,
      },
      {
        path: "/study-planner",
        element: <StudyPlanner />,
      },
      {
        path: "/budget-tracker",
        element: <BudgetTracker />,
      },
      {
        path: "/exam-qa",
        element: <ExamQA />,
        },
        {
            path: "schedule-tracker",
            element: <ScheduleTracker/>
      }
    ],
  },
]);
