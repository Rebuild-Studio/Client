import { useEffect, useState } from 'react';
import { reaction } from 'mobx';
import { styled } from 'styled-components';
import { basicColors, grayColors } from '@/resources/colors/colors';
import {
  CanvasInstance,
  instanceTranslate
} from '@/resources/constants/canvas';
import { fonts } from '@/resources/fonts/font';
import { findRootAsset } from '@/three_components/utils/findAsset';
import { findRootGroup } from '@/three_components/utils/findGroup';
import primitiveStore from '@store/primitive.store.ts';
import onClickHierarchyEvent from '../utils/onClickHierarchyEvent';
import onContextMenuHierarchyEvents from '../utils/onContextMenuHierarchyEvent';

type MouseEvents = {
  objectDoubleClick: React.MouseEventHandler<HTMLDivElement>;
  objectClick: React.MouseEventHandler<HTMLDivElement>;
  objectMouseEnter: React.MouseEventHandler<HTMLDivElement>;
  objectMouseLeave: React.MouseEventHandler<HTMLDivElement>;
  objectContextMenu: React.MouseEventHandler<HTMLDivElement>;
  lockImgClick: React.MouseEventHandler<HTMLImageElement>;
  visibleImgClick: React.MouseEventHandler<HTMLImageElement>;
};

type Props = {
  mesh: THREE.Mesh;
  depth: number;
};
export const HierarchyElement = ({ mesh, depth }: Props) => {
  const storeId = mesh.userData['storeId'];
  const isLocked = mesh.userData['isLocked'];
  const visible = mesh.visible;

  const [isOpen, setIsOpen] = useState(false);
  const [isMouseUp, setIsMouseUp] = useState(false);

  const iconImg = () => {
    switch (mesh.name) {
      case 'LIGHT':
        return '/icons/studio/icon_light.png';
      case 'CAMERA':
        return '/icons/studio/icon_camera.svg';
      default:
        return '/icons/studio/icon_object.svg';
    }
  };

  const isInteractionVisible = () => {
    // 그룹이나 애셋 오브젝트인 경우
    if (mesh.name === 'GROUP' || mesh.name === 'ASSET') {
      return true;
    }

    // 그룹이나 애셋 오브젝트의 자식인 경우
    if (findRootGroup(mesh) || findRootAsset(mesh)) {
      return false;
    }

    // 그 외의 경우
    return true;
  };

  // mesh가 selected 되면 hover event 활성화
  useEffect(() => {
    const dispose = reaction(
      () => {
        return primitiveStore.selectedPrimitives;
      },
      (meshes) => {
        if (storeId in meshes && !isLocked) {
          setIsMouseUp(true);
        } else {
          setIsMouseUp(false);
        }
      },
      { fireImmediately: true }
    );

    return () => {
      dispose();
    };
  }, []);

  // mouse events
  const mouseEvents: MouseEvents = {
    objectDoubleClick: (e) => {
      e.stopPropagation();
      setIsOpen((prev) => !prev);
    },
    objectClick: () => {
      onClickHierarchyEvent(mesh);
    },
    objectMouseEnter: () => {
      setIsMouseUp(true);
    },
    objectMouseLeave: () => {
      if (!(storeId in primitiveStore.selectedPrimitives) || isLocked) {
        setIsMouseUp(false);
      }
    },
    objectContextMenu: (e) => {
      onContextMenuHierarchyEvents(e.clientX, e.clientY, mesh);
    },
    lockImgClick: (e) => {
      e.stopPropagation();
      mesh.userData['isLocked'] = !isLocked;
      primitiveStore.updatePrimitive(storeId, mesh);
    },
    visibleImgClick: (e) => {
      e.stopPropagation();
      mesh.visible = !visible;
      primitiveStore.updatePrimitive(storeId, mesh);
    }
  };

  return (
    <StyledElement>
      <ObjectElement
        $isMouseUp={isMouseUp}
        onClick={mouseEvents.objectClick}
        onDoubleClick={mouseEvents.objectDoubleClick}
        onMouseEnter={mouseEvents.objectMouseEnter}
        onMouseLeave={mouseEvents.objectMouseLeave}
        onContextMenu={mouseEvents.objectContextMenu}
      >
        <Icon
          $depth={depth}
          src={
            mesh.children.length !== 0
              ? isOpen
                ? '/icons/studio/icon_그룹열기.svg'
                : '/icons/studio/icon_그룹닫기.svg'
              : iconImg()
          }
          alt="icon"
        />
        <span>
          {instanceTranslate[mesh.name as CanvasInstance] ?? mesh.name}
        </span>
        {isInteractionVisible() && (
          <InteractionButtonBox>
            <img
              src={
                isLocked
                  ? '/icons/studio/icon_잠그기.svg'
                  : '/icons/studio/icon_잠금해제.svg'
              }
              onClick={mouseEvents.lockImgClick}
            />
            <img
              src={
                visible
                  ? '/icons/studio/icon_보이기.svg'
                  : '/icons/studio/icon_가리기.svg'
              }
              onClick={mouseEvents.visibleImgClick}
            />
          </InteractionButtonBox>
        )}
      </ObjectElement>
      {isOpen &&
        mesh.children.map((childMesh) => (
          <HierarchyElement
            depth={depth + 1}
            key={mesh.uuid}
            mesh={childMesh as THREE.Mesh}
          />
        ))}
    </StyledElement>
  );
};

const StyledElement = styled.div`
  cursor: pointer;
  color: ${basicColors.white};
  user-select: none;
  font-size: ${fonts.medium};
`;

type CSSIconProps = {
  $depth: number;
};

const Icon = styled.img<CSSIconProps>`
  margin-right: 10px;
  margin-left: ${({ $depth }) => `${$depth * 16 + 6}px`};
  height: ${fonts.large};
`;
const InteractionButtonBox = styled.div`
  position: absolute;
  right: 5px;
  display: flex;
  gap: 3px;
`;

type CSSObjectElementProps = {
  $isMouseUp: boolean;
};

const ObjectElement = styled.div<CSSObjectElementProps>`
  position: relative;
  border-radius: 3px;
  width: 90%;
  display: flex;
  align-items: center;
  padding: 6px 0px;
  background-color: ${({ $isMouseUp }) =>
    $isMouseUp ? grayColors['303030'] : 'inherit'};
  ${InteractionButtonBox} {
    visibility: ${({ $isMouseUp }) => ($isMouseUp ? 'visible' : 'hidden')};
  }
`;
