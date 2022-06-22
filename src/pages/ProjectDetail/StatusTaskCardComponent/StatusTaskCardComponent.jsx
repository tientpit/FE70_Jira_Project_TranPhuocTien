import { InfoCircleFilled } from "@ant-design/icons";
import { Avatar } from "antd";
import React, { memo } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { getTaskDetailAction } from "../../../redux/actions/getTaskDetailAction";
import { OPEN_MODAL } from "../../../redux/types/types";
import EditTaskFormComponent from "../EditTaskFormComponent/EditTaskFormComponent";

function StatusTaskCardComponent(props) {
  const dispatch = useDispatch();
  const { task } = props;

  const taskSorted = task.lstTaskDeTail?.sort((a, b) =>
    a.priorityTask.priorityId > b.priorityTask.priorityId ? 1 : -1
  );

  return (
    <div className="p-2 bg-secondary-50 rounded-sm shadow-md min-h-[135px]">
      <h3 className=" text-secondary-500 text-[12.5px] ml-3 tablet:hidden">
        {task.statusName}
      </h3>
      <h3 className=" text-secondary-500 text-[12.5px] ml-3 hidden tablet:block">
        {task.statusName.length > 12
          ? `${task.statusName.slice(0, 12)}...`
          : task.statusName}
      </h3>
      <Droppable droppableId={task.statusId.toString()}>
        {(provided) => {
          return (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="h-full"
            >
              <ul className="mb-1 space-y-2">
                {taskSorted?.map((task, index) => {
                  return (
                    <li key={index}>
                      <Draggable
                        key={task.taskId}
                        index={index}
                        draggableId={task.taskId.toString()}
                      >
                        {(provided) => {
                          return (
                            <div
                              className="flex flex-col justify-between p-3 text-[15px] bg-white rounded-md hover:bg-secondary-100 group shadow-b-md shadow-md text-primary-500 font-medium"
                              onClick={async (e) => {
                                await dispatch(
                                  getTaskDetailAction(task.taskId)
                                );
                                dispatch({
                                  type: OPEN_MODAL,
                                  modalContent: <EditTaskFormComponent />,
                                });
                              }}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <span className="flex-1 tablet:hidden">
                                {task.taskName}
                              </span>
                              <span className="flex-1 hidden tablet:block">
                                {task.taskName.length > 8
                                  ? `${task.taskName.slice(0, 8)}...`
                                  : task.taskName}
                              </span>

                              <div className="taskStatus flex justify-between items-center h-3 mt-5">
                                <span
                                  className={`text-[14px] font-medium ${
                                    task.priorityTask?.priority === "High"
                                      ? "text-red-500"
                                      : task.priorityTask?.priority === "Medium"
                                      ? "text-orange-500"
                                      : task.priorityTask?.priority === "Low"
                                      ? "text-cyan-500"
                                      : "text-blue-500"
                                  } `}
                                >
                                  <span className="tablet:hidden">
                                    {task.priorityTask.priority}
                                  </span>
                                  <span className="hidden tablet:block">
                                    <InfoCircleFilled />
                                  </span>
                                </span>
                                <div className="flex mobile:hidden">
                                  {task.assigness.map((member, index) => {
                                    return (
                                      <Avatar
                                        src={member.avatar}
                                        size={"small"}
                                        key={index}
                                      />
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          );
                        }}
                      </Draggable>
                    </li>
                  );
                })}
              </ul>
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
}

export default memo(StatusTaskCardComponent);
