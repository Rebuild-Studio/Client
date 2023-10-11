import { observer } from "mobx-react";
import { useState, useEffect } from "react";

import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

function not(a, b) {
  return a.filter((value) => b.every((item) => item.key !== value.key));
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

const ControlTransferListV = observer((props) => {
  const { name, control, update, data, label } = props;
  const [defaultLeft] = useState([]);
  const [defaultRight] = useState(data);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);

  useEffect(() => {
    setLeft(defaultLeft.concat(control.value));
    setRight(not(defaultRight, control.value));
  }, [defaultLeft, defaultRight, control.value]);

  const [checked, setChecked] = useState([]);

  useEffect(() => {
    update.current[name] = { value: Array.from(left), type: control.type };
  }, [left, update, name, control.type]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = (items) => (
    <Paper
      sx={{
        width: 200,
        height: 230,
        overflow: "auto",
        border: "0.5px solid",
        borderColor: "#1F1F1F",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#d4ed3e",
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#1F1F1F",
          borderRadius: "4px",
          margin: "12px",
        },
      }}
    >
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value.name}-label`;

          return (
            <ListItem
              key={value.key}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                  style={{
                    color: "#d4ed3e",
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value.name}`} />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );

  return (
    <>
      <InputLabel htmlFor="max-width">{label}</InputLabel>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item>{customList(left)}</Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Button
              sx={buttonStyle}
              variant="outlined"
              size="small"
              onClick={handleAllRight}
              disabled={left.length === 0}
              aria-label="move all right"
            >
              ≫
            </Button>
            <Button
              sx={buttonStyle}
              variant="outlined"
              size="small"
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="move selected right"
            >
              DEL
            </Button>
            <Button
              sx={buttonStyle}
              variant="outlined"
              size="small"
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
            >
              ADD
            </Button>
            <Button
              sx={buttonStyle}
              variant="outlined"
              size="small"
              onClick={handleAllLeft}
              disabled={right.length === 0}
              aria-label="move all left"
            >
              ≪
            </Button>
          </Grid>
        </Grid>
        <Grid item>{customList(right)}</Grid>
      </Grid>
    </>
  );
});
export default ControlTransferListV;

const buttonStyle = {
  my: 0.5,
  color: "#d4ed3e",
  border: "1px solid #83960E",
  "&:hover": {
    border: "1px solid #d4ed3e",
    color: "#d4ed3e",
  },
};
