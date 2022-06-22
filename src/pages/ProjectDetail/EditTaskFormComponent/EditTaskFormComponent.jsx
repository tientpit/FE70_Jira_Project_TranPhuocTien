import { BugOutlined, CheckOutlined } from "@ant-design/icons";
import { Editor } from "@tinymce/tinymce-react";
import { Avatar, InputNumber, Select, Slider } from "antd";
import { useFormik } from "formik";
import React, { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import DeleteButtonComponent from "../../../component/DeleteButtonComponent/DeleteButtonComponent";
import { removeTaskAction } from "../../../redux/actions/removeTaskAction";
import { updateTaskAction } from "../../../redux/actions/updateTaskAction";
import {
  SET_RESET_FORM_FUNCTION,
  SET_SUBMIT_MODAL_FUNCTION,
} from "../../../redux/types/types";
import CommentComponent from "../CommentComponent/CommentComponent";

const { Option } = Select;

function EditTaskFormComponent(props) {
  const editorRef = useRef(null);
  const dispatch = useDispatch();

  const { taskDetail } = useSelector((state) => state.taskReducer);
  const [visibleEditor, setVisibleEditor] = useState(false);
  const { taskStatus, taskType, priority } = useSelector(
    (state) => state.taskReducer
  );
  const { projectDetail } = useSelector((state) => state.projectReducer);

  useEffect(() => {
    dispatch({ type: SET_SUBMIT_MODAL_FUNCTION, function: handleSubmit });
    dispatch({ type: SET_RESET_FORM_FUNCTION, function: resetForm });
  }, []);

  const listUserId = taskDetail.assigness?.map((user) => {
    return user.id;
  });

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      listUserAsign: listUserId,
      taskName: taskDetail.taskName,
      description: taskDetail.description,
      statusId: taskDetail.statusId,
      originalEstimate: taskDetail.originalEstimate,
      timeTrackingSpent: taskDetail.timeTrackingSpent,
      timeTrackingRemaining: taskDetail.timeTrackingRemaining,
      projectId: taskDetail.projectId,
      typeId: taskDetail?.typeId,
      priorityId: taskDetail.priorityTask?.priorityId,
      taskId: taskDetail.taskId,
    },
    onSubmit: (values) => {
      console.log("value", values);
      dispatch(updateTaskAction(values));
    },

    validationSchema: Yup.object().shape({
      originalEstimate: Yup.number()
        .required("Original Estimate is required!")
        .min(0, "Estimate must be greater than or equal to 0")
        .nullable(),
    }),
  });

  const {
    values,
    setValues,
    handleChange,
    setFieldValue,
    handleSubmit,
    resetForm,
    errors,
    setErrors,
    setSubmitting,
  } = formik;

  const {
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
    taskId,
    contentComment,
  } = values;

  const renderDescription = () => {
    const htmlString = description;
    const parse = require("html-react-parser");
    return (
      <div className="w-full h-full ">
        {visibleEditor ? (
          <div className="w-full">
            <Editor
              onInit={(evt, editor) => (editorRef.current = editor)}
              onEditorChange={editorHandleChange}
              value={description}
              name="description"
              id="description"
              className="w-full"
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
            <button
              className="mt-4 px-3 py-1 rounded-[3px] bg-[#0052cc] text-white font-medium text-[14.5px]"
              onClick={() => {
                setVisibleEditor(false);
              }}
            >
              Save
            </button>
          </div>
        ) : (
          // <div
          //   dangerouslySetInnerHTML={{ __html: htmlString }}
          //   onClick={() => {
          //     setVisibleEditor(true);
          //   }}
          //   className="w-full h-full"
          //   value={description}
          // />
          <div
            onClick={() => {
              setVisibleEditor(true);
            }}
            className="w-full h-full border-2 rounded-md border-transparent hover:border-primary-400 duration-300 cursor-pointer"
            value={description}
          >
            {parse(htmlString)}
          </div>
        )}
      </div>
    );
  };

  const editorHandleChange = (content, editor) => {
    setFieldValue("description", content);
  };

  const userOptions = projectDetail.members?.map((user, index) => {
    return { value: user.userId, label: user.name };
  });

  const children = projectDetail.members?.map((user, index) => {
    return (
      <Option value={user.userId} key={index}>
        <Avatar src={user.avatar} className="mr-3" size={18} />
        {user.name}
      </Option>
    );
  });

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex w-full">
        <Select
          bordered={false}
          value={typeId}
          className="text-[13px] w-[120px]"
          optionFilterProp="label"
          onChange={(option) => setFieldValue("typeId", option)}
          name="typeId"
        >
          {taskType.map((type, index) => {
            return (
              <Option value={type.id} label="bug" key={index}>
                <div className="flex items-center">
                  {type.id === 1 ? (
                    <BugOutlined className="bg-red-500 mr-2 text-white p-1 rounded-full" />
                  ) : (
                    <CheckOutlined className="bg-cyan-500 mr-2 text-white p-1 rounded-full" />
                  )}

                  <span>{type.taskType}</span>
                </div>
              </Option>
            );
          })}
        </Select>
        <div className="w-full px-3 text-right pr-10 relative flex flex-row-reverse">
          <DeleteButtonComponent
            title="Are you sure to delete this task?"
            onConfirm={() => {
              dispatch(removeTaskAction(taskId, projectId));
            }}
          />
        </div>
      </div>
      <div className="h-full w-full flex flex-wrap mobile:flex-col justify-between">
        <div className="w-2/3 px-3 h-full tablet:w-1/2 mobile:w-full mobile:mb-10">
          {/* left */}
          <h3
            className="text-2xl font-medium rounded-md pl-3 text-secondary-800"
            id="taskName"
            type="text"
            name="taskName"
          >
            {taskName}
          </h3>
          <div className="w-full px-3 h-96">
            <label className="label">Description</label>
            {renderDescription()}
          </div>
        </div>
        <div className="w-1/3 pl-5  tablet:w-1/2 mobile:w-full">
          {/* right */}
          <div className="mb-5">
            <label className="label">STATUS</label>
            <Select
              style={{ width: "100%" }}
              value={statusId}
              className="text-[13px]"
              name="statusId"
              onChange={(option) => {
                setFieldValue("statusId", option);
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
          <div className="mb-5">
            <label className="label">ASSIGNESS</label>
            <Select
              mode="multiple"
              allowClear
              style={{
                width: "100%",
              }}
              placeholder="Add member"
              className="text-[13px]"
              optionFilterProp="label"
              onChange={(option) => {
                setFieldValue("listUserAsign", option);
              }}
              value={listUserAsign}
              options={userOptions}
              name="listUserAsign"
            >
              {children}
            </Select>
            {errors.listUserAsign ? (
              <p className="text-red-500 text-xs italic">
                {errors.listUserAsign}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="mb-5">
            <label className="label">PRIORITY</label>
            <Select
              style={{ width: "100%" }}
              value={priorityId}
              className={` ${priorityId == 1
                  ? "text-red-500"
                  : priorityId == 2
                    ? "text-orange-400"
                    : priorityId == 3
                      ? "text-cyan-500"
                      : "text-blue-500"
                }`}
              onChange={(option) => {
                setFieldValue("priorityId", option);
              }}
              name="priorityId"
            >
              {priority.map((priority, index) => {
                return (
                  <Option
                    value={priority.priorityId}
                    key={index}
                    className={
                      priority.priorityId == 1
                        ? "text-red-500"
                        : priority.priorityId == 2
                          ? "text-orange-500"
                          : priority.priorityId == 3
                            ? "text-cyan-500"
                            : "text-blue-500"
                    }
                  >
                    {priority.priority}
                  </Option>
                );
              })}
            </Select>
          </div>
          <div className="mb-5">
            <label className="label">
              ORIGINAL ESTIMATE (HOURS) <span className="text-red-500">*</span>
            </label>
            <InputNumber
              className="w-full"
              name="originalEstimate"
              value={originalEstimate}
              onChange={(e) => {
                setFieldValue("originalEstimate", e);
              }}
              type="number"
              min={0}
            />
            {errors.originalEstimate && (
              <p className="text-red-500 text-xs italic">
                {errors.originalEstimate}
              </p>
            )}
          </div>
          <div className="mb-5">
            <label className="label">TIME TRACKING</label>
            <Slider
              value={timeTrackingSpent}
              max={timeTrackingSpent + timeTrackingRemaining}
              tooltipPlacement="right"
            />
            <div className="grid grid-cols-2 mb-2">
              <span className="text-green-500 font-bold">
                {timeTrackingSpent}h logged
              </span>
              <span className="text-right text-red-500 font-bold">
                {timeTrackingRemaining}h remaining
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1">
              <div>
                <span className="font-medium text-xs">Time spent</span>
                <InputNumber
                  className="w-full"
                  name="timeTrackingSpent"
                  min={0}
                  value={timeTrackingSpent}
                  type="number"
                  onChange={(option) => {
                    setFieldValue("timeTrackingSpent", option);
                  }}
                />
              </div>
              <div>
                <label className="font-medium text-xs">Time remaining</label>
                <InputNumber
                  className="w-full"
                  name="timeTrackingRemaining"
                  min={0}
                  value={timeTrackingRemaining}
                  type="number"
                  onChange={(option) => {
                    setFieldValue("timeTrackingRemaining", option);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <label className={`$"label" mb-2`}>Comments</label>
        <CommentComponent taskId={taskId} />
      </div>
    </form>
  );
}

export default memo(EditTaskFormComponent);
