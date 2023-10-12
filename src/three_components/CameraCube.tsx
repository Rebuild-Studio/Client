import getMinioPath from "@/utils/path/minio";
import { useServerTextureLoader } from "../hooks/loader";

export const CameraCube = (props: any) => {
  const urls = Array.from({ length: 6 }, (_, idx) =>
    getMinioPath(`${idx + 1}`, "cameraCubeMaterial")
  );
  const textures = urls.map((url) => useServerTextureLoader(url));

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
