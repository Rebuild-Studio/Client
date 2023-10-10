import React from "react";

/**
 *
 * @param {ref} container - ref
 * @param {number} page - 현재 페이지
 * @param {function} setPage - 현재 페이지 변경 함수
 * @param {number} offset - 무한 스크롤 offset(기본값 0)
 * @description - 무한 스크롤
 */
const infiniteScroll = <T extends HTMLElement>(
  ref: React.RefObject<T>,
  page: number,
  setPage: React.Dispatch<React.SetStateAction<number>>,
  offset = 0
) => {
  if (
    ref &&
    ref.current &&
    ref.current.scrollHeight - ref.current.scrollTop <=
      ref.current.clientHeight + offset
  ) {
    setPage(page + 1);
  }
};

export default infiniteScroll;
