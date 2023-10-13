import { Box, Button, Typography, Menu } from "@mui/material";
import { Hue, Saturation } from "@uiw/react-color";
import { hsvaToRgba, hsvaToHex } from "@uiw/color-convert";
import MxSlider from "../gui/Slider_V";
import React, { useRef } from "react";
import canvasHistory_store from "../../../../stores/CanvasHistory_Store";
import ChangeColorCommand from "../../../../class/commands/SceneSetting/ChangeColorCommand";

function MxLightColor({ label, color, setColor, name, labelStyle, menuStyle }) {
  const [anchorMenu, setAnchorMenu] = React.useState(null);
  const openMenu = Boolean(anchorMenu);
  const rgbColor = hsvaToRgba(color);
  const startValue = useRef(color);
  const handleMouseDown = () => {
    startValue.current = color;
  };
  const handleMouseMove = (hsva) => setColor(hsva);
  const handleMouseUp = () => {
    const start = startValue.current;
    const end = color;
    const command = new ChangeColorCommand(
      name,
      //execute
      () => setColor(end),
      //undo
      () => setColor(start)
    );
    canvasHistory_store.execute(command);
  };

  return (
    <Box sx={{ width: "100%", mt: 1 }}>
      <Box
        sx={{
          width: "100%",
          height: "50%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            fontFamily: "SourceHanSansKR",
            fontSize: "12px",
            color: "#e2e2e2",
            ...labelStyle,
          }}
        >
          {label}
        </Typography>
        <Button
          sx={{
            width: "24px",
            minWidth: 0,
            minHeight: 0,
            height: "24px",
            backgroundColor: `${
              typeof color !== "undefined" &&
              `rgba(${rgbColor.r},${rgbColor.g},${rgbColor.b},${rgbColor.a})`
            }`,
          }}
          onClick={(event) => {
            setAnchorMenu(event.currentTarget);
          }}
        ></Button>

        <Menu
          anchorEl={anchorMenu}
          open={openMenu}
          onClose={() => setAnchorMenu(null)}
          sx={{
            zIndex: 10000,
            position: "absolute",
            top: -24,
            left: -268,
            "& .MuiMenuItem-root": {
              color: "#fff",
              textAlign: "left",
              fontFamily: "SourceHanSansKR",
              fontSize: "13px",
              borderRadius: "5px",
            },
            "& .MuiPaper-root": {
              width: "245px",
              height: "412.7px",
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#3a3a3a",
            },
            ...menuStyle,
          }}
        >
          <Box sx={{ width: "213px", height: "382.7px" }}>
            <Box onMouseDown={() => handleMouseDown(hsvaToHex(color))}>
              <Saturation
                radius={"5px"}
                style={{ width: "100%", height: "153px" }}
                hsva={color}
                onMouseUp={() => {
                  handleMouseUp(hsvaToHex(color));
                }}
                onChange={(newColor) => {
                  handleMouseMove(newColor);
                }}
              />
            </Box>
            <Hue
              style={{ marginTop: "15px" }}
              radius={"10px"}
              hue={color.h}
              onMouseDown={() => handleMouseDown(hsvaToHex(color))}
              onMouseUp={() => handleMouseUp(hsvaToHex(color))}
              onChange={(newHue) => {
                const _hsva = { ...color, ...newHue };
                handleMouseMove(_hsva);
              }}
            />

            <MxSlider
              label={"채도"}
              value={Math.round(color.s)}
              name={"채도"}
              min={0}
              max={100}
              step={1}
              onMouseDown={() => handleMouseDown(hsvaToHex(color))}
              onMouseUp={() => handleMouseUp(hsvaToHex(color))}
              onChange={(e) => {
                const _hsva = { ...color, s: e.target.value };
                handleMouseMove(_hsva);
              }}
            />
            <MxSlider
              label={"명도"}
              value={Math.round(color.v)}
              name={"명도"}
              min={0}
              max={100}
              step={1}
              onMouseDown={() => handleMouseDown(hsvaToHex(color))}
              onMouseUp={() => handleMouseUp(hsvaToHex(color))}
              onChange={(e) => {
                const _hsva = { ...color, v: e.target.value };
                handleMouseMove(_hsva);
              }}
            />
          </Box>
        </Menu>
      </Box>
    </Box>
  );
}

export default MxLightColor;
