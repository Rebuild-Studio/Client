import { observable } from "mobx";

interface SelectedObjectProps {
  selectedMaterial: string;
  setSelectedMaterial: (material: string) => void;
  clearSelectdMaterial: () => void;
}

const selectedObjectStore = observable<SelectedObjectProps>({
  selectedMaterial: "MX_mat_defalt_white_01",
  setSelectedMaterial(material) {
    this.selectedMaterial = material;
  },
  clearSelectdMaterial() {
    this.selectedMaterial = "MX_mat_defalt_white_01";
  }
});
export default selectedObjectStore;
