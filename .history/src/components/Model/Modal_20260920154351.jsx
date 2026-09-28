import { useEffect } from "react";
import "./Modal.css";

/**
 * مودال عام (overlay بيغطي الشاشة كلها + اوباسيتي على اللي وراه).
 * استخدمه لأي محتوى: <Modal isOpen={..} onClose={..}><LoginForm /></Modal>
 */
export default function Modal({ isOpen, onClose, children }) {
  // يمنع سكرول الصفحة اللي وراء المودال وهو مفتوح
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* stopPropagation عشان الضغط جوه الفورم ميقفلش المودال */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
