import { observer } from "mobx-react";
import { Box, Typography, Button } from "@mui/material";
import { MyPageVM } from "../../view_models/MyPage_VM";
import MxDialog from "../00. Common/gui/MxDialog_V";
const LoadAlert = observer(() => {
  return (
    <MxDialog
      open={MyPageVM.popUpOpen}
      onClose={MyPageVM.onClosePopup}
      style={style.dialog}
    >
      <Box sx={style.dialogContents}>
        <Box
          sx={{
            width: "100%",
            height: "76px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "284px",
            }}
          >
            <Typography sx={style.textArea}>
              지금 작업 중인 내용을 중단하고
            </Typography>
            <Typography sx={style.textArea}>
              새로운 컴포넌트를 불러오시겠습니까?
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "52px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography sx={style.textArea2}>
              한 번에 하나의 컴포넌트만 작업할 수 있습니다.
            </Typography>
            <Typography sx={style.textArea2}>
              저장하지 않았을 경우, 현재 작업 중인 내용은 사라집니다.
            </Typography>
          </Box>
        </Box>
        <Box sx={style.buttonWrapper}>
          <Button sx={style.CancelBtn} onClick={MyPageVM.onClosePopup}>
            취소
          </Button>
          <Button
            sx={style.LoadBtn}
            onClick={async () => {
              await MyPageVM.onClickLoadBtn();
            }}
          >
            불러오기
          </Button>
        </Box>
      </Box>
    </MxDialog>
  );
});

export default LoadAlert;
const style = {
  dialog: {
    width: "332px",
    height: "196px",
    border: "solid 0.5px #393939",
    backgroundColor: "#282828",
    borderColor: "0 4px 10px 0 rgba(34, 34, 34, 0.2)",
    borderRadius: "8px",
    alignItems: "center",
    justifyContent: "center",
  },
  textArea: {
    fontFamily: "SourceHanSansKR",
    fontSize: "16px",
    fontWeight: 500,
    lineHeight: "1.5",
    userSelect: "none",
    color: "#fff",
  },
  textArea2: {
    fontFamily: "SourceHanSansKR",
    fontSize: "12px",

    lineHeight: "1.5",
    color: "#959595",
  },
  dialogContents: {
    width: "332px",
    height: "196px",
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
    height: "45px",
    display: "flex",
    gap: "8px",
    padding: "12px 24px 24px",
  },
  CancelBtn: {
    width: "138px",
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
  LoadBtn: {
    width: "138px",
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
