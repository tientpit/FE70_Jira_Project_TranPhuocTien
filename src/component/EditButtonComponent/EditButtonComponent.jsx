import { EditOutlined } from "@ant-design/icons";
import React from "react";

export default function EditButtonComponent(props) {
  return (
    <button
      className="mr-1 bg-primary-500 text-white w-8 h-6 rounded-md border-2 border-transparent flex justify-center items-center pb-1 edit-project hover:bg-white hover:text-secondary-900 duration-300 hover:border-primary-600 mobile:w-7 mobile:h-5 mobile:rounded overflow-hidden"
      onClick={props.onClick}
    >
      <EditOutlined className="text-lg mobile:text-base" />
    </button>
  );
}
