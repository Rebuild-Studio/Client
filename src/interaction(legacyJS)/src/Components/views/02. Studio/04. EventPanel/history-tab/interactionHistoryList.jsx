import React from "react";
import { Box, Button, Grid, Tooltip } from "@mui/material";
import { observer } from "mobx-react-lite";
import storeContainer from "../../../../stores/storeContainer";

const InitialState = (props) => {
  const { arrayObject } = props;
  const object = { name: "InitialState", getDetailData: () => [], id: -1 };
  return (
    <UndoButton
      object={object}
      isTopUndoHistory={Array.from(arrayObject).length === 0}
    />
  );
};

const UndoButton = (props) => {
  const { isTopUndoHistory } = props;
  return (
    <HistoryButton
      {...props}
      color={isTopUndoHistory ? "#d4ed3e" : "#fff"}
      url={
        isTopUndoHistory
          ? "/legacyJS/Icons/Studio/icon_표시_활성화"
          : "/legacyJS/Icons/Studio/icon_표시"
      }
    />
  );
};

const RedoButton = (props) => {
  return (
    <HistoryButton {...props} color="#aaa" url="/Icons/Studio/icon_비표시" />
  );
};

const HistoryButton = observer((props) => {
  const { interactionhistory_store, string_store } = storeContainer;
  const { object, color, url } = props;
  return (
    <Tooltip
      title={string_store.convert(
        object.name + "Detail",
        object.getDetailData()
      )}
      placement="right"
    >
      <Box sx={style.buttonWrapper}>
        <img src={`${url}.png`} alt={url} />
        <Button
          disableRipple
          sx={style.button}
          onClick={() => interactionhistory_store.goToState(object.id)}
        >
          <Box style={{ color: color }}>
            {string_store.string(object.name)
              ? string_store.string(object.name)
              : object.name}
          </Box>
        </Button>
      </Box>
    </Tooltip>
  );
});

const UndoList = observer(() => {
  const { interactionhistory_store } = storeContainer;
  return (
    <List
      arrayObject={interactionhistory_store.undoArray}
      elementKey="interactionUndo"
      ButtonComponent={UndoButton}
    />
  );
});

const RedoList = observer(() => {
  const { interactionhistory_store } = storeContainer;
  return (
    <List
      arrayObject={interactionhistory_store.redoArray}
      elementKey="interactionRedo"
      ButtonComponent={RedoButton}
    />
  );
});

const List = observer((props) => {
  const { arrayObject, elementKey, ButtonComponent } = props;
  return (
    <>
      {elementKey === "interactionUndo" && (
        <InitialState arrayObject={arrayObject} />
      )}
      {Array.from(arrayObject).map((object, index, origin) => (
        <ButtonComponent
          key={elementKey + index}
          object={object}
          isTopUndoHistory={
            elementKey === "interactionUndo" && index === origin.length - 1
          }
        />
      ))}
    </>
  );
});

const InteractionHistoryList = () => {
  return (
    <Grid
      container
      direction="column-reverse"
      justifyContent="space-evenly"
      alignItems="flex-start"
      sx={style.grid}
      style={{ display: "flex", justifyContent: "flex-start" }}
    >
      {/* history list 출력 */}
      <UndoList />
      <RedoList />
    </Grid>
  );
};
export default InteractionHistoryList;

const style = {
  grid: {
    mt: "10px",
    ml: "11px",
    overflow: "auto",
    whiteSpace: "nowrap",
    "&::-webkit-scrollbar": { width: 0 },
  },
  buttonWrapper: {
    boxSizing: "border-box",
    height: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  button: {
    fontFamily: "SourceHanSansKR",
    fontSize: "12px",
    fontWeight: "300",
    textAlign: "left",
    textTransform: "none",
    padding: 0,
  },
  tooltip: {
    color: "#fff",
    bgcolor: "#8B87FF",
    border: "1px solid #8B87FF",
    borderRadius: 3,
    bottom: "5px !important",
  },
  arrow: {
    "&::before": {
      backgroundColor: "#8B87FF",
      border: "1px solid #8B87FF",
    },
  },
  tooltipAndArrow: function () {
    return {
      tooltip: {
        sx: style.tooltip,
      },
      arrow: {
        sx: style.arrow,
      },
    };
  },
};
