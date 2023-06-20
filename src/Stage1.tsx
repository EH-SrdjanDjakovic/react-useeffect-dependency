import { useEffect, useRef, useState } from "react";
import { GithubPicker } from "react-color";
import "./Stage1.css";

const Stage1 = () => {
  const [currentColor, setCurrentColor] = useState("#db3e00");
  const [circleSize, setCircleSize] = useState(150);
  const [outputMessage, setOutputMessage] = useState("");
  const previousColor = useRef<string>(currentColor);

  const circleSizeHandler = (newSize: number) => {
    if (!(newSize < 100 || newSize > 200)) {
      setCircleSize(newSize);
    }
  };

  useEffect(() => {
    if (circleSize === 100 || circleSize === 200) {
      setOutputMessage(`The color ${currentColor} has been changed to #fff`);
      previousColor.current = currentColor;
      setCurrentColor("#fff");
    } else {
      if (currentColor === "#fff") setCurrentColor(previousColor.current);
      setOutputMessage(``);
    }
  }, [circleSize, currentColor]);

  return (
    <div className="stage1-container">
      <div className="interaction">
        <div
          className="circle"
          style={{
            backgroundColor: currentColor,
            width: circleSize,
            height: circleSize,
          }}
        ></div>
        <div>
          <div style={{ marginTop: "20px" }}>
            <p>Select the color:</p>
            <GithubPicker
              color={currentColor}
              onChangeComplete={(e) => {
                setCurrentColor(e.hex);
                setOutputMessage("");
              }}
              width="220px"
            />
          </div>
          <div style={{ marginTop: "20px" }}>
            <p>Change the size of the circle</p>
            <button onClick={() => circleSizeHandler(circleSize + 10)}>
              +
            </button>{" "}
            <button onClick={() => circleSizeHandler(circleSize - 10)}>
              -
            </button>
          </div>
        </div>
      </div>
      <div className="output">
        <p>Size: {circleSize}</p>
        <p>Color in hex: {currentColor}</p>
        <p>{outputMessage}</p>
      </div>
    </div>
  );
};

export default Stage1;
