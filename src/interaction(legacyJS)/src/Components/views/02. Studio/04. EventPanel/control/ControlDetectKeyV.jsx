import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { observer } from "mobx-react";
import { useState, useEffect, useCallback } from "react";

const ControlDetectKeyV = observer((props) => {
  const { name, control, update } = props;
  const [defaultValue, setDefaultValue] = useState(control.value);
  useEffect(() => {
    update.current[name] = { value: control.value, type: control.type };
  }, [control, name, update]);

  const [clicked, setClicked] = useState(false);

  const handleClick = useCallback(() => {
    setClicked(true);
  }, [setClicked]);

  const handleKeyUp = useCallback(
    (event) => {
      if (clicked) {
        setDefaultValue(event.code);
        update.current[name].value = event.code;
        setClicked(false);
      }
    },
    [clicked, update, name]
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
    >
      <Box
        sx={{
          marginBottom: "3vh",
        }}
        noValidate
      >
        <Typography variant="button" align="center">
          입력 받을 키를 입력해주십시오.
        </Typography>
      </Box>
      <Button
        variant="contained"
        onClick={handleClick}
        onKeyUp={handleKeyUp}
        sx={{
          backgroundColor: clicked ? "#ABC412" : "#d4ed3e",
          color: clicked ? "#3a3a3a" : "#000000",
          transition: "background-color 0.2s",
          "&:hover": {
            color: clicked ? "#3a3a3a" : "#000000",
            backgroundColor: clicked ? "#ABC412" : "#ABC412",
          },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textTransform: "none",
        }}
      >
        {defaultValue || "input"}
      </Button>
    </Box>
  );
});
export default ControlDetectKeyV;
