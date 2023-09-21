import { useState } from "react";
import styled from "styled-components";
import Slider from "../Slider";
import CustomMenu from "@/components/layout/Menu";

interface MaterialInfoProps {
  metalness: number;
  roughness: number;
}

const MaterialMenu = styled.div`
  width: 200px;
  margin: 20 0;
`;
const TitleWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  font-size: 10px;
`;
const Material = ({ metalness = 1, roughness = 0.5 }: MaterialInfoProps) => {
  return (
    <>
      <div style={{ marginTop: "10px" }}>
        <MaterialMenu>
          <TitleWrapper>
            <span>{"머터리얼 요소 편집"}</span>
            <CustomMenu title={"머테리얼"} MenuItem={[<span>하이</span>]} />
          </TitleWrapper>
          <TitleWrapper>
            <span>{"기본"}</span>
            <CustomMenu title={"머테리얼"} MenuItem={[<span>하이</span>]} />
          </TitleWrapper>
        </MaterialMenu>
        <Slider
          min={0}
          max={1}
          step={0.01}
          initValue={metalness}
          title="금속성"
        />
        <Slider
          min={0}
          max={1}
          step={0.01}
          initValue={roughness}
          title="거칠기"
        />
      </div>
    </>
  );
};

export default Material;
