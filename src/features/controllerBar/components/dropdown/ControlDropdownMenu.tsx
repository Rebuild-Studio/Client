import { styled } from 'styled-components';
import { bgColors } from '@resources/colors/colors';
import { fonts } from '@resources/fonts/font';

interface Props {
  isOpen: boolean;
  children: React.ReactNode;
}

const ControlDropdownMenu = ({ isOpen, children }: Props) => {
  return (
    <Wrapper $open={isOpen}>
      {children}
      <Triangle />
    </Wrapper>
  );
};

export default ControlDropdownMenu;

const Wrapper = styled.section<{ $open: boolean }>`
  display: ${({ $open }) => ($open ? 'block' : 'none')};
  position: absolute;
  top: -14px;
  left: 0;
  transform: translateY(-100%);
  font-size: ${fonts.small};
  color: white;
  background-color: ${bgColors['1c1c1c']};
  padding: 14px 10px 10px 10px;
  border-radius: 8px;
  white-space: nowrap;
`;

const Triangle = styled.div`
  width: 0;
  height: 0;
  position: absolute;
  bottom: 0;
  left: 10%;
  transform: translateY(100%);
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid ${bgColors['1c1c1c']};
`;
