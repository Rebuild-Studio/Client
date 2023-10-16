import { observer } from "mobx-react";
import { Box, Typography, Button } from "@mui/material";
import MxDialog from "../00. Common/gui/MxDialog_V";
import LoginVM from "../../view_models/Login_VM";
const LogoutAlert = observer(() => {
  const { LogoutBtnHandler, onClosePopup, popUpOpen } = LoginVM();
  return (
    <MxDialog open={popUpOpen()} onClose={onClosePopup} style={style.dialog}>
      <Box sx={style.dialogContents}>
        <Box
          sx={{
            width: "100%",
            height: "60px",
            display: "flex",
            padding: "20px 24px 0",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "268px",
            }}
          >
            <Typography sx={style.textArea}>
              로그아웃을 하시겠습니까?
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "52px",
            display: "flex",
            flexDirection: "column",
            padding: "8px 25px",
          }}
        >
          <Box
            sx={{
              width: "256px",
            }}
          >
            <Typography sx={style.textArea2}>
              저장하지 않고 로그아웃을 하실 경우, 현재 작업 중인 내용이
              사라집니다.
            </Typography>
          </Box>
        </Box>
        <Box sx={style.buttonWrapper}>
          <Button sx={style.CancelBtn} onClick={onClosePopup}>
            취소
          </Button>
          <Button
            sx={style.LogOutBtn}
            onClick={async () => {
              await LogoutBtnHandler();
            }}
          >
            로그아웃
          </Button>
        </Box>
      </Box>
    </MxDialog>
  );
});

export default LogoutAlert;
const style = {
  dialog: {
    width: "316px",
    height: "180px",
    border: "solid 0.5px #393939",
    backgroundColor: "#282828",
    borderColor: "0 4px 10px 0 rgba(34, 34, 34, 0.2)",
    borderRadius: "8px",
    alignItems: "center",
    justifyContent: "center",
  },
  textArea: {
    fontFamily: "SpoqaHanSansNeo",
    fontSize: "16px",
    fontWeight: 500,
    userSelect: "none",
    color: "#fff",
  },
  textArea2: {
    fontFamily: "SpoqaHanSansNeo",
    fontSize: "12px",

    lineHeight: "1.5",
    color: "#959595",
  },
  dialogContents: {
    width: "316px",
    height: "180px",
    display: "flex",
    flexDirection: "column",

    alignItems: "center",
  },
  imgWrapper: {
    width: "100%",
    height: "45px",
    display: "flex",
    justifyContent: "center",
  },
  buttonWrapper: {
    width: "100%",
    height: "68px",
    display: "flex",
    gap: "8px",
    padding: "12px 24px 24px",
  },
  CancelBtn: {
    width: "130px",
    height: "32px",
    minHeight: "34px",
    minWidth: "80px",
    borderRadius: "6px",
    backgroundColor: " #282828",
    fontFamily: "SpoqaHanSansNeo",
    fontSize: "12px",
    fontWeight: 500,
    color: "#fff",
    "&:hover": {
      backgroundColor: "#282828",
    },
  },
  LogOutBtn: {
    width: "130px",
    height: "32px",
    minHeight: "34px",
    minWidth: "80px",
    borderRadius: "6px",
    backgroundColor: " #d4ed3e",
    fontFamily: "SourceHanSansKR",
    fontSize: "12px",
    fontWeight: 500,
    color: "#101728",
    "&:hover": {
      backgroundColor: "#d4ed3e",
    },
  },
};
