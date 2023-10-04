import MAIN_CATEGORY_LIST from "@/features/constants/mainCategory";
import styled from "styled-components";
import CategoryItem from "./CategoryItem";

const ListContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 130px;
  width: 15%;
  margin: 5px 0;
  overflow: scroll;
`;

const CategoryList = () => {
  return (
    <ListContainer>
      {MAIN_CATEGORY_LIST.map(({ category, categoryKR }) => {
        return (
          <CategoryItem
            type="main"
            name={categoryKR}
            category={category}
            key={category}
          />
        );
      })}
    </ListContainer>
  );
};

export default CategoryList;
