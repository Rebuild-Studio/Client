import type { Meta, StoryObj } from '@storybook/react';
import { SubMenu } from '@/components/common/subMenu/SubMenu';

const meta = {
  title: 'Component/SubMenu',
  component: SubMenu,
  tags: ['autodocs']
} satisfies Meta<typeof SubMenu>;

export default meta;
type Story = StoryObj<typeof SubMenu>;

export const BasicSubMenu = {
  args: {
    menuItems: [
      {
        label: '목록',
        onClick: () => {
          alert('목록');
        }
      },
      {
        label: '저장',
        disabled: true,
        onClick: () => {
          alert('저장');
        }
      },
      {
        label: '로컬 파일로 저장',
        children: [
          { label: 'Scene 저장', onClick: () => alert('Scene 저장') },
          { label: '선택된 에셋 저장', onClick: () => alert('에셋 저장') },
          { label: '선택된 에셋 저장2', onClick: () => alert('에셋 저장2') },
          { label: '선택된 에셋 저장3', onClick: () => alert('에셋 저장3') },
          {
            label: '기타',
            children: [
              { label: 'A', onClick: () => alert('A') },
              { label: 'B', onClick: () => alert('B') },
              { label: 'C', onClick: () => alert('C') }
            ]
          }
        ]
      },
      {
        label: '배포하기',
        onClick: () => {
          alert('배포하기');
        }
      }
    ]
  }
} satisfies Story;
