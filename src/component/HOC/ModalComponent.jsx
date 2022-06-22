import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_MODAL } from "../../redux/types/types";

const ModalComponent = () => {
  //   const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();

  const { isModalVisible, modalContent } = useSelector(
    (state) => state.modalReducer
  );

  const { callBackSubmit } = useSelector((state) => state.modalReducer);
  const { resetForm } = useSelector((state) => state.formikReducer);

  const handleOk = () => {
    callBackSubmit();
  };

  const handleCancel = () => {
    dispatch({ type: CLOSE_MODAL });
    resetForm();
  };

  return (
    <>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={"null"}
        bodyStyle={{
          padding: "1.25rem",
          // paddingTop: "10px",
        }}
        centered
        transitionName=""
        className="w-2/3 tablet:w-11/12 mobile:w-full rounded-lg overflow-hidden"
      >
        {modalContent}
      </Modal>
    </>
  );
};

export default ModalComponent;
