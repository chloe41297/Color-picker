import { useEffect, useState } from "react";

const ColorConvertor = (prevColor) => {
  const [hexColor, setHexCode] = useState("");
  const hexCode = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];
  useEffect(() => {
    if (prevColor) {
      const currentColor = "";
      prevColor.map((color) => {
        currentColor += hexCode[color / 16] + hexCode[color % 16];
        console.log(color);
      });
      setHexCode(currentColor);
      console.log("a");
    }
  }, []);
  return <div>{hexColor}</div>;
};
export default ColorConvertor;
