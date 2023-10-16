import { observer } from "mobx-react-lite";
import IconButton from "@mui/material/IconButton";
import storeContainer from "../../../../stores/storeContainer";
import CreateNodeCommand from "../../../../class/commands/Interaction/CreateNodeCommand";
import useIcon from "../../../../hooks/useIcon";

/**
 * @param {NodeClass} node
 * @param {string} backgroundImageName
 *
 * @description
 *  Makes button with NodeClass directly.
 *  Previously, this method was made with nodeType:string, instead of NodeClass.
 *
 *  The `node` receives classes such as:
 *  *   e.g., RandomNode, CompareNode, CameraNode, etc.
 */

const CreateNodeButton = observer(
  ({ node, backgroundImageName, width = "50px", height = "60px" }) => {
    const { eventSystem_store, interactionhistory_store } = storeContainer;
    const path = useIcon(backgroundImageName);
    const handleClick = () => {
      interactionhistory_store.execute(
        new CreateNodeCommand(eventSystem_store, {
          node: node,
          sheetId: eventSystem_store.selectedSheet,
        })
      );
    };

    return (
      <IconButton
        onClick={handleClick}
        sx={{
          padding: "0px",
          width: width,
          height: height,
          background: path.root,
          borderRadius: 0,
          "&:hover": {
            background: path.active,
            borderRadius: 0,
          },
        }}
      />
    );
  }
);

export default CreateNodeButton;
