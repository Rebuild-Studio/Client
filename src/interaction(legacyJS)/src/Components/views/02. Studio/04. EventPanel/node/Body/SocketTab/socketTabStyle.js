import { socketPosition } from "../../../../../../../constants/strings/interaction/socket";

const socketTabStyle = {
  Container: (scale, type) => ({
    display: "flex",
    justifyContent:
      type === socketPosition.OUTPUT ? "flex-end" : "space-between",
    paddingRight: type === socketPosition.OUTPUT ? "none" : `${scale}px`,
    paddingLeft: type === socketPosition.OUTPUT ? `${scale}px` : "none",
    backgroundColor: "#393939",
  }),
  ReferenceLabelBox: (type) => ({
    display: "flex",
    flexDirection: type === socketPosition.OUTPUT ? "row-reverse" : "row",
    width: "100%",
    justifyContent: "space-between",
  }),
  Label: (scale) => ({
    verticalAlign: "center",
    textAlign: "start",
    display: "inline-block",
    fontFamily: "sans-serif",
    fontSize: "inherit",
    lineHeight: `${scale}px`,
    color: "#fff",
  }),
};

export default socketTabStyle;
