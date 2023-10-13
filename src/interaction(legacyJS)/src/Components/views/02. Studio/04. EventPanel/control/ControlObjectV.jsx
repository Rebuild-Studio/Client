import storeContainer from "../../../../stores/storeContainer";
import { observer } from "mobx-react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useState, useMemo } from "react";
import { ControlType } from "../../../../class/event-system/NodeControl";

const ControlObjectV = observer((props) => {
  const { object_store } = storeContainer;
  const { name, control, update, label, selectSX } = props;

  const objectList = useMemo(() => {
    switch (control.type) {
      case ControlType.Object:
        return object_store.metaObjects.filter(
          (object) => !object.props["lightType"] && !object.camera
        );
      case ControlType.PointLight:
        return object_store.metaObjects.filter(
          (object) => object.props && object.props["lightType"] === "PointLight"
        );
      case ControlType.SpotLight:
        return object_store.metaObjects.filter(
          (object) => object.props && object.props["lightType"] === "SpotLight"
        );
      case ControlType.Sensor:
        return object_store.metaObjects;
      default:
        console.warn("Control Type is undefined");
        return;
    }
  }, [object_store, control.type]);
  const objectMap = useMemo(() => {
    return new Map(objectList.map((object) => [object.objectId, object.name]));
  }, [objectList]);
  const disable = useMemo(() => {
    return objectList.length > 0 ? false : true;
  }, [objectList]);
  const [defaultValue] = objectMap.get(control.value)
    ? useState(control.value)
    : useState("");

  update.current[name] = {
    value: defaultValue,
    name: objectMap.get(defaultValue),
    type: control.type,
  };

  return (
    <>
      <InputLabel htmlFor="max-width">{label}</InputLabel>
      <Select
        disabled={disable}
        autoFocus
        defaultValue={defaultValue}
        onChange={(event) => {
          const uuid = event.target.value;
          update.current[name] = {
            value: uuid,
            name: objectMap.get(uuid),
            type: control.type,
          };
        }}
        sx={selectSX}
        inputProps={{
          name: "max-width",
          id: "max-width",
        }}
      >
        {objectList.map(({ objectId, type, name = type + objectId }) => (
          <MenuItem key={objectId} value={objectId}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </>
  );
});
export default ControlObjectV;
