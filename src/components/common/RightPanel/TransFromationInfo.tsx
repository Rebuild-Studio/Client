import styled from 'styled-components';
import TransformInput from './TransformInput';

interface axis {
  x: number;
  y: number;
  z: number;
}

type TransformType = 'position' | 'rotation' | 'scale';

interface Props {
  position: axis;
  rotation: axis;
  scale: axis;
}

const PropertyValue = ({ position, rotation, scale }: Props) => {
  const axes: ('x' | 'y' | 'z')[] = ['x', 'y', 'z'];
  const _props = [
    {
      title: '위치',
      type: 'position',
      x: position.x,
      y: position.y,
      z: position.z
    },
    {
      title: '회전',
      type: 'rotation',
      x: rotation.x,
      y: rotation.y,
      z: rotation.z
    },
    {
      title: '크기',
      type: 'scale',
      x: scale.x,
      y: scale.y,
      z: scale.z
    }
  ];

  return (
    <>
      <MarginBox>
        {_props.map((prop, i) => {
          return (
            <div key={i}>
              <span key={prop['title']}>{prop['title']}</span>
              <Wrapper>
                {axes.map((axis) => {
                  return (
                    <TransformInput
                      key={axis}
                      type={prop['type'] as TransformType}
                      initValue={String(prop[axis])}
                      axis={axis}
                    />
                  );
                })}
              </Wrapper>
            </div>
          );
        })}
      </MarginBox>
    </>
  );
};

export default PropertyValue;

const MarginBox = styled.div`
  margin-top: 10px;
`;
const Wrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
