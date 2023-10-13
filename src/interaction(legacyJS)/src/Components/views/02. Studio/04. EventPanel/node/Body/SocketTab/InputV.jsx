import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { Box, Typography } from "@mui/material";
import storeContainer from "../../../../../../stores/storeContainer";
import NodeReferenceSelector from "../NodeReferenceSelector_V";
import SocketV from "../../Wire/SocketV";
import socketTabStyle from "./socketTabStyle";
import { socketPosition } from "../../../../../../../constants/strings/interaction/socket";

const InputV = observer(({ socket, nodeUuid, update, reference }) => {
  const { eventSystem_store } = storeContainer;
  const { t } = useTranslation();

  return (
    <Box
      sx={socketTabStyle.Container(
        8 * 2 * eventSystem_store.cameraZoom,
        socketPosition.INPUT
      )}
    >
      <Box data-nodeuuid={nodeUuid} data-name="node" data-input="true">
        <SocketV
          type={socketPosition.INPUT}
          socket={socket}
          dataType={socket.type}
          uuid={socket.uuid}
          update={update}
        />
        <Typography
          sx={socketTabStyle.Label(30 * eventSystem_store.cameraZoom)}
          data-name="node"
        >
          {t(socket.name)}
        </Typography>
      </Box>
      {reference && <NodeReferenceSelector reference={reference} />}
    </Box>
  );
});
export default InputV;
