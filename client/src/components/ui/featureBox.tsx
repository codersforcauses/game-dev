import * as React from "react";

interface contents {
  title: string;
  text: string;
}

function FeatureBox({ title, text }: contents): React.JSX.Element {
  return (
    <>
      <div
        style={{
          width: "50rem",
          height: "13rem",
          paddingTop: "0.15rem",
          clipPath:
            "polygon(0 0, 27% 0, 31% 10%, 100% 10%, 100% 90%, 97% 100%, 70% 100%, 67% 90%, 0 90%)",
        }}
        //Each pair of percentages is a 2d point, and polygon() joins them all together to form a polygon
        className="bg-secondary"
      >
        <div
          style={{
            width: "49.7rem",
            height: "12.7rem",
            marginLeft: "0.15rem",
            padding: "40px",
            clipPath:
              "polygon(0 0, 27% 0, 31% 10%, 100% 10%, 100% 90%, 97% 100%, 70% 100%, 67% 90%, 0 90%)",
          }}
          className="bg-dark"
        >
          <div
            style={{ marginBottom: "15px" }}
            className="font-jersey10 text-4xl"
          >
            {title}
          </div>
          <div className="font-sans">{text}</div>
        </div>
      </div>
    </>
  );
}

export default FeatureBox;
