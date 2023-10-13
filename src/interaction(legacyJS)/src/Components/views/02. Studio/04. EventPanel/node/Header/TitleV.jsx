import { observer } from "mobx-react";
import { Box } from "@mui/material";
import storeContainer from "../../../../../stores/storeContainer";
import NodeSettingButton from "../../control/NodeSettingButton";
import DropdownV from "./DropdownV";
import UxSelector from "./UxSelector";

const BlueBox = observer((props) => {
  const { sxAdd, children, ...restProps } = props;
  const { eventSystem_store } = storeContainer;
  const scale = eventSystem_store.cameraZoom;
  return (
    <Box sx={style.BlueBox(sxAdd, scale)} {...restProps}>
      {children}
    </Box>
  );
});

function HeaderBox(props) {
  const { sxAdd, children, ...restProps } = props;
  return (
    <BlueBox
      sxAdd={{
        borderRadius: "5px 5px 0px 0px",
        ...sxAdd,
      }}
      {...restProps}
    >
      {children}
    </BlueBox>
  );
}

const TitleV = observer(({ node }) => {
  const { string_store } = storeContainer;

  const entries = Object.entries(node.control);
  const dropdownData = entries.filter(([_key, value]) => value.IsDropdown);
  const settingData = entries.filter(
    ([_key, value]) => !value.IsDropdown && !value.IsUxSelector
  );
  const uxSelectorData = entries.filter(([_key, value]) => value.IsUxSelector);

  return (
    <Box>
      <HeaderBox
        data-nodeuuid={node.uuid}
        data-name="node"
        sxAdd={{
          fontSize: "inherit",
        }}
      >
        {string_store.string(node.name) || node.name}
        {settingData.length > 0 && (
          <NodeSettingButton node={node} control={settingData} />
        )}
      </HeaderBox>
      {dropdownData.length > 0 && (
        <DropdownV node={node} control={dropdownData} />
      )}
      {uxSelectorData.length > 0 && <UxSelector node={node} />}
    </Box>
  );
});
export default TitleV;

const style = {
  BlueBox: (sxAdd, scale) => ({
    display: "flex",
    alignItems: "center",
    fontFamily: "sans-serif",
    fontSize: "inherit",
    fontWeight: "500",
    fontStretch: "normal",
    justifyContent: "space-between",
    color: "#fff",
    backgroundColor: "#272748",
    margin: "0 auto",
    ...sxAdd,
    height: "fit-content",
    padding: `${scale * 6}px ${scale * 12}px ${scale * 7}px ${scale * 12}px`,
  }),
  MainHeader: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
};
