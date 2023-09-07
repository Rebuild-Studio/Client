import { useLocalFileLoader } from "@/hooks/loader";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";

const meta = {
  title: "Component/Three/useLocalFileLoader",
  tags: ["autodocs"],
};

export default meta;

const FileLoad = {
  render: () => {
    const [objects, setObjects] = useState<THREE.Object3D[]>();
    const dropHandler: React.DragEventHandler<HTMLDivElement> = (e) => {
      e.preventDefault();

      const files = e.dataTransfer.files;

      // useLocalFileLoader(files);

      useLocalFileLoader(files).then((objList) => {
        setObjects(objList);
      });
    };

    return (
      <Canvas
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={dropHandler}
      >
        {objects?.map((obj) => (
          <primitive object={obj} key={obj.uuid} />
        ))}
        <ambientLight />
        <OrbitControls />
        <pointLight position={[10, 10, 10]} />
      </Canvas>
    );
  },
};
export { FileLoad };
