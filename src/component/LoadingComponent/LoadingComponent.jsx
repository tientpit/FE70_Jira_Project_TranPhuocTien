import React from "react";
import { useSelector } from "react-redux";

export default function LoadingComponent() {
  const { loadingStatus } = useSelector((state) => state.loadingReducer);

  if (loadingStatus) {
    return (
      <div className="fixed flex z-10 justify-center items-center w-screen h-screen bg-white/70  ">
        <img
          src={require("../../assets/img/loading.gif")}
          alt="..."
          // width={200}
        />
      </div>
    );
  }
}
