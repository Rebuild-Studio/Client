import { basicColors, grayColors } from "@/resources/colors/colors";
import { fonts } from "@/resources/fonts/font";
import { reaction } from "mobx";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import primitiveStore from "@/store/primitiveStore";
import {
  CanvasInstance,
  instance_translate,
} from "@/resources/constants/canvas";

type Props = {
  mesh: THREE.Mesh;
  depth: number;
};

type CSSIconProps = {
  $depth: number;
};

type CSSObjectElementProps = {
  $isMouseUp: boolean;
};

const StyledElement = styled.div`
  cursor: pointer;
  color: ${basicColors.white};
  user-select: none;
  font-size: ${fonts.medium};
`;

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

const ObjectElement = styled.div<CSSObjectElementProps>`
  position: relative;
  border-radius: 3px;
  width: 90%;
  display: flex;
  align-items: center;
  padding: 6px 0px;
  background-color: ${({ $isMouseUp }) =>
    $isMouseUp ? grayColors["303030"] : "inherit"};
  ${InteractionButtonBox} {
    visibility: ${({ $isMouseUp }) => ($isMouseUp ? "visible" : "hidden")};
  }
`;

export const HierarchyElement = ({ mesh, depth }: Props) => {
  const storeId = mesh.userData["storeId"];
  const isLocked = mesh.userData["isLocked"];
  const visible = mesh.visible;

  const [isOpen, setIsOpen] = useState(false);
  const [isMouseUp, setIsMouseUp] = useState(false);

  const iconImg = () => {
    switch (mesh.name) {
      case "LIGHT":
        return "/icons/studio/icon_light.png";
      case "CAMERA":
        return "/icons/studio/icon_camera.svg";
      default:
        return "/icons/studio/icon_object.svg";
    }
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

  return (
    <StyledElement
      onDoubleClick={(e) => {
        e.stopPropagation();
        setIsOpen((prev) => !prev);
      }}
      onClick={() => {
        primitiveStore.clearSelectedPrimitives();
        primitiveStore.addSelectedPrimitives(storeId, mesh);
      }}
    >
      <ObjectElement
        $isMouseUp={isMouseUp}
        onMouseEnter={() => {
          setIsMouseUp(true);
        }}
        onMouseLeave={() => {
          if (!(storeId in primitiveStore.selectedPrimitives) || isLocked) {
            setIsMouseUp(false);
          }
        }}
      >
        <Icon
          $depth={depth}
          src={
            mesh.children.length !== 0
              ? isOpen
                ? "/icons/studio/icon_그룹열기.svg"
                : "/icons/studio/icon_그룹닫기.svg"
              : iconImg()
          }
          alt="icon"
        />
        <span>
          {instance_translate[mesh.name as CanvasInstance] ?? mesh.name}
        </span>
        <InteractionButtonBox>
          <img
            src={
              isLocked
                ? "/icons/studio/icon_잠그기.svg"
                : "/icons/studio/icon_잠금해제.svg"
            }
            onClick={(e) => {
              e.stopPropagation();
              mesh.userData["isLocked"] = !isLocked;
              primitiveStore.updatePrimitive(storeId, mesh);
            }}
          />
          <img
            src={
              visible
                ? "/icons/studio/icon_보이기.svg"
                : "/icons/studio/icon_가리기.svg"
            }
            onClick={(e) => {
              e.stopPropagation();
              mesh.visible = !visible;
              primitiveStore.updatePrimitive(storeId, mesh);
            }}
          />
        </InteractionButtonBox>
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
