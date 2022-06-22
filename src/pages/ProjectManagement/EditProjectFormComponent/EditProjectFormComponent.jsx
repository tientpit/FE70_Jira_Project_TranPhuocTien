import { Editor } from "@tinymce/tinymce-react";
import { Input, Select } from "antd";
import { useFormik } from "formik";
import React, { memo, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { getProjectCategoryAction } from "../../../redux/actions/getProjectCategoryAction";
import { updateProjectAction } from "../../../redux/actions/updateProjectAction";
import { SET_RESET_FORM_FUNCTION, SET_SUBMIT_DRAWER_FUNCTION } from "../../../redux/types/types";


const { Option } = Select;

function EditProjectFormComponent(props) {
  const dispatch = useDispatch();

  const { categoryArr, projectDetail } = useSelector(
    (state) => state.projectReducer
  );

  useEffect(() => {
    dispatch(getProjectCategoryAction());
    dispatch({
      type: SET_SUBMIT_DRAWER_FUNCTION,
      function: handleSubmit,
    });
    dispatch({ type: SET_RESET_FORM_FUNCTION, function: resetForm });
  }, []);

  const editorRef = useRef(null);
  const editorHandleChange = (content, editor) => {
    setFieldValue("description", content);
  };

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      id: projectDetail.id,
      projectName: projectDetail.projectName,
      categoryId: projectDetail.projectCategory?.id,
      description: projectDetail.description,
    },

    onSubmit: (values, { resetForm }) => {
      console.log(values);
      const action = updateProjectAction(values);
      dispatch(action);
      resetForm();
    },

    validationSchema: Yup.object().shape({
      projectName: Yup.string().required("Project name is required!"),
    }),
  });

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    resetForm,
    setFieldValue,
  } = formik;

  let { id, projectName, categoryId, description } = values;

  return (
    <form className="w-full h-full" onSubmit={handleSubmit}>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="label" htmlFor="id">
            PROJECT ID
          </label>
          <Input
            className=""
            id="id"
            type="text"
            value={id}
            onChange={handleChange}
            disabled
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-2">
        <div className="w-1/2 px-3">
          <label className="label" htmlFor="grid-last-name">
            PROJECT NAME <span className="text-red-500">*</span>
          </label>
          <Input
            id="projectName"
            type="text"
            value={projectName}
            onChange={handleChange}
            name="projectName"
          />
          {errors.projectName ? (
            <p className="text-red-500 text-xs italic">{errors.projectName}</p>
          ) : (
            ""
          )}
        </div>
        <div className="w-1/2 px-3 mb-6">
          <label className="label" htmlFor="grid-state">
            CATEGORY
          </label>
          <div className="relative">
            <Select
              className={`w-full text-[${categoryId == 1
                ? "#389e0d"
                : categoryId == 2
                  ? "#d4380d"
                  : "#1d39c4"
                }]`}
              id="categoryId"
              value={categoryId}
              onChange={(option) => setFieldValue("categoryId", option)}
              name="categoryId"
            >
              {categoryArr?.map((category, index) => {
                return (
                  <Option
                    value={category.id}
                    key={index}
                    className={`text-[${category.id == 1
                      ? "#389e0d"
                      : category.id == 2
                        ? "#d4380d"
                        : "#1d39c4"
                      }]
                      
                    `}
                  >
                    {category.projectCategoryName}
                  </Option>
                );
              })}
            </Select>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 h-1/2">
        <div className="w-full px-3 h-full">
          <label className="label" htmlFor="grid-last-name">
            DESCRIPTION
          </label>
          <div className="w-full">
            <Editor
              onInit={(evt, editor) => (editorRef.current = editor)}
              onEditorChange={editorHandleChange}
              value={description}
              name="description"
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
      </div>
    </form>
  );
}

export default memo(EditProjectFormComponent);
