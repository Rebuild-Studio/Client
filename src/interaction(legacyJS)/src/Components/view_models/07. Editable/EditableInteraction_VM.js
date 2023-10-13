import createUxMetaData from "../../../uxApi/createUxMetaData";
import { eventSystem_store } from "../../stores/Interaction_Stores";

export default function EditableInteraction_VM() {
  const AVATAR = "avatar";
  const ANIMATION = "animation";

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

  const toJson = () => {
    const metaDataArray = [
      createUxMetaData(
        "avatarIndex",
        "number",
        "Spinner",
        [0, 20],
        getIndexWithInteractionKey_(AVATAR),
        ""
      ),
      createUxMetaData(
        "animationIndex",
        "number",
        "Spinner",
        [0, 20],
        getIndexWithInteractionKey_(ANIMATION),
        ""
      ),
    ];
    return metaDataArray;
  };

  return {
    toJson,
  };
}
