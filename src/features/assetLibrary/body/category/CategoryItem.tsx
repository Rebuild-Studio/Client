import { MainCategoryType } from "@/features/constants/mainCategory";
import { bgColors } from "@/resources/colors/colors";
import assetCategoryStore from "@/store/assetCategoryStore";
import { observer } from "mobx-react";
import { styled } from "styled-components";

interface Props {
  name: string;
  category: MainCategoryType;
  type: "main" | "sub";
}

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
  color: ${({ selected }) => selected && "#2bff00"};
`;

const CategoryItem = observer(({ name, category, type }: Props) => {
  const iconUrl = `/icons/assetLibrary/category/${type}/${category}.svg`;
  const { currentMainCategory, currentSubCategory } = assetCategoryStore;

  const onClickSetCategory = (): void => {
    if (type === "main") {
      assetCategoryStore.setCurrentMainCategory(category);
    } else {
      assetCategoryStore.setCurrentSubCategory(category);
    }
  };

  return (
    <ItemContainer onClick={() => onClickSetCategory()}>
      <img src={iconUrl} alt={name} />
      {type === "main" && (
        <ItemText selected={currentMainCategory === category}>{name}</ItemText>
      )}
      {type === "sub" && (
        <ItemText selected={currentSubCategory === category}>{name}</ItemText>
      )}
    </ItemContainer>
  );
});

export default CategoryItem;
