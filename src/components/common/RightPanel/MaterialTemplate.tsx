import { observer } from 'mobx-react';
import styled from 'styled-components';
import storeContainer from '@/store/storeContainer';
import dataStore from './MaterialGeometryData';
import Grid from '../Grid';

const MaterialTemplate = () => {
  const { selectedObjectStore } = storeContainer;

  return (
    <Grid
      item={dataStore.materialTextureList.map((template, index) => (
        <ImageStyled
          key={template[1]}
          $isSelected={template[1] === selectedObjectStore.selectedMaterial}
          src={`/icons/rightTab/${template[1]}.png`}
          alt={`item-${index}`}
          onClick={() => {
            selectedObjectStore.setSelectedMaterial(template[1]);
          }}
        />
      ))}
      columns={2}
    ></Grid>
  );
};

const Observer = observer(MaterialTemplate);
export default Observer;

const ImageStyled = styled.img<{ $isSelected: boolean }>`
  width: 10.1vh;
  height: 10.1vh;
  border-radius: 5px;
  outline: ${($isSelected) => ($isSelected ? 'solid 0.25vh #e3f853' : 'none')};
`;
