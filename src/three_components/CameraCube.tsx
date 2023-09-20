import { useServerTextureLoader } from "../hooks/loader";

export const CameraCube = (props: any) => {
  const textures = useServerTextureLoader(
    Array.from({ length: 6 }, (_, idx) => `${idx + 1}.png`),
    "models/CameraCube/"
  );

  return (
    <mesh {...props}>
      {textures.map((value, idx) => (
        <meshStandardMaterial
          key={idx + value.uuid}
          attach={`material-${idx}`}
          map={value}
        />
      ))}
      <boxGeometry />
    </mesh>
  );
};
