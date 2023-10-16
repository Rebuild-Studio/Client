import storeContainer from "../../../../stores/storeContainer";
import { observer } from "mobx-react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";

const ControlSelectV = observer((props) => {
  const { string_store } = storeContainer;
  const { name, control, update, data, label, selectSX } = props;
  const [defaultValue, setDefaultValue] = control.value
    ? useState(control.value)
    : useState(data[0]);

  useEffect(() => {
    update.current[name] = { value: defaultValue, type: control.type };
  }, [defaultValue, update, name, control.type]);

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item>
        <InputLabel htmlFor="max-width">{label}</InputLabel>
      </Grid>
      <Select
        autoFocus
        value={defaultValue}
        onChange={(event) => {
          setDefaultValue(event.target.value);
        }}
        sx={{ ...selectSX, marginLeft: "20px" }}
        inputProps={{
          name: "max-width",
          id: "max-width",
        }}
      >
        {data?.map((type) => (
          <MenuItem key={type} value={type}>
            {string_store.string(type) || type}
          </MenuItem>
        ))}
      </Select>
    </Grid>
  );
});
export default ControlSelectV;
