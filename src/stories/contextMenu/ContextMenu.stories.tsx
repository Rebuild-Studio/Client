import ContextMenu from "@/components/layout/contextMenu/ContextMenu";
import Scene from "@/three_components/common/Scene";
import { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

const meta = {
  component: ContextMenu,
  title: "Component/Layout/ContextMenu",
  tags: ["autodocs"],
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof ContextMenu>;

const BaseContextMenu = {
  render: () => {
    const Wrapper = styled.div``;

    interface Pos {
      xPos: number;
      yPos: number;
    }
    const [isMouseRightClicked, setIsMouseRightClicked] = useState(false);
    const [postion, setPosition] = useState<Pos>({ xPos: 0, yPos: 0 });
    const setOnContextMenuListener = (e: MouseEvent) => {
      e.preventDefault();
      setPosition({ xPos: e.clientX, yPos: e.clientY });
      setIsMouseRightClicked(true);
    };

    const setOnMouseDownListener = () => {
      setIsMouseRightClicked(false);
    };

    useEffect(() => {
      document.addEventListener("mousedown", setOnMouseDownListener);
      document.addEventListener("contextmenu", setOnContextMenuListener);

      return () => {
        document.addEventListener("mousedown", setOnMouseDownListener);
        document.removeEventListener("contextmenu", setOnContextMenuListener);
      };
    }, []);
    return (
      <Wrapper>
        {isMouseRightClicked && (
          <ContextMenu
            xPos={postion.xPos}
            yPos={postion.yPos}
            items={[
              ["미리보기", "O", true],
              ["그리드 숨기기", "Z", true],
              ["저장", "Ctrl+S", false],
              ["붙여넣기", "Ctrl+V", false],
              ["DIVIDER", "", false],
            ]}
          />
        )}
        <Scene />
      </Wrapper>
    );
  },
} satisfies Story;

export { BaseContextMenu };
