import React from "react";

export default function Common_VM() {
  const [open, setOpen] = React.useState(false);
  const [tempValue, setTempValue] = React.useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [anchorMenu, setAnchorMenu] = React.useState(null);
  const [menuName, setMenuName] = React.useState("");
  const openMenu = Boolean(anchorMenu);
  const handleClickMenu = (event) => {
    if (
      event.currentTarget.value !== null &&
      typeof event.currentTarget.value !== "undefined"
    ) {
      setMenuName(event.currentTarget.value);
    }
    setAnchorMenu(event.currentTarget);
  };

  const handleClickMenuCustom = (el) => {
    setAnchorMenu(el);
  };

  const handleCloseMenu = () => {
    setAnchorMenu(null);
  };

  const AccordionHandler = (bool) => {
    bool ? handleOpen() : handleClose();
  };
  return {
    tempValue,
    setTempValue,
    open,
    handleOpen,
    handleClose,
    openMenu,
    anchorMenu,
    handleClickMenu,
    handleCloseMenu,
    handleClickMenuCustom,
    menuName,
    AccordionHandler,
  };
}
