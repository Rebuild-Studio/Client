import { LinearSRGBColorSpace } from "three";
import { Box, Typography } from "@mui/material";
import { Hue, Saturation } from "@uiw/react-color";
import { hsvaToRgba, hsvaToHex, hexToHsva } from "@uiw/color-convert";
import MxSlider from "../../02. RightTab/gui/Slider_V";
import MxInput from "../../02. RightTab/gui/MxInput";

import { observer } from "mobx-react";
import { useCallback, useEffect, useState } from "react";

function round(c) {
  const range = 100000000;
  return Math.round(c * range) / range;
}

function roundAll(c) {
  c.r = round(c.r);
  c.g = round(c.g);
  c.b = round(c.b);
}

const ControlColorV = observer((props) => {
  const { name, control, update } = props;
  const [color, setHsva] = useState({ h: 0, s: 0, v: 100, a: 1 });
  const rgbColor = hsvaToRgba(color);

  useEffect(() => {
    update.current[name] = { value: control.value.clone(), type: control.type };
    const hsvaColor = hexToHsva(
      update.current[name].value.getHexString(LinearSRGBColorSpace)
    );
    setHsva(hsvaColor);
  }, [control, name, update]);

  const onChange = useCallback(
    (color) => {
      setHsva(color);
      const hexColor = hsvaToHex(color);
      update.current[name].value.set(hexColor);
      update.current[name].value.convertLinearToSRGB();
      roundAll(update.current[name].value);
    },
    [name, update]
  );

  return (
    <Box sx={{ width: "213px", height: "366.7px", backgroundColor: "#282828" }}>
      <Box>
        <Saturation
          radius={"5px"}
          style={{ width: "100%", height: "153px" }}
          hsva={color}
          onChange={(newColor) => {
            onChange(newColor);
          }}
        />
      </Box>
      <Hue
        style={{ marginTop: "10px" }}
        radius={"10px"}
        hue={color.h}
        onChange={(newHue) => {
          const _hsva = { ...color, ...newHue };
          onChange(_hsva);
        }}
      />
      <Box
        sx={{
          marginTop: "15px",
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Pretendard",
            fontSize: "12px",
            fontWeight: 500,
            color: "#666",
          }}
        >
          Hex
        </Typography>
        <MxInput
          id="Hex"
          value={hsvaToHex(color)}
          inputProps={{ readOnly: true }}
          boxStyle={{
            width: "97px",
            height: "18px",
          }}
        />
      </Box>
      <Box
        sx={{
          marginTop: "15px",
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Pretendard",
            fontSize: "12px",
            fontWeight: 500,
            color: "#666",
          }}
        >
          R
        </Typography>
        <MxInput
          id="Rgb_r"
          value={rgbColor.r}
          inputProps={{ readOnly: true }}
          boxStyle={{
            width: "50px",
            height: "18px",
          }}
        />
        <Typography
          sx={{
            fontFamily: "Pretendard",
            fontSize: "12px",
            fontWeight: 500,
            color: "#666",
          }}
        >
          G
        </Typography>
        <MxInput
          id="Rgb_g"
          value={rgbColor.g}
          boxStyle={{
            width: "50px",
            height: "18px",
          }}
          inputProps={{ readOnly: true }}
        />
        <Typography
          sx={{
            fontFamily: "Pretendard",
            fontSize: "12px",
            fontWeight: 500,
            color: "#666",
          }}
        >
          B
        </Typography>
        <MxInput
          id="Rgb_b"
          value={rgbColor.b}
          boxStyle={{
            width: "50px",
            height: "18px",
          }}
          inputProps={{ readOnly: true }}
        />
      </Box>
      <MxSlider
        label={"채도"}
        value={Math.round(color.s)}
        name={"채도"}
        min={0}
        max={100}
        step={1}
        onChange={(e) => {
          const _hsva = { ...color, s: e.target.value };
          onChange(_hsva);
        }}
      />
      <MxSlider
        label={"명도"}
        value={Math.round(color.v)}
        name={"명도"}
        min={0}
        max={100}
        step={1}
        onChange={(e) => {
          const _hsva = { ...color, v: e.target.value };
          onChange(_hsva);
        }}
      />
    </Box>
  );
});
export default ControlColorV;
