import { observer } from "mobx-react";
import Box from "@mui/material/Box";
import { Icon } from "@mui/material";
import storeContainer from "../../../../stores/storeContainer";
import SocketColor from "./SocketColor";
import Typography from "@mui/material/Typography";

const SingleDataType = (prop) => {
  const { string } = prop;
  const { string_store } = storeContainer;

  return (
    <Box
      sx={{
        height: "25px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        ml: "10px",
      }}
    >
      <Icon
        sx={{
          width: "10px",
          height: "10px",
          display: "flex",
          borderRadius: "50%",
          backgroundColor: `${SocketColor(string)}`,
        }}
      />
      <Typography
        sx={{
          ml: "10px",
          fontSize: "12px",
          fontWeight: 500,
          fontFamily: "sans-serif",
          fontStretch: "normal",
          fontStyle: "normal",
          lineHeight: "normal",
          letterSpacing: "normal",
          textAlign: "left",
          flexGrow: "0",
          color: "#e2e2e2",
        }}
      >
        {string_store.string(string)}
      </Typography>
    </Box>
  );
};

const DataTypeGuideV = observer((props) => {
  const { common_store } = storeContainer;

  const data = ["Boolean", "Number", "Vector3", "Color", "Material"];

  return (
    <Box
      sx={{
        position: "absolute",
        right: "20px",
        top: `${common_store.topSlide ? 96.5 : 13.5}px`,
        width: "87px",
        backgroundColor: "#282828",
        borderRadius: "8px",
        cursor: "default",
        boxSizing: "content-box",
        userSelect: "none",
        border: "solid 1px #535353",
        pt: "4px",
        pb: "4px",
      }}
    >
      {data.map((str) => (
        <SingleDataType key={"SingleDataType " + str} string={str} />
      ))}
    </Box>
  );
});

export default DataTypeGuideV;
