"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { Plus } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import AppHeader from "@/components/AppHeader";

// use dynamic because of some SSR issue with createPortal().
const Modal = dynamic(() => import("@/components/Modal"), { ssr: false });

const Explore = () => {
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const pathName = usePathname();
  const pathChunks = pathName.split(/\//);
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
            <p>A form here</p>
          </form>
        </Modal>

        <AppHeader pageTitle="Explore" />

        <section>
          <p>TODO: List all projects created by the user</p>

          <div className="p-5 border rounded-md">
            <button
              onClick={handleToggleNewProjectModal}
              className="inline-flex items-center p-4 mr-4 bg-green-700 text-white text-sm rounded-full"
            >
              <Plus />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Explore;
