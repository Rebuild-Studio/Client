import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import { observer } from "mobx-react";
import storeContainer from "../../../../stores/storeContainer";

const ControlRangeV = observer((props) => {
  const { name, control, update, InputProps } = props;
  const [defaultValue, setDefaultValue] = useState(control.value);
  const { string_store } = storeContainer;

  const inputFilterCase = (value) => {
    return !/^[+-]?\d*(\.?\d*)?$/.test(value);
  };

  useEffect(() => {
    update.current[name] = { value: defaultValue, type: control.type };
  }, [control, name, update, defaultValue]);

  return (
    <Box noValidate>
      <TextField
        label={string_store.string("min")}
        type={"number"}
        value={defaultValue[0]}
        InputProps={InputProps}
        onChange={(e) => {
          if (inputFilterCase(e.target.value)) return;
          setDefaultValue([e.target.value, defaultValue[1]]);
        }}
      />
      <TextField
        label={string_store.string("max")}
        type={"number"}
        value={defaultValue[1]}
        InputProps={InputProps}
        onChange={(e) => {
          if (inputFilterCase(e.target.value)) return;
          setDefaultValue([defaultValue[0], e.target.value]);
        }}
      />
    </Box>
  );
});
export default ControlRangeV;
