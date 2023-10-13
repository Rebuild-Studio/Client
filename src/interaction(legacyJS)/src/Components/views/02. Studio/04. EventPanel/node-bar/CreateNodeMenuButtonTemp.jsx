import { useState } from "react";
import { observer } from "mobx-react-lite";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import storeContainer from "../../../../stores/storeContainer";
import CreateNodeMenuItemButton from "./CreateNodeMenuItemButton";

const CreateNodeMenuButtonTemp = observer((props) => {
  const { string_store } = storeContainer;
  const { items, Icon, labelKey, width = "50px", height = "60px" } = props;
  const [anchorEl, setAnchorEl] = useState(null);
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
        sx={{
          padding: "0px",
          width: { width },
          height: { height },
          borderRadius: 2,
          color: "#BBBBBB",
          "&:hover": {
            color: "#BBBB00",
            backgroundColor: "#444444",
          },
        }}
      >
        <div>
          <Icon style={{ marginTop: "0.2em" }} />
          <Box fontWeight="bold" fontSize="0.1em">
            {labelKey && string_store.string(labelKey)}
          </Box>
        </div>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {items.map((item) => {
          return (
            <CreateNodeMenuItemButton
              key={`CraeteNodeMenuItemButton ${item.label}`}
              type={item.type}
              labelKey={item.label}
              closer={handleClose}
            />
          );
        })}
      </Menu>
    </>
  );
});
export default CreateNodeMenuButtonTemp;
