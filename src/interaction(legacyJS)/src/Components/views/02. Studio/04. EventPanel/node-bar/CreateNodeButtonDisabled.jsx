import { observer } from "mobx-react-lite";
import IconButton from "@mui/material/IconButton";
import useIcon from "../../../../hooks/useIcon";

const CreateNodeButtonDisabled = observer((props) => {
  const { backgroundImageName, width = "50px", height = "60px" } = props;
  const path = useIcon(backgroundImageName);

  return (
    <IconButton
      sx={{
        padding: "0px",
        width: { width },
        height: { height },
        background: path.root.replace("svg", "png"),
        borderRadius: 0,
        pointerEvents: "none",
      }}
    />
  );
});

export default CreateNodeButtonDisabled;
