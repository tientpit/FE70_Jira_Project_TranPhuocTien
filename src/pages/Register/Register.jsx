import React from "react";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { registerAction } from "../../redux/actions/registerAction";

export default function Register(props) {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      passWord: "",
      name: "",
      phoneNumber: "",
      confirmPassword: "",
    },

    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("Email is required!")
        .email("Email is invalid!"),
      passWord: Yup.string()
        .required("Password is required!")
        .min(6, "Password must have min 6 characters!")
        .max(16, "Password must have max 18 characters!"),
      name: Yup.string()
        .required("Name is required!")
        .matches(/^[A-Za-z0-9 ]*$/, "Please enter valid name"),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("passWord"), null],
        "Password must match!"
      ),
      phoneNumber: Yup.string()
        .matches(
          /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
          "Phone number is not valid!"
        )
        .length(10, "Phone Number must be exactly 10 characters")
        .required("Phone Number is required!"),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(registerAction(values, resetForm));
    },
  });

  const { values, errors, handleChange, handleSubmit } = formik;

  const { email, passWord, name, phoneNumber, confirmPassword } = values;

  return (
    <form
      className="flex flex-col justify-center items-center w-screen/2 h-screen"
      onSubmit={handleSubmit}
    >
      <h3 className="text-4xl m-0 text-secondary-800">Register</h3>
      <input
        type="text"
        className={props.inputStyle}
        placeholder="Name"
        name="name"
        onChange={handleChange}
        value={name}
      />
      {errors.name ? <p className="m-0 text-red-600">{errors.name}</p> : null}
      <input
        className={props.inputStyle}
        placeholder="Phone Number"
        name="phoneNumber"
        onChange={handleChange}
        value={phoneNumber}
      />
      {errors.phoneNumber ? (
        <p className="m-0 text-red-600">{errors.phoneNumber}</p>
      ) : null}

      <input
        type="text"
        className={props.inputStyle}
        placeholder="Email"
        name="email"
        onChange={handleChange}
        value={email}
      />

      {errors.email ? <p className="m-0 text-red-600">{errors.email}</p> : null}

      <input
        type="password"
        className={props.inputStyle}
        placeholder="Password"
        name="passWord"
        onChange={handleChange}
        value={passWord}
      />
      {errors.passWord ? (
        <p className="m-0 text-red-600">{errors.passWord}</p>
      ) : null}

      <input
        type="password"
        className={props.inputStyle}
        placeholder="Confirm Password"
        name="confirmPassword"
        onChange={handleChange}
        value={confirmPassword}
      />
      {errors.confirmPassword ? (
        <p className="m-0 text-red-600">{errors.confirmPassword}</p>
      ) : null}

      <button className={props.buttonStyle} type="submit">
        Register
      </button>
      <p>
        Already have an account?
        <NavLink to={"/login"}>Login here</NavLink>
      </p>
    </form>
  );
}
