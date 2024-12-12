import React from "react";

interface ModalProps {
    isOpen: boolean;
    onClose?: () => void;
    onConfirm?: () => void;
    title?: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    confirmBtnClassname?: string;
    closeBtnClassname?: string;
}

export default function Modal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Ya",
    cancelText = "Batal",
    confirmBtnClassname,
    closeBtnClassname,
}: ModalProps) {

    if (!isOpen) return null;

    return (
        <div
            className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm`}
        >
            <div
                className={`bg-white w-[90%] md:w-[500px] rounded shadow-lg p-5 relative transition-all duration-300 ease-in-out transform ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
                    }`}
            >
                <h2 className="text-xl font-bold mb-4">{title || "Konfirmasi"}</h2>
                <p className="text-gray-700 mb-6 font-medium">{message}</p>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className={
                            closeBtnClassname ??
                            "border hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
                        }
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={() => {
                            if (onConfirm) onConfirm();
                            if (onClose) onClose();
                        }}
                        className={
                            confirmBtnClassname ??
                            "bg-indigo-500 hover:bg-indigo-400 text-white px-4 py-2 rounded"
                        }
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
