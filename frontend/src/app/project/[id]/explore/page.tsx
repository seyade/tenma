"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { ArrowRight, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Sidebar from "@/components/Sidebar";
import AppHeader from "@/components/AppHeader";
import Link from "next/link";
import ExploreCard from "./ExploreCard";

// use dynamic because of some SSR issue with createPortal().
const Modal = dynamic(() => import("@/components/Modal"), { ssr: false });

const projectSchema = z.object({
  clientName: z.string(),
  description: z.string().min(3, "min 3 characters"),
});

type ProjectFormData = z.infer<typeof projectSchema>;

const Explore = () => {
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const pathName = usePathname();
  const pathChunks = pathName.split(/\//);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ProjectFormData>({ resolver: zodResolver(projectSchema) });

  console.log("PARAMS::", pathChunks);

  const handleToggleNewProjectModal = () => {
    setIsNewProjectModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsNewProjectModalOpen(false);
  };

  return (
    <div className="plusjakartasans flex">
      <Sidebar />
      <div className="py-3 px-4 w-full">
        <Modal
          isOpen={isNewProjectModalOpen}
          onClose={handleCloseModal}
          title="Create Project"
          className="w-96"
        >
          <form action="">
            <div className="mb-4">
              <input
                type="text"
                {...register("clientName")}
                className="w-full py-3 px-4 border rounded-xl"
              />
              <p>{errors.clientName?.message}</p>
            </div>
            <div>
              <textarea
                {...register("description")}
                className="w-full py-3 px-4 border rounded-xl"
              />
              <p>{errors.description?.message}</p>
            </div>
            <button className="w-full py-4 mt-4 text-white font-semibold bg-stone-800 rounded-xl">
              Next
            </button>
          </form>
        </Modal>

        <AppHeader pageTitle="Explore" />

        <section className="mt-4">
          <div className="mb-4 py-4 px-7 bg-stone-300 rounded-md">
            <h2 className="mt-3 pb-4 text-6xl border-b border-stone-400/50">
              <span className="spacegrotesk mt-3 pb-4 text-6xl font-semibold uppercase">
                Craft collection.
              </span>
              <p className="text-sm italic text-stone-600">
                James Bond, Lead Fullstack Developer Agent
              </p>
            </h2>

            <div className="inline-block w-full mb-4 py-4">
              <p>
                <span className="text-stone-800 font-semibold">Filter</span>: //
                TODO - Filtering functionality here.
              </p>
            </div>
          </div>

          <div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-3">
              <ExploreCard
                projectTitle="Budget dashboard"
                client="Meta"
                date="From Nov 2024, to present"
                link="/project/1"
              />

              <ExploreCard
                projectTitle="Landing page design exploration for a robotic firm SaaS"
                client="IBM"
                date="From 1 May 2021, to 25 Nov 2024"
                link="/project/1"
              />

              <ExploreCard
                projectTitle="Product detail page"
                client="John Lewis"
                date="From 1 Jan 2019, to 25 Dec 2020"
                link="/project/1"
              />

              <div className="flex flex-col justify-center items-center h-72 p-5 border-2 border-stone-400/50 bg-stone-300 rounded-lg">
                <button
                  onClick={handleToggleNewProjectModal}
                  className="inline-flex items-center p-4 border  bg-stone-800 text-white text-sm rounded-full"
                >
                  <Plus />
                </button>
                <p className="p-2 mt-3 text-stone-700 bg-white rounded-lg">
                  Add a new project
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Explore;
