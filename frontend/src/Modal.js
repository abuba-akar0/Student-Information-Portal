// frontend/src/components/Modal.js
import React from 'react';
import styled from 'styled-components';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
    background-color: #ceffce;
    padding: 20px;
    border-radius: 10px;
    max-width: 500px;
    width: 100%;
`;

const CloseButton = styled.button`
    background-color: #e74c3c;
    color: #fdfffd;
    border: none;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    float: right;

    &:hover {
        background-color: #c0392b;
    }
`;

const Modal = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <ModalBackground>
      <ModalContent>
        <CloseButton onClick={onClose}>Close</CloseButton>
        {children}
      </ModalContent>
    </ModalBackground>
  );
};

export default Modal;