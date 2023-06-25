import React from "react";

export default function Button({
  onclick = () => {},
  width = "100%",
  children = "Tweet",
  style,
  disabled = false,
  type = "submit",
}) {
  return (
    <button
      type={type}
      className={`btn-primary`}
      onClick={onclick}
      style={style}
      disabled={disabled}
    >
      {children}

      <style jsx>{`
        .btn-primary {
          color: white;
          background-color: var(--primary-color);
           {
            /* background-image: url("/images/design/mesh1.png");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background: repeating-linear-gradient(
            180deg,
            #000077 0%,
            #ff0055 100%
          ); */
          }
          border-radius: 100000px;
          border: none;
          width: ${width};
          padding-block: 1rem;
          font-size: 1rem;
          font-weight: 700;
        }

        .btn-primary:hover {
          background-color: var(--hover-bg-color);
        }

        .btn-primary:disabled {
          background-color: var(--hover-primary-trans-color);
        }
      `}</style>
    </button>
  );
}
