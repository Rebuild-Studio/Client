import { styled } from "styled-components";

import useDropdown from "@/features/controllerBar/components/dropdown/useDropdown";
import ControlButton from "@/features/controllerBar/components/ControlButton";
import ControlDropdownMenu from "@/features/controllerBar/components/dropdown/ControlDropdownMenu";
import { basicColors } from "@resources/colors/colors";
import ArrowIcon from "@/features/controllerBar/components/icons/ArrowIcon";

interface Props {
  icon: JSX.Element;
  menu: JSX.Element;
  activated?: boolean;
}

const ControlDropdown = ({ icon, menu, activated }: Props) => {
  const { ref, dropdownOpen, toggleDropdown } = useDropdown();

  return (
    <Wrapper ref={ref}>
      <Trigger onClick={toggleDropdown}>
        <ControlButton icon={icon} activated={activated} />
        <ArrowIcon direction={dropdownOpen ? "down" : "up"} />
      </Trigger>
      <ControlDropdownMenu isOpen={dropdownOpen}>{menu}</ControlDropdownMenu>
    </Wrapper>
  );
};

export default ControlDropdown;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Trigger = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 4px;

  &:hover button {
    color: ${basicColors.limeGreen};
  }
`;
