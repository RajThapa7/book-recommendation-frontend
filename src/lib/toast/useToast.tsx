import { useContext } from "react";
import {
  ContextValue,
  OpenNotification,
} from "./interface/toastProvider.interface";
import { ToastContext } from "./ToastProvider";
export const useToast = () => {
  const { openNotification, api }: ContextValue = useContext(ToastContext);

  const showToast = (props: OpenNotification) => openNotification(props);

  return showToast;
};
