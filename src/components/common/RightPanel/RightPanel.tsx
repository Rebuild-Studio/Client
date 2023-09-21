import { useEffect, useState } from "react";
import styled from "styled-components";
import Panel from "../../layout/Panel/Panel";
import Tab from "../../layout/Tab";
import PropertyValue from "./TransFromationInfo";
import storeContainer from "@/store/storeContainer";
import { useObserver } from "mobx-react-lite";
import * as THREE from "three";
import Accordion from "@/components/layout/Accordion";
import Material from "./MaterialInfo";
import { materialRoughness } from "three/examples/jsm/nodes/Nodes.js";

const RightPanelContainer = styled.div`
  position: relative;
  background-color: #282828;
  display: flex;
  height: calc(100vh - ${93}px);
  flex-direction: column;
  align-items: flex-end;
`;

const RightPanel = () => {
  const { primitiveStore } = storeContainer;
  const [metalness, setMetalness] = useState<number>(0);
  const [roughness, setRoughness] = useState<number>(0);
  const [position, setPosition] = useState(new THREE.Vector3());
  const [rotation, setRotation] = useState(new THREE.Euler());
  const [scale, setScale] = useState(new THREE.Vector3());

  const selectedPrimitives = useObserver(
    () => primitiveStore.selectedPrimitives
  );

  useEffect(() => {
    const keys = Object.keys(selectedPrimitives);

    if (selectedPrimitives[keys[0]]) {
      const info = selectedPrimitives[keys[0]];
      const materials = Object.keys(info.material);
      const value = Object.values(info.material);
      setMetalness(value[materials.indexOf("metalness")]);
      setRoughness(value[materials.indexOf("roughness")]);
      console.log(metalness, roughness);
      setPosition(info.position);
      setRotation(info.rotation);
      setScale(info.scale);
    }
  }, [selectedPrimitives]);

  return (
    <RightPanelContainer>
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
                <Material metalness={metalness} roughness={roughness} />
              </Accordion>
            </>,
            <div>{"쉐이프"}</div>,
          ]}
        />
      </Panel>
    </RightPanelContainer>
  );
};

export default RightPanel;
