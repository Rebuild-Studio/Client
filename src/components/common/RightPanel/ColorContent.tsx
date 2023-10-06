import { useState } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { Hue, Saturation, Alpha } from "@uiw/react-color";
import {
  hsvaToRgba,
  hsvaToHex,
  HsvaColor,
  RgbaColor,
  rgbaToHsva,
} from "@uiw/color-convert";
import Slider from "../Slider";
import InputField from "../InputField";
import { updateMaterialAlpha, updateMaterialColor } from "./ColorHandler";
import { action } from "mobx";
import { grayColors } from "@/resources/colors/colors";

interface ColorContentProps {
  rgbColor: RgbaColor;
  color: HsvaColor;
  saturationSilder?: boolean;
  brightnessSlider?: boolean;
  alpha?: boolean;
}

const Wrapper = styled.div`
  position: relative;
  width: 213px;
  height: auto;
`;

const InputFieldWrapper = styled.div`
  margin-top: 15px;
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const InputFieldTitle = styled.div<{ color: string }>`
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 500;
  color: ${(props) => props.color};
`;

const ColorContent = observer(
  ({
    color,
    saturationSilder = true,
    brightnessSlider = true,
  }: ColorContentProps) => {
    const [newColor, setColor] = useState<HsvaColor>(color);
    const [alpha, setAlpha] = useState(String(Math.round(color.a * 100)));
    const [rgbColor, setRgbColor] = useState(hsvaToRgba(color));
    const rgbChannels = [
      { label: "R", value: rgbColor.r },
      { label: "G", value: rgbColor.g },
      { label: "B", value: rgbColor.b },
    ];

    const onChangeSaturation = action((newColor: HsvaColor) => {
      setRgbColor(hsvaToRgba(newColor));
      updateMaterialColor(newColor);
    });

    const onChangeAlpha = (hsva: HsvaColor) => {
      setAlpha(String(Math.round(hsva.a * 100)));
      updateMaterialAlpha(hsva.a);
    };

    const onChangeRGB = action((channel: string, input: string) => {
      const RGBType = channel.toLowerCase();
      let value = input;
      if (input === "") {
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
      const _hsva = rgbaToHsva(rgbColor);
      updateMaterialColor(_hsva);
      setColor(_hsva);
      setRgbColor({ ...rgbColor });
    });

    const onInputAlphaChange = action((e: string) => {
      let alphavalue = e;

      if (alphavalue === "") {
        newColor.a = 0;
      } else if (Number(e) <= 100) {
        newColor.a = Number(e) / 100;
      } else {
        newColor.a = 1;
        alphavalue = "100";
      }

      updateMaterialAlpha(Number(e) / 100);
    });
    const handleMouseMove = (hsva: HsvaColor) => {
      setColor(hsva);
      updateMaterialColor(hsva);
    };

    return (
      <Wrapper>
        <Saturation
          radius={"5px"}
          style={{ width: "100%", height: "153px" }}
          hsva={newColor}
          onChange={(color) => {
            onChangeSaturation(color);
            setColor({ ...newColor, ...color, a: newColor.a });
          }}
        />
        <Hue
          style={{ marginTop: "10px" }}
          radius={"10px"}
          hue={newColor.h}
          onChange={(newHue) => {
            const _hsva = { ...newColor, ...newHue };
            setColor(_hsva);
            onChangeAlpha(_hsva);
            onChangeSaturation(_hsva);
          }}
        />

        {alpha && (
          <Alpha
            style={{ marginTop: "10px" }}
            radius={"10px"}
            hsva={newColor}
            onChange={(newAlpha) => {
              setColor({ ...newColor, ...newAlpha });
              onChangeAlpha({ ...newColor, ...newAlpha });
            }}
          />
        )}
        <InputFieldWrapper>
          <InputFieldTitle color={grayColors.panelFontColor}>
            Hex
          </InputFieldTitle>
          <InputField value={hsvaToHex(color)} type={"text"} title={"Hex"} />
          <InputField
            value={alpha + "%"}
            onChange={onInputAlphaChange}
            type={"text"}
            title={""}
            label={""}
          />
        </InputFieldWrapper>
        <InputFieldWrapper>
          {rgbChannels.map((channel) => (
            <>
              <InputFieldTitle color={grayColors.BABABA}>
                {channel.label}
              </InputFieldTitle>
              <InputField
                value={channel.value}
                type={"number"}
                onChange={(value) => onChangeRGB(channel.label, value)}
                onClickChange={(value) => onChangeRGB(channel.label, value)}
              />
            </>
          ))}
        </InputFieldWrapper>
        {saturationSilder === true && (
          <Slider
            title={"채도"}
            initValue={Math.round(newColor.s)}
            min={0}
            max={100}
            step={1}
            onChange={(e) => {
              const _hsva = { ...newColor, s: e };
              handleMouseMove(_hsva);
            }}
          />
        )}
        {brightnessSlider === true && (
          <Slider
            title={"명도"}
            initValue={Math.round(newColor.v)}
            min={0}
            max={100}
            step={1}
            onChange={(e) => {
              const _hsva = { ...newColor, v: e };
              handleMouseMove(_hsva);
            }}
          />
        )}
      </Wrapper>
    );
  }
);
export default ColorContent;
