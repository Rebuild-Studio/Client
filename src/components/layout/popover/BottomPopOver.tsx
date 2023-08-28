import { styled } from "styled-components";
import { PopOverProps } from "./PopOverProps";
import { useRef, useState, useEffect } from "react";

const PopOverWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const PopOverTrigger = styled.div`
  padding: 8px 12px;
`;

const PopOverContent = styled.div`
  width: 100%;
  position: absolute;
  z-index: 1;
`;

const BottomPopOver = (props: PopOverProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isTriggered, setIsTriggered] = useState(false);

  const setOnTriggerListener = () => {
    setIsTriggered(!isTriggered);
  };

  const setOnOutsideClickListener = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsTriggered(false);
    }
  };

  useEffect(() => {
    if (isTriggered) {
      document.addEventListener("mousedown", setOnOutsideClickListener);
    } else {
      document.removeEventListener("mousedown", setOnOutsideClickListener);
    }
    return () => {
      document.removeEventListener("mousedown", setOnOutsideClickListener);
    };
  }, [isTriggered]);

  return (
    <PopOverWrapper ref={ref}>
      <PopOverTrigger onClick={setOnTriggerListener}>
        {props.triggerComponent}
      </PopOverTrigger>
      {isTriggered ? (
        <PopOverContent onClick={setOnTriggerListener}>
          {props.children}
        </PopOverContent>
      ) : (
        ""
      )}
    </PopOverWrapper>
  );
};

export default BottomPopOver;
