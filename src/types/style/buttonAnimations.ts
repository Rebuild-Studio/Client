/**
 * Button Animation Types
 * - translate: 버튼 클릭시 좌하단으로 이동후 복귀
 * - bounce: 버튼 클릭시 위로 한번 튀어오름
 * - shrink: 버튼 클릭시 작아지고 복귀
 * - enlarge: 버튼 클릭시 커지고 복귀
 * - none: 애니메이션 없음
 */
type ButtonAnimationType =
  | 'translate'
  | 'bounce'
  | 'shrink'
  | 'enlarge'
  | 'none';

export type { ButtonAnimationType };
