import { Dialog, Box, Typography, Button } from "@mui/material";
import { observer } from "mobx-react";
import storeContainer from "../../stores/storeContainer";

const CloseModal = observer((props) => {
  const { open, onClose } = props;
  const { undo_store } = storeContainer;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          backgroundColor: "transparent",
          boxShadow: "none",
        },
      }}
    >
      <Box sx={style.BoxWrapper(undo_store.ChangeCheck())}>
        <Box sx={style.TopBoxStyle}>
          <Typography sx={style.textArea}>창을 닫으시곘습니까?</Typography>
        </Box>
        {!undo_store.ChangeCheck() && (
          <Box sx={style.ContentsBoxStyle}>
            <Typography sx={style.ContentsTextArea}>
              창을 닫으실 경우, MX 스튜디오 [컴포넌트 목록]에서 해당 컴포넌트를
              불러올 수 없습니다.
            </Typography>
          </Box>
        )}
        <Box sx={style.ButtonBoxStyle}>
          <Button
            sx={{
              ...style.ButtonStyle,
              border: "solid 0.5px #626262",
              "&:hover": {
                backgroundColor: "#494949",
                border: "solid 0.5px #626262",
              },
            }}
          >
            <Typography sx={style.ButtonTextArea}>아니요</Typography>
          </Button>
          <Button
            sx={{
              ...style.ButtonStyle,
              backgroundColor: "#d4ed3e",
              "&:hover": {
                backgroundColor: "#c6dd36",
              },
            }}
            onClick={() => {
              window.close();
            }}
          >
            <Typography sx={{ ...style.ButtonTextArea, color: "#101728" }}>
              예
            </Typography>
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
});

export default CloseModal;

const style = {
  BoxWrapper: function (check) {
    return {
      width: "316px",
      height: `${check ? "128px" : "180px"}`,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      borderRadius: "8px",
      boxShadow: "0 4px 10px 0 rgba(34, 34, 34, 0.1)",
      border: "solid 0.5px #393939",
      backgroundColor: "#282828",
    };
  },

  TopBoxStyle: {
    width: "100%",
    height: "60px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "8.544% 7.59% 0",
  },
  textArea: {
    fontFamily: "SpoqaHanSansNeo",
    fontSize: "16px",
    fontWeight: 500,
    textAlign: "left",
    color: "#fff",
  },
  ContentsBoxStyle: {
    height: "52px",
    flexGrow: "0",
    alignSelf: "stretch",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "10px",
    padding: "8px 25px",
    objectFit: "contain",
  },
  ContentsTextArea: {
    fontFamily: "SpoqaHanSansNeo",
    fontSize: "12px",
    lineHeight: "1.5",
    textAlign: "left",
    color: "#959595",
  },
  ButtonBoxStyle: {
    height: "68px",

    display: "flex",

    justifyContent: "center",
    alignItems: "flex-end",
    gap: "8px",
    padding: "12px 24px 24px",
  },
  ButtonStyle: {
    width: "130px",
    height: "32px",
    borderRadius: "6px",
  },
  ButtonTextArea: {
    fontFamily: "SpoqaHanSansNeo",
    fontSize: "12px",
    fontWeight: 500,
    textAlign: "left",
    color: "#fff",
  },
};
