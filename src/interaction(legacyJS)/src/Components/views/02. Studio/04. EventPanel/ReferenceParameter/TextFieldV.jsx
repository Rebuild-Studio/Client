import { useState } from "react";
import { eventSystem_store } from "../../../../stores/Interaction_Stores";
import { Box, IconButton, Tooltip } from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import { observer } from "mobx-react";

const ReferenceTextField = ({ value, setValue, tooltipMessage, refType }) => {
  const [focus, setFocus] = useState(false);

  const onInputChange = (event) => {
    const inputValue = event.target.value;
    const re = /^[0-9\b.]+$/;

    if (inputValue === "") {
      // 빈칸일 경우
      setValue("");
      return;
    }
    if (
      refType === "Number" &&
      re.test(inputValue) &&
      inputValue.split(".").length - 1 <= 1
    ) {
      setValue(Number(inputValue));
    } else if (refType === "String") {
      setValue(inputValue);
    }
  };

  return (
    <Tooltip
      componentsProps={style.tooltipAndArrow()}
      arrow
      disableInteractive
      placement="top"
      title={tooltipMessage}
    >
      <Box sx={style.inputAndArrowWrapper(eventSystem_store.cameraZoom)}>
        <input
          type={refType}
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            fontSize: "inherit",
            boxSizing: "border-box",
            color: "#fff",
            backgroundColor: "#282828",
            border: 'none',
            boxShadow: 'none',
            outline: `${focus ? "solid 2.5px #e1f853" : "none"}`,
            borderRadius: `${2 * eventSystem_store.cameraZoom}px`,
          }}
          value={value}
          onChange={onInputChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
        {refType === "Number" && (
          <Box sx={style.buttonField}>
            <IconButton
              sx={style.iconButtonStyle}
              onClick={() => setValue(Number(value) + 1)}
            >
              <KeyboardArrowUpRoundedIcon
                sx={{
                  color: "#e1f853",
                  fontSize: `${10 * eventSystem_store.cameraZoom}px`,
                }}
              />
            </IconButton>
            <IconButton
              sx={style.iconButtonStyle}
              onClick={() => setValue(Number(value) - 1)}
            >
              <KeyboardArrowDownRoundedIcon
                sx={{
                  color: "#e1f853",
                  fontSize: `${10 * eventSystem_store.cameraZoom}px`,
                }}
              />
            </IconButton>
          </Box>
        )}
      </Box>
    </Tooltip>
  );
};

export default observer(ReferenceTextField);

const style = {
  inputAndArrowWrapper: function (unit) {
    return {
      display: "flex",
      position: "relative",
      height: `${24 * unit}px`,
      width: `${100 * unit}px`,
      alignSelf: "center",
    };
  },
  buttonField: {
    position: "absolute",
    right: "0",
    width: "20%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#222222",
  },
  iconButtonStyle: {
    padding: 0,
    minWidth: 0,
    minHeight: 0,
    width: "100%",
    height: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  tooltip: {
    color: "#e1f853",
    bgcolor: "#282828CC",
    border: "1px solid grey",
    borderRadius: 3,
    bottom: "5px !important",
  },
  arrow: {
    "&::before": {
      backgroundColor: "#282828CC",
      border: "1px solid grey",
    },
  },
  tooltipAndArrow: function () {
    return {
      tooltip: {
        sx: style.tooltip,
      },
      arrow: {
        sx: style.arrow,
      },
    };
  },
};
