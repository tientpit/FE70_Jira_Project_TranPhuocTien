import React from "react";
import { Route } from "react-router-dom";
import bg from "../../assets/img/bg.png";

export default function LoginTemplate(props) {
  // const onFinish = (values) => {
  //   console.log("Success:", values);
  // };
  // const onFinishFailed = (errorInfo) => {
  //   console.log("Failed:", errorInfo);
  // };
  const { Component, path } = props;

  const inputStyle = "input w-2/5 m-0 my-1 h-10";

  const buttonStyle =
    "bg-secondary-500 w-2/5 mt-5 p-2.5 text-white rounded-md border-2 border-transparent hover:bg-primary-500 duration-300 font-semibold";
  return (
    <Route
      exact
      path={path}
      render={(propsRoute) => {
        return (
          <div className="background flex flex-row h-screen w-screen">
            <div className="h-full basis-3/5 tablet:hidden">
              <img src={bg} alt="" className="object-cover h-full w-full" />
            </div>
            <div className="basis-2/5 w-full tablet:basis-auto">
              <Component
                exact
                path={path}
                inputStyle={inputStyle}
                buttonStyle={buttonStyle}
                {...propsRoute}
              />
            </div>
          </div>
        );
      }}
    ></Route>
  );
}
