import { basicColors, grayColors } from "@/resources/colors/colors";
import { fonts } from "@/resources/fonts/font";
import { useState } from "react";
import { styled } from "styled-components";

type Props = {
  mesh: THREE.Object3D;
  depth: number;
};

type CSSIconProps = {
  $depth: number;
};

const StyledElement = styled.div`
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
  visibility: hidden;
`;

const ObjectElement = styled.div`
  position: relative;
  border-radius: 3px;
  width: 90%;
  display: flex;
  align-items: center;
  padding: 4px 0px;
  &:hover {
    background-color: ${grayColors["303030"]};
  }

  &:hover ${InteractionButtonBox} {
    visibility: visible;
  }
`;

export const HierarchyElement = ({ mesh, depth }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <StyledElement
      onDoubleClick={(e) => {
        e.stopPropagation();
        setIsOpen((prev) => !prev);
      }}
    >
      <ObjectElement>
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
        <span>{mesh.name !== "" ? mesh.name : mesh.type}</span>
        <InteractionButtonBox>
          <img
            src="/icons/studio/icon_잠그기.svg"
            onClick={() => {
              console.log("lock");
            }}
          />
          <img src="/icons/studio/icon_보이기.svg" />
        </InteractionButtonBox>
      </ObjectElement>
      {isOpen &&
        mesh.children.map((childMesh) => (
          <HierarchyElement
            depth={depth + 1}
            key={mesh.uuid}
            mesh={childMesh}
          />
        ))}
    </StyledElement>
  );
};
