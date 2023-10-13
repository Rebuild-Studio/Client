import React from "react";
import { Button, Typography, ListItemButton } from "@mui/material";
import { MyPageVM } from "../../view_models/MyPage_VM";
import storeContainer from "../../stores/storeContainer";

const ProjectListItem = ({ item, handleClickMenuCustom }) => {
  const { user_store } = storeContainer;

  const handleItemClick = () => {
    const idx = user_store.my_project_id_list.indexOf(item.id);
    MyPageVM.onClickProjectBtn(idx + 1, item.id);
  };

  const handleMenuButtonClick = (e) => {
    e.stopPropagation();
    const idx = user_store.my_project_id_list.indexOf(item.id);
    MyPageVM.onClickProjectBtn(idx + 1);
    handleClickMenuCustom(e.target);
  };
  return (
    <ListItemButton
      onClick={handleItemClick}
      key={item.id}
      disableRipple
      sx={style.ListBtnStyle(
        user_store.my_project_id_list.indexOf(item.id) + 1
      )}
    >
      <Button sx={style.menuBtnStyle} onClick={handleMenuButtonClick}>
        <img src="/Icons/Project/icon_edit_30px.png" alt="edit" />
      </Button>

      <img
        style={{
          width: "100%",
          height: "100%",
        }}
        src={item.thumbnail}
        alt="library"
      />

      <Typography sx={style.textArea}>{item.name}</Typography>
      <Typography sx={style.textArea}>{item.createdAt}</Typography>
    </ListItemButton>
  );
};

export default ProjectListItem;

const style = {
  textArea: {
    fontFamily: "SpoqaHanSansNeo",
    fontSize: "13px",
    fontWeight: 500,
    color: "#e2e2e2",
  },
  ListBtnStyle: function (index) {
    return {
      width: "245px",
      height: "244px",
      mt: "20px",
      ml: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: `${index === 0 ? "1px dotted #fff" : 1}`,
      borderRadius: "4px",
      flexDirection: "column",
      backgroundColor: "#303030",
      backgroundImage: `${
        index !== 0 &&
        "linear-gradient(to bottom, rgba(28, 28, 28, 0.9) 0%, rgba(28, 28, 28, 0.28) 23%, rgba(28, 28, 28, 0) 44%, rgba(28, 28, 28, 0) 56%, rgba(28, 28, 28, 0.28) 77%, rgba(28, 28, 28, 0.9) 100%)"
      }`,
      outline: `${index === MyPageVM.selProIdx ? "solid 2px #e3f853" : "none"}`,
      color: `#303030`,
    };
  },
  menuBtnStyle: {
    position: "absolute",
    left: "90%",
    top: 0,
    minWidth: "0",
    width: "2%",
    height: "30px",
  },
};
