import createMxJson from "@/utils/json/createMxJson";

self.addEventListener("message", (e) => {
  switch (e.data.type) {
    case "exportJson":
      {
        const mxJson = createMxJson(e.data.sceneJson);
        const stringifiedJson = JSON.stringify(mxJson);
        postMessage({
          type: "download",
          stringifiedJson,
        });
      }
      break;

    default:
      break;
  }
});
