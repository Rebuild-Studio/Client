import { observer } from 'mobx-react';
import styled from 'styled-components';
import assetCategoryStore from '@store/assetCategory.store.ts';

const CategoryLabel = () => {
  const { currentMainCategory, currentSubCategory } = assetCategoryStore;
  return (
    <EllipsisSpan>{`${currentMainCategory.categoryKR} / ${currentSubCategory.categoryKR}`}</EllipsisSpan>
  );
};

const Observer = observer(CategoryLabel);
export default Observer;

const EllipsisSpan = styled.span`
  width: 10%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
