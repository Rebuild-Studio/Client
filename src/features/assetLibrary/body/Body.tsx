import styled from "styled-components";
import Category from "./category/Category";
import { bgColors } from "@/resources/colors/colors";

const Container = styled.div`
  display: flex;
  background-color: ${bgColors[222222]};
  color: white;
`;

const Body = () => {
  return (
    <Container>
      <Category />
      {
        //here comes asset list tab
      }
    </Container>
  );
};

export default Body;
