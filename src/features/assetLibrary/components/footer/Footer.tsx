import MenuButton from "@/components/common/MenuButton";
import { basicColors, grayColors } from "@/resources/colors/colors";
// import assetLibraryStore from "@/store/assetLibraryStore";
// import primitiveStore from "@/store/primitiveStore";
// import TempPrimitive from "@/three_components/assets/TempPrimitive";
import { getButtonClickAnimation } from "@/utils/animation/button";
import { observer } from "mobx-react";
// import { nanoid } from "nanoid";
import styled, { css } from "styled-components";

const Footer = observer(() => {
  // const selectedAssets = assetLibraryStore.selectedAssets;
  // const selectedAsssetFileNames = selectedAssets.map((asset) => asset.fileName);

  const onClickLoad = () => {
    // selectedAsssetFileNames.forEach((fileName) => {
    // const storeId = nanoid();
    // primitiveStore.addPrimitive(
    //   storeId,
    //   <TempPrimitive
    //     key={nanoid()}
    //     storeId={storeId}
    //     dir={`models/Objects/`}
    //     name={`${fileName}.glb`}
    //   />
    // );
    // });
  };

  return (
    <div>
      <Container>
        <LoadButton label="불러오기" disabled={false} onClick={onClickLoad} />
        <CancelButton
          label="닫기"
          disabled={false}
          onClick={() => {
            /* 추후 modal close state control 달것 */
          }}
        />
      </Container>
    </div>
  );
});

export default Footer;

const Container = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 20px;
  box-sizing: border-box;

  & > * {
    margin-left: 10px;
  }
`;

const LoadButton = styled(MenuButton)`
  background-color: ${basicColors.limeGreen};
  border: 1px solid ${grayColors.lightGray};
  &:active {
    animation: ${css`
      ${getButtonClickAnimation("translate")} 0.2s ease-in-out
    `};
  }
`;

const CancelButton = styled(LoadButton)`
  background-color: ${basicColors.black};
  color: ${basicColors.white};
  &:hover {
    background-color: ${grayColors.panelGray};
  }
`;
