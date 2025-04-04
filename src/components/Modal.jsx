import { useEffect } from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
    // Disable background scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50 transition-opacity duration-300 ease-out">
            {/* Background overlay */}
            <div 
                className="fixed inset-0 bg-black bg-opacity-60 transition-opacity duration-300 ease-in-out"
                onClick={onClose}
            />
            {/* Modal Container */}
            <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto z-10 animate-fade-in scale-95 transform transition-all ease-out duration-300">
                {/* Modal Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-white bg-red-500 rounded-full p-1  transition duration-200 text-xl"
                    >
                        &times; {/* Close icon */}
                    </button>
                </div>
                {/* Modal Body */}
                <div className="modal-body text-gray-600 leading-relaxed space-y-4">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
