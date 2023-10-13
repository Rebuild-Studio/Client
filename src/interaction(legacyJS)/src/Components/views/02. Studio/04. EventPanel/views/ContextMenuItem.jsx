import { useState, useCallback } from "react";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import storeContainer from "../../../../stores/storeContainer";

export default function ContextMenuItem(props) {
  const { disabled, onClick, stringKey, ...restProps } = props;
  const { string_store, eventSystem_store } = storeContainer;
  const [_disabled, setDisabled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const _onClick = useCallback(
    (event) => {
      setDisabled(true);
      onClick(event);
      eventSystem_store.closeContextMenu();
    },
    [onClick, setDisabled, eventSystem_store]
  );
  return (
    <MenuItem
      disabled={_disabled || disabled}
      onClick={_onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        width: "170px",
        height: "29px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "4px",
        padding: "1px 8px 1px 8px",
        objectFit: "contain",
        borderRadius: "4px",
        backgroundColor: "#282828",
        ":hover": {
          backgroundColor: "#e1f853",
        },
      }}
      {...restProps}
    >
      <Typography
        sx={{
          fontSize: "12px",
          fontWeight: 500,
          fontFamily: "sans-serif",
          fontStretch: "normal",
          fontStyle: "normal",
          lineHeight: "normal",
          letterSpacing: "normal",
          textAlign: "left",
          flexGrow: "0",
          color: isHovered ? "#101728" : "#f5f5f5",
        }}
      >
        {string_store.string(stringKey)}
      </Typography>
      <Typography
        sx={{
          fontSize: "12px",
          fontWeight: 500,
          fontFamily: "sans-serif",
          fontStretch: "normal",
          fontStyle: "normal",
          lineHeight: "normal",
          letterSpacing: "normal",
          textAlign: "right",
          flexGrow: "0",
          color: isHovered ? "#101728" : "#535353",
        }}
      >
        {string_store.string(stringKey + "Hotkey")}
      </Typography>
    </MenuItem>
  );
}
