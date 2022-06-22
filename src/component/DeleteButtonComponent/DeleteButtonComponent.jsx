import { DeleteOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import React from "react";

export default function DeleteButtonComponent(props) {
  return (
    <Popconfirm
      title={props.title}
      onConfirm={props.onConfirm}
      okText="Yes"
      cancelText="No"
      placement={props.placement ? props.placement : "left"}
      arrowPointAtCenter
    >
      <button className="bg-red-500 w-8 h-6 rounded-md flex justify-center items-center pb-1 text-white border-2 border-transparent hover:bg-white hover:text-secondary-900 duration-300 hover:border-red-500 mobile:w-7 mobile:h-5 mobile:rounded overflow-hidden">
        <DeleteOutlined className="text-lg mobile:text-base" />
      </button>
    </Popconfirm>
  );
}
