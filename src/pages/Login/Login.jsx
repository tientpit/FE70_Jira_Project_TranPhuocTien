import React, { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { loginAction } from "../../redux/actions/loginAction";
import { useFormik, withFormik } from "formik";
import { connect, useDispatch } from "react-redux";
import * as Yup from "yup";
import { testTokenAction } from "../../redux/actions/testTokenAction";

export default function Login(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(testTokenAction(history, true));
  }, []);

  const formik = useFormik({
    initialValues: { email: "", password: "" },

    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("Email is required!")
        .email("Email is invalid!"),
      password: Yup.string()
        .required("Password is required!")
        .min(6, "Password must have min 6 characters!")
        .max(16, "Password must have max 18 characters!"),
    }),

    onSubmit: (values) => {
      const action = loginAction(values, props);
      dispatch(action);
    },
  });

  const { values, errors, handleChange, handleSubmit } = formik;

  const { email, password } = values;

  return (
    <form
      className="flex flex-col justify-center items-center w-screen/2 h-screen"
      onSubmit={handleSubmit}
    >
      <h3 className="text-4xl mb-10 text-secondary-800">Login</h3>
      <input
        type="text"
        className={props.inputStyle}
        placeholder="Email"
        onChange={handleChange}
        id="email"
        name="email"
        value={email}
      />
      {errors.email ? <p className="text-red-500">{errors.email}</p> : ""}
      <input
        type="password"
        className={props.inputStyle}
        placeholder="Password"
        onChange={handleChange}
        id="password"
        name="password"
        value={password}
      />
      {errors.password ? (
        <p className="text-red-500 p-0 m-0">{errors.password}</p>
      ) : (
        ""
      )}

      <button className={props.buttonStyle} type="submit">
        Login
      </button>
      <p>
        Don't have an account yet?{" "}
        <NavLink to={"/register"}>Register now</NavLink>
      </p>
      <div className="social mt-2">
        <button
          className="rounded-full bg-[#3b5998] text-white h-10 w-10 mr-4"
          type="button"
        >
          <i className="fab fa-facebook-f"></i>
        </button>
        <button
          className="rounded-full bg-[#1890ff] text-white h-10 w-10"
          type="button"
        >
          <i className="fab fa-twitter"></i>
        </button>
      </div>
    </form>
  );
}
