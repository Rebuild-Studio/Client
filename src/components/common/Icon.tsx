import { useState } from "react";
import { styled } from "styled-components";

interface Props {
  defaultSrc: string;
  activeSrc: string;
  alt: string;
  activated: boolean;
}

const Icon = ({ defaultSrc, activeSrc, alt, activated }: Props) => {
  const [isHover, setIsHover] = useState(false);
  const useActiveSrc = isHover || activated;

  return (
    <Wrapper
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {useActiveSrc ? (
        <img src={activeSrc} alt={alt} />
      ) : (
        <img src={defaultSrc} alt={alt} />
      )}
    </Wrapper>
  );
};

export default Icon;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
