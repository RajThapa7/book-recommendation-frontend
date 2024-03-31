import React from "react";
import { CancelButton, PrimaryButton } from "./modal.buttons";
import { CircularLoader } from "../loader/circular.loader";

type Props = {
  type: "add" | "edit";
  buttonType?: "button" | "submit" | "reset" | undefined;
  loading?: boolean;
  handleSubmitFunc?: () => void;
  onClose?: () => void;
};

const PopupBottons = ({
  type,
  buttonType,
  handleSubmitFunc,
  loading,
  onClose,
}: Props) => {
  return (
    <div className="w-full flex items-end justify-end gap-2">
      <div className="w-max">
        <CancelButton type="button" onClick={onClose}>
          Cancel
        </CancelButton>
      </div>
      <div className="w-max">
        <PrimaryButton type={buttonType}>
          {loading ? <CircularLoader /> : type === "add" ? "Add" : "Save"}
        </PrimaryButton>
      </div>
    </div>
  );
};

export default PopupBottons;
