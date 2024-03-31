import React from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "antd";
import { CusTableProps } from "./interface/table.interface";

const ClientTableComponent = dynamic(() => import("antd/es/table"), {
  ssr: false,
  loading: () => <Skeleton />,
});

function CusTable(tableProps: CusTableProps) {
  const {
    columns,
    dataSource,
    loading,
    bordered = false,
    sticky = true,
    onRowClick,
    renderFooter,
  }: CusTableProps = tableProps;

  const onRow = (record: any, _: any): any => {
    return {
      onClick: (_: any) => {
        onRowClick ? onRowClick(record) : () => {};
      },
    };
  };

  return (
    <ClientTableComponent
      showSorterTooltip={true}
      columns={columns}
      footer={renderFooter}
      dataSource={dataSource}
      bordered={bordered}
      pagination={false}
      rowClassName={onRowClick ? "cursor-pointer" : ""}
      sticky={sticky}
      loading={loading}
      onRow={onRow}
    />
  );
}

export default CusTable;
