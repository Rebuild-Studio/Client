import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import Panel from "../../layout/Panel/Panel";
import Tab from "../../layout/Tab";
import PropertyValue from "./TransFromationInfo";
import storeContainer from "@/store/storeContainer";
import * as THREE from "three";
import Accordion from "@/components/layout/Accordion";
import Material from "./MaterialInfo";
import ColorHandler from "./ColorHandler";
import { HsvaColor } from "@uiw/color-convert";

const RightPanelContainer = styled.div<{ $isOpen: boolean }>`
  position: relative;
  background-color: #282828;
  display: flex;
  height: ${(props) =>
    props.$isOpen ? "calc(100vh - 180px)" : "calc(100vh - 93px)"};
  flex-direction: column;
  align-items: flex-end;
`;

const RightPanel = observer((props: { isOpen: boolean }) => {
  const { primitiveStore } = storeContainer;
  const { isOpen } = props;
  const [metalness, setMetalness] = useState<number>(0);
  const [roughness, setRoughness] = useState<number>(0);
  const [color, setColor] = useState<HsvaColor>({ h: 0, s: 0, v: 0, a: 0 });
  const [position, setPosition] = useState(new THREE.Vector3());
  const [rotation, setRotation] = useState(new THREE.Euler());
  const [scale, setScale] = useState(new THREE.Vector3());

  const selectedPrimitive = Object.values(primitiveStore.selectedPrimitives)[0];

  useEffect(() => {
    if (selectedPrimitive) {
      const info = selectedPrimitive;
      const materials = Object.keys(info.material);
      const value = Object.values(info.material);
      const rgbColor = value[materials.indexOf("color")];
      const opacity = Number(value[materials.indexOf("opacity")]);
      const hsva = ColorHandler.rgbToHsva(rgbColor, opacity);
      setMetalness(value[materials.indexOf("metalness")]);
      setRoughness(value[materials.indexOf("roughness")]);
      setColor(hsva);
      setPosition(info.position);
      setRotation(info.rotation);
      setScale(info.scale);
    }
  }, [selectedPrimitive]);

  return (
    <>
      {selectedPrimitive && (
        <RightPanelContainer $isOpen={isOpen}>
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
                <div>{"쉐이프"}</div>,
              ]}
            />
          </Panel>
        </RightPanelContainer>
      )}
    </>
  );
});

export default RightPanel;
