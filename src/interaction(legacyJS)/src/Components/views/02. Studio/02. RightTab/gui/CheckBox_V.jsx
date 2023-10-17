import {observer} from "mobx-react";
import {Box, Checkbox, FormControlLabel, Typography} from "@mui/material";

const MxCheckBox = observer((props) => {
  const {label, onChange, checked, style} = props;

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        ...style,
      }}
    >
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            color="primary"
            onChange={onChange}
            sx={{
              padding: 0,
              '&.Mui-checked': {
                color: '#d4ed3e',
              },
            }}
          />
        }
        label={
          <Typography
            sx={{
              fontFamily: "SourceHanSansKR",
              fontSize: "12px",
              fontWeight: 500,
              color: "#e2e2e2",
            }}
          >
            {label}
          </Typography>
        }
      />

    </Box>
  );
});

export default MxCheckBox;
