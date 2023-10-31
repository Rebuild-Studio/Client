import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { HsvaColor, RgbaColor, hsvaToRgba } from '@uiw/color-convert';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import ColorHandler from '@/components/common/RightPanel/ColorHandler';
import CustomMenu from '@/components/layout/Menu';
import storeContainer from '@/store/storeContainer';
import ColorContent from './ColorContent';
import MaterialTemplate from './MaterialTemplate';
import Slider from '../Slider';

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
  const [openMenu, setOpenMenu] = useState(false);
  const [menuType, setMenuType] = useState<'material' | 'color' | ''>('');
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const rgbColor = hsvaToRgba(color);

  const handleToggle = (
    event: React.MouseEvent<HTMLButtonElement>,
    type: 'material' | 'color'
  ) => {
    if (!openMenu) {
      setMenuType(type);
      setAnchorEl(event.currentTarget);
      setOpenMenu(true);
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    setMenuType('');
    setAnchorEl(null);
    setOpenMenu(false);
  };
  useEffect(() => {
    if (selectedPrimitive) {
      setMesh(selectedPrimitive);
    }
  }, [primitiveStore.selectedPrimitives]);

  const materialAnchorButton = (
    <button onClick={(e) => handleToggle(e, 'material')}>Open Menu</button>
  );
  const colorAnchorButton = (
    <ColorButton
      $color={color}
      $rgbColor={rgbColor}
      onClick={(e) => handleToggle(e, 'color')}
    />
  );
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
            {materialAnchorButton}
            {menuType === 'material' &&
              ReactDOM.createPortal(
                <CustomMenu
                  title={'머테리얼'}
                  anchorButton={materialAnchorButton}
                  anchorElement={anchorEl}
                  handleClose={handleClose}
                  MenuItem={<MaterialTemplate />}
                />,
                document.getElementById('menu-root')!
              )}
          </TitleWrapper>
          <TitleWrapper>
            <span>{'기본 컬러'}</span>
            {colorAnchorButton}
            {menuType === 'color' &&
              ReactDOM.createPortal(
                <CustomMenu
                  title={'기본컬러'}
                  anchorButton={colorAnchorButton}
                  anchorElement={anchorEl}
                  handleClose={handleClose}
                  MenuItem={
                    <ColorContent
                      color={color}
                      onChangeHsvaProp={updateMaterialColor}
                      onChangeAlphaProp={updateMaterialAlpha}
                    />
                  }
                />,
                document.getElementById('menu-root')!
              )}
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

const ColorButton = styled.button<{
  $color: HsvaColor;
  $rgbColor: RgbaColor;
}>`
  width: 24px;
  min-width: 0;
  min-height: 0;
  height: 24px;
  background-color: ${(props) =>
    typeof props.$color !== 'undefined' &&
    `rgba(${props.$rgbColor.r},${props.$rgbColor.g},${props.$rgbColor.b},${props.$rgbColor.a})`};
`;
