import { PlusOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React, { memo, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import CreateTaskFormComponent from "./CreateTaskFormComponent/CreateTaskFormComponent";
import MemberListComponent from "../../component/MemberListComponent/MemberListComponent";
import { getPriorityAction } from "../../redux/actions/getPriorityAction";
import { getProjectDetailAction } from "../../redux/actions/getProjectDetailAction";
import { getTaskStatusAction } from "../../redux/actions/getTaskStatusAction";
import { getTaskTypeAction } from "../../redux/actions/getTaskTypeAction";
import { updateStatusAction } from "../../redux/actions/updateStatusAction";
import { OPEN_FORM } from "../../redux/types/types";
import StatusTaskCardComponent from "./StatusTaskCardComponent/StatusTaskCardComponent";

function ProjectDetail(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    const { projectId } = props.match.params;
    dispatch(getProjectDetailAction(projectId));
    dispatch(getTaskStatusAction());
    dispatch(getTaskTypeAction());
    dispatch(getPriorityAction());
  }, []);

  const projectDetail = useSelector(
    (state) => state.projectReducer.projectDetail
  );

  // const { resetForm } = useSelector((state) => state.formikReducer);

  const handleDragEnd = (result) => {
    const { lstTask } = projectDetail;

    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    //Nếu drag-drop ở 1 taskStatus thì return
    if (source.droppableId === destination.droppableId) {
      return;
    }

    //tạo ra 1 item copy
    let itemCopy = {
      ...lstTask[source.droppableId - 1].lstTaskDeTail[source.index],
    };

    //sau khi drag end sẽ xoá item ở source
    let dropSource = lstTask[source.droppableId - 1].lstTaskDeTail.splice(
      source.index,
      1
    );

    //sau khi drag end sẽ thêm item copy vào source
    let dropDestination = lstTask[destination.droppableId - 1].lstTaskDeTail;
    dropDestination.push(itemCopy);

    //dispatch action update statusTask với với dữ liệu là id của item đc kéo và statusId là destination
    let data = {
      taskId: draggableId,
      statusId: destination.droppableId,
    };

    dispatch(updateStatusAction(data, projectDetail.id));
  };

  return (
    <div>
      <h1 className="title">{projectDetail.projectName}</h1>
      <div className="taskInfo flex justify-between mb-10">
        <div className="flex">
          <div className="member-avatar">
            <MemberListComponent projectDetail={projectDetail} />
          </div>
        </div>
        <Tooltip
          placement="left"
          title="Click to create task"
          className="cursor-pointer"
        >
          <button
            className="bg-[#002140] hover:bg-[#1890ff] rounded-sm text-white text-xl flex justify-center items-center w-8 h-8 transition-all duration-200"
            onClick={() => {
              const actionOpenForm = {
                type: OPEN_FORM,
                Component: <CreateTaskFormComponent />,
                title: `Create task (Project: ${projectDetail.projectName})`,
              };
              dispatch(actionOpenForm);
            }}
          >
            <PlusOutlined />
          </button>
        </Tooltip>
      </div>

      <div className="statusTask grid grid-cols-4 gap-3 w-full tablet:grid-cols-2">
        <DragDropContext onDragEnd={handleDragEnd}>
          {projectDetail.lstTask?.map((lstTask, index) => {
            return (
              <StatusTaskCardComponent
                task={lstTask}
                projectDetail={projectDetail}
                key={index}
              />
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
}

export default memo(ProjectDetail);
