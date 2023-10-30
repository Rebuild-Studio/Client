import { PerspectiveCamera } from 'three';
import { observer } from 'mobx-react';
import ControlButton from '@/features/controllerBar/components/ControlButton';
import FocusIcon from '@/features/controllerBar/components/icons/FocusIcon';
import FocusController from '@/features/controllerBar/utils/focus';
import primitiveStore from '@store/primitive.store';
import renderStore from '@store/render.store';

const ObjectFocus = () => {
  const { selectedPrimitives } = primitiveStore;
  const { controls } = renderStore;

  const handleObjectFocus = () => {
    if (!controls) return;

    const objects = Object.values(selectedPrimitives);

    const focusController = new FocusController(objects, controls, {
      fov: (controls.camera as PerspectiveCamera).fov,
      offsetAngleInDeg: 10
    });

    if (objects.length === 0) {
      // 선택된 오브젝트가 없을 시 전체 씬 한눈에 보이게
      focusController.focusScene();
    } else {
      focusController.focus();
    }
  };

  return <ControlButton icon={<FocusIcon />} onClick={handleObjectFocus} />;
};

const Observer = observer(ObjectFocus);
export default Observer;
