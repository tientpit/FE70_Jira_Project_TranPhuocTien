import React, { memo, useEffect, useLayoutEffect, useState } from "react";
import { Drawer, Button, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_DRAWER } from "../../redux/types/types";

function Modal(props) {
  // const [visible, setVisible] = useState(false);

  const { visible, formContent, title, callBackSubmit } = useSelector(
    (state) => state.drawerReducer
  );

  const dispatch = useDispatch();

  const { resetForm } = useSelector((state) => state.formikReducer);
  const [size, setSize] = useState(window.innerWidth);

  const onClose = () => {
    dispatch({
      type: CLOSE_DRAWER,
    });
    resetForm();
  };

  useEffect(() => {
    window.onload = () => {
      setSize(window.innerWidth);
    };

    window.onresize = () => {
      setSize(window.innerWidth);
    };

    return () => {
      window.removeEventListener("onload");
      window.removeEventListener("onresize");
    };
  }, []);

  let drawerSize = 0;

  if (size < 1280) {
    drawerSize = size;
  } else {
    drawerSize = (size / 5) * 2;
  }

  return (
    <>
      <Drawer
        title={title}
        width={drawerSize}
        onClose={onClose}
        visible={visible}
        footer={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              key="submit"
              htmlType="submit"
              type="primary"
              onClick={() => {
                callBackSubmit();
              }}
            >
              Submit
            </Button>
          </Space>
        }
      >
        {formContent}
      </Drawer>
    </>
  );
}

export default memo(Modal);
