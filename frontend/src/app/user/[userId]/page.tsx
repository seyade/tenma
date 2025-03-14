"use client";

import AppHeader from "@/components/AppHeader";
import Sidebar from "@/components/Sidebar";
import { useUser } from "@/context/UserProvider";
import {
  FolderKanban,
  House,
  LayoutDashboard,
  LayoutPanelLeft,
  X,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const User = () => {
  const { user, isLoading, error } = useUser();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-xl text-stone-800 font-semibold">Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-xl text-stone-800 font-semibold">
          Oops! Can't get user info. Let's look into it.
        </h2>
      </div>
    );
  }

  return (
    <div className="plusjakartasans flex bg-stone-100">
      <Sidebar />

      <div className="grid grid-cols-12 gap-4 w-full p-5">
        <AppHeader pageTitle="Profile" className="col-span-full">
          <button className="py-2 px-6 text-white font-semibold bg-slate-500 rounded-full">
            Save
          </button>
        </AppHeader>

        <div className="col-span-full p-6 bg-white rounded-xl">
          <h1 className="flex items-center mb-3 text-3xl font-bold">
            <span className="inline-block mr-2 w-10 h-10 bg-purple-900 rounded-full"></span>
            {user?.name}
          </h1>
          <h2 className="flex items-end justify-between mb-11">
            <div>
              <p className="font-semibold">{user?.title}</p>
              {/* <p>james.bond@secretservice.io</p> */}
              {user?.email}
              <div>
                <p className="text-sm text-slate-400">
                  <Link href="https://github.com">Github</Link>
                  <span className="px-1">/</span>
                  <Link href="https://linkedin.com">LinkedIn</Link>
                  <span className="px-1">/</span>
                  <Link href="https://x.com">X</Link>
                  <span className="px-1">/</span>
                  <Link href="">Instagram</Link>
                  <span className="px-1">/</span>
                  <Link href="">TikTok</Link>
                </p>
              </div>
            </div>
            <button className="py-2 px-6 text-white font-semibold bg-slate-900 rounded-full">
              View CV
            </button>
          </h2>
          <div className="font-semibold text-sm">
            <Link href="">Personal Information</Link> |{" "}
            <Link href="">Skills</Link> | <Link href="">Experience</Link> |{" "}
            <Link href="">Education &amp; Certification</Link>
          </div>
        </div>

        <div className="col-span-full p-6 bg-white rounded-xl">
          <h2 className="items-center mb-4 text-2xl font-bold">Summary</h2>
          <p>{user?.profileSummary}</p>
        </div>

        <div className="col-span-full p-6 bg-white rounded-xl">
          <h2 className="items-center mb-4 text-2xl font-bold">Clients</h2>

          <div className="grid grid-cols-4 list-disc">
            {user?.clients.map((client, i) => (
              <span key={client}>{client}</span>
            ))}
          </div>
        </div>

        <div className="col-span-full p-6 bg-white rounded-xl">
          <h2 className="items-center mb-4 text-2xl font-bold">Skills</h2>

          <div className="list-disc">
            {user?.skills.map((skill, i) => (
              <span
                key={skill}
                className="inline-flex justify-center items-center px-2 text-sm mr-1 text-white bg-stone-700 rounded-3xl"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="col-span-full p-10 bg-white rounded-xl">
          <h2 className="items-center mb-4 text-2xl font-bold">Experience</h2>

          <ul>
            <li className="border-b pb-4">
              <p className="font-bold">Meta</p>
              <p className="font-medium">
                Tech Lead,
                <span className="ml-1 font-light text-sm text-slate-500">
                  Oct 2023 - Dec 2025
                </span>
              </p>
            </li>
            <li className="border-b pb-4">
              <p className="font-bold">Amazon</p>
              <p className="font-medium">
                Senior Fullstack Engineer,
                <span className="ml-1 font-light text-sm text-slate-500">
                  Nov 2021 - Sep 2023
                </span>
              </p>
            </li>
            <li>
              <p className="font-bold">Sony</p>
              <p className="font-medium">
                Lead Fullstack Engineer,
                <span className="ml-1 font-light text-sm text-slate-500">
                  Nov 2018 - Sep 2021
                </span>
              </p>
            </li>
          </ul>
        </div>

        <div className="col-span-full p-6 mb-4 bg-white rounded-xl">
          <h2 className="items-center mb-4 text-2xl font-bold">
            Education &amp; Certification
          </h2>

          <ul>
            <li className="border-b pb-4">
              <p className="font-bold">School of Project Management</p>
              <p className="font-medium">
                Prince 2 Practitioner with Agile,
                <span className="ml-1 font-light text-sm text-slate-500">
                  March 2024
                </span>
              </p>
            </li>
            <li className="border-b pb-4">
              <p className="font-bold">Amazon</p>
              <p className="font-medium">
                AWS Solution Architect Certificate,
                <span className="ml-1 font-light text-sm text-slate-500">
                  January 2022
                </span>
              </p>
            </li>
            <li>
              <p className="font-bold">Cambridge University,</p>
              <p className="font-medium">
                MEng. Mechanical Engineering with Criminal Justice
                <span className="ml-1 font-light text-sm text-slate-500">
                  July 2007 <span>.</span> Cambridge
                </span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default User;
