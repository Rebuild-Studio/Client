import { Input } from "@mui/material";
import { Box } from "@mui/system";
import { observer } from "mobx-react-lite";
import React from "react";
import { eventSystem_store } from "../../../../../stores/Interaction_Stores";

/**
 * @typedef {object} UxSelectorProps
 * @param {node} eventSystem_store.nodes[]
 * @description
 * 노드의 UX 키 바인딩을 설정하는 컴포넌트입니다.
 */
const UxSelector = observer(({ node }) => {
  const scale = eventSystem_store.cameraZoom;

  const handleSelectorChange = (e) => {
    node.setUxSelector(e.target.value);
  };
  return (
    <Box sx={style.Container(scale)}>
      <Box sx={style.KeyInputContainer}>
        <span>키 이름</span>
        <Input
          onChange={handleSelectorChange}
          sx={style.Input}
          placeholder="MY_KEY"
          color="white"
          value={node.uxSelector}
        />
      </Box>
    </Box>
  );
});

export default UxSelector;

const style = {
  Container: (scale) => ({
    height: `${scale * 20}px`,
    padding: `${scale * 6}px ${scale * 12}px ${scale * 7}px ${scale * 12}px`,
    color: "#ffffff",
    backgroundColor: "#272748",
  }),
  KeyInputContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  Checkbox: {
    color: "#D4ED3E",
    "&.Mui-checked": {
      color: "#C0D927",
    },
  },
  Input: {
    width: "50%",
    color: "#ffffff",
  },
  Divider: {
    width: "100%",
    backgroundColor: "#ffffff",
  },
};
