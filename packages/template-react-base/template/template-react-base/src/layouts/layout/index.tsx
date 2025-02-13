/*
 * @Date: 2025-02-12 09:40:03
 * @Description: description
 */
import history from "@/lib/history";
import React from "react";
import useResize from "@/hooks/useResize";
import { Outlet } from "react-router-dom";
import styles from "./index.module.scss";

function Layout() {
  const { win, screenWidth, screenHeight } = useResize();
  return (
    <section
      style={{
        width: screenWidth,
        height: screenHeight,
        transform: `scale(${win.scale})`,
        top: win.top,
        left: win.left,
      }}
      className={styles.container}
    >
      <button onClick={() => history.push("/home")}>跳转home</button>
      <button onClick={() => history.push("/other")}>跳转other</button>
      <Outlet />
    </section>
  );
}

export default Layout;
