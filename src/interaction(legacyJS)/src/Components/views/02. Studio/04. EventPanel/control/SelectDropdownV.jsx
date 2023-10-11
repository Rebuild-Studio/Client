import storeContainer from "../../../../stores/storeContainer";
import { observer } from "mobx-react";
import { useState, useCallback, useEffect, useMemo } from "react";
import SetNodeDataCommand from "../../../../class/commands/Interaction/SetNodeDataCommand";
import SetNodeObjectCommand from "../../../../class/commands/Interaction/SetNodeObjectCommand";

const SelectDropdown = observer((props) => {
  const { eventSystem_store, string_store, interactionhistory_store } =
    storeContainer;
  const { node, entry, dropdownData } = props;
  const key = entry[0];
  const data = entry[1];
  const { uuid } = node;
  const [defaultValue, setdefaultValue] = useState("");
  const disable = useMemo(() => {
    return dropdownData.list?.length > 0 ? false : true;
  }, [dropdownData.list?.length]);

  const removeObjectValue = useCallback(
    (args) => {
      eventSystem_store
        .getSelectedSheet()
        .setObjectValueProp(uuid, args.key, args.value);
    },
    [eventSystem_store, uuid]
  );

  useEffect(() => {
    const args = {
      value: {
        name: node.type,
        value: undefined,
      },
    };
    switch (data.type) {
      case "MouseRaycast":
      case "ObjectSensor":
      case "Object":
        args.key = "object";
        if (dropdownData.map.get(data.value)) {
          setdefaultValue(data.value);
        } else {
          setdefaultValue("");
          removeObjectValue(args);
        }
        break;
      case "Light":
      case "PointLightSensor":
      case "SpotLightSensor":
      case "PointLight":
      case "SpotLight":
        args.key = "light";
        if (dropdownData.map.get(data.value)) {
          setdefaultValue(data.value);
        } else {
          setdefaultValue("");
          removeObjectValue(args);
        }
        break;
      case "Function":
        args.key = "function";
        if (dropdownData.map.get(data.value)) {
          setdefaultValue(data.value);
        } else {
          setdefaultValue("");
          removeObjectValue(args);
        }
        break;
      case "Asset":
        args.key = "function";
        if (dropdownData.map.get(data.value)) {
          setdefaultValue(data.value);
        } else {
          setdefaultValue("");
          removeObjectValue(args);
        }
        break;
      default:
        setdefaultValue(data.value);
        break;
    }
  }, [dropdownData, data.type, node.type, data.value, removeObjectValue]);

  const Options = useCallback(() => {
    switch (data.type) {
      case "Object":
      case "Sensor":
      case "PointLight":
      case "SpotLight":
        return dropdownData.list?.map(
          ({ objectId, type, name = type + objectId }) => (
            <option key={`${uuid}-option-${objectId}`} value={objectId}>
              {name}
            </option>
          )
        );
      case "Function":
        return dropdownData.list?.map(({ uuid, type, name = type + uuid }) => (
          <option key={`${uuid}-option-${uuid}`} value={uuid}>
            {name}
          </option>
        ));
      case "Asset":
        return dropdownData.list?.map(({ uuid, type, name = type + uuid }) => (
          <option key={`${uuid}-option-${uuid}`} value={uuid}>
            {name}
          </option>
        ));
      default:
        return dropdownData.list?.map((type) => (
          <option key={`${uuid}-option-${type}`} value={type}>
            {string_store.string(type) || type}
          </option>
        ));
    }
  }, [dropdownData, data.type, string_store, uuid]);

  const handleOnChange = useCallback(
    (event) => {
      const targetValue = event.target.value;
      if (targetValue !== node.control[key].value) {
        switch (node.category) {
          case "Sensor":
          case "Animation": {
            const value = {
              value: targetValue,
              name: dropdownData.map.get(targetValue),
            };
            interactionhistory_store.execute(
              new SetNodeObjectCommand(
                eventSystem_store,
                uuid,
                key,
                value,
                eventSystem_store.selectedSheet
              )
            );
            break;
          }
          case "Object": {
            const value = {
              value: targetValue,
              name: dropdownData.map.get(targetValue),
            };
            interactionhistory_store.execute(
              new SetNodeObjectCommand(
                eventSystem_store,
                uuid,
                key,
                value,
                eventSystem_store.selectedSheet
              )
            );
            break;
          }
          default:
            interactionhistory_store.execute(
              new SetNodeDataCommand(
                eventSystem_store,
                uuid,
                key,
                targetValue,
                eventSystem_store.selectedSheet
              )
            );
            break;
        }
      }
    },
    [
      dropdownData.map,
      eventSystem_store,
      interactionhistory_store,
      key,
      node.category,
      node.control,
      uuid,
    ]
  );

  return (
    <select
      disabled={disable}
      autoFocus
      value={defaultValue}
      onPointerDown={(event) => {
        const ctrl = event.ctrlKey || event.metaKey;
        if (ctrl && eventSystem_store.selectedNodes.includes(uuid)) {
          event.preventDefault();
        }
      }}
      onChange={(event) => {
        handleOnChange(event);
      }}
      data-nodeuuid={uuid}
      data-name="node"
      style={{
        border: "none",
        width: "100%",
        height: "100%",
        outline: "none",
        color: "inherit",
        backgroundColor: "inherit",
        fontFamily: "inherit",
        fontSize: "inherit",
        fontWeight: "inherit",
      }}
    >
      <option key={`${uuid}-option-blank`} hidden value="">
        {`${string_store.string(entry[1].extras)} 선택`}
      </option>
      <Options />
    </select>
  );
});
export default SelectDropdown;
