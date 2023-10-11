import { useState, useEffect } from "react";
import { Typography } from "@mui/material";

const TextTransition = ({ text }) => {
  const [visibleText, setVisibleText] = useState("");

  useEffect(() => {
    let timer = null;
    let currentIndex = 0;

    const showNextCharacter = () => {
      setVisibleText((prevText) => prevText + text[currentIndex]);
      currentIndex++;

      if (currentIndex < text.length) {
        timer = setTimeout(showNextCharacter, 30); // Set the desired delay between characters
      }
    };

    timer = setTimeout(showNextCharacter, 30); // Set the initial delay

    return () => {
      clearTimeout(timer);
    };
  }, [text]);

  return <Typography sx={style.textArea}>{visibleText}</Typography>;
};
export default TextTransition;

const style = {
  textArea: {
    display: "flex",
    alignItems: "center",
    flexGrow: "0",
    fontFamily: "SpoqaHanSansNeo",
    fontSize: "12px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    textAlign: "left",
    color: "#fff",
  },
};
