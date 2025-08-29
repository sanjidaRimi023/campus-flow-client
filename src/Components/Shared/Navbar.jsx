"use client";
import React, { useState } from "react";
import logo from "../../assets/remove-bg-logo.png";
import {
  ClipboardClock,
  FileSpreadsheet,
  Menu,
  NotebookPen,
  Wallet,
  X,
} from "lucide-react";
import { Link } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: "study-planner", label: "Study Planner", icon: <NotebookPen size={18} /> },
    { id: "exam-qa", label: "Exam Q&A", icon: <FileSpreadsheet size={18} /> },
    { id: "budget-tracker", label: "Budget Tracker", icon: <Wallet size={18} /> },
    { id: "class-schedule", label: "Class Schedule", icon: <ClipboardClock size={18} /> },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav className="backdrop-blur-lg bg-gradient-to-r from-yellow-500/90 via-yellow-400/80 to-yellow-600/90 shadow-md border-b border-yellow-700/20">
        <div className="container mx-auto flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="h-12 w-auto drop-shadow-lg" />
            <h2 className="text-xl font-bold hidden sm:block">
              Campus Flow
            </h2>
          </div>

          
          <ul className="hidden md:flex items-center gap-6 font-medium">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.id}
                  smooth={true}
                  duration={500}
                  offset={-70}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-yellow-600/50 transition-all duration-300 cursor-pointer"
                >
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

  
          <div
            className="md:hidden text-white text-2xl cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <Menu />
          </div>
        </div>

        {/* Sidebar*/}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-64 bg-gradient-to-b from-yellow-600 to-yellow-500 shadow-2xl md:hidden"
            >
            
              <div className="flex justify-between items-center px-6 py-4 border-b border-yellow-400">
                <h2 className="text-lg font-semibold text-white">Menu</h2>
                <button onClick={() => setIsOpen(false)}>
                  <X className="text-2xl text-white" />
                </button>
              </div>

       
              <ul className="flex flex-col gap-6 px-6 py-6 font-medium">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <Link
                      to={item.id}
                      smooth={true}
                      duration={500}
                      offset={-70}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-yellow-700/60 transition-all duration-300 cursor-pointer"
                    >
                      {item.icon}
                      {item.label}
                    </Link>
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
