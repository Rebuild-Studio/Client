import { useState } from "react";
import { eventSystem_store } from "../../../../stores/Interaction_Stores"
import { Button, Tooltip } from "@mui/material";
import MaterialTemplate from "./MaterialTemplate_V";
import MaterialTemplateVM from "../../../../view_models/06. ObjectEdit/MaterialTemplate_VM";
import { observer } from "mobx-react";


const NodeReferenceMaterialSelector = ({ value, setValue, tooltipMessage }) => {
  const [anchorMenu, setAnchorMenu] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <Tooltip
        componentsProps={style.tooltipAndArrow()}
        arrow
        disableInteractive
        placement="top"
        title={tooltipMessage}
      >
        <Button
          sx={style.MaterailTemplateBtn(
            //머터리얼 선택에 대한 기능(현재미구현) 구현완료시, 아래 하드코딩을 수정해야 함
            MaterialTemplateVM.materialTemplates[value][1],
            eventSystem_store.cameraZoom
          )}
          onClick={(e) => {
            setAnchorMenu(e.currentTarget);
            setOpenMenu(true);
          }}
        />
      </Tooltip>
      <MaterialTemplate
        openMenu={openMenu}
        anchorMenu={anchorMenu}
        handleCloseMenu={() => setOpenMenu(false)}
        value={value}
        setValue={setValue}
      />
    </>
  )
};

export default observer(NodeReferenceMaterialSelector);


const style = {
  MaterailTemplateBtn: (selectedMaterialTemplateName, unit) => ({
    width: `${24 * unit}px`,
    height: `${24 * unit}px`,
    minWidth: 0,
    minHeight: 0,
    alignSelf: "center",
    backgroundImage: `url(Icons/RightTab/${selectedMaterialTemplateName}.png)`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
  }),

  menuWrapper: {
    position: "absolute",
    top: "-2.4vh",
    left: -258,
    "& .MuiMenuItem-root": {
      color: "#fff",
      textAlign: "left",
      fontFamily: "SourceHanSansKR",
      fontSize: "13px",
      borderRadius: "5px",
    },
    "& .MuiPaper-root": {
      width: "24.5vh",
      height: "66.9vh",
      backgroundColor: "#3a3a3a",
    },
  },

  boxStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "4.3vh",
  },

  textArea: {
    width: "calc(100% - 3.2vh)",
    fontFamily: "SourceHanSansKR",
    fontSize: "1.3vh",
    fontWeight: 500,
    color: "#fff",
  },

  gridContainer: {
    overflow: "auto",
    height: "57vh",
    "&::-webkit-scrollbar": { width: 0 },
  },

  menuItemSize: {
    width: "10.1vh",
    height: "10.1vh",
  },

  imageStyle: (index, selectedTemp) => ({
    width: "10.1vh",
    height: "10.1vh",
    borderRadius: "5px",
    outline: `${index === selectedTemp ? "solid 0.15vh #e3f853" : "none"}`,
  }),

  buttonStyle: {
    width: "calc(100% - 3.2vh)",
    height: "3.4vh",
    borderRadius: "5px",
    backgroundColor: "#e3f853",
    fontFamily: "SourceHanSansKR",
    fontSize: "1.4vh",
    fontWeight: 500,
    color: "#272748",
  },

  tooltip: {
    color: "#e1f853",
    bgcolor: "#282828CC",
    border: "1px solid grey",
    borderRadius: 3,
    bottom: "5px !important",
  },
  arrow: {
    "&::before": {
      backgroundColor: "#282828CC",
      border: "1px solid grey",
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
}