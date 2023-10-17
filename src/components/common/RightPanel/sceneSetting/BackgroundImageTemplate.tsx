import { observer } from "mobx-react";
import styled from "styled-components";
import Grid from "@components/common/Grid";
import storeContainer from "@store/storeContainer";

const BackgroundImageTemplate = observer(() => {
  const { sceneSettingStore } = storeContainer;
  const selectedBgImage = sceneSettingStore.selectedBackgroundImage;
  // const backgroundImageList = sceneSettingStore.backgroundImages;

  return (
    <>
      {/* {sceneSettingStore.templates.map((template) => (
        <h1>{template}</h1>
      ))} */}
      <Grid
        item={sceneSettingStore.backgroundImages.map((bgImage, index) => (
          <ImageStyled
            key={bgImage}
            isSelected={bgImage === selectedBgImage}
            src={`/hdri/${bgImage}.png`}
            alt={`item-${index}`}
            onClick={() => {
              sceneSettingStore.setBackgroundImage(bgImage);
            }}
          />
        ))}
        columns={1}
      ></Grid>
    </>
  );
});

export default BackgroundImageTemplate;

const ImageStyled = styled.img<{ isSelected: boolean }>`
  width: 20.2vh;
  height: 10.1vh;
  border-radius: 5px;
  outline: ${(props) => (props.isSelected ? "solid 0.15vh #e3f853" : "none")};
`;
