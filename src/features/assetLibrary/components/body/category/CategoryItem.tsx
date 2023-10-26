import { observer } from 'mobx-react';
import { styled } from 'styled-components';
import {
  MainCategory,
  MainCategoryType
} from '@/features/assetLibrary/constants/mainCategory';
import { bgColors } from '@/resources/colors/colors';
import assetCategoryStore, { Category } from '@/store/assetCategoryStore';
import assetLibraryStore from '@/store/assetLibraryStore';

interface Props {
  name: string;
  category: MainCategoryType;
  type: 'main' | 'sub';
}

const CategoryItem = ({ name, category, type }: Props) => {
  const iconUrl = `/icons/assetLibrary/category/${type}/${category}.svg`;
  const { currentMainCategory, currentSubCategory } = assetCategoryStore;
  const myCategory: Category = {
    category: category,
    categoryKR: name
  };

  const onClickSetCategory = (): void => {
    assetLibraryStore.initLibrary();
    if (type === 'main') {
      assetCategoryStore.setCurrentMainCategory(myCategory as MainCategory);
    } else {
      assetCategoryStore.setCurrentSubCategory(myCategory);
    }
  };

  return (
    <ItemContainer onClick={onClickSetCategory}>
      <img src={iconUrl} alt={name} />
      {type === 'main' && (
        <ItemText selected={currentMainCategory.category === category}>
          {name}
        </ItemText>
      )}
      {type === 'sub' && (
        <ItemText selected={currentSubCategory.category === category}>
          {name}
        </ItemText>
      )}
    </ItemContainer>
  );
};

const Observer = observer(CategoryItem);
export default Observer;

const ItemContainer = styled.button`
  height: 38px;
  display: flex;
  align-items: center;
  transition: background-color 0.2s ease-in-out;
  padding: 10px;
  box-sizing: border-box;

  &:hover {
    background-color: ${bgColors[343434]};
  }
`;

const ItemText = styled.span<{ selected: boolean }>`
  margin-left: 10px;
  font-size: 14px;
  color: ${({ selected }) => selected && '#2bff00'};
`;
