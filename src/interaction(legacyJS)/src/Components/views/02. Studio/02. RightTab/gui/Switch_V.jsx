import { observer } from "mobx-react";
import { Box, Switch, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 24,
  height: 14,
  padding: 0,
  margin: 0,
  display: "flex",

  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 12,
      color: "#282828",
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
      color: "#282828",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 1.6,
    color: "#282828",

    "&.Mui-checked": {
      transform: "translateX(10px)",
      color: "#282828",

      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#e1f853",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 11,
    height: 11,
    borderRadius: 5.5,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: "#494949",
    boxSizing: "border-box",
  },
}));
const MxSwitch = observer((props) => {
  const { label, onChange, checked, style } = props;
  return (
    <Box
      sx={{
        width: "100%",
        height: "32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        ...style,
      }}
    >
      <Typography
        sx={{
          fontFamily: "Inter",
          fontSize: "11px",
          color: "#e2e2e2",
        }}
      >
        {label}
      </Typography>
      <AntSwitch checked={checked} onChange={onChange} />
    </Box>
  );
});

export default MxSwitch;
