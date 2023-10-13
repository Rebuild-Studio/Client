import { MenuItem, Select } from "@mui/material";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  icon: {
    fill: "red", // Set the desired color for the icon
  },
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "none",
      },
    },
  },
  menuPaper: {
    maxHeight: "20vh",
    backgroundColor: "#393939",

    "&::-webkit-scrollbar": { width: 0 },
  },
}));

const MxSelect = (props) => {
  const { itemList, onChange, value, selectStyle, disabled } =
    props;
  const classes = useStyles();

  return (
    <Select
      disabled={disabled}
      value={value}
      onChange={(e) => {
        onChange(e);
      }}
      sx={{ ...style.SelectArea, ...selectStyle }}
      MenuProps={{
        sx: { ...style.MenuProps },
        classes: { paper: classes.menuPaper, icon: classes.icon },
      }}
    >
      {itemList.map((el, index) => {
        return (
          <MenuItem sx={style.MenuItemArea} key={index} value={index}>
            {el}
          </MenuItem>
        );
      })}
    </Select>
  );
};
export default MxSelect;
const style = {
  SelectArea: {
    mt: 1,
    width: "100%",
    height: "30px",
    fontFamily: "SpoqaHanSansNeo",
    fontSize: "12px",
    fontWeight: 500,
    textAlign: "left",

    backgroundColor: "#393939",
    color: "#e2e2e2",
    mb: 1,
    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline ": {
      border: "none",
    },
    "& .MuiSvgIcon-root": {
      color: "#e2e2e2",
    },
  },
  MenuProps: {
    width: "100%",

    zIndex: 10000,
    display: "flex",
    position: "absolute",
    mt: "-10px",
  },
  MenuItemArea: {
    fontFamily: "SpoqaHanSansNeo",
    fontSize: "12px",
    fontWeight: 500,
    textAlign: "left",
    color: "#fff",

    "&:hover": {
      backgroundColor: "#535353",
    },
  },
};
