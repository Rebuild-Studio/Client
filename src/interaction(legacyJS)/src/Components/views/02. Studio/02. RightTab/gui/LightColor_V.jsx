import { Box, Button, Typography, Menu } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Hue, Saturation } from "@uiw/react-color";
import { hsvaToRgba, hsvaToHex } from "@uiw/color-convert";
import Common_VM from "../../../../view_models/Common_VM";
import MxSlider from "./Slider_V";

const MxLightColor = observer((props) => {
  const {
    label,
    onChange,
    color,
    onMouseDown,
    onMouseUp,
    undoMode,
    uuid,
    name,
    labelStyle,
    menuStyle,
  } = props;
  const { handleClickMenuCustom, anchorMenu, openMenu, handleCloseMenu } =
    Common_VM();

  const rgbColor = hsvaToRgba(color);

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
            handleClickMenuCustom(event.currentTarget);
          }}
        ></Button>

        <Menu
          anchorEl={anchorMenu}
          open={openMenu}
          onClose={() => {
            handleCloseMenu();
          }}
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
            <Box
              onMouseDown={() => onMouseDown && onMouseDown(hsvaToHex(color))}
            >
              <Saturation
                radius={"5px"}
                style={{ width: "100%", height: "153px" }}
                hsva={color}
                onMouseUp={(e) => {
                  onMouseUp &&
                    onMouseUp(hsvaToHex(color), undoMode, uuid, name);
                }}
                onChange={(newColor) => {
                  onChange(newColor);
                }}
              />
            </Box>
            <Hue
              style={{ marginTop: "15px" }}
              radius={"10px"}
              hue={color.h}
              onMouseDown={(e) => {
                onMouseDown && onMouseDown(hsvaToHex(color));
              }}
              onMouseUp={(e) => {
                onMouseUp && onMouseUp(hsvaToHex(color), undoMode, uuid, name);
              }}
              onChange={(newHue) => {
                const _hsva = { ...color, ...newHue };
                onChange(_hsva);
              }}
            />

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
                onMouseUp && onMouseUp(hsvaToHex(color), undoMode, uuid, name);
              }}
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
              onMouseDown={(e) => {
                onMouseDown && onMouseDown(hsvaToHex(color));
              }}
              onMouseUp={(e) => {
                onMouseUp && onMouseUp(hsvaToHex(color), undoMode, uuid, name);
              }}
              onChange={(e) => {
                const _hsva = { ...color, v: e.target.value };
                onChange(_hsva);
              }}
            />
          </Box>
        </Menu>
      </Box>
    </Box>
  );
});

export default MxLightColor;
