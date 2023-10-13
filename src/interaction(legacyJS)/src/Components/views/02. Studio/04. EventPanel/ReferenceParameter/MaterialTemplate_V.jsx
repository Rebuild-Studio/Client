import { observer } from "mobx-react";
import { Box, Button, Grid, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import MaterialEditVM from "../../../../view_models/06. ObjectEdit/MaterialTemplate_VM";
import { useState } from "react";

const MaterialTemplate = ({ anchorMenu, openMenu, handleCloseMenu, value, setValue }) => {
  const [tempSelectedValue, setTempSelectedValue] = useState(value);

  return (
    <Menu
      anchorEl={anchorMenu}
      open={openMenu}
      onClose={handleCloseMenu}
      sx={style.menuWrapper}
    >
      <Box sx={style.boxStyle}>
        <Typography sx={style.textArea}>머터리얼 요소</Typography>
      </Box>
      <Grid container spacing={1} direction="row" sx={style.gridContainer}>
        {MaterialEditVM.materialTemplates.map((template, index) => (
          <Grid item key={index}>
            <Tooltip
              title={template[0]}
              placement="top"
              arrow
              componentsProps={style.tooltipStyle}
            >
              <MenuItem
                sx={style.menuItemSize}
                value={index}
                onClick={() => setTempSelectedValue(index)}
              >
                <img
                  style={style.imageStyle(index, tempSelectedValue)}
                  src={"/Icons/RightTab/" + template[1] + ".png"}
                  alt={`item-${index}`}
                />
              </MenuItem>
            </Tooltip>
          </Grid>
        ))}
      </Grid>
      <Box sx={style.boxStyle}>
        <Button sx={style.buttonStyle} onClick={() => {
          setValue(tempSelectedValue)
          handleCloseMenu()
        }}>
          적용
        </Button>
      </Box>
    </Menu>
  );
};

export default observer(MaterialTemplate);

const style = {
  menuWrapper: {
    position: "absolute",
    top: "-2.4vh",
    left: -258,
    "& .MuiMenuItem-root": {
      color: "#fff",
      textAlign: "left",
      fontFamily: "SourceHanSansKR",
      fontSize: "13px",
      borderRadius: "5px",
    },
    "& .MuiPaper-root": {
      width: "24.5vh",
      height: "66.9vh",
      backgroundColor: "#3a3a3a",
    },
  },

  boxStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "4.3vh",
  },

  textArea: {
    width: "calc(100% - 3.2vh)",
    fontFamily: "SourceHanSansKR",
    fontSize: "1.3vh",
    fontWeight: 500,
    color: "#fff",
  },

  gridContainer: {
    overflow: "auto",
    height: "57vh",
    "&::-webkit-scrollbar": { width: 0 },
  },

  menuItemSize: {
    width: "10.1vh",
    height: "10.1vh",
  },

  imageStyle: (index, selectedTemp) => ({
    width: "10.1vh",
    height: "10.1vh",
    borderRadius: "5px",
    outline: `${index === selectedTemp ? "solid 0.15vh #e3f853" : "none"}`,
  }),

  buttonStyle: {
    width: "calc(100% - 3.2vh)",
    height: "3.4vh",
    borderRadius: "5px",
    backgroundColor: "#e3f853",
    fontFamily: "SourceHanSansKR",
    fontSize: "1.4vh",
    fontWeight: 500,
    color: "#272748",
  },

  tooltipStyle: {
    tooltip: {
      sx: {
        fontFamily: "Inter",
        fontSize: "1vh",
        color: "#e1f853",
        bgcolor: "#282828",
        border: "solid 0.05vh #535353",
        left: 1.5,
        top: 2,
      },
    },
    arrow: {
      sx: {
        "&::before": {
          backgroundColor: "#282828",
          border: "solid 0.05vh #535353",
          top: 2,
        },
      },
    },
  },
};
