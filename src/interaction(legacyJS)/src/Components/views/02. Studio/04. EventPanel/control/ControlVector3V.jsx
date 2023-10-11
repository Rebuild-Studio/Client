import { useState, useMemo } from "react";
import { observer } from "mobx-react";
import { Vector3 } from "three";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import storeContainer from "../../../../stores/storeContainer";

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

const ControlVector3V = observer((props) => {
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
        <TextField
          label={string_store.string(labels[0])}
          type="number"
          value={vector3.x}
          InputProps={InputProps}
          onChange={(e) => {
            if (!/^[+-]?\d*(\.?\d*)?$/.test(e.target.value)) return;
            setVector3((prev) => ({ ...prev, x: e.target.value }));
            defaultValue.setX(Number(e.target.value));
          }}
        />
      </div>
      <div>
        <TextField
          label={string_store.string(labels[1])}
          type="number"
          value={vector3.y}
          InputProps={InputProps}
          onChange={(e) => {
            if (!/^[+-]?\d*(\.?\d*)?$/.test(e.target.value)) return;
            setVector3((prev) => ({ ...prev, y: e.target.value }));
            defaultValue.setY(Number(e.target.value));
          }}
        />
      </div>
      <div>
        <TextField
          label={string_store.string(labels[2])}
          type="number"
          value={vector3.z}
          InputProps={InputProps}
          onChange={(e) => {
            if (!/^[+-]?\d*(\.?\d*)?$/.test(e.target.value)) return;
            setVector3((prev) => ({ ...prev, z: e.target.value }));
            defaultValue.setZ(Number(e.target.value));
          }}
        />
      </div>
    </Box>
  );
});

export default ControlVector3V;
