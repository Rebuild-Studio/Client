import { Box, Typography } from "@mui/material";
import ConvertVM from "../../../../../view_models/Convert_VM";
import MxInput from "../../gui/MxInput";
import { objectViewModel } from "../../../../../view_models/Object_VM";
import { useEffect } from "react";
import { reaction } from "mobx";

const Roundbox = (props) => {
  const { type, label, onClick, value, onChange, onKeyDown, onBlur, tabIndex } =
    props;

  return (
    <Box
      sx={{
        width: "78px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          fontFamily: "Inter",
          fontSize: "12px",
          textAlign: "left",
          color: "#e2e2e2",
        }}
      >
        {label}
        {type === "rotation" && "°"}
      </Box>

      <MxInput
        boxStyle={{
          width: "60px",
          height: "24px",
          paddingLeft: "6px",
        }}
        id={type + label}
        type="number"
        inputProps={{
          step: Number(1),
          tabIndex: tabIndex,
        }}
        step={1}
        onClick={onClick}
        onChange={onChange}
        value={value}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
      />
    </Box>
  );
};

const TabConvert = () => {
  const convertVmProps = ConvertVM();
  const {
    InitTransFormation,
    handleOnClick,
    position,
    rotation,
    scale,
    handleonChange,
    handleonKeyDown,
    handleonBlur,
  } = convertVmProps;
  useEffect(() => {
    InitTransFormation();

    const dispose = reaction(
      () => {
        if (objectViewModel.selectedObjects.length !== 0)
          return objectViewModel.selectedObjects[0];
        else return null;
      },
      () => {
        if (objectViewModel.selectedObjects.length !== 0) {
          InitTransFormation();
        }
      }
    );
    const dispose2 = reaction(
      () => {
        if (objectViewModel.selectedObjects.length !== 0)
          return objectViewModel.selectedObjects[0].props;
      },
      () => {
        if (objectViewModel.selectedObjects.length !== 0) InitTransFormation();
      }
    );
    return () => {
      dispose();
      dispose2();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const _props = [
    {
      title: "위치",
      type: "position",
      x: position.x,
      y: position.y,
      z: position.z,
    },
    {
      title: "회전",
      type: "rotation",
      x: rotation.x,
      y: rotation.y,
      z: rotation.z,
    },
    {
      title: "크기",
      type: "scale",
      x: scale.x,
      y: scale.y,
      z: scale.z,
    },
  ];
  const SingleRegex = /^[\-0-9\.]+/g;

  const propsFilter = (type) => {
    if (
      type === "scale" &&
      (objectViewModel.selectedObjects[0].hasLight ||
        objectViewModel.selectedObjects[0].type.includes("Camera"))
    ) {
      return false;
    } else if (
      (type === "rotation" || type === "scale") &&
      objectViewModel.selectedObjects[0].type === "Audio"
    ) {
      return false;
    } else {
      return true;
    }
  };
  return (
    <Box sx={{ mt: "10px" }}>
      {_props.map(
        (prop, index) =>
          propsFilter(prop["type"]) && (
            <Box key={index}>
              <Typography sx={style.textArea}>{prop["title"]}</Typography>
              <Box sx={style.boxWrapper}>
                {["x", "y", "z"].map((axis, idx) => {
                  return (
                    <Roundbox
                      key={index * 3 + (idx + 1)}
                      type={prop["type"]}
                      label={axis.toUpperCase()}
                      value={
                        typeof prop[axis] !== "undefined" &&
                        (prop[axis] === "-" ||
                          prop[axis] === "" ||
                          SingleRegex.test(prop[axis]))
                          ? prop[axis]
                          : Math.round(prop[axis] * 100) / 100
                      }
                      onChange={handleonChange}
                      onClick={handleOnClick}
                      onKeyDown={handleonKeyDown}
                      onBlur={handleonBlur}
                      tabIndex={index * 3 + (idx + 1)}
                    />
                  );
                })}
              </Box>
            </Box>
          )
      )}
    </Box>
  );
};

export default TabConvert;
const style = {
  boxWrapper: {
    mt: "10px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    mb: "16px",
  },
  textArea: {
    fontFamily: "SourceHanSansKR",
    fontSize: "12px",
    textAlign: "left",
    color: "#e2e2e2",
  },
};
