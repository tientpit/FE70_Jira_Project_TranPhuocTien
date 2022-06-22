import { Avatar, Button, Popconfirm } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useFormik } from "formik";
import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { deleteCommentAction } from "../../../redux/actions/deleteCommentAction";
import { getAllCommentAction } from "../../../redux/actions/getAllCommentAction";
import { insertCommentAction } from "../../../redux/actions/insertCommentAction";

function CommentComponent(props) {
  const { taskId } = props;
  const { userLogin } = useSelector((state) => state.userReducer);
  const { lstComment } = useSelector((state) => state.commentReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCommentAction(taskId));
  }, [taskId]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      contentComment: "",
      taskId,
    },
    onSubmit: (values, { resetForm }) => {
      dispatch(insertCommentAction(values));
      resetForm();
    },
    validationSchema: Yup.object().shape({
      contentComment: Yup.string().required(),
    }),
  });

  return (
    <div>
      <div className="flex justify-between">
        <div className="mr-2 mt-2">
          <Avatar src={userLogin.avatar} />
        </div>
        <div className="w-full">
          <TextArea
            placeholder="Add a comment..."

            name="contentComment"
            value={formik.values.contentComment}
            onChange={formik.handleChange}
          />
        </div>
        <div className="ml-2">
          <Button type="button" onClick={formik.handleSubmit}>
            Send
          </Button>
        </div>
      </div >
      <li>
        {lstComment?.map((comment, index) => {
          return (
            <ul className="mt-5" key={index}>
              <div className="info flex">
                <div className="mr-2">
                  <Avatar src={comment.user.avatar} />
                </div>
                <div>
                  <span className="font-semibold text-[15px] pr-[12px]">
                    {comment.user.name}
                  </span>
                </div>
              </div>
              <div className="comment-content pl-[40px] ">
                <p className="text-[15px] ">{comment.contentComment}</p>
                <button
                  className="text-[14.5px] mr-2 text-[#5e6c84] font-medium hover:underline"
                  type="button"
                >
                  Edit
                </button>
                <Popconfirm
                  title="Are you sure to delete this comment?"
                  onConfirm={() => {
                    dispatch(deleteCommentAction(comment.id, taskId));
                  }}
                  okText="Yes"
                  cancelText="No"
                >
                  <button
                    className="text-[14.5px] text-[#5e6c84] font-medium hover:underline"
                    type="button"
                  >
                    Delete
                  </button>
                </Popconfirm>
              </div>
            </ul>
          );
        })}
      </li>
    </div >
  );
}

export default memo(CommentComponent);
