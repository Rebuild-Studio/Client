import { Box, Typography, Slider } from "@mui/material";
import { useRef } from "react";
import { makeStyles } from "@mui/styles";
import canvasHistory_store from "../../../../stores/CanvasHistory_Store";
import ChangeSliderValueCommand from "../../../../class/commands/SceneSetting/DraggingSliderCommand";

function MxSlider({
  label,
  value = 0.5,
  setValue,
  min = 0,
  max = 1,
  step = 0.01,
  name,
  disabled = false,
  sx,
}) {
  const classes = useStyles();
  const startValue = useRef(value);

  const handleMouseDown = () => {
    startValue.current = value;
  };
  const handleMouseMove = (event) => {
    setValue(event.target.value);
  };
  const handleMouseUp = () => {
    const start = startValue.current;
    const end = value;
    const command = new ChangeSliderValueCommand(
      name,
      //execute
      () => setValue(end),
      //undo
      () => setValue(start)
    );
    canvasHistory_store.execute(command);
  };

  return (
    <Box sx={{ mt: 2, width: "100%", ...sx }}>
      <Box
        sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
      >
        <Typography sx={style.textArea}>{label}</Typography>
        <Typography sx={style.textArea}>{value}</Typography>
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
        onChange={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        disabled={disabled}
      />
    </Box>
  );
}

export default MxSlider;

const style = {
  textArea: {
    fontFamily: "Inter",
    fontSize: "11px",
    textAlign: "left",
    color: "#e2e2e2",
  },
};

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
