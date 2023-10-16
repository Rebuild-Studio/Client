import { Box, Typography, Button } from "@mui/material";
import MxSlider from "../../gui/Slider_V";
import MxColor from "../../gui/MxColor_V";
import Common_VM from "../../../../../view_models/Common_VM";
import MaterialTemplate from "../../gui/MaterialTemplate_V";
import MxSwitch from "../../gui/Switch_V";
import { useEffect } from "react";
import { objectViewModel } from "../../../../../view_models/Object_VM";
import MaterialTemplateVM from "../../../../../view_models/06. ObjectEdit/MaterialTemplate_VM";
import { reaction } from "mobx";
import { observer } from "mobx-react";
import MaterialEditVM from "../../../../../view_models/06. ObjectEdit/MaterialEdit_VM";

const TabMaterial = observer((props) => {
  const commonVmProps = Common_VM();
  const { handleClickMenu, menuName } = commonVmProps;

  useEffect(() => {
    MaterialTemplateVM.initMaterialTemplate();
    MaterialEditVM.initMaterialData();
    const dispose = reaction(
      () => {
        if (
          objectViewModel.selectedObjects.length !== 0 &&
          objectViewModel.selectedObjects[0].materialProps
        ) {
          const uuid = Object.keys(
            objectViewModel.selectedObjects[0].materialProps
          )[0];
          return objectViewModel.selectedObjects[0].materialProps[uuid]
            .material;
        }
      },
      () => {
        if (objectViewModel.selectedObjects.length !== 0)
          MaterialTemplateVM.initMaterialTemplate();
      }
    );
    const dispose2 = reaction(
      () => {
        if (
          objectViewModel.selectedObjects.length !== 0 &&
          objectViewModel.selectedObjects[0].materialProps
        )
          return objectViewModel.selectedObjects[0].materialProps;
      },
      () => {
        if (objectViewModel.selectedObjects.length !== 0)
          MaterialEditVM.initMaterialData();
      }
    );
    return () => {
      dispose();
      dispose2();
    };
  }, []);
  return (
    <Box sx={style.BoxWrapper}>
      <Box sx={style.MaterialNameArea}>{MaterialEditVM.materialName}</Box>
      <Box
        sx={{
          width: "100%",
          mt: 1,
        }}
      >
        <Box sx={style.MaterailTemplateBox}>
          <Typography
            sx={{
              fontFamily: "Inter",
              fontSize: "11px",
              color: "#e2e2e2",
            }}
          >
            {"머터리얼 요소 편집"}
          </Typography>

          <Button
            sx={style.MaterailTemplateBtn(
              MaterialTemplateVM.selectedMaterialTemplateName
            )}
            onClick={handleClickMenu}
          />

          <MaterialTemplate menuName={menuName} commonVmProps={commonVmProps} />
        </Box>
      </Box>
      {MaterialEditVM.materialProps.length !== 0 &&
        MaterialEditVM.materialProps.map(
          (prop, index) =>
            (prop[1] === "slider" && (
              <MxSlider
                key={prop[0]}
                label={prop[0]}
                value={prop[2]}
                name={prop[3]}
                min={0}
                max={1}
                step={0.01}
                undoMode={"Material_" + prop[3]}
                onMouseDown={MaterialEditVM.onSliderMouseDown}
                onMouseUp={MaterialEditVM.onSliderMouseUp}
                onChange={(e) =>
                  MaterialEditVM.onChangeHandlerMaterial(e, index)
                }
              />
            )) ||
            (prop[1] === "toggle" && (
              <MxSwitch
                style={{ mb: 1 }}
                key={prop[0]}
                label={prop[0]}
                checked={prop[2]}
                onChange={(e) => MaterialEditVM.onChangeTwoSide(e, index)}
              />
            )) ||
            (prop[1] === "Color" && (
              <MxColor
                key={prop[0]}
                label={prop[0]}
                color={MaterialEditVM.hsva}
                onChange={MaterialEditVM.onChangeHandlerColor}
                onChangeSliderAlpha={MaterialEditVM.onChangeHandlerAlpha}
                onChangeInputAlpha={MaterialEditVM.onChangeInputAlpha}
                onChangeInputHex={MaterialEditVM.onChangeInputHex}
                onChangeInputRGB={MaterialEditVM.onChangeInputRGB}
                onMouseDown={MaterialEditVM.onSliderMouseDown}
                onMouseUp={MaterialEditVM.onSliderMouseUp}
                undoMode={"Material_color"}
              />
            ))
        )}
      <MxSwitch
        style={{ mb: 1 }}
        key={"카툰 쉐이더"}
        label={"카툰 쉐이더"}
        onChange={(e) => MaterialTemplateVM.OnClickCartoonShader(e)}
      />
      <MxSwitch
        style={{ mb: 1 }}
        key={"웨이브 쉐이더"}
        label={"웨이브 쉐이더"}
        onChange={(e) => MaterialTemplateVM.OnClickWaveShader(e)}
      />
      <MxSwitch
        style={{ mb: 1 }}
        key={"카툰 웨이브 쉐이더"}
        label={"카툰 웨이브 쉐이더"}
        onChange={(e) => MaterialTemplateVM.OnClickCartoonWaveShader(e)}
      />
    </Box>
  );
});
const style = {
  BoxWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  MaterailTemplateBox: {
    width: "100%",
    height: "50%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  MaterailTemplateBtn: (selectedMaterialTemplateName) => ({
    width: "24px",
    minWidth: 0,
    minHeight: 0,
    height: "24px",
    backgroundImage: `url(Icons/RightTab/${selectedMaterialTemplateName}.png)`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
  }),
  MaterialNameArea: {
    mt: 1,
    width: "100%",
    height: "30px",
    display: "flex",

    alignItems: "center",
    fontFamily: "SpoqaHanSansNeo",
    fontSize: "12px",
    fontWeight: 500,
    textAlign: "left",

    color: "#e2e2e2",
  },
  MenuProps: {
    width: "100%",

    zIndex: 10000,
    display: "flex",
    position: "absolute",
    mt: "-10px",
  },
  MenuItemArea: {
    fontFamily: "SpoqaHanSansNeo",
    fontSize: "12px",
    fontWeight: 500,
    textAlign: "left",
    color: "#fff",

    "&:hover": {
      backgroundColor: "#535353",
    },
  },
};
export default TabMaterial;
