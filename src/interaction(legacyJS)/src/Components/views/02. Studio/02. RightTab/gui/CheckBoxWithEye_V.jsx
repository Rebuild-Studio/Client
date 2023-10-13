import { observer } from "mobx-react";
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";

const MxCheckBoxWithEye = observer((props) => {
  const { label, onChange, checked, style } = props;

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingLeft: "5px",
        paddingRight: "5px",
        ...style,
      }}
    >
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={onChange}
            icon={
              <img
                src="/Icons/Studio/icon_가리기.svg"
                alt="icon_가리기"
                width="20"
                height="20"
              />
            }
            disabled={props.disabled}
            checkedIcon={
              <img
                src="/legacyJS/Icons/Studio/icon_보이기.svg"
                alt="icon_보이기"
                width="20"
                height="20"
              />
            }
            sx={{ padding: 0 }}
          />
        }
        sx={{ margin: 0 }}
      />
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
    </Box>
  );
});

export default MxCheckBoxWithEye;
