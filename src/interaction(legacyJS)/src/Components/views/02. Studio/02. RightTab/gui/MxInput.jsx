import { Box, IconButton } from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import { observer } from "mobx-react";
import { useState } from "react";
const MxInput = observer((props) => {
  const {
    boxStyle,
    inputStyle,
    value,
    inputProps,
    id,
    onChange,
    type,
    onClick,
    step,
    onKeyDown,
    onBlur,
    onFocus,
    upDownButton = true,
  } = props;
  const [btnOpen, setBtnOpen] = useState(false);
  const [focus, setFocus] = useState(false);
  const onMouseDown = (e, increase) => {
    e.target.id = id;
    e.target.value = Number(value);
    e.target.value = Number(value) + increase;
    onClick(e);
    // const intervalId = setInterval(() => {
    //   e.target.value = Number(e.target.value) + increase;
    //   onClick(e);
    // }, 100);
    // e.target.dataset.intervalId = intervalId;
  };
  const onMouseUp = (e) => {
    clearInterval(e.target.dataset.intervalId);
  };
  const onMouseLeave = (e) => {
    clearInterval(e.target.dataset.intervalId);
  };
  const onKeyDownHandler = (e) => {
    if (!e.ctrlKey && type === "number") {
      const regex = /^[-+]?(0|[1-9][0-9]*)(\.[0-9]+)?([eE][-+]?[0-9]+)?$/;

      const isValidKey =
        regex.test(e.key) ||
        [
          "Backspace",
          "Delete",
          "Escape",
          ".",
          "Enter",
          "-",
          "Tab",
          "ArrowRight",
          "ArrowLeft",
        ].includes(e.key);
      if (!isValidKey) {
        e.preventDefault();
      }
      const numDots = (e.target.value.match(/\./g) || []).length;

      if (numDots >= 2) {
        e.preventDefault();
      }
    }
    onKeyDown && onKeyDown(e);
  };
  const onBlurHandler = (e) => {
    setFocus(false);
    onBlur && onBlur(e);
  };
  const onInput = (e) => {
    if (type === "number") {
      const koreanRegex = /[ㄱ-ㅎㅏ-ㅣ가-힣]/;
      const valueWithoutKorean = e.target.value.replace(koreanRegex, "");
      e.target.value = valueWithoutKorean;

      const SingleRegex = /^\.[0-9]$/;
      const isSingleDecimal = SingleRegex.test(e.target.value);
      if (isSingleDecimal) {
        e.target.value = Number(e.target.value);
      }
      const numDots = (e.target.value.match(/\./g) || []).length;
      const numMinus = (e.target.value.match(/-/g) || []).length;
      const hasMinusAtFront = /^-/.test(e.target.value);
      if (numDots >= 2 || numMinus >= 2) {
        e.target.value = e.target.value.slice(0, -1);
      } else if (numMinus === 1 && !hasMinusAtFront) {
        e.target.value = e.target.value.slice(0, -1);
      }
    }
  };

  return (
    <Box
      onMouseOver={type === "number" ? () => setBtnOpen(true) : undefined}
      onMouseLeave={type === "number" ? () => setBtnOpen(false) : undefined}
      sx={style.InputWrapper(boxStyle, focus)}
    >
      <input
        id={id}
        value={value}
        type="text"
        style={style.InputField(inputStyle, inputProps?.disabled)}
        onFocus={(e) => {
          e.target.select();
          setFocus(true);
          onFocus && onFocus(e);
        }}
        {...inputProps}
        onInput={onInput}
        onKeyDown={onKeyDownHandler}
        onChange={onChange}
        onBlur={onBlurHandler}
      />
      {type === "number" && upDownButton && btnOpen && (
        <Box sx={style.ButtonField}>
          <IconButton
            sx={style.IconButtonStyle}
            onMouseDown={(e) => onMouseDown(e, Number(step))}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseLeave}
          >
            <KeyboardArrowUpRoundedIcon
              sx={{ color: "#e1f853", fontSize: "1rem" }}
            />
          </IconButton>
          <IconButton
            sx={style.IconButtonStyle}
            onMouseDown={(e) => onMouseDown(e, Number(-step))}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseLeave}
          >
            <KeyboardArrowDownRoundedIcon
              sx={{ color: "#e1f853", fontSize: "1rem" }}
            />
          </IconButton>
        </Box>
      )}
    </Box>
  );
});

export default MxInput;

const style = {
  InputWrapper: function (boxStyle, focus) {
    return {
      width: "58px",
      height: "18px",
      borderRadius: "3px",
      backgroundColor: "#303030",
      display: "flex",
      position: "relative",
      outline: `${focus ? "solid 1.5px #e1f853" : "none"}`,
      ...boxStyle,
    };
  },
  InputField: function (inputStyle, disabled) {
    return {
      fontFamily: "Pretandard",
      fontSize: "12px",
      color: "#e2e2e2",
      width: "100%",
      height: "100%",
      backgroundColor: "transparent",
      border: "none",
      outline: "none",
      pointerEvents: `${disabled && "none"}`,
      ...inputStyle,
    };
  },
  ButtonField: {
    position: "absolute",
    width: "20%",
    height: "100%",
    right: "0",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#222222",
  },
  IconButtonStyle: {
    padding: 0,
    minWidth: 0,
    width: "100%",
    minHeight: 0,
    height: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
