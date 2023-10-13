import { useEffect, useLayoutEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import storeContainer from "../../../stores/storeContainer";
import { useFrame, useThree } from "@react-three/fiber";
import EventFunctions_VM from "../../../view_models/EventFunctions_VM";
import SceneSetting_VM from "../../../view_models/02. SceneSetting/SceneSetting_VM";
import {
  EffectComposer,
  Outline,
  SSAO,
  Bloom,
} from "@react-three/postprocessing";
import SceneUpdate_VM from "../../../view_models/SceneUpdate_VM";
import { BlendFunction, KernelSize, Resolution } from "postprocessing";
import { objectViewModel } from "../../../view_models/Object_VM";
import { ObjectStateVM } from "../../../view_models/ObjectState_VM";

const SceneSetting = observer(() => {
  const { object_store, scene_store, common_store } = storeContainer;
  const { gl, camera, scene } = useThree();
  const { DropEventListener, onItemMove, onMouseDown } = EventFunctions_VM();
  const { InitiateScene, GetOutlineColor } = SceneSetting_VM();
  const { SceneUpdate } = SceneUpdate_VM();
  const [outlineColor, setOutlineColor] = useState("#d4ed3e");
  useEffect(() => {
    objectViewModel.SetOutlineObject(null); //reset
    if (object_store.selectedObjects.length !== 0) {
      for (let i = 0; i < object_store.selectedObjects.length; i++) {
        object_store.selectedObjects[i].mesh?.traverse(function (child) {
          if (child.isMesh) {
            objectViewModel.SetOutlineObject(child);
          }
        });
      }
    }
  }, [object_store.selectedObjects, object_store.renderObjects]);

  useLayoutEffect(() => {
    InitiateScene(gl, camera, scene);
  }, []);

  useEffect(() => {
    document.addEventListener("drop", DropEventListener);
    document.addEventListener("mousemove", onItemMove, false);
    return () => {
      document.removeEventListener("drop", DropEventListener);
      document.removeEventListener("mousemove", onItemMove, false);
    };
  }, []);
  useFrame((state, delta) => {
    SceneUpdate(camera, delta);
  });

  return common_store.curCategory !== "event" ? (
    <>
      <EffectComposer autoClear={false}>
        <Outline
          selection={
            object_store.selectedObjects.length !== 0
              ? object_store.outlineObjects
              : null
          }
          width={1024}
          height={1024}
          edgeStrength={9}
          pulseSpeed={0.5}
          blendFunction={BlendFunction.ALPHA}
          visibleEdgeColor={GetOutlineColor(ObjectStateVM.selectedState)}
          hiddenEdgeColor={0xf42696}
          selectionLayer={10}
        />
        {scene_store.SSAOToggle && (
          <SSAO
            blendFunction={BlendFunction.MULTIPLY} // Use NORMAL to see the effect
            intensity={scene_store.SSAOIntensity}
            samples={scene_store.SSAOsamples} // amount of samples per pixel (shouldn't be a multiple of the ring count)
            rings={scene_store.SSAOrings} // amount of rings in the occlusion sampling pattern
            distanceThreshold={scene_store.SSAOdistanceThreshold} // global distance threshold at which the occlusion effect starts to fade out. min: 0, max: 1
            distanceFalloff={scene_store.SSAOdistanceFalloff} // distance falloff. min: 0, max: 1
            rangeThreshold={scene_store.SSAOrangeThreshold} // local occlusion range threshold at which the occlusion starts to fade out. min: 0, max: 1
            rangeFalloff={scene_store.SSAOrangeFalloff} // occlusion range falloff. min: 0, max: 1
            luminanceInfluence={scene_store.SSAOluminanceInfluence} // how much the luminance of the scene influences the ambient occlusion
            radius={scene_store.SSAOradius} // occlusion sampling radius
            scale={scene_store.SSAOscale} // scale of the ambient occlusion
            bias={scene_store.SSAObias} // occlusion bias
            fade={scene_store.SSAOfade}
          />
        )}
        {scene_store.bloomToggle && (
          <Bloom
            intensity={scene_store.bloomIntensity} // The bloom intensity.
            blurPass={undefined} // A blur pass.
            kernelSize={KernelSize.LARGE} // blur kernel size
            luminanceThreshold={scene_store.bloomLuminanceThreshold} // luminance threshold. Raise this value to mask out darker elements in the scene.
            luminanceSmoothing={scene_store.bloomLuminanceSmoothing} // smoothness of the luminance threshold. Range is [0, 1]
            mipmapBlur={false} // Enables or disables mipmap blur.
            resolutionX={Resolution.AUTO_SIZE} // The horizontal resolution.
            resolutionY={Resolution.AUTO_SIZE} // The vertical resolution.
          />
        )}
      </EffectComposer>
    </>
  ) : null;
});

export default SceneSetting;
