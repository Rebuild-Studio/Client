import ReferenceTextField from "./TextFieldV";
import { observer } from "mobx-react-lite";

const NodeReferenceVector3Selector_V = ({ value, setValue, tooltipMessage }) => {

  const handleSetValueX = (newValue) => {
    setValue({ ...value, x: newValue });
  }
  const handleSetValueY = (newValue) => {
    setValue({ ...value, y: newValue });
  }
  const handleSetValueZ = (newValue) => {
    setValue({ ...value, z: newValue });
  }

  return (
    <>
      <ReferenceTextField
        value={value.x}
        setValue={handleSetValueX}
        tooltipMessage={tooltipMessage}
        refType={"Number"}
      />
      <ReferenceTextField
        value={value.y}
        setValue={handleSetValueY}
        tooltipMessage={tooltipMessage}
        refType={"Number"}
      />
      <ReferenceTextField
        value={value.z}
        setValue={handleSetValueZ}
        tooltipMessage={tooltipMessage}
        refType={"Number"}
      />
    </>
  );
}

export default observer(NodeReferenceVector3Selector_V);