import { Button, Tooltip } from "@mui/material";
import { eventSystem_store } from "../../../../stores/Interaction_Stores";
import * as React from "react";
import { useState } from "react";
import { makeStyles } from "@mui/styles";
import { observer } from "mobx-react";

const NodeReferenceKeyboardInputButton = ({ value, setValue, tooltipMessage }) => {
  const { blinking } = useStyles();
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(true);
  }
  const handleKeyUp = (event) => {
    if (clicked) {
      setValue(event.code);
      setClicked(false);
    }
  }

  return (
    <>
      <Tooltip
        sx={{ display: "flex", alignSelf: "center" }}
        componentsProps={style.tooltipAndArrow(eventSystem_store.cameraZoom)}
        arrow
        disableInteractive
        placement="top"
        title={value === "input" ? tooltipMessage : `${value}를 누를시 액션이 이루어집니다`}
      >
        <Button
          variant="contained"
          onClick={handleClick}
          onKeyUp={handleKeyUp}
          className={clicked ? blinking : ""}
          sx={{
            height: `${24 * eventSystem_store.cameraZoom}px`,
            width: `${100 * eventSystem_store.cameraZoom}px`,
            fontSize: `${0.8 * eventSystem_store.cameraZoom}rem`,
            backgroundColor: clicked ? "#ABC412" : "#d4ed3e",
            color: clicked ? "#3a3a3a" : "#000000",
            transition: "background-color 0.2s",
            "&:hover": {
              color: clicked ? "#3a3a3a" : "#000000",
              backgroundColor: "#ABC412",
            },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textTransform: "none",
            animation: clicked ? "blinking 1s infinite" : "none"
          }}
        >
          {value}
        </Button>
      </Tooltip>
    </>
  )
};

export default observer(NodeReferenceKeyboardInputButton);

const useStyles = makeStyles((theme) => ({
  blinking: {
    animation: `$blinking 1s infinite`
  },
  "@keyframes blinking": {
    "0%": {
      backgroundColor: "#9db809"
    },
    "50%": {
      backgroundColor: "#d4ed3e"
    },
    "100%": {
      backgroundColor: "#9db809"
    }
  }
}));

const style = {
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

}

