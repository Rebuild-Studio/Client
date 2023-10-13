import { useState, useRef, useCallback } from "react";
import { observer } from "mobx-react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
  IconButton,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import storeContainer from "../../../../stores/storeContainer";
import ControlRowV from "./ControlRowV";
import { ControlType } from "../../../../class/event-system/NodeControl";
import ConvertNodeCommand from "../../../../class/commands/Interaction/ConvertNodeCommand";
import SetNodeDataCommand from "../../../../class/commands/Interaction/SetNodeDataCommand";
import SetNodeObjectCommand from "../../../../class/commands/Interaction/SetNodeObjectCommand";
import CreateSocketsCommand from "../../../../class/commands/Interaction/CreateSocketsCommand";

const theme = createTheme({
  typography: {
    fontFamily: "SourceHanSansKR",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#FFFFFF",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#282828",
          color: "#FFFFFF",
          borderRadius: "15px",
        },
      },
    },
  },
});

const NodeSettingButton = observer((props) => {
  const { node, control } = props;
  const { uuid, type } = node;
  const [open, setOpen] = useState(false);
  const tobeUpdate = useRef({});
  const { eventSystem_store, string_store, interactionhistory_store } =
    storeContainer;

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleOk = useCallback(() => {
    Object.entries(tobeUpdate.current).forEach((entry) => {
      if (typeof entry[1].value !== "undefined") {
        switch (entry[1].type) {
          case ControlType.Sensor:
          case ControlType.Object:
            interactionhistory_store.execute(
              new SetNodeObjectCommand(
                eventSystem_store,
                uuid,
                entry[0],
                entry[1],
                eventSystem_store.selectedSheet
              )
            );
            break;
          case ControlType.Compose:
          case ControlType.Convert:
            interactionhistory_store.execute(
              new ConvertNodeCommand(eventSystem_store, {
                uuid: uuid,
                key: entry[0],
                value: entry[1].value,
                type: entry[1].type,
                sheetId: eventSystem_store.selectedSheet,
              })
            );
            break;
          case ControlType.Material:
            // FIXME : other case? to detect isInput
            interactionhistory_store.execute(
              new CreateSocketsCommand(eventSystem_store, {
                uuid: uuid,
                key: entry[0],
                value: entry[1].value,
                type: entry[1].type,
                isInput: node.category === "Object" ? true : false,
                sheetId: eventSystem_store.selectedSheet,
              })
            );
            break;
          case ControlType.Animation:
            interactionhistory_store.execute(
              new CreateSocketsCommand(eventSystem_store, {
                uuid: uuid,
                key: entry[0],
                value: entry[1].value,
                type: ControlType.Number,
                isInput:
                  node.category === "Object" || node.category === "Animation"
                    ? true
                    : false,
                sheetId: eventSystem_store.selectedSheet,
              })
            );
            break;
          default:
            interactionhistory_store.execute(
              new SetNodeDataCommand(
                eventSystem_store,
                uuid,
                entry[0],
                entry[1].value,
                eventSystem_store.selectedSheet
              )
            );
            break;
        }
      }
    });
    handleClose();
  }, [
    eventSystem_store,
    interactionhistory_store,
    uuid,
    handleClose,
    node.category,
  ]);

  const handleClickOpen = useCallback(() => {
    if (eventSystem_store.selectedNodes.includes(uuid)) {
      setOpen(true);
    }
  }, [setOpen, eventSystem_store.selectedNodes, uuid]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleWheel = (e) => {
    e.stopPropagation();
  };

  const size = eventSystem_store.cameraZoom * 22;

  return (
    <>
      <IconButton
        onClick={handleClickOpen}
        style={{
          padding: 0,
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        <Icon
          style={{
            height: "100%",
            width: "100%",
            color: "#fff",
          }}
        >
          <img
            data-nodeuuid={uuid}
            data-name="node"
            height="100%"
            width="100%"
            src="/legacyJS/Icons/Studio/Interaction/btn_노드설정.svg"
            alt="setting"
          />
        </Icon>
      </IconButton>
      <ThemeProvider theme={theme}>
        <Dialog maxWidth="md" open={open} onClose={handleClose}>
          <DialogTitle fontSize={25}>
            {string_store.string(type) + " 설정" || type}
          </DialogTitle>
          <DialogContent>
            <Box
              noValidate
              component="form"
              sx={style.dialogBox}
              onSubmit={handleSubmit}
              onWheel={handleWheel}
            >
              <DialogTitle fontSize={18}>{control[0][1].tooltip}</DialogTitle>
              {control.map((entry) => {
                const [key, value] = entry;
                return (
                  <Box
                    key={key}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      margin: 5,
                    }}
                  >
                    <ControlRowV
                      name={key}
                      control={value}
                      update={tobeUpdate}
                      node={node}
                      sx={{ color: "inherit" }}
                    />
                  </Box>
                );
              })}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              sx={{
                color: "#000000",
                backgroundColor: "#d4ed3e",
                "&:hover": {
                  backgroundColor: "#ABC412",
                },
                fontSize: "15px",
                right: "8px",
                bottom: "8px",
              }}
              onClick={handleOk}
            >
              적용
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </>
  );
});

export default NodeSettingButton;

const style = {
  dialogBox: {
    display: "flex",
    flexDirection: "column",
    m: "auto",
    width: "fit-content",
    "& .MuiTextField-root": { m: 1, width: "25ch" },
    "& label": {
      color: "#FFFFFF",
    },
    "& label.Mui-focused": {
      color: "#FFFFFF",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#FFFFFF",
      },
      "&:hover fieldset": {
        borderColor: "#d4ed3e",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#d4ed3e",
      },
    },
  },
};
