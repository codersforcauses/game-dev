import * as React from "react";

interface dimensions {
  width: number;
  height: number;
}

function FeatureBox({ width, height }: dimensions): React.JSX.Element {
  return (
    <>
      <div
        style={{
          width: width,
          height: height,
          paddingTop: "2.5px",
          clipPath:
            "polygon(0 0, 27% 0, 31% 10%, 100% 10%, 100% 90%, 97% 100%, 70% 100%, 67% 90%, 0 90%)",
        }}
        //Each pair of percentages is a 2d point, and polygon() joins them all together to form a polygon
        className="bg-secondary"
      >
        <div
          style={{
            width: `${width - 5}px`,
            height: `${height - 5}px`,
            marginLeft: "2.5px",
            padding: "32px",
            clipPath:
              "polygon(0 0, 27% 0, 31% 10%, 100% 10%, 100% 90%, 97% 100%, 70% 100%, 67% 90%, 0 90%)",
            backgroundColor: "hsl(260, 52.38%, 12.35%)",
          }}
        >
          <div
            style={{ fontSize: 32, marginBottom: "10px" }}
            className="font-jersey10"
          >
            Box title
          </div>
          <div className="font-sans" style={{ fontSize: 12 }}>
            Subtitle please code for a cause and develop a game at uwa
          </div>
        </div>
      </div>
    </>
  );
}

export default FeatureBox;
