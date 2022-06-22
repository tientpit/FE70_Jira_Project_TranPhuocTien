import React, { useState } from "react";
import _ from "lodash";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function BeautifylDnD() {
  const [state, setState] = useState({
    toDo: {
      id: "toDo",
      items: [
        { id: "1", taskName: "Task 1" },
        { id: "2", taskName: "Task 2" },
        { id: "3", taskName: "Task 3" },
      ],
    },
    inProcess: {
      id: "inProcess",
      items: [
        { id: "4", taskName: "Task 4" },
        { id: "5", taskName: "Task 5" },
        { id: "6", taskName: "Task 6" },
      ],
    },
    done: {
      id: "done",
      items: [
        { id: "7", taskName: "Task 7" },
        { id: "8", taskName: "Task 8" },
        { id: "9", taskName: "Task 9" },
      ],
    },
  });

  const handleDragEnd = (result) => {
    let { destination, source } = result;
    if (!destination) {
      return;
    }
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }
    //Tạo ra 1 tag drag
    let itemCopy = { ...state[source.droppableId].items[source.index] };
    console.log(itemCopy);

    //Droppable bắt đầu kéo
    let dropSource = state[source.droppableId].items.splice(source.index, 1);

    console.log(dropSource);

    //Droppable thả vào
    let dropDestination = state[destination.droppableId].items;

    dropDestination.splice(destination.index, 0, itemCopy);

    console.log(dropDestination);

    setState(state);

    console.log("form", source);
    console.log("to", destination);
  };

  return (
    <div className="container mx-auto">
      <h3 className="text-center text-7xl">Demo DragAndDrop DND</h3>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-1"></div>
          {_.map(state, (statusTask, index) => {
            return (
              <Droppable droppableId={statusTask.id} key={index}>
                {(provided) => {
                  return (
                    <div className="col-span-1">
                      <div
                        className="bg-gray-700 p-5"
                        key={index}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        <h3 className="text-white text-center text-2xl">
                          {statusTask.id}
                        </h3>
                        {statusTask.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              index={index}
                              draggableId={item.id}
                            >
                              {(provided) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="mt-2 p-3 bg-white text-center"
                                  >
                                    {item.taskName}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    </div>
                  );
                }}
              </Droppable>
            );
          })}
          <div className="col-span-1"></div>
        </div>
      </DragDropContext>
    </div>
  );
}
