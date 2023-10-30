import styled from 'styled-components';
import { basicColors } from '@/resources/colors/colors';

interface Props {
  title: string;
}

const Header = ({ title }: Props) => {
  return (
    <Container>
      <StyledSpan>{title}</StyledSpan>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
`;

const StyledSpan = styled.span`
  font-size: 18px;
  font-weight: 700;
  font-family: 'SourceHanSansKR';
  color: ${basicColors.white};
`;
