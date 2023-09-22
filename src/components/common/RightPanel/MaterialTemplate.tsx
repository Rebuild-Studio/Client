import { observer } from "mobx-react";
import styled from "styled-components";
import Grid from "../Grid";
import data_store from "./MaterialData";

import storeContainer from "@/store/storeContainer";

const ImageStyled = styled.img<{ isSelected: boolean }>`
  width: 10.1vh;
  height: 10.1vh;
  border-radius: 5px;
  outline: ${(props) => (props.isSelected ? "solid 0.15vh #e3f853" : "none")};
`;

const MaterialTemplate = observer(() => {
  const { primitiveStore } = storeContainer;

  return (
    <Grid
      items={data_store.mat_tex_list.map((template, index) => (
        <ImageStyled
          key={index}
          isSelected={true}
          src={"/icons/rightTab/" + template[1] + ".png"}
          alt={`item-${index}`}
          onClick={() => {
            primitiveStore.setSelectedMaterial(template[1]);
          }}
        />
      ))}
      columns={2}
    ></Grid>
  );
});

export default MaterialTemplate;
