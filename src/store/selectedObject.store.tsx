import { makeAutoObservable } from 'mobx';

class SelectedObjectStore {
  selectedMaterial = 'MX_mat_defalt_white_01';

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setSelectedMaterial(material: string) {
    this.selectedMaterial = material;
  }

  clearSelectedMaterial() {
    this.selectedMaterial = 'MX_mat_defalt_white_01';
  }
}

const selectedObjectStore = new SelectedObjectStore();
export default selectedObjectStore;
