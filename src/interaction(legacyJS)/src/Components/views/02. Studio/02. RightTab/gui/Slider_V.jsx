import { Box, Typography, Slider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles({
  root: {
    color: "#222222",
    height: "2px",
  },
  thumb: {
    backgroundColor: "#393939",
    outline: "solid 1px #959595",
    boxShadow: "none",
    width: "12px",
    height: "12px",
    "&:hover": {
      boxShadow: "none",
      outline: "solid 1px #e1f853",
    },
    "&:active": {
      boxShadow: "none",
    },
  },
  rail: {
    backgroundColor: "#393939",
  },
  track: {
    backgroundColor: "#e1f853",
  },
});

const MxSlider = (props) => {
  const classes = useStyles();
  const {
    label,
    value = 0.5,
    min = 0,
    max = 1,
    step = 0.01,
    name,
    onChange,
    disabled = false,
    uuid,
    undoMode,
    onMouseUp,
    onMouseDown,
    sx,
    showLabel = true,
  } = props;
  return (
    <Box
      sx={{
        mt: 2,
        width: "100%",

        ...sx,
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {showLabel && <Typography sx={style.textArea}>{label}</Typography>}
        {showLabel && <Typography sx={style.textArea}>{value}</Typography>}
      </Box>

      <Slider
        sx={{ padding: 0, mt: "10px" }}
        classes={{
          root: classes.root,
          thumb: classes.thumb,
          rail: classes.rail,
          track: classes.track,
        }}
        min={min}
        max={max}
        step={step}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        onMouseDown={(e) => {
          onMouseDown && onMouseDown(value);
        }}
        onMouseUp={(e) => {
          onMouseUp && onMouseUp(value, undoMode, uuid, name);
        }}
      />
    </Box>
  );
};
const style = {
  textArea: {
    fontFamily: "Inter",
    fontSize: "11px",
    textAlign: "left",
    color: "#e2e2e2",
  },
};
export default MxSlider;
