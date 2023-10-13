import { Box, Button, Typography, Menu } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Hue, Saturation, Alpha } from "@uiw/react-color";
import {
  hsvaToRgba,
  hsvaToHex,
  hexToHsva,
  hexToRgba,
  rgbaToHex,
} from "@uiw/color-convert";
import Common_VM from "../../../../view_models/Common_VM";
import MxSlider from "./Slider_V";
import MxInput from "./MxInput";
import { useEffect, useState } from "react";
import { action } from "mobx";
import MxButton from "../../../00. Common/gui/MxButton_V";

const MxColor = observer((props) => {
  const {
    label,
    onChange,
    color,
    onChangeSliderAlpha,
    onChangeInputHex,
    onChangeInputAlpha,
    onChangeInputRGB,
    onMouseDown,
    onMouseUp,
    undoMode,
    uuid,
    labelStyle,
    menuStyle,
    buttonStyle,
    saturationSilder = true,
    brightnessSlider = true,
    alphaSlider = true,
  } = props;
  const [hex, setHex] = useState(hsvaToHex(color));
  const [alpha, setAlpha] = useState(Math.round(color.a * 100) + "%");
  const { handleClickMenuCustom, anchorMenu, openMenu, handleCloseMenu } =
    Common_VM();
  const [rgbColor, setRgbColor] = useState(hsvaToRgba(color));
  const [focusTaget, setFocusTaget] = useState(null);
  const onChangeSaturation = (newColor) => {
    setHex(hsvaToHex(newColor));
    setRgbColor(hsvaToRgba(newColor));
    onChange && onChange(newColor);
  };
  const onChangeHex = (e) => {
    const hexRegex = /^[0-9A-Fa-f]*$/;
    const length = e.target.value.length;

    if (
      e.target.value.indexOf("#") !== -1 &&
      e.target.value.indexOf("#") === 0
    ) {
      if (
        hexRegex.test(e.target.value[length - 1]) &&
        (e.target.value.length === 4 || e.target.value.length === 7)
      ) {
        onChangeInputHex(e.target.value);
        setRgbColor(hexToRgba(e.target.value));
      }
    } else {
      if (e.target.value === "") {
        e.target.value = "#";
      } else if (e.target.value !== "#" && hexRegex.test(e.target.value)) {
        e.target.value = "#" + e.target.value;
      }
    }
    if (e.target.value === "#" || hexRegex.test(e.target.value[length - 1]))
      setHex(e.target.value);
  };
  const onChangeAlpha = action((e) => {
    let alphavalue = e.target.value;

    if (alphavalue === "") {
      color.a = 0;
    } else if (Number(e.target.value) <= 100) {
      color.a = Number(e.target.value) / 100;
    } else {
      color.a = 1;
      alphavalue = 100;
    }

    onChangeInputAlpha(color);
    setAlpha(alphavalue);
  });
  const onClickSpoid = async () => {
    let eyeDropper = new EyeDropper();
    const { sRGBHex } = await eyeDropper.open();
    onChangeInputHex(sRGBHex);
    setHex(sRGBHex);
  };
  const onChangeRGB = action((e) => {
    const RGBType = e.target.id.split("_")[1];
    let value = e.target.value;
    if (e.target.value === "") {
      value === "0";
    } else if (value[value.length - 1] === ".") {
      value = value.replace(/\./g, "");
    } else if (Number(value) > 255) {
      return;
    }
    switch (RGBType) {
      case "r":
        rgbColor.r = Number(value);
        break;
      case "g":
        rgbColor.g = Number(value);
        break;
      case "b":
        rgbColor.b = Number(value);
        break;
      default:
        return;
    }
    onChangeInputRGB(rgbColor);
    setHex(rgbaToHex(rgbColor));
    setRgbColor({ ...rgbColor });
  });
  useEffect(() => {
    if (focusTaget?.id !== "Hex") setHex(hsvaToHex(color));
    if (focusTaget?.id !== "Alpha") setAlpha(Math.round(color.a * 100) + "%");
    setRgbColor(hsvaToRgba(color));
  }, [color]);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={style.colorTabBox}>
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
          sx={style.colorBtn(color, rgbColor, buttonStyle)}
          onClick={(event) => {
            handleClickMenuCustom(event.currentTarget);
          }}
        ></Button>

        <Menu
          anchorEl={anchorMenu}
          open={openMenu}
          onClose={() => {
            handleCloseMenu();
          }}
          sx={style.colorMenu(menuStyle)}
        >
          <Box
            sx={{ width: "213px", height: "382.7px" }}
            onFocus={() => {
              setFocusTaget(null);
            }}
          >
            <Box
              onMouseDown={(e) => {
                if (focusTaget && e.target !== focusTaget) {
                  focusTaget.blur();
                  setFocusTaget(null);
                }
                onMouseDown && onMouseDown(hsvaToHex(color));
              }}
            >
              <Saturation
                radius={"5px"}
                style={{ width: "100%", height: "153px" }}
                hsva={color}
                onMouseUp={(e) => {
                  onMouseUp && onMouseUp(hsvaToHex(color), undoMode, uuid);
                }}
                onChange={onChangeSaturation}
              />
            </Box>
            <Hue
              style={{ marginTop: "10px" }}
              radius={"10px"}
              hue={color.h}
              onMouseDown={(e) => {
                if (focusTaget && e.target !== focusTaget) {
                  focusTaget.blur();
                  setFocusTaget(null);
                }
                onMouseDown && onMouseDown(hsvaToHex(color));
              }}
              onMouseUp={(e) => {
                onMouseUp && onMouseUp(hsvaToHex(color), undoMode, uuid);
              }}
              onChange={(newHue) => {
                const _hsva = { ...color, ...newHue };
                onChange(_hsva);
              }}
            />

            {alphaSlider && (
              <Alpha
                style={{ marginTop: "10px" }}
                radius={"10px"}
                hsva={color}
                onMouseDown={(e) => {
                  if (focusTaget && e.target !== focusTaget) {
                    focusTaget.blur();
                    setFocusTaget(null);
                  }
                  onMouseDown && onMouseDown(color.a);
                }}
                onMouseUp={(e) => {
                  onMouseUp &&
                    onMouseUp(
                      color.a,
                      undoMode !== "Material_color"
                        ? undoMode
                        : "Material_opacity",
                      uuid
                    );
                }}
                onChange={(newAlpha) => {
                  onChangeSliderAlpha(newAlpha);
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
                value={focusTaget?.id === "Hex" ? hex : hsvaToHex(color)}
                onFocus={(e) => {
                  e.stopPropagation();
                  setFocusTaget(e.target);
                }}
                onChange={onChangeHex}
                boxStyle={{
                  width: "97px",
                  height: "18px",
                }}
              />
              <MxInput
                id="Alpha"
                type={"number"}
                upDownButton={false}
                value={alpha}
                onChange={onChangeAlpha}
                onFocus={(e) => {
                  e.stopPropagation();
                  setFocusTaget(e.target);
                }}
                onBlur={(e) => {
                  if (e.target.value === "") {
                    setAlpha("0%");
                  } else {
                    if (alpha.indexOf("%") === -1) {
                      setAlpha(alpha + "%");
                    }
                  }
                }}
              />
              <MxButton onClick={onClickSpoid}>
                <img src={"/Icons/Studio/spoid.png"} alt="spoid" />
              </MxButton>
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
                type="number"
                upDownButton={false}
                onFocus={(e) => {
                  setFocusTaget(e.target);
                }}
                onChange={onChangeRGB}
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
                upDownButton={false}
                value={rgbColor.g}
                type="number"
                onFocus={(e) => {
                  setFocusTaget(e.target);
                }}
                boxStyle={{
                  width: "50px",
                  height: "18px",
                }}
                onChange={onChangeRGB}
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
                upDownButton={false}
                value={rgbColor.b}
                type="number"
                boxStyle={{
                  width: "50px",
                  height: "18px",
                }}
                onFocus={(e) => {
                  setFocusTaget(e.target);
                }}
                onChange={onChangeRGB}
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
                onMouseDown={(e) => {
                  onMouseDown && onMouseDown(hsvaToHex(color));
                }}
                onMouseUp={(e) => {
                  onMouseUp && onMouseUp(hsvaToHex(color), undoMode, uuid);
                }}
                onChange={(e) => {
                  const _hsva = { ...color, s: e.target.value };
                  onChange(_hsva);
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
                onMouseDown={(e) => {
                  onMouseDown && onMouseDown(hsvaToHex(color));
                }}
                onMouseUp={(e) => {
                  onMouseUp && onMouseUp(hsvaToHex(color), undoMode, uuid);
                }}
                onChange={(e) => {
                  const _hsva = { ...color, v: e.target.value };
                  onChange(_hsva);
                }}
              />
            )}
          </Box>
        </Menu>
      </Box>
    </Box>
  );
});

export default MxColor;
const style = {
  colorTabBox: {
    width: "100%",
    height: "50%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  colorBtn: (color, rgbColor, buttonStyle) => ({
    width: "24px",
    minWidth: 0,
    minHeight: 0,
    height: "24px",
    backgroundColor: `${
      typeof color !== "undefined" &&
      `rgba(${rgbColor.r},${rgbColor.g},${rgbColor.b},${rgbColor.a})`
    }`,
    ...buttonStyle
  }),
  colorMenu: (menuStyle) => ({
    zIndex: 10000,
    position: "absolute",
    top: -24,
    left: -268,
    ...menuStyle,

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
  }),
};
