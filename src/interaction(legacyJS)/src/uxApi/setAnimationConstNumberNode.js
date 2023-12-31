import SetNodeDataCommand from '../Components/class/commands/Interaction/SetNodeDataCommand';
import { eventSystem_store } from '../Components/stores/Interaction_Stores';
import { interactionhistory_store } from '../Components/stores/Interaction_Stores';
import { previewViewModel } from '../Components/view_models/Preview_VM';

/**
 * 상수 노드 제어
 * @param {HTMLEvent} e - event(임시, previewModeHandler에서 사용
 * @param {number} index - 아이템 인덱스(0부터 시작)
 */
export const setAnimationConstNumberNode = (e, index) => {
  const { nodes } = eventSystem_store;
  // ISSUE1 - 현재는 마지막 생성노드를 찍어옴(임시)
  const node = nodes[nodes.length - 2];
  interactionhistory_store.execute(
    new SetNodeDataCommand(
      eventSystem_store,
      node.uuid,
      'number',
      index,
      eventSystem_store.selectedSheet
    )
  );
  // ISSUE2 - 임시로 런타임 끄고 다시 킴(노드의 값이 바뀌어도 런타임에서는 반영이 안됨)
  previewViewModel.previewModeHandler(e);
  previewViewModel.previewModeHandler(e);
};
