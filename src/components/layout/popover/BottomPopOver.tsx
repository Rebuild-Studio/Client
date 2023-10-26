import { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { PopOverProps } from './PopOverProps';

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
      document.addEventListener('mousedown', setOnOutsideClickListener);
    } else {
      document.removeEventListener('mousedown', setOnOutsideClickListener);
    }
    return () => {
      document.removeEventListener('mousedown', setOnOutsideClickListener);
    };
  }, [isTriggered]);

  return (
    <PopOverWrapper ref={ref}>
      <div onClick={setOnTriggerListener}>{props.triggerComponent}</div>
      {isTriggered ? (
        <PopOverContent onClick={setOnTriggerListener}>
          {props.children}
        </PopOverContent>
      ) : (
        ''
      )}
    </PopOverWrapper>
  );
};

export default BottomPopOver;

const PopOverWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const PopOverContent = styled.div`
  position: absolute;
  left: 10px;
  bottom: -10px;
  transform: translateY(100%);
  z-index: 2;
`;
