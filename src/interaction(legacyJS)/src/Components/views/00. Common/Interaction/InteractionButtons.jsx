import { Button, Tooltip } from "@mui/material";
import { observer } from "mobx-react";
import storeContainer from "../../../stores/storeContainer";

const InteractionUndoButton = observer(() => {
  const { interactionhistory_store } = storeContainer;
  return (
    <InteractionHistoryButton
      type="undo"
      handleClick={() => interactionhistory_store.undo()}
      array={interactionhistory_store.undoArray}
      ml={1}
    />
  );
});

const InteractionRedoButton = observer(() => {
  const { interactionhistory_store } = storeContainer;
  return (
    <InteractionHistoryButton
      type="redo"
      handleClick={() => interactionhistory_store.redo()}
      array={interactionhistory_store.redoArray}
      ml={-2}
    />
  );
});

const InteractionHistoryButton = observer((props) => {
  const { type, handleClick, array, ml } = props;
  const { string_store } = storeContainer;
  return (
    <Tooltip
      title={string_store.string(type)}
      placement="bottom"
      arrow
      componentsProps={style}
      sx={{
        ml: ml,
      }}
    >
      <Button disableRipple onClick={handleClick}>
        <img
          src={`/Icons/Studio/${type}.png`}
          alt={type}
          style={{
            opacity: array.length > 0 ? 1.0 : 0.4,
          }}
        />
      </Button>
    </Tooltip>
  );
});

const InteractionTopBarDepth2Buttons = () => {
  return (
    <>
      <InteractionUndoButton />
      <InteractionRedoButton />
    </>
  );
};

export default InteractionTopBarDepth2Buttons;

const style = {
  tooltip: {
    sx: {
      color: "#fff",
      bgcolor: "#8B87FF",
      border: "1px solid #8B87FF",
      borderRadius: 3,
      bottom: "5px !important",
    },
  },
  arrow: {
    sx: {
      "&::before": {
        backgroundColor: "#8B87FF",
        border: "1px solid #8B87FF",
      },
    },
  },
};
