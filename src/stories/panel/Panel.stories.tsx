import { Meta, StoryObj } from "@storybook/react";
import Panel from "@components/layout/Panel/Panel";

const meta = {
  component: Panel,
  title: "Component/Layout/Panel",
  tags: ["autodocs"]
} satisfies Meta<typeof Panel>;

export default meta;
type Story = StoryObj<typeof Panel>;

const BasicPanel = {
  // draggable 원할 시 react-beautiful-dnd같은 거 사용
  render: () => {
    const Options = () => {
      return (
        <>
          <button>옵션</button>
          <button>옵션</button>
          <button>옵션</button>
          <div>옵션</div>
        </>
      );
    };

    const Contents = () => {
      return (
        <>
          <div>1내용</div>
          <div>2내용</div>
          <div>3내용</div>
          <div>4내용</div>
        </>
      );
    };
    return (
      <Panel label="타이틀" options={<Options />}>
        <Contents />
      </Panel>
    );
  }
} satisfies Story;

export { BasicPanel };
