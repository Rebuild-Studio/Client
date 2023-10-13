import storeContainer from "../../../../stores/storeContainer";
import { observer } from "mobx-react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ControlDataVM from "./ControlDataVM";
import { useState, useEffect, useMemo } from "react";

const TypeSelect = observer((props) => {
  const { string_store } = storeContainer;
  const { type, current, setter, options } = props;
  return (
    <Select
      value={current}
      displayEmpty
      disabled={type === "out" && options[0] === ""}
      renderValue={(value) => {
        return string_store.string(value ? value : type);
      }}
      sx={{ color: "#FFFFFF" }}
      onChange={(event) => {
        setter(event.target.value);
      }}
    >
      {options.map((option) => {
        return (
          <MenuItem key={`${type}-${option}`} value={option}>
            {string_store.string(option.length ? option : type)}
          </MenuItem>
        );
      })}
    </Select>
  );
});

const ControlConvertV = observer((props) => {
  const { name, control, update, data, label } = props;
  const { DetectConvertFromTo } = ControlDataVM();

  const { from, to } = useMemo(() => {
    return DetectConvertFromTo(control.value);
  }, [control.value, DetectConvertFromTo]);

  const [inputType, setInputType] = useState(from);
  const [outputType, setOutputType] = useState(to);

  const inputOptions = [...data.keys()];
  inputOptions.pop();
  const [outputOptions, setOutputOptions] = useState(data.get(inputType).list);

  useEffect(() => {
    const outputData = data.get(inputType);
    const outputList = outputData.list;
    setOutputOptions(outputList);
    if (!outputList.includes(to)) {
      setOutputType(outputList[0]);
    }
  }, [name, inputType, data, to]);

  useEffect(() => {
    const outputData = data.get(inputType);
    update.current[name] = {
      value: outputData.map.get(outputType),
      type: control.type,
    };
  }, [name, update, outputType, data, inputType, control.type]);

  return (
    <>
      <InputLabel htmlFor="max-width">{label}</InputLabel>

      <span>
        <TypeSelect
          type="in"
          current={inputType}
          setter={setInputType}
          options={inputOptions}
        />
        {` → `}
        <TypeSelect
          type="out"
          current={outputType}
          setter={setOutputType}
          options={outputOptions}
        />
      </span>
    </>
  );
});
export default ControlConvertV;
