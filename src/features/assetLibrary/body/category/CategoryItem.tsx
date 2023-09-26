import { MainCategoryType } from "@/features/constants/mainCategory";
import { bgColors } from "@/resources/colors/colors";
import { styled } from "styled-components";

interface Props {
  name: string;
  category: MainCategoryType;
  type?: "main" | "sub";
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

const ItemText = styled.span`
  margin-left: 10px;
  font-size: 14px;
`;

const CategoryItem = ({ name, category, type }: Props) => {
  const iconUrl = `/icons/assetLibrary/category/${type}/${category}.svg`;
  return (
    <ItemContainer>
      <img src={iconUrl} alt={name} />
      <ItemText>{name}</ItemText>
    </ItemContainer>
  );
};

export default CategoryItem;
