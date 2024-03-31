import { NotificationInstance, NotificationPlacement } from "antd/es/notification/interface";

export type NotificationType =
    | "success"
    | "info"
    | "danger"
    | "error"
    | "warning";

export interface ContextValue {
    openNotification: any;
    api?: NotificationInstance | null;
}

export interface OpenNotification {
    placement?: NotificationPlacement;
    type: NotificationType;
    title: string;
    description?: string;
}
