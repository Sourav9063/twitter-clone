import React, { useEffect, useState } from "react";
export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  const toggle = (html) => {
    if (isDark) {
      html.classList.remove("dark");
      html.classList.add("light");
      localStorage.setItem("isDark", false);
      setIsDark(false);
    } else {
      html.classList.add("dark");
      html.classList.remove("light");
      localStorage.setItem("isDark", true);
      setIsDark(true);
    }
  };
  const onClick = (e) => {
    const html = document.querySelector("html");
    toggle(html);
  };
  useEffect(() => {
    const html = document.querySelector("html");
    const saved = localStorage.getItem("isDark");

    if (saved == null) {
      setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
    } else if (saved == "true") {
      setIsDark(true);
      html.classList.add("dark");
      html.classList.remove("light");
    } else {
      setIsDark(false);
      html.classList.remove("dark");
      html.classList.add("light");
    }
    return () => {};
  }, []);

  return (
    <div
      onClick={(e) => {
        onClick(e);
      }}
    >
      {isDark ? (
        <img src="/svg/sun.svg" alt="" />
      ) : (
        <img src="/svg/moon.svg" alt="" />
      )}

      <div className="text"> {isDark ? "Light" : "Dark"}</div>
      <style jsx>{`
        img {
          width: 2rem;
          margin-right: 1rem;
        }
        @media only screen and (max-width: 850px) {
          img {
            margin-right: 0px;
          }
          .text {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
