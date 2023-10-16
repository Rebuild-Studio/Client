import { user_store } from "../stores/User_Store";
import { action } from "mobx";
import ServiceMiddleware from "../network/ServiceMiddleware";
import {
  projectEndPoints,
  projectServiceKeyMap,
} from "../network/project/ProjectService";

const projectLisViewModel = {
  requestProjectData: async () => {
    const { currentPage, searchKeyword } = user_store;
    try {
      const response = await ServiceMiddleware(
        projectEndPoints.postSearchComponent,
        [
          projectServiceKeyMap.postSearchComponent,
          { keyword: searchKeyword, offset: currentPage },
        ]
      );

      if (currentPage === 0) {
        user_store.DeleteProject();
      }
      if (response.data.length === 0) {
        return;
      }

      if (response.data) {
        action(() => {
          response.data.map((project) => {
            user_store.AddUserData(project);
          });
          user_store.setCurrentPage(currentPage + 1);
        })();
      }
    } catch (error) {
      console.error(error);
    }
  },

  get currentPage() {
    return user_store.currentPage;
  },

  setCurrentPage: action((page) => {
    user_store.currentPage = page;
  }),

  get searchKeyword() {
    return user_store.searchKeyword;
  },

  setSearchKeyword: action((keyword) => {
    user_store.searchKeyword = keyword;
  }),
};

export { projectLisViewModel };
