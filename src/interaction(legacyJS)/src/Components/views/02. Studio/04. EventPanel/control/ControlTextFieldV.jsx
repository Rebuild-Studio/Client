import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState, useEffect, useCallback } from "react";
import { observer } from "mobx-react";
import storeContainer from "../../../../stores/storeContainer";

const ControlTextFieldV = observer((props) => {
  const { name, control, update, InputProps } = props;
  const [defaultValue, setDefaultValue] = useState(control.value);
  const { string_store } = storeContainer;
  const { min, max } = control.extras;

  const setMinMax = useCallback(
    (min = Number.NEGATIVE_INFINITY, max = Number.POSITIVE_INFINITY, value) => {
      return Math.min(Math.max(value, min), max);
    },
    []
  );

  const convert = useCallback(
    (value) => {
      switch (control.type) {
        case "Number":
          return setMinMax(min, max, Number(value));
        default:
          return value;
      }
    },
    [control.type, min, max, setMinMax]
  );

  const inputFilterCase = (value) => {
    if (control.type === "Number") {
      return !/^[+-]?\d*(\.?\d*)?$/.test(value);
    } else {
      return false;
    }
  };

  useEffect(() => {
    update.current[name] = { value: convert(defaultValue), type: control.type };
  }, [control, name, update, defaultValue, convert]);
  return (
    <Box noValidate>
      <TextField
        label={string_store.string(name) || name}
        type={control.type === "Number" ? "number" : "text"}
        value={defaultValue}
        InputProps={InputProps}
        onChange={(e) => {
          if (inputFilterCase(e.target.value)) return;
          setDefaultValue(e.target.value);
        }}
      />
    </Box>
  );
});

export default ControlTextFieldV;
