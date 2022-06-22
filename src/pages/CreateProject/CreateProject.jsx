import { Editor } from "@tinymce/tinymce-react";
import { Input, Select } from "antd";
import { useFormik } from "formik";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { createProjectAction } from "../../redux/actions/createProjectAction";
import { getProjectCategoryAction } from "../../redux/actions/getProjectCategoryAction";

const { Option } = Select;

export default function CreateProject(props) {
  const action = getProjectCategoryAction();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(action);
  }, []);

  const { categoryArr } = useSelector((state) => state.projectReducer);

  const editorRef = useRef(null);

  const editorHandleChange = (content, editor) => {
    setValues({ ...values, description: content });
  };

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      projectName: "",
      description: "",
      categoryId: categoryArr[0]?.id,
    },

    onSubmit: (values, { resetForm }) => {
      const action = createProjectAction(values);
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
    setValues,
    setFieldValue,
    // resetForm,
  } = formik;

  return (
    <div className="h-full">
      <h3 className="title">Create Project</h3>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/2 px-3">
            <label className="label" htmlFor="grid-last-name">
              PROJECT NAME <span className="text-red-500">*</span>
            </label>
            <Input
              id="projectName"
              type="text"
              name="projectName"
              onChange={handleChange}
              value={values.projectName}
            />
            {errors.projectName ? (
              <p className="text-red-500 text-xs italic">
                {errors.projectName}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="label" htmlFor="grid-state">
              CATEGORY
            </label>
            <div className="relative">
              <Select
                className={`w-full ${values.categoryId === 1
                  ? "text-[#389e0d]"
                  : values.categoryId === 2
                    ? "text-[#d4380d]"
                    : "text-[#1d39c4]"
                  }
                `}
                id="categoryId"
                name="categoryId"
                onChange={(e) => setFieldValue("categoryId", e)}
                value={values.categoryId}
              >
                {categoryArr?.map((category, index) => {
                  return (
                    <Option
                      value={category.id}
                      key={index}
                      className={`w-full ${category.id === 1
                        ? "text-[#389e0d]"
                        : category.id === 2
                          ? "text-[#d4380d]"
                          : "text-[#1d39c4]"
                        }
                    `}
                    >
                      {category.projectCategoryName}
                    </Option>
                  );
                })}
              </Select>

              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3">
          <div className="w-full px-3">
            <label className="label" htmlFor="grid-last-name">
              DESCRIPTION
            </label>
            <div className="w-full">
              <Editor
                onInit={(evt, editor) => (editorRef.current = editor)}
                onEditorChange={editorHandleChange}
                name="description"
                id="description"
                value={values.description}
                init={{
                  height: 500,
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
        <div className="my-5">
          <button className="btn" type="submit">
            Create project
          </button>
        </div>
      </form>
    </div>
  );
}
