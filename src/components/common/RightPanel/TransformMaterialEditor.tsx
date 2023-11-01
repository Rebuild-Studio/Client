import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { observer } from 'mobx-react';
import { HsvaColor } from '@uiw/color-convert';
import Accordion from '@/components/layout/Accordion';
import storeContainer from '@/store/storeContainer';
import LightProperty from '@components/common/RightPanel/LightProperty.tsx';
import ColorHandler from './ColorHandler';
import Material from './MaterialInfo';
import PropertyValue from './TransFromationInfo';

interface Props {
  isLight: boolean;
}
const TransformMaterialEditor = ({ isLight }: Props) => {
  const { primitiveStore } = storeContainer;
  const [metalness, setMetalness] = useState<number>(0);
  const [roughness, setRoughness] = useState<number>(0);
  const [color, setColor] = useState<HsvaColor>({ h: 0, s: 0, v: 0, a: 0 });
  const [position, setPosition] = useState(new THREE.Vector3());
  const [rotation, setRotation] = useState(new THREE.Euler());
  const [scale, setScale] = useState(new THREE.Vector3());
  const [material, setMaterial] = useState<THREE.MeshStandardMaterial | null>(
    null
  );
  const selectedPrimitive = Object.values(primitiveStore.selectedPrimitives)[0];

  useEffect(() => {
    if (selectedPrimitive) {
      const info = selectedPrimitive;
      setPosition(info.position);
      setRotation(info.rotation);
      setScale(info.scale);
      if (info.material) {
        const standardMaterial = Array.isArray(info.material)
          ? info.material[0]
          : info.material;
        if (standardMaterial instanceof THREE.MeshStandardMaterial)
          setMaterial(standardMaterial);
      }
    }
  }, [selectedPrimitive]);

  useEffect(() => {
    if (material) {
      const rgbColor = material.color;
      const opacity = material.opacity;
      const hsva = ColorHandler.rgbToHsva(rgbColor, opacity);
      setColor(hsva);
      setMetalness(material.metalness);
      setRoughness(material.roughness);
    }
  }, [material]);
  return (
    <>
      <Accordion title={'트랜스포메이션'}>
        <PropertyValue
          position={{ x: position.x, y: position.y, z: position.z }}
          rotation={{
            x: rotation.x,
            y: rotation.y,
            z: rotation.z
          }}
          scale={{
            x: scale.x,
            y: scale.y,
            z: scale.z
          }}
        />
      </Accordion>
      {!isLight && (
        <Accordion title={'머터리얼'}>
          <Material metalness={metalness} roughness={roughness} color={color} />
        </Accordion>
      )}
      {isLight && (
        <Accordion title={'빛속성'}>
          <LightProperty light={selectedPrimitive.children[0] as THREE.Light} />
        </Accordion>
      )}
    </>
  );
};

const Observer = observer(TransformMaterialEditor);
export default Observer;
