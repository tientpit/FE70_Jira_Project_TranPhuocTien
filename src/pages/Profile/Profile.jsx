import { Input } from "antd";
import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { editUserAction } from "../../redux/actions/editUserAction";

export default function Profile() {
  const dispatch = useDispatch();

  const { userLogin } = useSelector((state) => state.userReducer);
  const { id, avatar, email, name, phoneNumber } = userLogin;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: id,
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      passWord: "",
      passwordConfirm: "",
    },

    validationSchema: Yup.object().shape({
      name: Yup.string()
        .required("Name is required!")
        .matches(/^[A-Za-z0-9 ]*$/, "Please enter valid name"),
      email: Yup.string()
        .required("Email is required!")
        .email("Email is invalid!"),
      phoneNumber: Yup.string()
        .matches(
          /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
          "Phone number is not valid!"
        )
        .length(10, "Phone Number must be exactly 10 characters")
        .required("Phone Number is required!"),
      passWord: Yup.string()
        .required("Password is required!")
        .min(6, "Password must have min 6 characters!")
        .max(16, "Password must have max 18 characters!"),
      passwordConfirm: Yup.string()
        .required("Re-password is required!")
        .oneOf([Yup.ref("passWord"), null], "Password must match!"),
    }),

    onSubmit: (values) => {
      dispatch(editUserAction(values));
    },
  });

  const { values, handleChange, handleSubmit, errors, resetForm } = formik;

  return (
    <div className="w-full">
      <h3 className="title">Profile</h3>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex mb-5 items-center tablet:flex-col">
          <div className="flex justify-center items-center w-1/3 tablet:w-full tablet:mb-5 ">
            <img src={avatar} width="70%" className="rounded-md" />
          </div>
          <div className="w-2/3 tablet:w-full">
            <div className="">
              <div className="mb-5">
                <label className="label">NAME</label>
                <Input
                  onChange={handleChange}
                  value={values.name}
                  name="name"
                />
                {errors.name ? (
                  <p className="text-red-500 text-xs italic">{errors.name}</p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="mb-5">
              <label className="label">Email</label>
              <Input
                onChange={handleChange}
                value={values.email}
                name="email"
              />
              {errors.email ? (
                <p className="text-red-500 text-xs italic">{errors.email}</p>
              ) : (
                ""
              )}
            </div>
            <div className="mb-5">
              <label className="label">Phone</label>
              <Input
                onChange={handleChange}
                value={values.phoneNumber}
                name="phoneNumber"
              />
              {errors.phoneNumber ? (
                <p className="text-red-500 text-xs italic">
                  {errors.phoneNumber}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="mb-5">
              <label className="label">Password</label>
              <Input
                type="password"
                name="passWord"
                onChange={handleChange}
                value={values.passWord}
              />
              {errors.passWord ? (
                <p className="text-red-500 text-xs italic">{errors.passWord}</p>
              ) : (
                ""
              )}
            </div>
            <div>
              <label className="label">Re-password</label>
              <Input
                name="passwordConfirm"
                type="password"
                onChange={handleChange}
                value={values.passwordConfirm}
              />

              {errors.passwordConfirm ? (
                <p className="text-red-500 text-xs italic">
                  {errors.passwordConfirm}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="flex-row-reverse flex">
          <button
            className="rounded-md px-5 py-2 bg-[#002140] hover:bg-[#1890ff] text-white transition-all duration-200"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
