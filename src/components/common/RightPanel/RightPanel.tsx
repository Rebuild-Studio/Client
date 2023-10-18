import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import Panel from "../../layout/Panel/Panel";
import Tab from "../../layout/Tab";
import Shape from "./Shape";
import PropertyValue from "./TransFromationInfo";
import SceneSettingPanel from "./SceneSettingPanel";

import storeContainer from "@/store/storeContainer";
import * as THREE from "three";
import Accordion from "@/components/layout/Accordion";
import Material from "./MaterialInfo";
import ColorHandler from "./ColorHandler";
import { HsvaColor } from "@uiw/color-convert";

const RightPanel = observer(() => {
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

  const { sceneSettingStore } = storeContainer;

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

  if (!selectedPrimitive) {
    return null;
  }

  if (sceneSettingStore.type === "scene") {
    return <SceneSettingPanel />;
  }

  return (
    <Panel label={"속성값"} options={undefined}>
      <Tab
        tabs={["오브젝트", "쉐이프"]}
        tabContents={[
          <>
            <Accordion title={"트랜스포메이션"}>
              <PropertyValue
                position={{ x: position.x, y: position.y, z: position.z }}
                rotation={{
                  x: rotation.x,
                  y: rotation.y,
                  z: rotation.z,
                }}
                scale={{
                  x: scale.x,
                  y: scale.y,
                  z: scale.z,
                }}
              />
            </Accordion>
            <Accordion title={"머터리얼"}>
              <Material
                metalness={metalness}
                roughness={roughness}
                color={color}
              />
            </Accordion>
          </>,
          <Shape />,
        ]}
      />
    </Panel>
  );
});

export default RightPanel;
