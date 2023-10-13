import React from "react";
import { Tabs, Box, Tab, Typography, createTheme } from "@mui/material";
import { observer } from "mobx-react-lite";
import { ThemeProvider } from "@mui/material/styles";
import InteractionLeftTab from "./interactionLeftTab";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff", // replace with your desired primary color
    },
  },
});

const InteractionHierarchy = observer(() => {
  const [value, setValue] = React.useState(1); // index=1 인터렉션 에디터 초기값
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box id="TabHierarchy" sx={style.hierarchyWrapper}>
      <Box sx={style.textAreaWrapper}>
        <Typography sx={style.textArea}>계층 구조</Typography>
      </Box>
      <Box sx={style.tabWrapper}>
        <ThemeProvider theme={theme}>
          <Tabs sx={style.tabs} value={value} onChange={handleChange}>
            <Tab disabled sx={style.canvasTab} label={"캔버스"} />
            <Tab sx={style.interactionEditorTab} label={"인터렉션 에디터"} />
          </Tabs>
        </ThemeProvider>
      </Box>{" "}
      <Box sx={style.box}>
        {/* <InteractionLeftTab value={value} index={0} /> */}
        <InteractionLeftTab value={value} index={1} data-ui="leftTab" />
      </Box>
    </Box>
  );
});
export default InteractionHierarchy;

const style = {
  hierarchyWrapper: {
    width: "285px",
    height: "100%",
    backgroundColor: "#282828",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "auto",
    "&::-webkit-scrollbar": { width: 0 },
  },
  textAreaWrapper: {
    width: "253px",
    display: "flex",
    alignItems: "center",
    mt: "20px",
  },
  textArea: {
    fontFamily: "SpoqaHanSansNeo",
    fontSize: "14px",
    fontWeight: 500,
    color: "#fff",
  },
  tabWrapper: {
    width: "253px",
    display: "flex",
    borderColor: "#282828",
    borderBottom: 1,
    flexDirection: "row",
    alignItems: "center",
    mt: "20px",
  },
  tabs: {
    width: "100%",
    minHeight: "100%",
    height: "100%",
    "& .MuiTab-root": {
      mt: -1,
      color: "#959595",
      minHeight: "100%",
      fontFamily: "SpoqaHanSansNeo",
      fontSize: "13px",
      fontWeight: 500,
    },
    "& .Mui-selected": { color: "#fff" },
  },
  canvasTab: {
    minWidth: "70px",
    width: "70px",
  },
  interactionEditorTab: {
    minWidth: "130px",
    width: "130px",
  },
  box: {
    overflowX: "hidden",
    overflowY: "auto",
    // 스크롤바 숨기기
    "&::-webkit-scrollbar": { width: 0 },
  },
};
