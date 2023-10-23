import Dropdown, { Option } from "@/components/common/dropdown/Dropdown";
import { grayColors } from "@/resources/colors/colors";
import { expect } from "@storybook/jest";
import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";

const meta = {
  component: Dropdown,
  title: "Component/Dropdown/Edges",
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const WithoutOptions = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // dropdown 정상 생성 확인
    const dropdown = canvas.getByRole("dropdown");
    await expect(dropdown).toHaveTextContent("선택된 옵션");

    // dropdown open 버튼 클릭
    const dropdownButton = canvas.getByRole("dropdown-button");
    await userEvent.click(dropdownButton);

    // dropdown option 미 생성 확인 및 안내 메세지 확인
    const dropdownOptions = canvas.getByRole("option-container");
    await expect(dropdownOptions.childNodes[0]).toHaveTextContent(
      "옵션이 없습니다."
    );
    // 기본 커서 확인
    await expect(dropdownOptions.childNodes[0]).toHaveStyle({
      cursor: "default",
    });
  },
  args: {
    hoverBackgroundColor: grayColors.lightGray,
    placeholder: "선택된 옵션",
    options: [],
  },
} satisfies Story;

const options = () => {
  const options: Option[] = [];
  for (let i = 0; i < 50; i++) {
    options.push({
      label: `옵션 ${i}`,
      value: `${i}`,
    });
  }
  return options;
};

export const WithMultipleOptions = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const dropdownButton = canvas.getByRole("dropdown-button");
    await userEvent.click(dropdownButton);
    const dropdownOptions = canvas.getByRole("option-container");
    await expect(dropdownOptions).toHaveStyle({
      height: `${10 * 24}px`,
    });
  },
  render: (args) => {
    return <Dropdown {...args} options={options()} />;
  },
} satisfies Story;
