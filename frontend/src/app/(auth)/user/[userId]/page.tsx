import Link from "next/link";
import React from "react";

type UserProps = {};

const User = ({}: UserProps) => {
  return (
    <div className="plusjakartasans p-5">
      <div className="p-6 bg-white rounded-xl mb-4">
        <h1 className="flex items-center text-3xl font-bold">
          <span className="inline-block mr-2 w-10 h-10 bg-purple-900 rounded-full"></span>{" "}
          James Bond
        </h1>
        <h2 className="flex items-end justify-between mb-11">
          <div>
            Agent <span>.</span> Lead Fullstack Engineer
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

      <div className="p-6 mb-4 bg-white rounded-xl">
        <h2 className="items-center mb-4 text-2xl font-bold">Skills</h2>

        <ul className="list-disc pl-5">
          <li>Python</li>
          <li>Typescript</li>
          <li>Node.js</li>
          <li>Docker</li>
          <li>Kubernetes</li>
          <li>React</li>
          <li>AWS</li>
          <li>Postgresql</li>
        </ul>
      </div>

      <div className="p-10 mb-4 bg-white rounded-xl">
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

      <div className="p-6 mb-4 bg-white rounded-xl">
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
  );
};

export default User;
