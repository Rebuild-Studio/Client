import Dropdown from '@/components/common/dropdown/Dropdown';
import { grayColors } from '@/resources/colors/colors';

import { textsStoryDesc } from '@/resources/texts';
import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

const meta = {
  component: Dropdown,
  title: 'Component/Dropdown',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'text',
      description: textsStoryDesc.size
    }
  }
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // dropdown 정상 생성 확인
    const dropdown = canvas.getByRole('dropdown');
    await expect(dropdown).toHaveTextContent('선택된 옵션');

    // dropdown open 버튼 클릭
    const dropdownButton = canvas.getByRole('dropdown-button');
    await userEvent.click(dropdownButton);

    // dropdown option 정상 생성 확인
    const dropdownOptions = canvas.getByRole('option-container');
    await expect(dropdownOptions.childNodes[0]).toHaveTextContent('옵션1');
    await expect(dropdownOptions.childNodes[1]).toHaveTextContent('옵션2');
    await expect(dropdownOptions.childNodes[2]).toHaveTextContent('옵션3');

    // delay 1초
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // dropdown option 클릭
    await userEvent.click(dropdownOptions.childNodes[0] as HTMLElement);

    // dropdown option 클릭 후 placeholder 변경 확인
    await expect(dropdown).toHaveTextContent('옵션1');

    // dropdown option 클릭 후 dropdown option 사라지는지 확인
    await expect(dropdownOptions.childNodes.length).toEqual(0);

    // dropdown open 버튼 클릭
    await userEvent.click(dropdownButton);

    // delay 1초
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 외부 클릭
    await userEvent.click(canvasElement);

    // dropdown option 열려 있을때, 외부 클릭 시 dropdown option 사라지는지 확인
    await expect(dropdownOptions.childNodes.length).toBe(0);

    // placeholder 그대로 있는지 확인
    await expect(dropdown).toHaveTextContent('옵션1');
  },
  args: {
    hoverBackgroundColor: grayColors.lightGray,
    placeholder: '선택된 옵션',
    options: [
      { label: '옵션1', value: 'option1' },
      { label: '옵션2', value: 'option2' },
      { label: '옵션3', value: 'option3' }
    ],
    size: '100%'
  }
};
