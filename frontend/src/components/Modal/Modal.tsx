import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

type ModalProps = {
  children?: React.ReactNode;
  title?: string;
  isOpen: boolean;
  className?: string;
  onClose: () => void;
};

const Modal = ({ children, title, isOpen, onClose, className }: ModalProps) => {
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className={`fixed flex inset-0 items-center justify-center h-full w-full bg-stone-800 bg-opacity-50`}
          >
            <motion.div
              initial={{ translateY: 100 }}
              animate={{ translateY: 0 }}
              exit={{ opacity: 0 }}
              className={`${
                className || ""
              } absolute max-w-4xl border rounded-xl m-auto p-5 bg-white`}
            >
              <div className="flex justify-between items-start">
                <p className="text-2xl mb-3">{title}</p>
                <button onClick={onClose}>
                  <X />
                </button>
              </div>

              <div>
                <div>{children}</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Modal;
