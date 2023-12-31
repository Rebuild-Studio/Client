import { observable } from 'mobx';

const hotkey_store = observable({
  selectedHotKeys: null,
  prevHotKeys: null,
  keyboardOpen: false,
  defaultHotkeys: [],
  usedKeys: { A: true, L: true, E: true, H: true },
  usedKeysWithCtrl: {},
  usedKeyWithShift: {},
  usedKeyWithCtrlShift: {},
  ctrlKey: false,
  shiftKey: false,
  disabledKeys: {
    'Caps Lock': true,
    Enter: true,
    window: true,
    space: true,
    '한/A': true,
    Fn: true,
    Tab: true,
    BackSpace: true,
    alt: true,
    ArrowUp: true,
    ArrowLeft: true,
    ArrowDown: true,
    ArrowRight: true
  },
  hotkey: {
    '사용자 설정 키': [],
    도구: [
      ['로컬 / 글로벌 기즈모', '1', false, false, false],
      ['그리드 스냅', 'G', false, false, false],
      ['45°회전 스냅', 'A', false, false, false],
      ['표면 스냅 -> 축 활성화', 'S', false, false, false],
      ['표면 스냅 -> 축 비활성화', 'N', false, false, false]
    ],
    보기: [
      ['미리보기', 'P', false, false, false],
      ['임시저장', 'S', true, false, false],
      ['그리드 숨기기 / 표시', 'Z', false, false, false],
      ['히스토리 열림 / 닫힘', 'X', false, false, false],
      ['계층 구조 열림 / 닫힘', 'C', false, false, false],
      ['카메라 미리보기', 'T', false, false, false]
    ],
    '확대/축소': [
      ['줌 인', '횔 ↑', false, false, false],
      ['줌 아웃', '횔 ↓', false, false, false],
      ['씬 전체보기', 'B', false, false, false],
      ['오브젝트 확대', 'F', false, false, false]
    ],
    선택: [
      ['전체 선택', 'A', true, false, false],
      ['선택 해제', 'ESC', false, false, false]
      // ["선택 잠금 / 잠금 해제", "L", true, false, false],
      // ["선택 숨기기 / 보이기", "H", false, false, false],
      // ["숨김 상태 모두 보이기", "H", true, false, false],
      // ["선택 그룹화 / 그룹 해제", " G", true, false, false],
      // ["선택 종속화 / 종속 관계 해제", "P", true, false, false],
    ],
    편집: [
      ['실행 취소', 'Z', true, false, false],
      ['다시 실행', 'Z', false, true, false],
      ['복사하기', 'C', true, false, false],
      ['붙여넣기', 'V', true, false, false],
      ['복제하기', 'D', true, false, false],
      // ["불러오기", "I", true, false, false],
      ['삭제', 'Del', false, false, false]
    ]
  }
});
export { hotkey_store };
