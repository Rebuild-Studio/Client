import ReferenceTextField from "../../ReferenceParameter/TextFieldV";
import NodeReferenceMaterialSelector from "../../ReferenceParameter/NodeReferenceMaterialSelector_V";
import NodeReferenceKeyboardActionSelector from "../../ReferenceParameter/NodeReferenceKeyboardActionSelector_V";
import NodeReferenceKeyboardInputButton from "../../ReferenceParameter/NodeReferenceKeyboardInputButton_V";
import SetNodeReferenceDataCommand from "../../../../../class/commands/Interaction/SetNodeReferenceDataCommand";
import storeContainer from "../../../../../stores/storeContainer";
import NodeReferenceBooleanSelector from "../../ReferenceParameter/NodeReferenceBooleanSelector_V";
import NodeReferenceVector3Selector_V from "../../ReferenceParameter/NodeReferenceVector3Selector_V";
import { observer } from "mobx-react";
import NodeReferenceColorSelector from "../../ReferenceParameter/NodeReferenceColorSelector_V";

/**
 * @description
 * return reference Selector by its type
 *
 * reference should have key-value like below
 * -  ex)
 * -  defaultValue: 10, (or string, any type can be possible)
 * -  name: "NODE_DAT_RANDOM"
 * -  tooltipMessage: "0부터 최대값 사이의 실수값을 반환합니다"
 * -  type: "number"
 *
 * @param reference
 * @returns {JSX.Element}
 */

const NodeReferenceSelector = ({ reference }) => {
  const { eventSystem_store, interactionhistory_store } =
    storeContainer;
  const { type, tooltipMessage, defaultValue } = reference;

  const handleSetValue = (newValue) => {
    interactionhistory_store.execute(
      new SetNodeReferenceDataCommand(
        eventSystem_store,
        reference,
        newValue
      )
    );
  };
  switch (type) {
    case "Number":
      return (
        <ReferenceTextField
          value={defaultValue}
          setValue={handleSetValue}
          tooltipMessage={tooltipMessage}
          refType={type}
        />
      );
    case "String":
      return (
        <ReferenceTextField
          value={defaultValue}
          setValue={handleSetValue}
          tooltipMessage={tooltipMessage}
          refType={type}
        />
      );
    case "Material":
      return (
        <NodeReferenceMaterialSelector
          value={defaultValue}
          setValue={handleSetValue}
          tooltipMessage={tooltipMessage}
        />
      );
    case "MouseAction":
      return (
        <NodeReferenceKeyboardActionSelector
          value={defaultValue}
          setValue={handleSetValue}
          tooltipMessage={tooltipMessage}
        />
      );
    case "KeyboardAction":
      return (
        <NodeReferenceKeyboardActionSelector
          value={defaultValue}
          setValue={handleSetValue}
          tooltipMessage={tooltipMessage}
        />
      );
    case "KeyboardInput":
      return (
        <NodeReferenceKeyboardInputButton
          value={defaultValue}
          setValue={handleSetValue}
          tooltipMessage={tooltipMessage}
        />
      );
    case "Boolean":
      return (
        <NodeReferenceBooleanSelector
          value={defaultValue}
          setValue={handleSetValue}
          tooltipMessage={tooltipMessage}
        />
      );
    case "Vector3":
      return (
        <NodeReferenceVector3Selector_V
          value={defaultValue}
          setValue={handleSetValue}
          tooltipMessage={tooltipMessage}
        />
      );
    case "Color":
      return (
        <NodeReferenceColorSelector
          value={defaultValue}
          setValue={handleSetValue}
          tooltipMessage={tooltipMessage}
        />
      )
    default:
      return <></>;
  }
};

export default observer(NodeReferenceSelector);
