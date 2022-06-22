import { UserAddOutlined } from "@ant-design/icons";
import { AutoComplete, Avatar, Popover, Table, Tooltip } from "antd";
import React, { memo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { assignUserProjectAction } from "../../redux/actions/assignUserProjectAction";
import { getAllUserAction } from "../../redux/actions/getAllUserAction";
import { getProjectDetailAction } from "../../redux/actions/getProjectDetailAction";
import { removeUserFromProject } from "../../redux/actions/removeUserFromProjectAction";
import DeleteButtonComponent from "../DeleteButtonComponent/DeleteButtonComponent";

function MemberListComponent(props) {
  const { projectDetail } = props;
  const { userSearch } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const searchRef = useRef(null);
  const [value, setValue] = useState("");

  const history = useHistory();

  return (
    <div className="flex">
      <Popover
        placement="bottom"
        title={"Member"}
        content={() => {
          const dataSource = projectDetail.members?.map((member, index) => {
            return {
              key: index,
              id: member.userId,
              name: member.name,
              avatar: <Avatar src={member.avatar}></Avatar>,
              action: (
                <DeleteButtonComponent
                  onClick={async () => {
                    const action = removeUserFromProject({
                      projectId: projectDetail.id,
                      userId: member.userId,
                    });
                    await dispatch(action);
                    if (
                      history.location.pathname.indexOf("/projectdetail") > -1
                    ) {
                      dispatch(getProjectDetailAction(projectDetail.id));
                    }
                  }}
                  title="Are you sure to delete this member?"
                  placement="bottom"
                />
              ),
            };
          });

          const columns = [
            {
              title: "ID",
              dataIndex: "id",
              key: "id",
              width: 1,
            },
            {
              title: "Avatar",
              dataIndex: "avatar",
              key: "avatar",
              width: 1,
            },
            {
              title: "Name",
              dataIndex: "name",
              key: "name",
              width: 160,
            },
            {
              title: "",
              dataIndex: "action",
              key: "action",
            },
          ];

          return (
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={{ pageSize: 5 }}
              className="w-[350px]"
            />
          );
        }}
        trigger="click"
      >
        <Tooltip
          placement="top"
          title="Click to view member"
          className="cursor-pointer"
        >
          {projectDetail.members?.slice(0, 5).map((member, index) => {
            return <Avatar src={member.avatar} alt="..." key={index} />;
          })}
          {projectDetail.members?.length > 5 ? <Avatar>...</Avatar> : ""}
        </Tooltip>
      </Popover>

      <Tooltip placement="top" title={"Add member"}>
        <Popover
          placement="bottom"
          title={"Add member"}
          trigger="click"
          content={() => {
            return (
              <AutoComplete
                options={userSearch.map((user, index) => {
                  return {
                    label: user.name,
                    value: user.userId.toString(),
                  };
                })}
                style={{ width: "100%" }}
                onSelect={async (value, option) => {
                  setValue(option.label);
                  await dispatch(
                    assignUserProjectAction({
                      projectId: projectDetail.id,
                      userId: Number(value),
                    })
                  );
                  dispatch(getProjectDetailAction(projectDetail.id));
                }}
                onSearch={(value) => {
                  if (searchRef.current) {
                    clearTimeout(searchRef.current);
                  }
                  searchRef.current = setTimeout(() => {
                    dispatch(getAllUserAction(value));
                  }, 300);
                }}
                onChange={(text) => {
                  setValue(text);
                }}
                value={value}
              />
            );
          }}
        >
          <UserAddOutlined className="flex justify-center items-center w-[32px] h-[32px]" />
        </Popover>
      </Tooltip>
    </div>
  );
}

export default memo(MemberListComponent);
