"use client";
import React, { useState, useEffect } from "react";
import logo from "../../assets/remove-bg-logo.png";
import {
  ClipboardClock,
  FileSpreadsheet,
  Menu,
  NotebookPen,
  Wallet,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const navItems = [
    {
      id: 1,
      label: "Study Planner",
      icon: <NotebookPen size={18} />,
      path: "/study-planner",
    },
    {
      id: 2,
      label: "Exam Q&A",
      icon: <FileSpreadsheet size={18} />,
      path: "/exam-qa",
    },
    {
      id: 3,
      label: "Budget Tracker",
      icon: <Wallet size={18} />,
      path: "/budget-tracker",
    },
    {
      id: 4,
      label: "Class Schedule",
      icon: <ClipboardClock size={18} />,
      path: "/schedule-tracker",
    },
  ];

  return (
    <header className="sticky top-0 z-50">
      <nav className="backdrop-blur-lg bg-gradient-to-r from-yellow-500/90 via-yellow-400/80 to-yellow-600/90 shadow-md border-b border-yellow-700/20">
        <div className="container mx-auto flex items-center justify-between px-6 py-3">
        
          <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="h-12 w-auto drop-shadow-lg" />
            <h2 className="text-xl font-bold hidden sm:block">Campus Flow</h2>
          </div>

         
          <ul className="hidden lg:flex items-center gap-6 font-medium">
            {navItems.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.path}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-yellow-600/50 transition-all duration-300"
                >
                  {item.icon}
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Mobile Hamburger */}
          <div
            className="lg:hidden text-white text-2xl cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <Menu />
          </div>
        </div>

        {/* Sidebar for Mobile */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="fixed top-0 right-0 h-full w-64 bg-gradient-to-b from-yellow-600 to-yellow-500 shadow-2xl lg:hidden z-[50]"
            >
              <div className="flex justify-end items-center px-6 py-4 border-b border-yellow-400">
                
                <button onClick={() => setIsOpen(false)}>
                  <X className="text-2xl text-white" />
                </button>
              </div>

              <ul className="flex flex-col gap-6 px-6 py-6 font-medium">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <NavLink
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-yellow-700/60 transition-all duration-300"
                    >
                      {item.icon}
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
