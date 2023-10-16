import { observer } from "mobx-react";
import CategoryLabel from "./CategoryLabel";
import DomainDropdown from "./DomainDropdown";
import styled from "styled-components";
import { bgColors } from "@/resources/colors/colors";
import SelectedAssetsControl from "./SelectedAssetsControl";

const Toolbar = observer(() => {
  return (
    <Container>
      <CategoryLabel />
      <SelectedAssetsControl />
      <DomainDropdown />
    </Container>
  );
});

export default Toolbar;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;

  padding: 20px;
  box-sizing: border-box;

  color: white;
  background-color: ${bgColors[222222]};
  overflow: visible;
`;
