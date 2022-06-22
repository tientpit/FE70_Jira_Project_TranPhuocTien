import { SearchOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import DeleteButtonComponent from "../../component/DeleteButtonComponent/DeleteButtonComponent";
import EditButtonComponent from "../../component/EditButtonComponent/EditButtonComponent";
import MemberListComponent from "../../component/MemberListComponent/MemberListComponent";
import TableComponent from "../../component/TableComponent/TableComponent";
import { deleteProjectAction } from "../../redux/actions/deleteProjectAction";
import { getProjectAction } from "../../redux/actions/getProjectAction";
import { getProjectDetailAction } from "../../redux/actions/getProjectDetailAction";
import { OPEN_FORM } from "../../redux/types/types";
import EditProjectFormComponent from "./EditProjectFormComponent/EditProjectFormComponent";

export default function ProjectManagement(props) {
  const action = getProjectAction();

  let projectArr = useSelector(
    (rootReducer) => rootReducer.projectReducer.projectArr
  );

  useEffect(() => {
    dispatch(action);
  }, []);

  const dispatch = useDispatch();
  const inputSearch = useRef();

  const userLoginId = useSelector((state) => state.userReducer.userLogin.id);

  const searchProject = (e) => {
    e.preventDefault();
    let action = getProjectAction(inputSearch.current.value);
    dispatch(action);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
      defaultSortOrder: "ascend",
      width: "10%",
      align: "center",
      responsive: ["xl", "lg", "md"],
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
      width: "25%",
    },
    {
      title: "Category",
      key: "category",
      dataIndex: "categoryName",
      width: "20%",
      align: "center",
      filters: [
        {
          text: "Dự án web",
          value: "Dự án web",
        },
        {
          text: "Dự án phần mềm",
          value: "Dự án phần mềm",
        },
        {
          text: "Dự án di động",
          value: "Dự án di động",
        },
      ],
      render: (text, record, index) => {
        return (
          <span>
            <Tag
              className="text-sm mobile:hidden"
              color={
                record.categoryName === "Dự án phần mềm"
                  ? "volcano"
                  : record.categoryName === "Dự án web"
                    ? "green"
                    : "geekblue"
              }
            >
              {record.categoryName.toUpperCase()}
            </Tag>
            <Tag
              className="text-xs hidden mobile:block p-0"
              color={
                record.categoryName === "Dự án phần mềm"
                  ? "volcano"
                  : record.categoryName === "Dự án web"
                    ? "green"
                    : "geekblue"
              }
            >
              {record.categoryName.toUpperCase().slice(5, 99)}
            </Tag>
          </span>
        );
      },
      onFilter: (value, record) => record.categoryName.indexOf(value) === 0,
    },
    {
      title: "Creator",
      dataIndex: "creator",
      width: "15%",
    },
    {
      title: "Member",
      key: "members",
      dataIndex: "members",
      width: "25%",
      responsive: ["lg", "sm"],
      render: (text, record, index) => {
        return <div className="font-semibold text-red-500">
          <MemberListComponent projectDetail={record} />
        </div>;
      },
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      width: "5%",
      align: "center",
      render: (data, record, index) => (
        <div className="flex justify-center text-white">
          <EditButtonComponent
            onClick={async () => {
              //dispatch action getProjectDetailAction => gửi lên redux
              const action = await getProjectDetailAction(record.id);
              dispatch(action);
              const actionOpenForm = {
                type: OPEN_FORM,
                Component: <EditProjectFormComponent />,
                title: `Edit Project (${record.id})`,
              };
              //dispatch actionOpenForm với nội dung component là EditProjectFormWithFormik
              dispatch(actionOpenForm);
            }}
          />
          {/* <button
            className="mr-1 bg-[#1890ff] w-8 h-6 rounded-md flex justify-center items-center pb-1 edit-project"
            onClick={async () => {
              //dispatch action getProjectDetailAction => gửi lên redux
              const action = await getProjectDetailAction(record.id);
              dispatch(action);
              const actionOpenForm = {
                type: OPEN_FORM,
                Component: <EditProjectFormWithFormik />,
                title: `Edit Project (${record.id})`,
              };
              //dispatch actionOpenForm với nội dung component là EditProjectFormWithFormik
              dispatch(actionOpenForm);
            }}
          >
            <EditOutlined className="text-lg" />
          </button> */}
          <DeleteButtonComponent
            title="Are you sure to delete this project?"
            onConfirm={() => {
              //dispatch action deleteProject
              const action = deleteProjectAction(record.id);
              dispatch(action);
            }}
          />
        </div>
      ),
    },
  ];

  const data = projectArr.map((project, index) => {
    return {
      key: index,
      id: project.id,
      projectName: (
        <NavLink
          to={`/projectdetail/${project.id}`}
          className="font-medium text-secondary-600 relative hover:text-primary-500 after:content-[''] after:absolute after:w-full after:h-4 after:-bottom-1 after:left-0  after:border-b-2 after:border-primary-500 after:scale-x-0 hover:after:scale-x-100 after:block after:duration-300"
        >
          {project.projectName}
        </NavLink>
      ),
      categoryName: project.categoryName,
      creator: project.creator.name,
      members: project.members,
    };
  });

  return (
    <div className="w-full">
      <h3 className="title">Project management</h3>
      <form
        onSubmit={(e) => {
          searchProject(e);
        }}
      >
        <input
          type="text"
          placeholder="Project"
          className="input"
          ref={inputSearch}
        />
        <button className="btn ml-3" type="submit">
          <span className="mobile:hidden">Search Project</span>
          <SearchOutlined className="hidden mobile:block" />
        </button>
      </form>
      <TableComponent columns={columns} dataSource={data} />
    </div>
  );
}
