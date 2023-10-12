import infiniteScroll from "@/utils/infiniteScroll/infiniteScroll";
import setThrottle from "@/utils/throttle/throttle";
import { Dispatch, SetStateAction, useEffect } from "react";

import { RefObject } from "react";

//TODO : localPage , globalPage의 모호성을 해결할 필요가 있음
// mobx의 액션함수를 다이렉트하게 넘길수가 없어서, 내부 상태로 위임
const useInfiniteScroll = (
  ref: RefObject<HTMLElement>,
  globalPage: number,
  localPage: number,
  setLocalpage: Dispatch<SetStateAction<number>>
) => {
  useEffect(() => {
    const container = ref.current;

    if (!container) return;

    const handleScroll = setThrottle(() => {
      return infiniteScroll(ref, localPage, setLocalpage, 400);
    }, 100);
    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [globalPage, localPage, ref, setLocalpage]);
};

export default useInfiniteScroll;
