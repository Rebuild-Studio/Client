/**
 *
 * @param {string} name - metaData name
 * @param {'number' | 'string' | 'boolean'} type - metaData type
 * @param {'Spinner' | 'TextField' | 'Dropdown'} controlType - metaData control type
 * @param {string | number | boolean} value - metaData value
 * @param {string | number | boolean} initialValue - metaData initial value
 * @param {string | number | boolean} defaultValue - default value when initial value is not set
 * @param {1} basic
 * @returns {object} metaData
 * @example
 *{
 *  Name: name,
 *  Type: [
 *    {
 *      isArray: false,
 *      isObject: false,
 *      type: type,
 *    },
 *  ],
 *  Control: {
 *    type: controlType,
 *    value: value,
 *  },
 *  InitialValue: initialValue,
 *  DefaultValue: defaultValue,
 *  Basic: basic,
 *}
 */
export default function createUxMetaData(
  name,
  type,
  controlType,
  value,
  initialValue,
  defaultValue,
  basic = 1
) {
  return {
    Name: name,
    Type: [
      {
        isArray: false,
        isObject: false,
        type: type,
      },
    ],
    Control: {
      type: controlType,
      value: value,
    },
    InitialValue: initialValue,
    DefaultValue: defaultValue,
    Basic: basic,
  };
}
