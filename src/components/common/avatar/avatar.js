import React from "react";

export default function Avatar({ image, width = "70px" }) {
  return (
    <>
      <div className="img"></div>
      <style jsx>{`
        .img {
          width: ${width};
          aspect-ratio: 1;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          border: 1px var(--border-color) solid;
          border-radius: 50%;
          background-image: url("${image}"),
            url("https://api.dicebear.com/5.x/thumbs/svg?radius=50");
        }
      `}</style>
    </>
  );
}
