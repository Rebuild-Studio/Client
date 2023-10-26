import { useCallback } from 'react';
import { observer } from 'mobx-react';
import { nanoid } from 'nanoid';
import styled, { css } from 'styled-components';
import MenuButton from '@/components/common/MenuButton';
import { basicColors, grayColors } from '@/resources/colors/colors';
import storeContainer from '@/store/storeContainer';
import AssetPrimitive from '@/three_components/assets/AssetPrimitive';
import { getButtonClickAnimation } from '@/utils/animation/button';
import getMinioPath from '@/utils/path/minio';
import assetLibraryStore from '@store/assetLibrary.store.ts';

const Footer = () => {
  const selectedAssets = assetLibraryStore.selectedAssets;
  const selectedAsssetFileNames = selectedAssets.map((asset) => asset.fileName);
  const { projectStateStore, primitiveStore } = storeContainer;

  const onClickLoad = useCallback(() => {
    selectedAsssetFileNames.forEach((fileName) => {
      const storeId = nanoid();
      primitiveStore.addPrimitive(
        storeId,
        <AssetPrimitive
          key={storeId}
          storeId={storeId}
          url={getMinioPath(fileName, 'libraryGlb')}
        />
      );
      projectStateStore.clearModal();
    });
  }, [selectedAsssetFileNames, primitiveStore, projectStateStore]);

  const onClickCancel = () => {
    projectStateStore.clearModal();
  };

  return (
    <div>
      <Container>
        <LoadButton label="불러오기" disabled={false} onClick={onClickLoad} />
        <CancelButton label="닫기" disabled={false} onClick={onClickCancel} />
      </Container>
    </div>
  );
};

const Observer = observer(Footer);
export default Observer;

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
      ${getButtonClickAnimation('translate')} 0.2s ease-in-out
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
