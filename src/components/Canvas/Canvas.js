import { useEffect, useState } from "react";
import ColorConvertor from "../ColorConvertor/ColorConvertor";

const Canvas = () => {
  const [imgSrc, setImgSrc] = useState("");
  const [imgData, setImgData] = useState([]);
  const [hexColor, setHexColor] = useState("");
  const colorConvertor = (prevColor) => {
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
    if (prevColor) {
      const [rr, gg, bb] = prevColor;
      const RR =
        hexCode[Math.floor(parseInt(rr) / 16)] + hexCode[parseInt(rr) % 16];
      const GG =
        hexCode[Math.floor(parseInt(gg) / 16)] + hexCode[parseInt(gg) % 16];
      const BB =
        hexCode[Math.floor(parseInt(bb) / 16)] + hexCode[parseInt(bb) % 16];
      return `#${RR}${GG}${BB}`;
    }
  };
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        setImgSrc(reader.result);
      };
    }
  };

  useEffect(() => {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    const image = document.getElementById("myImage");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    const id = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixelData = {};
    for (let i = 0; i < id.data.length / 4; i += 4) {
      let result = colorConvertor([id.data[i], id.data[i + 1], id.data[i + 2]]);
      if (pixelData.hasOwnProperty(result)) {
        pixelData[result] += 1;
      } else {
        pixelData[result] = 1;
      }
    }
    const sortedPixelData = [];
    for (let name in pixelData) {
      sortedPixelData.push([name, pixelData[name]]);
    }
    const popColor = sortedPixelData
      .sort((a, b) => {
        return b[1] - a[1];
      })
      .splice(0, 10);
    setImgData(popColor);
  }, [imgSrc]);

  return (
    <section>
      <form>
        <input type="file" accept="image/*" onChange={handleChange} />
      </form>
      <img src={imgSrc} id="myImage" style={{ width: "300px" }}></img>
      <canvas id="myCanvas"></canvas>
      {imgData.map((list, idx) => (
        <div
          key={idx}
          style={{
            backgroundColor: `${list[0]}`,
            width: "50px",
            height: "50px",
          }}
        >
          {list[0]}
        </div>
      ))}
    </section>
  );
};
export default Canvas;
