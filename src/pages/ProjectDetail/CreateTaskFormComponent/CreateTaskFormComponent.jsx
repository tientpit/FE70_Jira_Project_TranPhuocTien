import React, { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Editor } from "@tinymce/tinymce-react";
import { BugOutlined, CheckOutlined } from "@ant-design/icons";
import { Avatar, Input, InputNumber, Select, Slider } from "antd";
import { createTaskAction } from "../../../redux/actions/createTaskAction";
import { SET_SUBMIT_DRAWER_FUNCTION } from "../../../redux/types/types";

const { Option } = Select;

function CreateTaskFormComponent(props) {
  console.log("CreateTask render");

  const dispatch = useDispatch();
  const { projectDetail } = useSelector((state) => state.projectReducer);
  const { taskStatus, taskType, priority } = useSelector(
    (state) => state.taskReducer
  );

  // const { visible } = useSelector((state) => state.drawerReducer);

  const [timeTracking, setTimeTracking] = useState({
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
  });

  useEffect(() => {
    dispatch({
      type: SET_SUBMIT_DRAWER_FUNCTION,
      function: handleSubmit,
    });
    dispatch({ type: "SET_RESET_FORM_FUNCTION", function: resetForm });
  }, []);

  // useEffect(() => {
  //   resetForm();
  // }, [visible]);

  const formik = useFormik({
    initialValues: {
      listUserAsign: [],
      taskName: "",
      description: "",
      statusId: taskStatus[0]?.statusId,
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      projectId: projectDetail?.id,
      typeId: taskType[0]?.id,
      priorityId: priority[0]?.priorityId,
    },

    onSubmit: (values, { resetForm }) => {
      console.log(values);
      dispatch(createTaskAction(values));
      resetForm();
    },

    validationSchema: Yup.object().shape({
      taskName: Yup.string().required("Task name is required!"),
      originalEstimate: Yup.number()
        .required("Original Estimate is required!")
        .min(0, "Estimate must be greater than or equal to 0")
        .nullable(),
    }),
  });

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    setValues,
    setFieldValue,
    resetForm,
  } = formik;

  let {
    listUserAsign,
    taskName,
    description,
    statusId,
    originalEstimate,
    timeTrackingSpent,
    timeTrackingRemaining,
    projectId,
    typeId,
    priorityId,
  } = values;

  const editorRef = useRef(null);

  const editorHandleChange = (content, editor) => {
    setValues({ ...values, description: content });
  };

  const userOptions = projectDetail.members?.map((user, index) => {
    return { label: user.name, value: user.userId };
  });

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-1 -mx-3 mb-2">
        <div className="w-full px-3">
          <label
            className="label"
            htmlFor="grid-last-name"
          >
            TASK NAME <span className="text-red-500">*</span>
          </label>
          <Input name="taskName" onChange={handleChange} value={taskName} />
          {errors.taskName ? (
            <p className="text-red-500 text-xs italic">{errors.taskName}</p>
          ) : (
            ""
          )}
        </div>
        <div className="w-full px-3">
          <label
            className="label"
            htmlFor="grid-state"
          >
            TASK STATUS
          </label>
          <div className="relative">
            <Select
              id="statusId"
              name="statusId"
              onChange={(option) => setFieldValue("statusId", option)}
              value={statusId}
              style={{
                width: "100%",
              }}
            >
              {taskStatus.map((status, index) => {
                return (
                  <Option value={status.statusId} key={index}>
                    {status.statusName}
                  </Option>
                );
              })}
            </Select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1 -mx-3 mb-2">
        <div className="w-full px-3">
          <label
            className="label"
            htmlFor="grid-state"
          >
            Task type
          </label>
          <div className="relative">
            <Select
              id="typeId"
              name="typeId"
              value={typeId}
              onChange={(option) => setFieldValue("typeId", option)}
              style={{
                width: "100%",
              }}
            >
              {taskType?.map((type, index) => {
                return (
                  <Option value={type.id} key={index}>
                    <p className="flex items-center m-0">
                      {type.taskType === "bug" ? (
                        <BugOutlined className="bg-red-500 mr-2 text-white p-1 rounded-full" />
                      ) : (
                        <CheckOutlined className="bg-blue-500 mr-2 text-white p-1 rounded-full" />
                      )}
                      {type.taskType}
                    </p>
                  </Option>
                );
              })}
            </Select>
          </div>
        </div>
        <div className="w-full px-3">
          <label
            className="label"
            htmlFor="grid-last-name"
          >
            Priority
          </label>
          <div className="relative">
            <Select
              id="priorityId"
              name="priorityId"
              onChange={(option) => setFieldValue("priorityId", option)}
              value={priorityId}
              style={{
                width: "100%",
              }}
              className={` ${priorityId == 1
                ? "text-red-500"
                : priorityId == 2
                  ? "text-orange-400"
                  : priorityId == 3
                    ? "text-emerald-500"
                    : "text-blue-500"
                }`}
            >
              {priority.map((priority, index) => {
                return (
                  <Option
                    key={index}
                    value={priority.priorityId}
                    className={
                      priority.priorityId == 1
                        ? "text-red-500"
                        : priority.priorityId == 2
                          ? "text-orange-500"
                          : priority.priorityId == 3
                            ? "text-emerald-500"
                            : "text-blue-500"
                    }
                  >
                    {priority.priority}
                  </Option>
                );
              })}
            </Select>
          </div>
        </div>
      </div>
      <div className="-mx-3 mb-2 grid grid-cols-2">
        <div className="w-full px-3">
          <label
            className="label"
            htmlFor="grid-last-name"
          >
            Assigness
          </label>
          <Select
            mode="multiple"
            allowClear
            style={{
              width: "100%",
            }}
            placeholder="Member"
            onChange={(option) => {
              setFieldValue("listUserAsign", option);
              console.log(option);
            }}
            optionFilterProp="label"
            name="listUserAsign"
            options={userOptions}
            value={listUserAsign}
          >
            {projectDetail.members?.map((user, index) => {
              return (
                <Option value={user.userId} key={index}>
                  <Avatar src={user.avatar} className="mr-3" size={18} />
                  {user.name}
                </Option>
              );
            })}
          </Select>
          {errors.listUserAsign ? (
            <p className="text-red-500 text-xs italic">
              {errors.listUserAsign}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="w-full px-3">
          <label
            className="label"
            htmlFor="grid-last-name"
          >
            Original Estimate <span className="text-red-500">*</span>
          </label>
          <InputNumber
            className="w-full"
            id="originalEstimate"
            name="originalEstimate"
            onChange={(e) => {
              setFieldValue("originalEstimate", e);
            }}
            type="number"
            value={originalEstimate}
            min={0}
          />
          {errors.originalEstimate ? (
            <p className="text-red-500 text-xs italic">
              {errors.originalEstimate}
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-2">
        <div className="w-full px-3">
          <label
            className="label"
            htmlFor="grid-last-name"
          >
            Time Tracking
          </label>
          <Slider
            value={timeTracking.timeTrackingSpent}
            max={
              Number(timeTracking.timeTrackingSpent) +
              Number(timeTracking.timeTrackingRemaining)
            }
            tooltipPlacement="right"
          // onChange={(e) => {
          //   setTimeTracking({ ...timeTracking, timeTrackingSpent: e });
          // }}
          />
          <div className="grid grid-cols-2 mb-2">
            <span className="text-green-500 font-bold">
              {timeTracking.timeTrackingSpent}h logged
            </span>
            <span className="text-right text-red-500 font-bold">
              {timeTracking.timeTrackingRemaining}h remaining
            </span>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <div>
              <label className="label">
                Time spent (hours)
              </label>
              <InputNumber
                className="w-full"
                name="timeTrackingSpent"
                min={0}
                defaultValue={0}
                type="number"
                value={timeTrackingSpent}
                onChange={(option) => {
                  setFieldValue("timeTrackingSpent", option);
                  console.log(option);
                  setTimeTracking({
                    ...timeTracking,
                    timeTrackingSpent: option,
                  });
                }}
              />
            </div>
            <div>
              <label className="label">
                Time remaining (hours)
              </label>
              <InputNumber
                className="w-full"
                name="timeTrackingRemaining"
                min={0}
                value={timeTrackingRemaining}
                defaultValue={0}
                type="number"
                onChange={(option) => {
                  setFieldValue("timeTrackingRemaining", option);
                  setTimeTracking({
                    ...timeTracking,
                    timeTrackingRemaining: option,
                  });
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="h-full -mx-3">
        <div className="w-full px-3">
          <label
            className="label"
            htmlFor="grid-last-name"
          >
            DESCRIPTION
          </label>
          <Editor
            onInit={(evt, editor) => (editorRef.current = editor)}
            onEditorChange={editorHandleChange}
            name="description"
            value={description}
            id="description"
            init={{
              height: 350,
              menubar: false,
              plugins: [
                "a11ychecker",
                "advlist",
                "advcode",
                "advtable",
                "autolink",
                "checklist",
                "export",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "powerpaste",
                "fullscreen",
                "formatpainter",
                "insertdatetime",
                "media",
                "table",
                "help",
                "wordcount",
                "onEditorChange",
              ],
              toolbar:
                "undo redo | casechange blocks | bold italic backcolor | " +
                "alignleft aligncenter alignright alignjustify | " +
                "bullist numlist checklist outdent indent | removeformat | a11ycheck code table help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        </div>
      </div>
    </form>
  );
}

export default memo(CreateTaskFormComponent);
