import { useTranslation } from "react-i18next";
import storeContainer from "../../../../../../stores/storeContainer";
import { Box, Typography } from "@mui/material";
import NodeReferenceSelector from "../NodeReferenceSelector_V";
import SocketV from "../../Wire/SocketV";
import { observer } from "mobx-react";
import socketTabStyle from "./socketTabStyle";
import { socketPosition } from "../../../../../../../constants/strings/interaction/socket";

const OutputV = observer(({ socket, nodeUuid, update, reference }) => {
  const { eventSystem_store } = storeContainer;
  const { t } = useTranslation();

  return (
    <Box
      sx={socketTabStyle.Container(
        8 * 2 * eventSystem_store.cameraZoom,
        socketPosition.OUTPUT
      )}
    >
      <Box sx={socketTabStyle.ReferenceLabelBox(socketPosition.OUTPUT)}>
        <Box data-nodeuuid={nodeUuid} data-name="node" data-output="true">
          <Typography
            sx={socketTabStyle.Label(30 * eventSystem_store.cameraZoom)}
            data-name="node"
          >
            {eventSystem_store.cameraZoom > 0.5 && t(socket.name)}
          </Typography>
        </Box>
        {reference && <NodeReferenceSelector reference={reference} />}
      </Box>
      <SocketV
        type={socketPosition.OUTPUT}
        socket={socket}
        dataType={socket.type}
        uuid={socket.uuid}
        update={update}
      />
    </Box>
  );
});
export default OutputV;
