import { TablePaginationConfig } from "antd";

export interface CusTableProps {
  columns: any[];
  dataSource: any;
  loading: boolean;
  bordered?: boolean;
  sticky?: boolean;
  selectionType?: "checkbox" | "radio";
  renderFooter?: any;
  pagination?: false | TablePaginationConfig | undefined;
  onRowClick?: any;
}
