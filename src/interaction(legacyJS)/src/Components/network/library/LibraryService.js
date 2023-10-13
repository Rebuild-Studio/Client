import MXApiModule from "../MXApiModule";
import ServiceError from "../error/ServiceError";
import convertArgs from "../utils/convertArgs";

const libraryServiceKeyMap = {
  getLibrary_domain: "domain",
  getLibrary_majorCategories: "majorCategories",
  getLibrary_minorCategories: "minorCategories",
  getLibrary_page: "page",
};

const getLibrary = async (args) => {
  const params = convertArgs(args);
  const res = await MXApiModule.get("/library", {
    params: {
      [libraryServiceKeyMap.getLibrary_domain]:
        params[libraryServiceKeyMap.getLibrary_domain],
      [libraryServiceKeyMap.getLibrary_majorCategories]:
        params[libraryServiceKeyMap.getLibrary_majorCategories],
      [libraryServiceKeyMap.getLibrary_minorCategories]:
        params[libraryServiceKeyMap.getLibrary_minorCategories],
      [libraryServiceKeyMap.getLibrary_page]:
        params[libraryServiceKeyMap.getLibrary_page],
    },
  }).catch((error) => {
    throw new ServiceError(
      error.response.data.status,
      error.response.data.error
    );
  });

  return res;
};

const libraryServiceMap = {
  getLibrary: getLibrary,
};

const libraryEndpoints = {
  getLibrary: "getLibrary",
};

const executeLibrary =
  (map) =>
  (endpointName, ...args) =>
    map[endpointName](args);

const LibraryService = executeLibrary(libraryServiceMap);

export { libraryServiceKeyMap, libraryEndpoints };
export default LibraryService;
