import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import CreateNodeMenuItemButton from "./CreateNodeMenuItemButton";
import useIcon from "../../../../hooks/useIcon";

/**
 *
 * @param backgroundImageName
 * @param items
 * @param width
 * @param height
 * @returns {JSX.Element}
 *
 * @description
 * Some buttons on TopBarInteractionPanel can create subNodes
 * This Component is a wrapper for those buttons that can create subNodes
 */

const CreateNodeMenuButton = ({ backgroundImageName, items, width = "50px", height = "60px" }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const path = useIcon(backgroundImageName);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={style.iconButton(width, height, path)}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{
          vertical: -2,
          horizontal: "left",
        }}
        MenuListProps={{
          style: {
            padding: "5px 5px 0 5px",
          },
        }}
        sx={style.menu}
      >
        {items.map((item) => {
          return (
            <CreateNodeMenuItemButton
              key={`CraeteNodeMenuItemButton ${item.label}`}
              node={item.node}
              labelKey={item.label}
              closer={handleClose}
            />
          );
        })}
      </Menu>
    </>
  );
};
export default CreateNodeMenuButton;

const style = {
  menu: {
    "& .MuiMenuItem-root": {
      color: "#fff",
      textAlign: "left",
      fontFamily: "SourceHanSansKR",
      fontSize: "12px",
      pl: "5px",
      pt: "5px",
      pb: "5px",
      mb: "5px",
      height: "25px",
      "&:hover": {
        backgroundColor: "#494949",
      },
    },
    "& .MuiPaper-root": {
      display: "flex",
      justifyContent: "center",
      backgroundColor: "#393939",
    },
  },

  iconButton: (width, height, path) => ({
    padding: "0px",
    width: { width },
    height: { height },
    background: path.root,
    borderRadius: 0,
    "&:hover": {
      background: path.active,
      borderRadius: 0,
    },
  }),
};
