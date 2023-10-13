import { observer } from "mobx-react";
import { Box } from "@mui/system";
import { Input } from "@mui/material";
import storeContainer from "../../../../../stores/storeContainer";
import { useCallback, useRef, useState, useEffect } from "react";
import EditGroupNameCommand from "../../../../../class/commands/Interaction/EditGroupNameCommand";
import NodeGroupVM from "./NodeGroupVM";

const GroupTitleV = observer((props) => {
  const { group } = props;
  const { eventSystem_store, interactionhistory_store } = storeContainer;
  const ref = useRef();
  const scale = eventSystem_store.cameraZoom;
  const [readOnly, setReadOnly] = useState(true);
  const [name, setName] = useState(group.name);

  useEffect(() => {
    setName(group.name);
  }, [group.name]);

  const handleDoubleClick = () => {
    setReadOnly(false);
  };

  const handleBlur = useCallback(() => {
    if (!readOnly) {
      if (name.length === 0) {
        setName(group.name);
      } else if (group.name !== name) {
        interactionhistory_store.execute(
          new EditGroupNameCommand(
            eventSystem_store,
            eventSystem_store.selectedSheet,
            group.uuid,
            name
          )
        );
      }
      setReadOnly(true);
    }
  }, [name, readOnly]);

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleKeyDown = useCallback(
    (event) => {
      event.stopPropagation();
      if (event.key === "Enter") {
        event.preventDefault();
        handleBlur();
      }
    },
    [handleBlur]
  );

  useEffect(() => {
    const element = ref.current;
    element.addEventListener("keydown", handleKeyDown);
    return () => {
      element.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <Box
      sx={{
        backgroundColor: "rgba(48, 48, 48, 1)",
        transform: "translate(0px, 0px)",
        width: "100%",
        userSelect: "none",
        display: "block",
        borderTopLeftRadius: `${8 * scale}px`,
        borderTopRightRadius: `${8 * scale}px`,
      }}
      style={{
        height: `${30 * scale}px`,
      }}
      data-name="group"
      data-groupuuid={group.uuid}
    >
      <Input
        ref={ref}
        onDoubleClick={handleDoubleClick}
        onBlur={handleBlur}
        onChange={handleChange}
        value={name}
        disableUnderline={true}
        readOnly={readOnly}
        fullWidth={true}
        multiline={false}
        spellCheck={false}
        sx={{
          backgroundColor: "white",
          cursor: "pointer",
          height: "100%",
        }}
        inputProps={{
          style: {
            pointerEvents: "none",
            cursor: "pointer",
            padding: "0px 0px 0px 12px",
            textOverflow: "ellipsis",
            //fontFamily: "SourceHanSansKR",
            fontFamily: "sans-serif",
            color: "white",
            fontSize: "12px",
            fontWeight: "500",
            fontStretch: "normal",
            fontStyle: "normal",
          },
        }}
        data-name="group"
        data-groupuuid={group.uuid}
      />
    </Box>
  );
});

const NodeGroupV = observer((props) => {
  const { group } = props;
  const { eventSystem_store } = storeContainer;
  const scale = eventSystem_store.cameraZoom;

  const padding = 20 * scale;
  const titleHeight = 30 * scale;

  const { position, size } = NodeGroupVM(group, padding, titleHeight, scale);

  const ref = useRef();

  const outline = eventSystem_store
    .getSelectedSheet()
    .isSelectedGroup(group.uuid)
    ? "1px solid rgba(147, 236, 79, 1)"
    : "1px solid rgba(0, 0, 0, 1)";

  return (
    <Box
      sx={{
        position: "absolute",
        backgroundColor: "rgba(28, 28, 28, 1)",
        display: "flex",
        cursor: "pointer",
        opacity: "1",
        boxSizing: "content-box",
        borderRadius: `${8 * scale}px`,
        userSelect: "none",
        outline: outline,
        zIndex: "-2",
      }}
      style={{
        width: `${size[0]}px`,
        height: `${size[1]}px`,
        transform: `translate(${position[0]}px, 
          ${position[1]}px)`,
      }}
      ref={ref}
      data-name="group"
      data-groupuuid={group.uuid}
      className="Group"
    >
      <GroupTitleV group={group} />
    </Box>
  );
});

export default NodeGroupV;
