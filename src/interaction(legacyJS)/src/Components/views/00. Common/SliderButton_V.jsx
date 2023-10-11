import { observer } from "mobx-react-lite";
import { IconButton, Box } from "@mui/material";
import React, { useState } from "react";
import TextTransition from "./SliderButtonTextTransition";

/**
 * @param {function} handleClick - 클릭 시 실행할 함수
 * @param {string[]} buttonImgs - 버튼 이미지(활성화, 비활성화)
 * @param {string} text - 버튼 텍스트
 * @param {object} sx - 스타일(mui sx convention)
 */
const SliderButton_V = observer(({ handleClick, buttonImgs, text, sx }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeImg, inactiveImg] = buttonImgs;

  return (
    <>
      <IconButton
        sx={{ ...style.sliderButton, ...sx }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        <Box sx={isHovered ? style.activeImg : style.inactiveImg}>
          <img
            src={isHovered ? activeImg : inactiveImg}
            alt="glbLoad"
            width={"30px"}
            height={"30px"}
          />
          {isHovered && <TextTransition text={text} />}
        </Box>
      </IconButton>
    </>
  );
});

export default SliderButton_V;

const style = {
  sliderButton: {
    objectFit: "contain",
    backgroundColor: "#1C1C1C",
    borderRadius: "22px",
    border: "solid 1px #494949",
    transition: "width 0.3s ease",
    transformOrigin: "right",
    "&:hover": {
      width: "126px",
      backgroundColor: "#1C1C1C",
    },
  },

  activeImg: {
    display: "flex",
    alignItems: "center",
    position: "absolute",
    transition: "opacity 0.3s ease",
  },

  inactiveImg: {
    display: "flex",
    alignItems: "center",
    position: "absolute",
    opacity: 1,
    transition: "opacity 0.3s ease",
  },
};
