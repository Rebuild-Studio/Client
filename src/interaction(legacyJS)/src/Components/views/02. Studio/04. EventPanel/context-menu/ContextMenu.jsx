import Menu from "@mui/material/Menu";
import { observer } from "mobx-react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import storeContainer from "../../../../stores/storeContainer";
import ContextMenuList from "./ContextMenuList";

const ContextMenu = observer((props) => {
  const { items, type } = props;
  const { eventSystem_store } = storeContainer;
  const position = eventSystem_store.contextMenuPosition;
  const handleClose = () => {
    eventSystem_store.closeContextMenu();
  };
  const onBackdropContextMenu = (event) => {
    event.preventDefault();
    handleClose();
  };
  return (
    <ThemeProvider theme={theme}>
      <Menu
        open={eventSystem_store.contextMenuType === type}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={{ top: position[1], left: position[0] }}
        BackdropProps={{
          invisible: true,
          onContextMenu: onBackdropContextMenu,
        }}
      >
        {items.map((item, index) => {
          return (
            <ContextMenuList
              key={`ContextMenuList ${index}`}
              items={item}
              isDivided={index !== items.length - 1}
            />
          );
        })}
      </Menu>
    </ThemeProvider>
  );
});

export default ContextMenu;

const theme = createTheme({
  components: {
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: "4px",
          overflow: "hidden",
          backgroundColor: "#282828",
        },
        list: {
          borderRadius: "4px",
          backgroundColor: "#282828",
          padding: "0px",
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          borderRadius: "4px",
          backgroundColor: "#282828",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        divider: {
          marginTop: "4px",
          backgroundColor: "white",
        },
      },
    },
  },
});
