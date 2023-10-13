import React, { useMemo, useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import storeContainer from "../../../stores/storeContainer";
import { observer } from "mobx-react-lite";

const SceneHelpers = observer(() => {
  const { scene_store } = storeContainer;
  const sceneRef = useRef();
  const { camera } = useThree();

  const creategrid = () => {
    /**Grid1: white grid*/

    var grid = new THREE.Group();
    var grid1 = new THREE.GridHelper(50, 50, 0x888888);
    grid1.material.color.setHex(0x888888);
    grid1.material.vertexColors = false;
    grid.add(grid1);

    /**Grid2: gray grid*/
    var grid2 = new THREE.GridHelper(50, 10, 0x222222);
    grid2.material.color.setHex(0x222222);
    grid2.material.vertexColors = false;
    grid.add(grid2);
    grid.position.set(0, 0.01, 0);

    /**Grid3: axis grid*/
    const axisLength = 25;
    const grid3 = new THREE.Group();

    //x axis
    const xAxisGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(axisLength, 0, 0),
      new THREE.Vector3(-axisLength, 0, 0),
    ]);
    const xAxisMaterial = new THREE.LineBasicMaterial({ color: 0xd14e66 });
    const xAxis = new THREE.Line(xAxisGeometry, xAxisMaterial);
    grid3.add(xAxis);

    //y axis
    const yAxisGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, axisLength),
      new THREE.Vector3(0, 0, -axisLength),
    ]);
    const yAxisMaterial = new THREE.LineBasicMaterial({ color: 0x5a93ba });
    const yAxis = new THREE.Line(yAxisGeometry, yAxisMaterial);
    grid3.add(yAxis);
    grid.add(grid3);
    return grid;
  };

  const sceneMemoized = useMemo(() => {
    const sceneHelpers = new THREE.Scene();
    scene_store.grid = creategrid();
    sceneHelpers.add(scene_store.grid);
    return sceneHelpers;
  }, []);

  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.copy(sceneMemoized, true);
      sceneRef.current.updateMatrixWorld(true);
      console.log(sceneRef.current);
    }
  }, []);

  useFrame(({ gl }) => {
    void ((gl.autoClear = false), gl.render(sceneRef.current, camera));
  });

  return <scene ref={sceneRef} />;
});

export default SceneHelpers;
