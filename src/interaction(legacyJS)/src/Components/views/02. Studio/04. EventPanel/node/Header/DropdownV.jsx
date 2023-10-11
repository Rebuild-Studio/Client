import { observer } from "mobx-react";
import { Box } from "@mui/system";
import storeContainer from "../../../../../stores/storeContainer";
import SelectDropdown from "../../control/SelectDropdownV";
import ControlDataVM from "../../control/ControlDataVM";

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

const DropdownV = observer((props) => {
  const { node, control } = props;
  const { object_store } = storeContainer;
  const { GetDropdownData } = ControlDataVM();

  return (
    <>
      {control.map((entry) => {
        const dropdownData = GetDropdownData(
          node,
          entry[1],
          object_store.metaObjects
        );
        return (
          <BlueBox key={`${node.uuid}+${entry[0]}`}>
            <SelectDropdown
              key={`${node.uuid}+${entry[0]}`}
              node={node}
              entry={entry}
              dropdownData={dropdownData}
              data-uuid={node.uuid}
              data-name="node"
            />
          </BlueBox>
        );
      })}
    </>
  );
});
export default DropdownV;
