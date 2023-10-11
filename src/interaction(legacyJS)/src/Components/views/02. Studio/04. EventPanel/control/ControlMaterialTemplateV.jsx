import { MenuItem, Grid } from "@mui/material";
import storeContainer from "../../../../stores/storeContainer";
import { observer } from "mobx-react";
import { useEffect, useState, useMemo } from "react";

const style = {
  menuItemSize: {
    width: "100px",
    height: "100px",
  },
};

const ControlMaterialTemplateV = observer((props) => {
  const { name, control, update } = props;
  const { data_store } = storeContainer;

  const [defaultValue, setDefaultValue] = useState(control.value);

  useEffect(() => {
    update.current[name] = { value: defaultValue, type: control.type };
  }, [defaultValue, update, name, control.type]);

  const templates = useMemo(() => {
    const templates = data_store.mat_tex_list.map((item) => [item[0], item[1]]);
    return templates;
  }, [data_store.mat_tex_list]);

  return (
    <Grid
      container
      spacing={1}
      direction="row"
      width={600}
      height={600}
      sx={{
        overflow: "auto",
        "&::-webkit-scrollbar": { width: 0 },
      }}
    >
      {templates.map((template, index) => (
        <Grid item key={index}>
          <MenuItem
            sx={style.menuItemSize}
            value={index}
            onClick={() => setDefaultValue(index)}
          >
            <img
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "5px",
                outline: `${
                  index === defaultValue ? "solid 1.5px #e3f853" : "none"
                }`,
              }}
              src={"/Icons/RightTab/" + template[1] + ".png"}
              alt={`item-${index}`}
              draggable="false"
            />
          </MenuItem>
        </Grid>
      ))}
    </Grid>
  );
});
export default ControlMaterialTemplateV;
