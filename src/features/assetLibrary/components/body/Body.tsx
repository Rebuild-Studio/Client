import styled from 'styled-components';
import { bgColors } from '@/resources/colors/colors';
import AssetGrid from './assetList/grid/AssetGrid';
import Toolbar from './assetList/toolbar';
import Category from './category/Category';

const Body = () => {
  return (
    <Container>
      <Category />
      <ContentContainer>
        <Toolbar />
        <AssetGrid />
      </ContentContainer>
    </Container>
  );
};

export default Body;

const Container = styled.div`
  display: flex;
  background-color: ${bgColors[222222]};
  color: white;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
