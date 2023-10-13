import { useCallback, useState } from "react";
import { observer } from "mobx-react";
import storeContainer from "../../stores/storeContainer";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import styled from "@emotion/styled";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
} from "@mui/material";
import SelectSheetCommand from "../../class/commands/Interaction/SelectSheetCommand";
import CreateSheetCommand from "../../class/commands/Interaction/CreateSheetCommand";
import HideSheetCommand from "../../class/commands/Interaction/HideSheetCommand";
import SetSheetOrderCommand from "../../class/commands/Interaction/SetSheetOrderCommand";
import DeleteSheetCommand from "../../class/commands/Interaction/DeleteSheetCommand";
import SetSheetNameCommand from "../../class/commands/Interaction/SetSheetNameCommand";
import ConvertToFunctionCommand from "../../class/commands/Interaction/ConvertToFunctionCommand";

const Sheet = (props) => {
  const [isDeleteDialog, setIsDeleteDialog] = useState(false);
  const [isRenameDialog, setIsRenameDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { sheet, isActive, onSelectSheet } = props;
  const { eventSystem_store, interactionhistory_store, string_store } =
    storeContainer;

  const handleMenuButtonClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openRenameDialog = () => {
    handleClose();
    setIsRenameDialog(true);
  };

  const closeRenameDialog = () => {
    setIsRenameDialog(false);
  };

  const onConvertSheet = () => {
    handleClose();
    interactionhistory_store.execute(
      new ConvertToFunctionCommand(eventSystem_store, sheet.uuid)
    );
  };

  const onHideSheet = () => {
    handleClose();
    interactionhistory_store.execute(
      new HideSheetCommand(eventSystem_store, sheet.uuid)
    );
  };

  const onMoveRight = () => {
    handleClose();
    interactionhistory_store.execute(
      new SetSheetOrderCommand(
        eventSystem_store,
        sheet.uuid,
        eventSystem_store.getSheetOrderByUuid(sheet.uuid) + 1
      )
    );
  };

  const onMoveLeft = () => {
    handleClose();
    interactionhistory_store.execute(
      new SetSheetOrderCommand(
        eventSystem_store,
        sheet.uuid,
        eventSystem_store.getSheetOrderByUuid(sheet.uuid) - 1
      )
    );
  };

  const openDeleteDialog = () => {
    handleClose();
    setIsDeleteDialog(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialog(false);
  };

  const onRename = (text) => {
    if (sheet.name !== text) {
      interactionhistory_store.execute(
        new SetSheetNameCommand(eventSystem_store, sheet.uuid, text)
      );
    }
    setIsRenameDialog(false);
  };

  const onDelete = () => {
    interactionhistory_store.execute(
      new DeleteSheetCommand(eventSystem_store, sheet.uuid)
    );
    setIsDeleteDialog(false);
  };

  const visibleSheets = eventSystem_store.visibleSheetOrder;
  const visibleLength = visibleSheets.length;

  return (
    <>
      <Tab
        value={sheet.uuid}
        label={sheet.name}
        onClick={() => {
          onSelectSheet(sheet.uuid);
        }}
        onContextMenu={handleMenuButtonClick}
        sx={{
          minWidth: "max-content",
          maxHeight: "40px",
          height: "40px",
          fontSize: "12px",
          lineHeight: "1.33",
          boxSizing: "border-box",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: "10px",
          paddingRight: "10px",
          opacity: 1,
        }}
        style={{
          color: isActive ? "#d4ed3e" : "#fff",
          backgroundColor: isActive ? "rgba(214, 236, 79, 0.2)" : "#303030",
        }}
      />
      {/* 메뉴 */}
      <Menu
        id={`sheet-button-${sheet.uuid}`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: -4, horizontal: "left" }}
        transformOrigin={{ vertical: "bottom", horizontal: "left" }}
        MenuListProps={{
          style: {
            padding: "5px 5px 0 5px",
          },
        }}
        sx={{
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
        }}
      >
        <MenuItem onClick={openRenameDialog}>
          {string_store.string("RenameSheet")}
        </MenuItem>
        <MenuItem onClick={onConvertSheet}>
          {string_store.string("ConvertToFunction")}
        </MenuItem>
        {visibleLength > 1 && (
          <MenuItem onClick={onHideSheet}>
            {string_store.string("HideSheet")}
          </MenuItem>
        )}
        {sheet.uuid !== visibleSheets.at(-1) && (
          <MenuItem onClick={onMoveRight}>
            {string_store.string("MoveSheetRight")}
          </MenuItem>
        )}
        {sheet.uuid !== visibleSheets[0] && (
          <MenuItem onClick={onMoveLeft}>
            {string_store.string("MoveSheetLeft")}
          </MenuItem>
        )}
        {visibleLength > 1 && (
          <MenuItem onClick={openDeleteDialog}>
            {string_store.string("DeleteSheet")}
          </MenuItem>
        )}
      </Menu>
      {/* 다이얼로그 */}
      <RenameDialog
        open={isRenameDialog}
        handleClose={closeRenameDialog}
        sheetName={sheet.name}
        onRename={onRename}
        sheetUuid={sheet.uuid}
      />
      <DeleteDialog
        open={isDeleteDialog}
        handleClose={closeDeleteDialog}
        onDelete={onDelete}
        sheetName={sheet.name}
      />
    </>
  );
};

const SheetPanel = observer(() => {
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const { eventSystem_store, interactionhistory_store } = storeContainer;

  const handleMenuButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSheetButtonClick = (args) => {
    onSelectSheet(args);
  };

  const handleSheetMenuClick = (args) => {
    onSelectSheet(args);
    handleClose();
  };

  const onSelectSheet = useCallback(
    (uuid) => {
      if (!eventSystem_store.isSelectedSheet(uuid)) {
        interactionhistory_store.execute(
          new SelectSheetCommand(eventSystem_store, uuid)
        );
      }
    },
    [eventSystem_store, interactionhistory_store]
  );

  const onCreateSheet = useCallback(() => {
    interactionhistory_store.execute(new CreateSheetCommand(eventSystem_store));
  }, [eventSystem_store, interactionhistory_store]);

  const filteredSheetOrder = eventSystem_store.visibleSheetOrder;

  return (
    <>
      <Container>
        {/* 시트목록, 시트추가 버튼 */}
        <SheetMenuButton
          url="/legacyJS/Icons/Studio/icon_menu"
          onClick={handleMenuButtonClick}
        />
        {/* 시트들 */}
        <Box style={{ maxWidth: `calc(100vw - ${240}px)`, maxHeight: "40px" }}>
          <Tabs
            value={eventSystem_store.visibleSheetOrder.indexOf(
              eventSystem_store.selectedSheet
            )}
            variant="scrollable"
            scrollButtons={true}
            TabScrollButtonProps={{
              sx: {
                borderRadius: "4px",
                backgroundColor: "#3A3A3A",
                color: "#fff",
                "&.Mui-disabled": {
                  display: "none",
                },
              },
            }}
          >
            {filteredSheetOrder.map((uuid) => (
              <Sheet
                className="Sheet"
                data-name="sheet"
                data-sheetuuid={uuid}
                key={uuid}
                sheet={eventSystem_store.sheets[uuid]}
                isActive={eventSystem_store.isSelectedSheet(uuid)}
                onSelectSheet={handleSheetButtonClick}
              />
            ))}
          </Tabs>
        </Box>
      </Container>
      <IconButton
        onClick={onCreateSheet}
        sx={{
          width: "40px",
          height: "40px",
          padding: 0,
          background: "#303030",
          borderRadius: "0 4px 0 0",
          "&:hover": {
            backgroundColor: "#303030",
          },
        }}
      >
        <Box
          sx={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            "&:hover": {
              backgroundColor: "#494949",
            },
          }}
        >
          <img
            src="legacyJS/Icons/Studio/icon_plus-solid.svg"
            alt="icon_plus-solid"
          />
        </Box>
      </IconButton>
      {/* 메뉴 */}
      <Menu
        id="sheet-menu"
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleClose}
        onWheel={(e) => {
          e.stopPropagation();
        }}
        anchorOrigin={{ vertical: -4, horizontal: "left" }}
        transformOrigin={{ vertical: "bottom", horizontal: "left" }}
        sx={{
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
        }}
      >
        {eventSystem_store.sheetOrder.map((uuid) => (
          <MenuItem
            key={`sheet-menu-item-${uuid}`}
            style={{
              color: eventSystem_store.sheets[uuid].hidden ? "#999" : "#fff",
            }}
            onClick={() => handleSheetMenuClick(uuid)}
            selected={eventSystem_store.isSelectedSheet(uuid)}
          >
            {eventSystem_store.sheets[uuid].name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
});

const DeleteDialog = observer(({ open, handleClose, onDelete, sheetName }) => {
  const { string_store } = storeContainer;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="delete-dialog-title"
      PaperProps={{
        sx: {
          border: "0.5px solid #393939",
          backgroundColor: "#282828",
          padding: 3,
        },
      }}
    >
      <DialogTitle
        sx={{ color: "#fff", fontSize: "15px", padding: 1 }}
        id="delete-dialog-title"
      >
        {string_store.string("DeleteSheetTitle")}
      </DialogTitle>
      <DialogActions>
        <SheetDialogButton
          variant="contained"
          backgroundColor="#282828"
          borderColor="#626262"
          hoverColor="#494949"
          fontColor="#fff"
          onClick={handleClose}
        >
          {string_store.string("Cancel")}
        </SheetDialogButton>
        <SheetDialogButton
          variant="contained"
          onClick={() => {
            onDelete();
          }}
          autoFocus
        >
          {string_store.string("Accept")}
        </SheetDialogButton>
      </DialogActions>
    </Dialog>
  );
});

const RenameDialog = ({ open, handleClose, onRename, sheetName }) => {
  const { string_store } = storeContainer;
  const [text, setText] = useState(sheetName);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="rename-dialog-title"
      aria-describedby="rename-dialog-description"
      PaperProps={{
        sx: {
          border: "0.5px solid #393939",
          backgroundColor: "#282828",
          padding: 3,
        },
      }}
    >
      <DialogTitle
        sx={{ color: "#fff", fontSize: "15px", padding: 1 }}
        id="rename-dialog-title"
      >
        {string_store.string("RenameSheet")}
      </DialogTitle>
      <DialogContent sx={{ padding: 1 }} id="rename-dialog-description">
        <TextField
          autoFocus
          margin="dense"
          type="text"
          fullWidth
          variant="standard"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          inputProps={{ maxLength: 12 }}
          sx={{
            "& > .MuiInput-root": {
              fontSize: "14px",
              color: "#fff",
              borderBottom: "1px solid #d4ed3e",
            },
            "& > .MuiInput-root.Mui-focused:before": {
              borderBottom: "2px solid #c0d927",
            },
            "& > .MuiInput-root.Mui-focused:after": {
              borderBottom: "2px solid #c0d927",
            },
          }}
        />
      </DialogContent>
      <DialogActions>
        <SheetDialogButton
          variant="contained"
          backgroundColor="#282828"
          borderColor="#626262"
          hoverColor="#494949"
          fontColor="#fff"
          onClick={handleClose}
        >
          {string_store.string("Cancel")}
        </SheetDialogButton>
        <SheetDialogButton
          variant="contained"
          onClick={() => {
            onRename(text);
          }}
        >
          {string_store.string("Accept")}
        </SheetDialogButton>
      </DialogActions>
    </Dialog>
  );
};

const SheetMenuButton = (props) => {
  const { url, ...rest } = props;
  const path = {
    root: `no-repeat center url(${url}.svg)`,
    hover: `no-repeat center url(${url}_활성화.svg)`,
  };

  return (
    <IconButton
      sx={{
        padding: 0,
        width: "40px",
        background: path.root,
        backgroundColor: "#303030",
        borderRadius: 0,
        "&:hover": {
          background: path.hover,
          backgroundColor: "#303030",
        },
      }}
      {...rest}
    />
  );
};

// CSS

const Container = styled.div`
  display: flex;
  background-color: #000;
`;

const SheetDialogButton = styled(Button, {
  shouldForwardProp: (prop) =>
    prop !== "backgroundColor" &&
    prop !== "borderColor" &&
    prop !== "hoverColor" &&
    prop !== "fontColor",
})(
  ({
    backgroundColor = "#d4ed3e",
    borderColor = "#d4ed3e",
    hoverColor = "#c0d927",
    fontColor = "#000",
  }) => ({
    width: "124px",
    height: "34px",
    fontSize: "12px",
    boxSizing: "border-box",
    boxShadow: "none",
    borderRadius: "6px",
    border: `0.5px solid ${borderColor}`,
    color: fontColor,
    backgroundColor,
    "&:hover": {
      backgroundColor: hoverColor,
      boxShadow: "none",
    },
  })
);

export default SheetPanel;
