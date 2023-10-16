import { observer } from "mobx-react";
import storeContainer from "../../../../stores/storeContainer";
import {
  NodeControl,
  ControlType,
} from "../../../../class/event-system/NodeControl";
import ControlDataVM from "./ControlDataVM";

import ControlSelectV from "./ControlSelectV";
import ControlTextFieldV from "./ControlTextFieldV";
import ControlVector3 from "./ControlVector3V";
import ControlDetectKeyV from "./ControlDetectKeyV";
import ControlBooleanV from "./ControlBooleanV";
import ControlObjectV from "./ControlObjectV";
import ControlConvertV from "./ControlConvertV";
import ControlColorV from "./ControlColorV";
import ControlTransferListV from "./ControlTransferListV";
import ControlMaterialTemplateV from "./ControlMaterialTemplateV";
import ControlRangeV from "./ControlRangeV";

const InputProps = { style: { color: "white" } };
const selectSX = { color: "#FFFFFF" };

const ControlRowV = observer((props) => {
  const { name, control, update, node } = props;
  const { string_store, object_store } = storeContainer;
  const { GetMaterialData, GetAnimationData } = ControlDataVM();
  let Row = null;
  let label = null;
  const data = NodeControl[control.type] && NodeControl[control.type].options;
  switch (control.type) {
    case ControlType.Number:
      Row = (
        <ControlTextFieldV
          name={name}
          control={control}
          update={update}
          InputProps={InputProps}
        />
      );
      break;
    case ControlType.Vector3:
      Row = (
        <ControlVector3
          name={name}
          control={control}
          update={update}
          InputProps={InputProps}
        />
      );
      break;
    case ControlType.Color:
      Row = <ControlColorV name={name} control={control} update={update} />;
      break;
    case ControlType.Boolean:
      label = string_store.string(name) || name;
      Row = (
        <ControlBooleanV
          name={name}
          control={control}
          update={update}
          label={label}
          selectSX={selectSX}
        />
      );
      break;
    case ControlType.Key:
      Row = <ControlDetectKeyV name={name} control={control} update={update} />;
      break;
    case ControlType.String:
      break;
    case ControlType.Sensor:
    case ControlType.PointLight:
    case ControlType.SpotLight:
    case ControlType.Object:
      label = string_store.string(name) || name;
      Row = (
        <ControlObjectV
          name={name}
          control={control}
          update={update}
          label={label}
          selectSX={selectSX}
        />
      );
      break;
    case ControlType.Action:
      label = string_store.string(name) || name;
      Row = (
        <ControlSelectV
          name={name}
          control={control}
          update={update}
          data={data}
          label={label}
          selectSX={selectSX}
        />
      );
      break;
    case ControlType.Calculation:
      label = string_store.string(name) || name;
      Row = (
        <ControlSelectV
          name={name}
          control={control}
          update={update}
          data={data}
          label={label}
          selectSX={selectSX}
        />
      );
      break;
    case ControlType.LogicGate:
      label = string_store.string(name) || name;
      Row = (
        <ControlSelectV
          name={name}
          control={control}
          update={update}
          data={data}
          label={label}
          selectSX={selectSX}
        />
      );
      break;
    case ControlType.Convert:
      label = string_store.string(name) || name;
      Row = (
        <ControlConvertV
          name={name}
          control={control}
          update={update}
          label={label}
          data={data}
          selectSX={selectSX}
        />
      );
      break;
    case ControlType.Compare:
      label = `숫자1 ${control.value} 숫자2 ?`;
      Row = (
        <ControlSelectV
          name={name}
          control={control}
          update={update}
          data={data}
          label={label}
          selectSX={selectSX}
        />
      );
      break;
    case ControlType.MathSymbol:
      label = string_store.string(name) || name;
      Row = (
        <ControlSelectV
          name={name}
          control={control}
          update={update}
          data={data}
          label={label}
          selectSX={selectSX}
        />
      );
      break;
    case ControlType.Compose:
      label = string_store.string(name) || name;
      Row = (
        <ControlSelectV
          name={name}
          control={control}
          update={update}
          data={data}
          label={label}
          selectSX={selectSX}
        />
      );
      break;
    case ControlType.Material: {
      const matData = GetMaterialData(node, object_store.metaObjects);
      label = string_store.string(name) || name;
      Row = (
        <ControlTransferListV
          name={name}
          control={control}
          update={update}
          data={matData}
          label={label}
          node={node}
          selectSX={selectSX}
        />
      );
      break;
    }
    case ControlType.MaterialTemplate:
      label = string_store.string(name) || name;
      Row = (
        <ControlMaterialTemplateV
          name={name}
          control={control}
          update={update}
        />
      );
      break;
    case ControlType.Animation: {
      const aniData = GetAnimationData(node, object_store.metaObjects);
      label = string_store.string(name) || name;
      Row = (
        <ControlTransferListV
          name={name}
          control={control}
          update={update}
          data={aniData}
          label={label}
          node={node}
          selectSX={selectSX}
        />
      );
      break;
    }
    case ControlType.Counter:{
      label = string_store.string(name) || name;
      Row = (
        <ControlSelectV
          name={name}
          control={control}
          update={update}
          data={data}
          label={label}
          selectSX={selectSX}
        />
      );
      break;
    }
    case ControlType.Range:{
      Row = (
        <ControlRangeV
          name={name}
          control={control}
          update={update}
          InputProps={InputProps}
        />
      );
      break;
    }
    default:
      console.warn("control type is undefined");
      break;
  }
  if (Row) {
    return Row;
  }
  return null;
});
export default ControlRowV;
