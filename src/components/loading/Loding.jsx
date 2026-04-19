import React from "react";
import style from "./loading.module.css";

const Loading = ({ text = "Loading...", fullScreen = true }) => {
  return (
    <div className={`${style.loadingWrapper} ${fullScreen ? "fullscreen" : ""}`}>
      <div className={style.spinner} aria-label="loading" />
      <p className={style.loadingText}>{text}</p>
    </div>
  );
};

export default Loading;
