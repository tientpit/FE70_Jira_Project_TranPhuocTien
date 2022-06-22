import { Table } from "antd";
import React from "react";

export default function TableComponent(props) {
  return (
    <Table
      columns={props.columns}
      dataSource={props.dataSource}
      className="w-full mx-auto"
      pagination={{ position: ["topRight"] }}
      size="small"
    />
  );
}
