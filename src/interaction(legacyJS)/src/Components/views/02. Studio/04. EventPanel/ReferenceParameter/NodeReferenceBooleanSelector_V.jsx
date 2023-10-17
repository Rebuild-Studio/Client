import { Box, MenuItem, Select, Tooltip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { eventSystem_store } from "../../../../stores/Interaction_Stores";
import { observer } from "mobx-react";

const NodeReferenceBooleanSelector = ({ value, setValue, tooltipMessage }) => {
  const classes = useStyles();
  return (
    <>
      <Tooltip
        sx={{ display: "flex", alignSelf: "center" }}
        componentsProps={style.tooltipAndArrow(eventSystem_store.cameraZoom)}
        arrow
        disableInteractive
        placement="top"
        title={tooltipMessage}
      >
        <Box sx={style.SelectWrapper}>
          <Select
            value={value}
            label="group"
            onChange={(e) => setValue(e.target.value)}
            sx={style.SelectArea(eventSystem_store.cameraZoom)}
            MenuProps={{
              sx: style.MenuProps,
              classes: { paper: classes.menuPaper },
            }}
          >
            <MenuItem sx={style.MenuItemArea(eventSystem_store.cameraZoom)} value={true}>
              참
            </MenuItem>
            <MenuItem sx={style.MenuItemArea(eventSystem_store.cameraZoom)} value={false}>
              거짓
            </MenuItem>
          </Select>
        </Box>

      </Tooltip>
    </>
  )
};

export default observer(NodeReferenceBooleanSelector);

const useStyles = makeStyles(() => ({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "none",
      },
    },
  },
  menuPaper: {
    minHeight: "0px",
    minWidth: "0px",
    backgroundColor: "#393939",
    "&::-webkit-scrollbar": { width: 0 },
  },
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


  SelectWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "center",
  },
  MenuProps: {
    width: "100%",
    zIndex: 10000,
    display: "flex",
    position: "absolute",
    mt: "-10px",
  },
  SelectArea: function (unit) {
    return {
      height: `${24 * unit}px`,
      width: `${100 * unit}px`,
      fontFamily: "SpoqaHanSansNeo",
      fontSize: "inherit",
      fontWeight: 500,
      textAlign: "left",
      backgroundColor: "#282828",
      color: "#e2e2e2",
      "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline ": {
        border: "none",
      },
      "& .MuiSvgIcon-root": {
        color: "#e2e2e2",
      },
    }
  },

  MenuItemArea: function (unit) {
    return {
      fontFamily: "SpoqaHanSansNeo",
      fontSize: `${unit * 0.8}rem`,
      textAlign: "left",
      backgroundColor: "#393939",
      color: "#e2e2e2",
    }
  },
}

