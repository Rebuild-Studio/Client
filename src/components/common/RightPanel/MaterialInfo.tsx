import styled from "styled-components";
import Slider from "../Slider";
import CustomMenu from "@/components/layout/Menu";
import MaterialTemplate from "./MaterialTemplate";

interface MaterialInfoProps {
  metalness: number;
  roughness: number;
}
const Wrapper = styled.div`
  margin-top: 10px;
`;

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
      <Wrapper>
        <MaterialMenu>
          <TitleWrapper>
            <span>{"머터리얼 요소 편집"}</span>
            <CustomMenu title={"머테리얼"} MenuItem={<MaterialTemplate />} />
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
      </Wrapper>
    </>
  );
};

export default Material;
