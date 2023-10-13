import React from "react";
import { Box, Button, Typography, Menu } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Hue, Saturation, Alpha } from "@uiw/react-color";
import { hsvaToRgba, hsvaToHex } from "@uiw/color-convert";
import Common_VM from "../../../../view_models/Common_VM";
import MxSlider from "../gui/Slider_V";
import MxInput from "../gui/MxInput";
import ChangeColorCommand from "../../../../class/commands/SceneSetting/ChangeColorCommand";
import canvasHistory_store from "../../../../stores/CanvasHistory_Store";

const MxColor9988 = observer((props) => {
  const {
    label,
    onChange,
    color,
    setColor,
    name,
    onChangeHandlerAlpha,
    onMouseDown,
    onMouseUp,
    undoMode,
    uuid,
    labelStyle,
    menuStyle,
    saturationSilder = true,
    brightnessSlider = true,
    alpha = true,
  } = props;
  const [anchorMenu, setAnchorMenu] = React.useState(null);
  const openMenu = Boolean(anchorMenu);
  // const { handleClickMenuCustom, anchorMenu, openMenu, handleCloseMenu } =
  //   Common_VM();
  const rgbColor = hsvaToRgba(color);

  const startValue = React.useRef(color);
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
    <Box
      sx={{
        width: "100%",
        mt: 1,
      }}
    >
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
            fontFamily: "Inter",
            fontSize: "11px",
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
          onClose={() => {
            setAnchorMenu(null);
          }}
          sx={{
            zIndex: 10000,
            position: "absolute",
            top: -24,
            left: -268,
            ...menuStyle,
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
              overflow: "auto",
              "&::-webkit-scrollbar": { width: 0 },
              ...(menuStyle &&
                menuStyle["& .MuiPaper-root"] &&
                menuStyle["& .MuiPaper-root"]),
            },
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
              style={{ marginTop: "10px" }}
              radius={"10px"}
              hue={color.h}
              onMouseDown={() => handleMouseDown(hsvaToHex(color))}
              onMouseUp={() => handleMouseUp(hsvaToHex(color))}
              onChange={(newHue) => {
                const _hsva = { ...color, ...newHue };
                handleMouseMove(_hsva);
              }}
            />

            {alpha && (
              <Alpha
                style={{ marginTop: "10px" }}
                radius={"10px"}
                hsva={color}
                onMouseDown={(e) => {
                  handleMouseDown(color.a);
                }}
                onMouseUp={(e) => {
                  onMouseUp(color.a);
                }}
                onChange={(newAlpha) => {
                  onChangeHandlerAlpha(newAlpha);
                }}
              />
            )}
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
              <MxInput
                id="Alpha"
                value={Math.round(color.a * 100) + "%"}
                inputProps={{ readOnly: true }}
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
                  color: "#BABABA",
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
                  color: "#BABABA",
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
                  color: "#BABABA",
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
            {saturationSilder === true && (
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
            )}
            {brightnessSlider === true && (
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
            )}
          </Box>
        </Menu>
      </Box>
    </Box>
  );
});

export default MxColor9988;
