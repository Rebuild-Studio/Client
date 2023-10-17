import { Box, Dialog } from "@mui/material";

const MxDialog = (props) => {
  const { open, onClose, style, children } = props;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          maxWidth: "100vw",
          maxHeight: "100vh",
          backgroundColor: "transparent",
          boxShadow: "none",
        },
      }}
    >
      <Box sx={{ ...defalutStyle.boxWrapper, ...style }}>{children}</Box>
    </Dialog>
  );
};

export default MxDialog;
const defalutStyle = {
  boxWrapper: {
    width: "316px",
    height: "180px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    borderRadius: "8px",
    boxShadow: "0 4px 10px 0 rgba(34, 34, 34, 0.1)",
    border: "solid 0.5px #393939",
    backgroundColor: "#282828",
  },
};
