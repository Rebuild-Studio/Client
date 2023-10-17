import { Box, Button, IconButton, Typography } from "@mui/material";
import { objectViewModel } from "../../../../view_models/Object_VM";

const AccordionBtn = (props) => {
  const { label, open, onChange } = props;
  const selectedSound = objectViewModel.selectedObjects[0];

  const playAndStop = () => {
    selectedSound.playAndStopSound();
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "44px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <IconButton
        onClick={() => {
          onChange && onChange(open ? false : true);
        }}
        sx={{
          margin: 0,
          padding: 0,
          minWidth: 0,
          minHeight: 0,
          width: "10px",
          height: "10px",
          backgroundColor: `${open ? "#282828" : "#e1f853"}`,
          border: `${open ? "solid 2px #e1f853" : "solid 2px #282828"}`,
        }}
      />
      {label && (
        <Typography
          sx={{
            ml: "9px",
            fontFamily: "SpoqaHanSansNeo",
            fontSize: "12px",
            fontWeight: 500,
            color: "#fff",
            textAlign: "left",
          }}
        >
          {label}
        </Typography>
      )}
      {label === "사운드" && <Button onClick={playAndStop}>재생</Button>}
    </Box>
  );
};

export { AccordionBtn };
