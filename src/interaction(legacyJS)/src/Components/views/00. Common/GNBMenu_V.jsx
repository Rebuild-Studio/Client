import { useState } from "react";
import { Menu } from "@mui/material";
import { observer } from "mobx-react";
import Component from "./MenuItems/Component_V";
import Setting from "./MenuItems/Setting_V";
import Help from "./MenuItems/Help_V";
import PlugIn from "./MenuItems/PlugIn_V";
const GNBMenu = observer((props) => {
  const { anchorMenu, openMenu, handleCloseMenu } = props.commonVmProps;
  const { menuName } = props;
  const [menuWidth] = useState({
    component: "140px",
    setting: "126px",
    help: "168px",
  });
  const [menuItemWidth] = useState({
    component: "130px",
    setting: "116px",
    help: "158px",
  });
  return (
    <Menu
      id={menuName}
      anchorEl={anchorMenu}
      open={openMenu}
      onClose={handleCloseMenu}
      sx={{
        "& .MuiMenuItem-root": {
          width: menuItemWidth[menuName],
          pl: "5px",
          color: "#fff",
          textAlign: "left",
          fontFamily: "SourceHanSansKR",
          fontSize: "13px",
          borderRadius: "5px",
          "&:hover": {
            backgroundColor: "#bababa",
          },
        },
        "& .MuiPaper-root": {
          width: menuWidth[menuName],
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#393939",
        },
      }}
    >
      {props.menuName === "component" && (
        <Component commonVmProps={props.commonVmProps} />
      )}
      {props.menuName === "plugin" && (
        <PlugIn commonVmProps={props.commonVmProps} />
      )}
      {props.menuName === "setting" && (
        <Setting commonVmProps={props.commonVmProps} />
      )}
      {props.menuName === "help" && (
        <Help commonVmProps={props.commonVmProps} />
      )}
    </Menu>
  );
});

export default GNBMenu;
