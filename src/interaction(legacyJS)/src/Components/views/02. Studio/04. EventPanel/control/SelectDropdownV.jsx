import { useCallback, useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import storeContainer from '@/store/storeContainer';
import SetNodeDataCommand from '../../../../class/commands/Interaction/SetNodeDataCommand';
import SetNodeObjectCommand from '../../../../class/commands/Interaction/SetNodeObjectCommand';
import legacyStoreContainer from '../../../../stores/storeContainer';

const SelectDropdown = observer((props) => {
  const { eventSystem_store, string_store, interactionhistory_store } =
    legacyStoreContainer;
  const { primitiveStore } = storeContainer;
  const { node, entry, dropdownData } = props;
  const key = entry[0];
  const data = entry[1];
  const { uuid } = node;
  const [defaultValue, setDefaultValue] = useState('오브젝트');
  const objectDropdownData = primitiveStore.meshes;
  const disable = useMemo(() => {
    return (Object.values(dropdownData).length > 0 ||
      Object.values(objectDropdownData).length) > 0
      ? false
      : true;
  }, [
    Object.values(dropdownData).length,
    Object.values(objectDropdownData).length
  ]);

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
        value: undefined
      }
    };
    switch (data.type) {
      case 'MouseRaycast':
      case 'ObjectSensor':
      case 'Object':
        args.key = 'object';
        if (objectDropdownData[data.value]) {
          setDefaultValue(objectDropdownData[data.value].name);
        } else {
          setDefaultValue('');
          removeObjectValue(args);
        }
        break;
      case 'Light':
      case 'PointLightSensor':
      case 'SpotLightSensor':
      case 'PointLight':
      case 'SpotLight':
        args.key = 'light';
        if (objectDropdownData[data.value]) {
          setDefaultValue(objectDropdownData[data.value].name);
        } else {
          setDefaultValue('');
          removeObjectValue(args);
        }
        break;
      case 'Function':
        args.key = 'function';
        if (dropdownData.map.get(data.value)) {
          setDefaultValue(data.value);
        } else {
          setDefaultValue('');
          removeObjectValue(args);
        }
        break;
      case 'Asset':
        if (objectDropdownData[data.value]) {
          setDefaultValue(objectDropdownData[data.value].name);
        } else {
          setDefaultValue('');
          removeObjectValue(args);
        }
        break;
      default:
        setDefaultValue(data.value);
        break;
    }
  }, [data.type, node.type, data.value, objectDropdownData]);

  const Options = useCallback(() => {
    switch (data.type) {
      case 'Object':
        return Object.entries(objectDropdownData).map(([key, mesh]) => (
          <option key={`${mesh.uuid}-option-${mesh.id}`} value={key}>
            {mesh.name}
          </option>
        ));

      case 'Sensor':
      case 'PointLight':
      case 'SpotLight':
        return Object.entries(dropdownData).map(([key, mesh]) => (
          <option key={`${mesh.uuid}-option-${mesh.id}`} value={key}>
            {mesh.name}
          </option>
        ));

      case 'Asset':
        return Object.entries(objectDropdownData).map(([key, mesh]) => (
          <option key={`${mesh.uuid}-option-${mesh.id}`} value={key}>
            {mesh.name}
          </option>
        ));
      default:
        return dropdownData.list?.map((type) => (
          <option key={`${uuid}-option-${type}`} value={type}>
            {string_store.string(type) || type}
          </option>
        ));
    }
  }, [objectDropdownData, data.type, string_store, uuid]);

  const handleOnChange = useCallback(
    (event) => {
      const targetValue = event.target.value;
      if (targetValue !== node.control[key].value) {
        switch (node.category) {
          case 'Sensor':
          case 'Animation': {
            const value = {
              value: targetValue,
              name: dropdownData[targetValue]
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
          case 'Object': {
            const value = {
              value: targetValue,
              name: objectDropdownData[targetValue].name
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
      objectDropdownData,
      eventSystem_store,
      interactionhistory_store,
      key,
      node.category,
      node.control,
      uuid
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
        border: 'none',
        width: '100%',
        height: '100%',
        outline: 'none',
        color: 'inherit',
        backgroundColor: 'inherit',
        fontFamily: 'inherit',
        fontSize: 'inherit',
        fontWeight: 'inherit'
      }}
    >
      <option key={`${uuid}-option-blank`} hidden value="">
        {`${defaultValue} 선택`}
      </option>
      <Options />
    </select>
  );
});
export default SelectDropdown;
