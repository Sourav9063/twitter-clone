import React from "react";
import ThemeToggle from "../common/ThemeToggle";
import Loader from "../common/loader/Loader";
import style from "./PageLoading.module.css";
export default function PageLoading() {
  return (
    <main className={style.loadingBody}>
      <div>
        <div className={style.dis}>
          <ThemeToggle />
        </div>
        <Loader size={75} />
      </div>
    </main>
  );
}
