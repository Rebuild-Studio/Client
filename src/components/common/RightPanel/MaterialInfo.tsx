import styled from 'styled-components';
import Slider from '../Slider';
import CustomMenu from '@/components/layout/Menu';
import ColorHandler from '@/components/common/RightPanel/ColorHandler';
import MaterialTemplate from './MaterialTemplate';
import ColorPicker from './ColorPicker';
import * as THREE from 'three';
import { HsvaColor } from '@uiw/color-convert';
import { useEffect, useState } from 'react';
import storeContainer from '@/store/storeContainer';

interface MaterialInfoProps {
  metalness: number;
  roughness: number;
  color: HsvaColor;
}

const Material = ({
  metalness = 1,
  roughness = 0.5,
  color
}: MaterialInfoProps) => {
  const [mesh, setMesh] = useState(new THREE.Mesh());
  const { primitiveStore } = storeContainer;
  const { updateMaterialColor, updateMaterialAlpha } = ColorHandler;
  const selectedPrimitive = Object.values(primitiveStore.selectedPrimitives)[0];

  useEffect(() => {
    if (selectedPrimitive) {
      setMesh(selectedPrimitive);
    }
  }, [primitiveStore.selectedPrimitives]);

  const onMetalnessChange = (newValue: number) => {
    if (mesh.material instanceof THREE.MeshStandardMaterial) {
      const material = mesh.material;
      material.metalness = newValue;
    }
  };
  const onRoughnessChange = (newValue: number) => {
    if (mesh.material instanceof THREE.MeshStandardMaterial) {
      const material = mesh.material;
      material.roughness = newValue;
    }
  };
  return (
    <>
      <Wrapper>
        <MaterialMenu>
          <TitleWrapper>
            <span>{'머터리얼 요소 편집'}</span>
            <CustomMenu title={'머테리얼'} MenuItem={<MaterialTemplate />} />
          </TitleWrapper>
          <TitleWrapper>
            <span>{'기본 컬러'}</span>
            <ColorPicker
              label={'기본 컬러'}
              color={color}
              onChangeHsvaProp={updateMaterialColor}
              onChangeAlphaProp={updateMaterialAlpha}
            />
          </TitleWrapper>
        </MaterialMenu>
        <Slider
          min={0}
          max={1}
          step={0.01}
          initValue={metalness}
          title="금속성"
          onMaterialChange={onMetalnessChange}
        />
        <Slider
          min={0}
          max={1}
          step={0.01}
          initValue={roughness}
          onMaterialChange={onRoughnessChange}
          title="거칠기"
        />
      </Wrapper>
    </>
  );
};

export default Material;

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
