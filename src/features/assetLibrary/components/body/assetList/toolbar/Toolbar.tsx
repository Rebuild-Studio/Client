import { observer } from "mobx-react";
import CategoryLabel from "./CategoryLabel";
import DomainDropdown from "./DomainDropdown";
import styled from "styled-components";
import { bgColors } from "@/resources/colors/colors";

const Container = styled.div`
  width: 100%;
  height: 50px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${bgColors[222222]};
  color: white;
  overflow: visible;
`;

const Toolbar = observer(() => {
  return (
    <Container>
      <CategoryLabel />
      {/* <SelectedAssetListControl /> */}
      <DomainDropdown />
    </Container>
  );
});

export default Toolbar;
