import { Box, Select, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { observer } from "mobx-react";
import MxSlider from "../../gui/Slider_V";
import MxSwitch from "../../gui/Switch_V";
import SoundEditVM from "../../../../../view_models/06. ObjectEdit/SoundEdit_VM";
import { objectViewModel } from "../../../../../view_models/Object_VM";
import { data_store } from "../../../../../stores/Data_Store";

const useStyles = makeStyles((theme) => ({
  icon: {
    fill: "red",
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
  "@media (max-width: 600px)": {
    body: {
      fontSize: "0.8rem",
    },
  },
  "@media (min-width: 601px)": {
    body: {
      fontSize: "1rem",
    },
  },
}));

const TabSound = observer((props) => {
  const [sound, setSound] = useState("사운드 선택");
  const classes = useStyles();
  const selectedSound = objectViewModel.selectedObjects[0];
  const handleChange = (event) => {
    setSound(event.target.value);
  };

  useEffect(() => {
    data_store.sound_list.forEach((element) => {
      element[0] === sound &&
        objectViewModel.selectedObjects[0].setUrl("/sound/" + element[1]);
    });
  }, [sound]);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mb: 2,
      }}
    >
      <Box sx={style.SelectWrapper}>
        <Select
          value={sound}
          label="sound"
          onChange={handleChange}
          sx={style.SelectArea}
          MenuProps={{
            sx: style.MenuProps,
            classes: { paper: classes.menuPaper, icon: classes.icon },
          }}
        >
          {data_store.sound_list.map((sound, index) => (
            <MenuItem sx={style.MenuItemArea} value={sound[0]} key={index}>
              {sound[0]}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <MxSwitch
        style={{ mb: 1 }}
        key={"loop"}
        label={"Loop"}
        onChange={() => selectedSound.playAndStopSoundLoop()}
      />

      {SoundEditVM.soundPropsList.map((soundProp, index) => {
        const [propName, label, , min, max, step] = soundProp;

        return (
          <MxSlider
            key={index}
            label={label}
            value={selectedSound[propName]}
            onChange={(e) => SoundEditVM.onChangeHandlerSoundProp(e, propName)}
            min={min}
            max={max}
            step={step}
            undoMode={"Sound_" + propName}
            onMouseDown={SoundEditVM.onSliderMouseDown}
            onMouseUp={SoundEditVM.onSliderMouseUp}
          />
        );
      })}
    </Box>
  );
});

export default TabSound;

const style = {
  SelectWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "4px",
  },

  MenuProps: {
    width: "100%",
    zIndex: 10000,
    display: "flex",
    position: "absolute",
    mt: "-10px",
  },

  SelectArea: {
    mt: 1,
    width: "100%",
    height: "30px",
    fontFamily: "SpoqaHanSansNeo",
    fontSize: "11px",
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

  MenuItemArea: {
    fontFamily: "Inter",
    fontSize: "11px",
    fontWeight: 500,
    textAlign: "left",
    backgroundColor: "#393939",
    color: "#e2e2e2",
  },
};
