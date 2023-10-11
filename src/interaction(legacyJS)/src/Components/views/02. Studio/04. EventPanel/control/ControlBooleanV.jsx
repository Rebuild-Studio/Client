import storeContainer from "../../../../stores/storeContainer";
import { observer } from "mobx-react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Grid } from "@mui/material";
import { useState } from "react";

const ControlBooleanV = observer((props) => {
  const { string_store } = storeContainer;
  const { name, control, update, label, selectSX } = props;
  const [defaultValue] = useState(control.value);
  update.current[name] = { value: control.value, type: control.type };
  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item>
        <InputLabel htmlFor="max-width">{label}</InputLabel>
      </Grid>
      <Select
        autoFocus
        defaultValue={defaultValue}
        onChange={(event) => {
          update.current[name].value = event.target.value;
        }}
        sx={{ ...selectSX, marginLeft: "20px" }}
        inputProps={{
          name: "max-width",
          id: "max-width",
        }}
      >
        <MenuItem key={"true"} value={true}>
          {string_store.string("true") || "true"}
        </MenuItem>
        <MenuItem key={"false"} value={false}>
          {string_store.string("false") || "false"}
        </MenuItem>
      </Select>
    </Grid>
  );
});
export default ControlBooleanV;
