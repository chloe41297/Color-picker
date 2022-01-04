import { useEffect, useState } from "react";

const Canvas = () => {
  const [imgSrc, setImgSrc] = useState("");
  const [imgData, setImgData] = useState([]);
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
    ctx.drawImage(image, 0, 0);
    const id = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixelData = [];
    for (let i = 0; i < id.data.length / 4; i += 4) {
      pixelData.push([
        id.data[i],
        id.data[i + 1],
        id.data[i + 2],
        id.data[i + 3],
      ]);
    }
    setImgData(pixelData);
  }, [imgSrc]);
  console.log(imgData[0]);
  return (
    <section>
      <form>
        <input type="file" accept="image/*" onChange={handleChange} />
      </form>
      <img src={imgSrc} id="myImage" style={{ width: "300px" }}></img>
      <canvas id="myCanvas"></canvas>
    </section>
  );
};
export default Canvas;
