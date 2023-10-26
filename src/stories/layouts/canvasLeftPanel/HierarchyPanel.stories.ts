import HierarchyPanel from "@/features/hierarchy/components/HierarchyPanel";
import { MeshType } from "@/store/primitiveStore";
import type { Meta, StoryObj } from "@storybook/react";
import * as THREE from "three";

const meta = {
  component: HierarchyPanel,
  title: "Layout/CanvasLeftPanel/HierarchyPanel",
  tags: ["autodocs"],
} satisfies Meta<typeof HierarchyPanel>;

export default meta;
type Story = StoryObj<typeof HierarchyPanel>;

const mesh = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 32, 16),
  new THREE.MeshPhysicalMaterial({
    color: 12303291,
    roughness: 0.5,
    metalness: 0,
    transparent: true,
    opacity: 0.5,
  })
);
mesh.name = "Sphere";
const meshes: MeshType = {
  mesh,
};

export const Basic = {
  args: {
    meshes: meshes,
  },
} satisfies Story;
