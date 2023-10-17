import { Suspense, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useFileLoader } from "@hooks/loader";

const meta = {
  title: "Component/Three/useLocalFileLoader",
  tags: ["autodocs"],
};

export default meta;

const FileLoad = {
  render: () => {
    const [fileList, setFileList] = useState<FileList>();
    const dropHandler: React.DragEventHandler<HTMLDivElement> = (e) => {
      e.preventDefault();
      const files = e.dataTransfer.files;
      if (files.length) {
        setFileList(files);
      }
    };

    const LoadedObject = ({ fileList }: { fileList: FileList }) => {
      const result = useFileLoader(fileList);

      return (
        <>
          {result.map((obj) => {
            if (!(obj instanceof THREE.Group)) {
              return <primitive object={obj.scene} key={obj.scene.uuid} />;
            } else {
              return <primitive object={obj} key={obj.uuid} />;
            }
          })}
        </>
      );
    };

    return (
      <>
        <Canvas
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={dropHandler}
        >
          <Suspense fallback={null}>
            {fileList && <LoadedObject fileList={fileList} />}
          </Suspense>
          <ambientLight />
          <OrbitControls />
          <pointLight position={[10, 10, 10]} />
        </Canvas>
      </>
    );
  },
};
export { FileLoad };
