import { observer } from "mobx-react";
// import styled from "styled-components";
import storeContainer from "@/store/storeContainer";

// const ImageStyled = styled.img<{ isSelected: boolean }>`
//   width: 10.1vh;
//   height: 10.1vh;
//   border-radius: 5px;
//   outline: ${(props) => (props.isSelected ? "solid 0.15vh #e3f853" : "none")};
// `;

const MaterialTemplate = observer(() => {
  const { sceneStore } = storeContainer;

  return (
    <>
      {sceneStore.templates.map((template, index) => (
        <h1>{template}</h1>
      ))}
      {/* <Grid
        item={sceneStore.templates.map((template, index) => (
          <ImageStyled
            key={template[1]}
            isSelected={true}
            src={`/icons/rightTab/${template[1]}.png`}
            alt={`item-${index}`}
            onClick={() => {
                sceneStore.setSelectedMaterial(template[1]);
            }}
          />
        ))}
        columns={2}
      ></Grid> */}
    </>
  );
});

export default MaterialTemplate;
