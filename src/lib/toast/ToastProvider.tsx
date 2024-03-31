import React from "react";

import useNotification from "antd/es/notification/useNotification";
import { ContextValue, OpenNotification } from "./interface/toastProvider.interface";

export const ToastContext = React.createContext({ openNotification: () => {} });

/**
 * Provides a toast notification context to its children.
 * @param children - The child components that will have access to the toast notification context.
 */
export const ToastContextComponent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [api, contextHolder] = useNotification();

  /**
   * Displays a toast notification based on the input parameters.
   * @param placement - The placement of the toast notification. Defaults to "topRight".
   * @param type - The type of the toast notification (success, error, info, warning).
   * @param title - The title of the toast notification.
   * @param description - The description of the toast notification.
   */
  const openNotification = ({
    placement = "topRight",
    type,
    title,
    description = "",
  }: OpenNotification): void => {
    const notificationParams = {
      message: title,
      description,
      placement,
    };

    switch (type) {
      case "success":
        api.success(notificationParams);
        break;
      case "error":
        api.error(notificationParams);
        break;
      case "info":
        api.info(notificationParams);
        break;
      case "warning":
        api.warning(notificationParams);
        break;
      default:
        break;
    }
  };

  const contextValue: ContextValue = {
    openNotification,
    api,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {contextHolder}
      {children}
    </ToastContext.Provider>
  );
};
