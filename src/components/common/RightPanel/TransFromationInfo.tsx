import styled from "styled-components";
import InputField from "../InputField";

interface axis {
  x: number;
  y: number;
  z: number;
}

interface Props {
  position: axis;
  rotation: axis;
  scale: axis;
}
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

const PropertyValue = ({ position, rotation, scale }: Props) => {
  const _props = [
    {
      title: "위치",
      type: "position",
      x: position.x,
      y: position.y,
      z: position.z,
    },
    {
      title: "회전",
      type: "rotation",
      x: rotation.x,
      y: rotation.y,
      z: rotation.z,
    },
    {
      title: "크기",
      type: "scale",
      x: scale.x,
      y: scale.y,
      z: scale.z,
    },
  ];

  return (
    <>
      <MarginBox>
        {_props.map((prop) => {
          const axes: ("x" | "y" | "z")[] = ["x", "y", "z"];
          return (
            <>
              <span>{prop["title"]}</span>
              <Wrapper>
                {axes.map((axis) => {
                  return (
                    <InputField
                      title={prop["type"]}
                      initValue={String(prop[axis])}
                      label={axis}
                      type={"number"}
                    />
                  );
                })}
              </Wrapper>
            </>
          );
        })}
      </MarginBox>
    </>
  );
};

export default PropertyValue;
