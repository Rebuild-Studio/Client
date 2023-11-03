/**
 * @description
 * WebSocket 모듈에서 사용하는 서비스 명
 * @property {string} CreateMxController mx 프로젝트 생성
 * @property {string} ReadMxController mx 프로젝트 불러오기
 * @property {string} ReadPmxController pmx 프로젝트 불러오기
 * @property {string} CreatePmxController pmx 프로젝트 생성
 * @property {string} FindMyMxController 내 mx 프로젝트 리스트 불러오기
 * @property {string} FindMyPmxController 내 pmx 프로젝트 리스트 불러오기
 * @property {string} FindAllPmxController 모든 pmx 프로젝트 리스트 불러오기
 * @property {string} CheckMxNameController mx 프로젝트 이름 중복 체크
 * @property {string} CheckPmxNameController pmx 프로젝트 이름 중복 체크
 * @property {string} PublishPmxController pmx 프로젝트 배포
 * @property {string} DeleteMxController mx 프로젝트 삭제
 * @property {string} DeletePmxController pmx 프로젝트 삭제
 * @property {string} UpdateMxController mx 프로젝트 업데이트
 * @property {string} CreateLibraryAssetController 라이브러리 에셋 생성
 * @property {string} FindLibraryByNameController 라이브러리 에셋 이름으로 검색
 * @property {string} FindLibraryByDomainAndCategoriesController 라이브러리 도메인, 카테고리로 불러오기
 *
 */
export type TargetService =
  | 'CreateMxController'
  | 'ReadMxController'
  | 'ReadPmxController'
  | 'CreatePmxController'
  | 'FindMyMxController'
  | 'FindMyPmxController'
  | 'FindAllPmxController'
  | 'CheckMxNameController '
  | 'CheckPmxNameController'
  | 'PublishPmxController'
  | 'DeleteMxController'
  | 'DeletePmxController'
  | 'UpdateMxController'
  | 'CreateLibraryAssetController'
  | 'FindLibraryByNameController'
  | 'FindLibraryByDomainAndCategoriesController';
