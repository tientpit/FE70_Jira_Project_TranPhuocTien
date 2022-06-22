import {
  ProjectFilled, ProjectOutlined, UserOutlined
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route, useHistory } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import { testTokenAction } from "../../redux/actions/testTokenAction";
import { TOKEN } from "../../util/config";
import {
  SHOW_NOTIFICATION
} from "../../redux/types/types";
import { NOTIFICATION_ICON } from "../../util/constant/configSystem";



export default function HomeTemplate(props) {
  const dispatch = useDispatch();
  const { Component, path } = props;
  const [state, setState] = useState({ collapsed: true });
  const [siderWidth, setSiderWidth] = useState(
    "mobile:w-[50px] mobile:min-w-[50px] mobile:max-w-[50px]"
  );

  const history = useHistory();
  useEffect(() => {
    dispatch(testTokenAction(history));
  }, []);

  const { Sider } = Layout;

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const account = useSelector(
    (rootReducer) => rootReducer.userReducer.userLogin
  );

  const avatar = account.avatar;
  const name = account.name;

  const items = [
    getItem("Project", "project", <ProjectFilled />, [
      getItem("Project Management", ""),
      getItem("Create Project", "/createproject"),
    ]),
    getItem("User", "/user", <UserOutlined />),
    getItem(
      name,
      "Profile",
      <img
        src={avatar}
        className="w-[35px] rounded-full h-[35px] user-image"
      />,
      [getItem("Profile", "/profile"), getItem("Log out", "logOut")]
    ),
  ];

  const onCollapse = (collapsed) => {
    console.log(collapsed);
    if (collapsed) {
      setSiderWidth("mobile:w-[50px] mobile:min-w-[50px] mobile:max-w-[50px]");
    } else {
      setSiderWidth("w-[200px] min-w-[200px] max-w-[200px]");
    }
    setState({
      collapsed,
    });
  };

  const { collapsed } = state;

  return (
    <div>
      <Layout
        style={{
          minHeight: "100vh",
          backgroundColor: "#fff",
          // maxWidth: "100vw",
        }}
        className="pt-8 pl-32 pr-12 mobile:pl-16 mobile:pr-4 mobile:pt-4"
      >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}
          className={`fixed top-0 left-0 h-full z-10 ${siderWidth}`}
        >
          <div className="absolute w-full top-0 left-0">
            <NavLink to={"/"} className="logo flex justify-center py-10">
              <img src={logo} className="w-20 mobile:w-10" />
            </NavLink>
            <Menu
              theme="dark"
              defaultSelectedKeys={[""]}
              mode="inline"
              items={items}
              className="pt-2"
              onClick={(e) => {
                if (e.key === "logOut") {
                  localStorage.removeItem(TOKEN);
                  history.push("/login");
                  dispatch({
                    type: SHOW_NOTIFICATION,
                    value: {
                      message: "Logged out!",
                      description: "",
                      type: NOTIFICATION_ICON.INFO,
                    },
                  });
                } else {
                  history.push(e.key);
                }
              }}
            />
          </div>
        </Sider>
        <Layout className="site-layout bg-white w-full">
          <Route
            exact
            path={path}
            render={(propsRoute) => {
              return (
                <Fragment>
                  <Component exact path={path} {...propsRoute} />
                </Fragment>
              );
            }}
          ></Route>
        </Layout>
      </Layout>
    </div>
  );
}
