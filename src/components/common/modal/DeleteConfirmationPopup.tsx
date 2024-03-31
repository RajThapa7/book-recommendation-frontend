import { Modal } from "antd";
import React from "react";
import { CancelButton, PrimaryButton } from "./modal.buttons";

export interface CusModalProps {
  show: boolean;
  onClose?: () => void;
  handleDeleteFunc?: () => void;
}

const DeleteConfirmationPopup = ({
  show,
  onClose,
  handleDeleteFunc,
}: CusModalProps) => {
  return (
    <Modal open={show} footer={false} onCancel={onClose}>
      <div className="flex flex-col gap-6">
        <p className="text-[18px] text-black font-semibold">
          Are you sure you want to delete this?
        </p>
        <p className="text-paragraph text-[#697077] text-[16px]">
          Following action will be reflected in your portal as well.
        </p>
        <div className="w-full flex items-end justify-end gap-2">
          <div className="w-max">
            <CancelButton onClick={onClose}>Cancel</CancelButton>
          </div>
          <div className="w-max">
            <PrimaryButton onClick={handleDeleteFunc}>Delete</PrimaryButton>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationPopup;
