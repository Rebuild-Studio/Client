import { useState, useMemo } from "react";
import { observer } from "mobx-react";
import { Vector3 } from "three";
import Box from "@mui/material/Box";
import storeContainer from "../../../../stores/storeContainer";
import Checkbox from "@mui/material";
import { FormGroup } from "@mui/material";
import FormControlLabel from "@mui/material";

const getLabels = (name) => {
  let labels = [];
  switch (name) {
    case "vector3":
      labels = ["STR_VECTOR3_X", "STR_VECTOR3_Y", "STR_VECTOR3_Z"];
      break;
    default:
      console.warn("Vector3 label is undefined");
      break;
  }
  return labels;
};

const ControlPointLight = observer((props) => {
  const { string_store } = storeContainer;
  const { name, control, update, InputProps } = props;
  const [defaultValue] = useState(new Vector3().copy(control.value));
  const [vector3, setVector3] = useState({ ...control.value });
  update.current[name] = { value: defaultValue, type: control.type };
  const labels = useMemo(() => getLabels(name), [name]);
  return (
    <Box
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
    >
      <div>
        <FormGroup>
          <FormControlLabel control={<Checkbox />} label="포지션" />
          <FormControlLabel control={<Checkbox />} label="로테이션" />
          <FormControlLabel control={<Checkbox />} label="사이즈" />
        </FormGroup>
      </div>
      <div>
        <FormGroup>
          <FormControlLabel control={<Checkbox />} label="컬러" />
          <FormControlLabel control={<Checkbox />} label="로테이션" />
          <FormControlLabel control={<Checkbox />} label="사이즈" />
        </FormGroup>
      </div>
      <div>
        <FormGroup>
          <FormControlLabel control={<Checkbox />} label="포지션" />
          <FormControlLabel control={<Checkbox />} label="로테이션" />
          <FormControlLabel control={<Checkbox />} label="사이즈" />
        </FormGroup>
      </div>
    </Box>
  );
});

export default ControlPointLight;
