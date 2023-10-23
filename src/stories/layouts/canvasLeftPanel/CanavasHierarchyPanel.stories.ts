import { HierarchyPanel } from "@/components/layout/CanvasLeftPanel/hierarchyPanel/HierarchyPanel";
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

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshPhysicalMaterial();
const mesh = new THREE.Mesh(geometry, material);

const meshes: MeshType = {
  HI: mesh,
};

export const Basic = {
  args: meshes,
} satisfies Story;
