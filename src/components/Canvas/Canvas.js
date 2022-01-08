import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Copy } from "react-feather";

const Canvas = () => {
  const [imgSrc, setImgSrc] = useState("");
  const [imgData, setImgData] = useState([]);

  const handleClick = (e) => {
    const currentColor = e.target.closest("li").dataset.id;
    const textarea = document.createElement("textarea");
    textarea.value = currentColor;

    document.body.appendChild(textarea);
    textarea.select();

    document.execCommand("copy");
    document.body.removeChild(textarea);

    alert("복사되었습니다");
  };
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
      .splice(0, 8);
    setImgData(popColor);
  }, [imgSrc]);

  return (
    <Section>
      <div>
        {imgSrc ? "" : <ImgReplacement>이미지를 선택해 주세요!</ImgReplacement>}
        <img src={imgSrc} id="myImage" style={{ width: "300px" }} />
        <canvas id="myCanvas" style={{ display: "none" }}></canvas>
        <form>
          <input type="file" accept="image/*" onChange={handleChange} />
        </form>
      </div>

      <Ul>
        {imgData.length > 1
          ? imgData.map((list, idx) => (
              <Li key={idx} onClick={handleClick} data-id={list[0]}>
                <div
                  style={{
                    backgroundColor: `${list[0]}`,
                    paddingTop: "100%",
                  }}
                ></div>
                <div>{list[0]}</div>
                <Span>
                  <Copy
                    style={{
                      width: "30px",
                      height: "30px",
                      color: "#ffffff",
                    }}
                  ></Copy>
                  <Div>click to copy!</Div>
                </Span>
              </Li>
            ))
          : ""}
      </Ul>
    </Section>
  );
};

const Section = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Ul = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  list-style: none;
  grid-gap: 5px;
`;
const ImgReplacement = styled.div`
  width: 250px;
  height: 250px;
  border: 2px dashed black;
  line-height: 250px;
  border-radius: 10px;
  padding-bottom: 10px;
`;
const Li = styled.li`
  position: relative;
  :hover span {
    visibility: visible;
  }
`;
const Span = styled.span`
  width: 100%;
  height: calc(100% - 18px);
  display: flex;
  background-color: rgba(0, 0, 0, 0.3);
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  flex-direction: column;
  visibility: hidden;
`;
const Div = styled.div`
  font-size: 10px;
  color: #ffffff;
`;
export default Canvas;
