import createUxMetaData from '../../../uxApi/createUxMetaData';
import { eventSystem_store } from '../../stores/Interaction_Stores';

export default function EditableInteraction_VM() {
  const AVATAR = 'avatar';
  const ANIMATION = 'animation';

  /**
   *
   * @param {Node[]} nodes - 현재 시트의 노드들
   * @returns {Node[]} uxSelector가 있는 노드들만 필터링
   */
  const filterNodesWithUxSelector_ = (nodes) => {
    return nodes.filter((node) => node.uxSelector);
  };

  /**
   *
   * @param {Node[]} uxNodes - uxSelector가 있는 노드들
   * @param {"avatar" | "animation"} interactionKey - uxSelector의 키 값(avatar, animation)
   * @returns {Node} uxNodes 중 interactionKey와 일치하는 노드
   */
  const filterUxNodeWithInteractionKey_ = (uxNodes, interactionKey) => {
    return uxNodes.filter(
      (node) => node.uxSelector.toLowerCase() === interactionKey
    )[0];
  };

  /**
   *
   * @param {"avatar" | "animation"} interactionKey
   * @returns {number} - interactionKey에 해당하는 노드의 레퍼런스 인덱스
   */
  const getIndexWithInteractionKey_ = (interactionKey) => {
    const currentSheet = eventSystem_store.getSelectedSheet();
    const uxNodes = filterNodesWithUxSelector_(currentSheet.nodes);
    const node = filterUxNodeWithInteractionKey_(uxNodes, interactionKey);
    if (!node) return -1;
    //소켓 내부 레퍼런스 value
    const nodeIndex = node.outputSockets.number.reference.defaultValue;
    return nodeIndex;
  };

  const getVariableTypeNodes = (interactionJson) => {
    const sheetIds = Object.keys(interactionJson.sheets);
    const variableNumberSensorNodes = [];
    const variableNumberNodes = [];
    sheetIds.forEach((sheetId) => {
      // 인풋 받는 넘버 센서 노드들
      variableNumberSensorNodes.push(
        ...interactionJson.sheets[sheetId].nodes.filter(
          (node) => node.type === 'VariableNumberSensor'
        )
      );
      // 아웃풋으로 나가는 넘버 노드들
      variableNumberNodes.push(
        ...interactionJson.sheets[sheetId].nodes.filter(
          (node) => node.type === 'VariableNumber'
        )
      );
    });

    const mappedvariableNumberSensorNodes = variableNumberSensorNodes.map(
      (node) => {
        return {
          key: node.referenceParameter.NODE_DAT_KEY.defaultValue,
          value: node.outputSockets.number.reference.defaultValue
        };
      }
    );

    const mappedvariableNumberNodes = variableNumberNodes.map((node) => {
      return {
        key: node.referenceParameter.NODE_DAT_KEY.defaultValue,
        value: node.inputSockets.number.reference.defaultValue
      };
    });
    return {
      mappedvariableNumberSensorNodes,
      mappedvariableNumberNodes
    };
  };

  const toJson = (interactionJson) => {
    const metaDataArray = [
      // createUxMetaData(
      //   'avatarIndex',
      //   'number',
      //   'Spinner',
      //   [0, 20],
      //   getIndexWithInteractionKey_(AVATAR),
      //   ''
      // ),
      // createUxMetaData(
      //   'animationIndex',
      //   'number',
      //   'Spinner',
      //   [0, 20],
      //   getIndexWithInteractionKey_(ANIMATION),
      //   ''
      // )
      getVariableTypeNodes(interactionJson)
    ];
    return metaDataArray;
  };

  return {
    toJson
  };
}
