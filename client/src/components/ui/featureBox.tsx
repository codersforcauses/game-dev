import * as React from "react";

interface contents {
  title: string;
  text: string;
}

function FeatureBox({ title, text}: contents): React.JSX.Element {
  return (
    <>
      <div
        style={{
          boxSizing:'border-box',
          clipPath:
            "polygon(0% 0%, 27% 0%, 31% 1rem, 100% 1rem, 100% calc(100% - 1rem), 97% 100%, 70% 100%, 67% calc(100% - 1rem), 0% calc(100% - 1rem))",
        }}
        //Each pair of percentages is a 2d point, and polygon() joins them all together to form a polygon
        className="m-0 mx-auto bg-secondary pt-[0.15rem] max-w-[60%]"
      >
        <div
          style={{
            width: "calc(100% - 0.3rem)",
            clipPath:
              'inherit',
            boxSizing:'inherit'
          }}
          className="mb-[0.15rem] ml-[0.15rem] bg-[hsl(var(--dark-alt))] p-10"
        >
          <h3 className="mb-4 font-jersey10 text-4xl">{title}</h3>
          <p className="font-sans">{text}</p>
        </div>
      </div>
    </>
  );
}

export default FeatureBox;
