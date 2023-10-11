import { observer } from "mobx-react";
import { Box } from "@mui/material";
import { useMemo } from "react";
import storeContainer from "../../../../../stores/storeContainer";
import ControlDataVM from "../../control/ControlDataVM";
import { ControlType } from "../../../../../class/event-system/NodeControl";

const BlueBox = observer((props) => {
  const { sxAdd, children, ...restProps } = props;
  const { eventSystem_store } = storeContainer;
  const scale = eventSystem_store.cameraZoom;
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        fontFamily: "sans-serif",
        fontSize: "inherit",
        fontWeight: "500",
        fontStretch: "normal",
        fontStyle: "normal",
        justifyContent: "space-between",
        lineHeight: "normal",
        letterSpacing: "normal",
        textAlign: "left",
        color: "#fff",
        backgroundColor: "#272748",
        margin: "0 auto",
        ...sxAdd,
      }}
      style={{
        height: `${scale * 17}px`,
        padding: `${scale * 6}px ${scale * 12}px ${scale * 7}px ${
          scale * 12
        }px`,
      }}
      {...restProps}
    >
      {children}
    </Box>
  );
});

const DataV = observer((props) => {
  const { string_store, eventSystem_store, data_store } = storeContainer;
  const { node } = props;
  const { DetectConvertFromTo } = ControlDataVM();
  const scale = useMemo(() => {
    return eventSystem_store.cameraZoom;
  }, [eventSystem_store.cameraZoom]);

  const dataDiv = Object.entries(node.control).map((entry) => {
    if (entry[1].IsDropdown) {
      return null;
    }
    let data;
    switch (entry[1].type) {
      case ControlType.Boolean:
        data =
          entry[1].value === true
            ? string_store.string("true") || "true"
            : string_store.string("false") || "false";
        break;
      case ControlType.Color: {
        const color = entry[1].value.getStyle();
        data = (
          <Box
            sx={{
              width: `${scale * 18}px`,
              minWidth: 0,
              minHeight: 0,
              height: `${scale * 18}px`,
            }}
            style={{
              backgroundColor: color || "rgb(0, 0, 0)",
            }}
          ></Box>
        );
        break;
      }
      case ControlType.Vector3: {
        data = `x: ${entry[1].value.x} y: ${entry[1].value.y} z: ${entry[1].value.z}`;
        break;
      }
      case ControlType.Sensor:
      case ControlType.PointLight:
      case ControlType.SpotLight:
      case ControlType.Object:
      case ControlType.Function:
        data = entry[1].value ? node.name : undefined;
        break;
      case ControlType.Convert: {
        const { from, to } = DetectConvertFromTo(entry[1].value);
        if (from.length && to.length) {
          const input = string_store.string(from);
          const output = string_store.string(to);
          data = `${input} → ${output}`;
        }
        break;
      }
      case ControlType.Material:
      case ControlType.Animation:
        return null;
      case ControlType.MaterialTemplate: {
        const matList = data_store.mat_tex_list;
        data = (
          <img
            style={{
              width: `${scale * 18}px`,
              height: `${scale * 18}px`,
            }}
            src={"/Icons/RightTab/" + matList[entry[1].value][1] + ".png"}
            alt={`item-${entry[1].value}`}
            draggable="false"
          />
        );
        break;
      }
      case ControlType.Key:
        data = entry[1].value;
        break;
      default:
        data = string_store.string(entry[1].value);
        break;
    }
    if (entry[1].label) {
      data =
        string_store.string(entry[0]) + " : " + data || entry[0] + " : " + data;
    }
    return (
      typeof data !== "undefined" && (
        <BlueBox
          data-nodeuuid={node.uuid}
          data-name="node"
          key={`${node.uuid} ${entry[0]}`}
        >
          {eventSystem_store.cameraZoom > 0.5 && data}
        </BlueBox>
      )
    );
  });
  return <>{dataDiv}</>;
});
export default DataV;
