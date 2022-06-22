import React, { useRef, useState } from "react";
import "./DemoDragDrop.css";

// import { useSpring, animated } from "react-spring";

const defaultValue = [
  { id: 1, taskName: "Task 1" },
  { id: 2, taskName: "Task 2" },
  { id: 3, taskName: "Task 3" },
  { id: 4, taskName: "Task 4" },
  { id: 5, taskName: "Task 5" },
  { id: 6, taskName: "Task 6" },
];

export default function DemoDragDrop(props) {
  const [taskList, setTaskList] = useState(defaultValue);
  const tagDrag = useRef({});
  const tagDragEnter = useRef({});

  //Animation
  //   const [propsSpring, set, stop] = useSpring(() => ({
  //     from: { bottom: -25 },
  //     to: { bottom: 0 },
  //     config: { duration: 250 },
  //     reset: true,
  //   }));

  const handleDragStart = (e, task, index) => {
    console.log("tag", e.target);
    console.log("task", task);
    //lưu lại giá trị của task đang drag
    tagDrag.current = task;
  };

  const handleDragOver = (e) => {
    console.log("targetOver", e.target);
  };

  const handleDragEnter = (e, taskDragEnter, index) => {
    // console.log("dragEnter", e.target);
    // console.log("task", task);
    // console.log("index", index);

    //Lưu lại giá trị của task được kéo ngang qua
    tagDragEnter.current = { ...taskDragEnter };
    let taskListUpdate = [...taskList];

    //Lấy ra index thằng đang kéo
    let indexDragTag = taskListUpdate.findIndex(
      (task) => task.id === tagDrag.current.id
    );

    //Lấy ra index thằng bị kéo qua
    let indexDragEnter = taskListUpdate.findIndex(
      (task) => task.id === taskDragEnter.id
    );

    //Biến chứa giá trị thằng đang kéo
    let temp = taskListUpdate[indexDragTag];

    //Lấy giá trị tại vị trí đang kéo gán bằng thằng kéo qua
    taskListUpdate[indexDragTag] = taskListUpdate[indexDragEnter];
    //Lấy thằng kéo qua gán giá = đang kéo
    taskListUpdate[indexDragEnter] = temp;

    setTaskList(taskListUpdate);
  };

  const handleDragEnd = (e) => {
    // console.log("dragEnd", e.target);
    tagDrag.current = {};
    setTaskList([...taskList]);
  };

  const handleDrop = (e) => {
    console.log("drop", e.target);
  };

  return (
    <div className="container m-auto">
      <div className="text-center text-6xl">Task List</div>
      <div className="grid grid-flow-col auto-cols-auto">
        <div className="col-span-1"></div>
        <div className="bg-gray-700 text-white p-5 col-span-3">
          {taskList.map((task, index) => {
            let cssDragTag = task.id === tagDrag.current.id ? "dragTag" : "";

            // if (task.id === tagDragEnter.current.id) {
            //   return (
            //     <div
            //       style={{
            //         position: "relative",
            //         bottom: propsSpring.bottom.interpolate(
            //           (numBottom) => `${numBottom}px`
            //         ),
            //       }}
            //       className={`bg-cyan-700 text-white text-center m-1 p-3 text-base`}
            //       draggable
            //       onDragStart={(e) => {
            //         handleDragStart(e, task, index);
            //       }}
            //       onDragEnter={(e) => {
            //         handleDragEnter(e, task, index);
            //       }}
            //       onDragEnd={(e) => {
            //         handleDragEnd(e);
            //       }}
            //       key={index}
            //     >
            //       {task.taskName}
            //     </div>
            //   );
            // }
            return (
              <div
                className={`bg-cyan-700 text-white text-center m-1 p-3 text-base ${cssDragTag}`}
                draggable
                onDragStart={(e) => {
                  //kích hoạt khi người dùng bắt đầu kéo thẻ
                  handleDragStart(e, task, index);
                }}
                key={index}
                // onDragOver={(e) => {
                //   //kích hoạt khi thẻ đang được kéo di chuyển trên khu vực thả
                //   //   handleDragOver(e);
                // }}
                onDragEnter={(e) => {
                  //giống với onDragOver nhưng chỉ kích hoạt 1 lần khi kéo vào khu vực thả
                  handleDragEnter(e, task, index);
                }}
                onDragEnd={(e) => {
                  //kích hoạt khi người dùng thả thẻ ra
                  handleDragEnd(e);
                }}
              >
                {task.taskName}
              </div>
            );
          })}
        </div>
        <div
          className="col-span-1 bg-red-300"
          //   onDrop={(e) => {
          //     //kích hoạt khi thả vào khu vực này (lưu ý: phải tắt sự kiện onDragOver thì mới kích hoạt được sự kiện này)
          //     handleDrop(e);
          //   }}
          // onDragOver={(e) => {
          //   //tắt sự kiện onDragOver
          //   e.stopPropagation();
          //   e.preventDefault();
          // }}
        ></div>
      </div>
    </div>
  );
}
