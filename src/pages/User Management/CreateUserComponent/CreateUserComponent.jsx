import { Input } from "antd";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { registerAction } from "../../../redux/actions/registerAction";
import { SET_RESET_FORM_FUNCTION, SET_SUBMIT_MODAL_FUNCTION } from "../../../redux/types/types";


export default function CreateUserComponent() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SET_SUBMIT_MODAL_FUNCTION, function: handleSubmit });
    dispatch({ type: SET_RESET_FORM_FUNCTION, function: resetForm });
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      passwordConfirm: "",
      passWord: "",
    },
    onSubmit: (values) => {
      dispatch(registerAction(values, resetForm));
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
  });

  const { values, handleChange, handleSubmit, errors, resetForm } = formik;

  const { email, passWord, name, phoneNumber, passwordConfirm } = values;

  return (
    <form >
      <h3 className="title text-center">Create User</h3>
      <div className="mb-5">
        <label className="label">Name</label>
        <Input name="name" onChange={handleChange} value={name} />
        {errors.name ? (
          <p className="text-red-500 text-xs italic">{errors.name}</p>
        ) : (
          ""
        )}
      </div>
      <div className="mb-5">
        <label className="label">Email</label>
        <Input name="email" onChange={handleChange} value={email} />
        {errors.email ? (
          <p className="text-red-500 text-xs italic">{errors.email}</p>
        ) : (
          ""
        )}
      </div>
      <div className="mb-5">
        <label className="label">Phone Number</label>
        <Input name="phoneNumber" onChange={handleChange} value={phoneNumber} />
        {errors.phoneNumber ? (
          <p className="text-red-500 text-xs italic">{errors.phoneNumber}</p>
        ) : (
          ""
        )}
      </div>
      <div className="mb-5">
        <label className="label">Password</label>
        <Input
          name="passWord"
          type="password"
          onChange={handleChange}
          value={passWord}
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
          value={passwordConfirm}
        />
        {errors.passwordConfirm ? (
          <p className="text-red-500 text-xs italic">
            {errors.passwordConfirm}
          </p>
        ) : (
          ""
        )}
      </div>
    </form>
  );
}
