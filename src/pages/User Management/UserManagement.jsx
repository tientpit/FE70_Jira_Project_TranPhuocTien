import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Avatar, Tooltip } from "antd";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteButtonComponent from "../../component/DeleteButtonComponent/DeleteButtonComponent";
import EditButtonComponent from "../../component/EditButtonComponent/EditButtonComponent";
import EditUserFormComponent from "./EditUserFormComponent/EditUserFormComponent";
import TableComponent from "../../component/TableComponent/TableComponent";
import { deleteUserAction } from "../../redux/actions/deleteUserAction";
import { getAllUserAction } from "../../redux/actions/getAllUserAction";
import { OPEN_FORM, OPEN_MODAL } from "../../redux/types/types";
import CreateUserComponent from "./CreateUserComponent/CreateUserComponent";

export default function UserManagerment(props) {
  const dispatch = useDispatch();
  const userLst = useSelector((state) => state.userReducer.userSearch);

  useEffect(() => {
    dispatch(getAllUserAction());
  }, []);

  const data = userLst.map((user, index) => ({
    key: index,
    userId: user.userId,
    name: user.name,
    avatar: user.avatar,
    email: user.email,
    phoneNumber: user.phoneNumber,
  }));

  const columns = [
    {
      title: "ID",
      dataIndex: "userId",
      sorter: (a, b) => a.userId - b.userId,
      defaultSortOrder: "ascend",
      key: "userId",
      width: "5%",
      align: "center",
      responsive: ["lg, xl, lg"],
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (text, record, index) => {
        return <Avatar src={record.avatar} />;
      },
      width: "15%",
      align: "center",
      className: "mr-",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "25%",
      render: (text, record, index) => {
        return (
          <div>
            <p className="hidden tablet:block mobile:hidden m-0">
              {record.email.length > 20
                ? `${record.email.slice(0, 20)}...`
                : record.email}
            </p>
            <p className="hidden mobile:block m-0">
              {record.email.length > 8
                ? `${record.email.slice(0, 8)}...`
                : record.email}
            </p>
            <p className="mobile:hidden tablet:hidden m-0">{record.email}</p>
          </div>
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "25%",
      render: (text, record, index) => (
        <div>
          <p className="hidden mobile:block m-0">
            {record.name.length > 8
              ? `${record.name.slice(0, 8)}...`
              : record.name}
          </p>
          <p className="mobile:hidden m-0">{record.name}</p>
        </div>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: "20%",
    },
    {
      title: "Action",
      render: (text, record, index) => (
        <div className="flex justify-center text-white">
          <EditButtonComponent
            onClick={async () => {
              await dispatch(getAllUserAction(record.userId, "one"));
              dispatch({
                type: OPEN_FORM,
                Component: <EditUserFormComponent />,
                title: `Edit User (${record.userId})`,
              });
            }}
          />
          <DeleteButtonComponent
            title="Are you sure to delete this user?"
            onConfirm={() => {
              const action = deleteUserAction(record.userId);
              dispatch(action);
            }}
          />
        </div>
      ),
      align: "center",
      width: "10%",
    },
  ];

  const inputSearch = useRef();

  const searchUser = (e) => {
    e.preventDefault();
    let action = getAllUserAction(inputSearch.current.value);
    dispatch(action);
  };

  return (
    <div>
      <h3 className="title">User Management</h3>
      <div className="flex justify-between">
        <form
          onSubmit={(e) => {
            searchUser(e);
          }}
        >
          <input
            type="text"
            placeholder="User"
            className="input"
            ref={inputSearch}
          />
          <button className="btn ml-3" type="submit">
            <span className="mobile:hidden">Search User</span>
            <SearchOutlined className="hidden mobile:block" />
          </button>
        </form>
        <Tooltip
          placement="left"
          title="Click to create user"
          className="cursor-pointer"
        >
          <button
            className="bg-[#002140] hover:bg-[#1890ff] rounded-sm text-white text-xl flex justify-center items-center w-8 h-8"
            onClick={() => {
              const actionOpenForm = {
                type: OPEN_MODAL,
                modalContent: <CreateUserComponent />,
                // title: "Create User",
              };
              dispatch(actionOpenForm);
            }}
          >
            <PlusOutlined />
          </button>
        </Tooltip>
      </div>

      {/* <Table
        columns={columns}
        dataSource={data}
        size={"middle"}
        className="w-full"
        pagination={{ position: ["topRight"] }}
      /> */}
      <TableComponent columns={columns} dataSource={data} />
    </div>
  );
}
