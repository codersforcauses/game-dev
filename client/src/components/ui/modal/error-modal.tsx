import React, { useState } from "react";

interface ErrorModalProps {
  message: string | null;
  onClose: () => void;
}

const ErrorModal = ({ message, onClose = () => {} }: ErrorModalProps) => {
  const [isVisible, setIsVisible] = useState(true);
  if (!isVisible || !message) {
    return null;
  }

  function onModalClose() {
    setIsVisible(false);
    onClose();
  }

  return (
    // Backdrop overlay
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={onModalClose} // Close when clicking outside the modal
    >
      {/* Modal content container */}
      <div
        className="relative m-auto flex w-full max-w-md flex-col rounded bg-white p-6 text-black"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <h2 className="text-xl font-bold md:leading-loose">Error</h2>
        <p className="leading-normal">{message}</p>
        <div className="mt-8 inline-flex justify-end">
          <button
            className="text-grey-darkest bg-error flex-1 rounded px-4 py-2 text-white md:flex-none"
            onClick={onModalClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
