import styled from 'styled-components';
import MAIN_CATEGORY_LIST from '@/features/assetLibrary/constants/mainCategory';
import CategoryItem from './CategoryItem';

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

const ListContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 130px;
  width: 15%;
  padding: 5px 0;
  box-sizing: border-box;
  overflow-y: auto;
`;
