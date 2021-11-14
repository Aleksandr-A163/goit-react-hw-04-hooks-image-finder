import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { createPortal } from 'react-dom';
import s from "./Modal.module.css";


const modalRoot = document.querySelector("#modal-root");

function Modal({ onClose, imageModal }) {
  
  useEffect(() => {

  const handleKeyDown = (e) => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);


const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
      <div className={s.Overlay} onClick={handleBackdropClick}>
        <div className={s.Modal}>
          <img src={imageModal} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }


Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  imageModal: PropTypes.string.isRequired,
  };

export default Modal;

