import { observer } from 'mobx-react';
import { Box, MenuItem, Select, Tooltip } from '@mui/material';
import { makeStyles } from '@mui/styles';
import storeContainer from '@/store/storeContainer';
import { eventSystem_store } from '../../../../stores/Interaction_Stores';

const NodeReferenceAnimationSelector = ({
  value, //selected animation name will be stored, e.g) running, idle
  setValue,
  tooltipMessage,
  nodeId
}) => {
  const classes = useStyles();
  const { primitiveStore } = storeContainer;

  const sheet = eventSystem_store.getSelectedSheet();
  const node = sheet.getNodeByUuid(nodeId);
  const reference = node.referenceParameter.NODE_DAT_OBJECT;

  let animationItems = null;

  //TBD) 불러왔을 경우, 단순 조건부 렌더링이 아니라 mesh정보를 올바르게 찾아가야 함
  if (reference.defaultValue && primitiveStore.meshes[reference.defaultValue]) {
    const mesh = primitiveStore.meshes[reference.defaultValue].animations;

    animationItems = mesh.map((anim, index) => (
      <MenuItem
        key={index}
        value={anim.name}
        sx={style.MenuItemArea(eventSystem_store.cameraZoom)}
      >
        {anim.name}
      </MenuItem>
    ));
  }

  return (
    <Tooltip
      sx={{ display: 'flex', alignSelf: 'center' }}
      componentsProps={style.tooltipAndArrow(eventSystem_store.cameraZoom)}
      arrow
      disableInteractive
      placement="top"
      title={tooltipMessage}
    >
      <Box sx={style.SelectWrapper}>
        <Select
          value={value || ''}
          label="Animation"
          onChange={(e) => setValue(e.target.value)}
          sx={style.SelectArea(eventSystem_store.cameraZoom)}
          MenuProps={{
            sx: style.MenuProps,
            classes: { paper: classes.menuPaper }
          }}
        >
          {animationItems}
        </Select>
      </Box>
    </Tooltip>
  );
};

export default observer(NodeReferenceAnimationSelector);

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: 'none'
      }
    }
  },
  menuPaper: {
    minHeight: '0px',
    minWidth: '0px',
    backgroundColor: '#393939',
    '&::-webkit-scrollbar': { width: 0 }
  }
}));

const style = {
  tooltip: {
    color: '#e1f853',
    bgcolor: '#282828CC',
    border: '1px solid grey',
    borderRadius: 3,
    bottom: '5px'
  },
  arrow: {
    '&::before': {
      backgroundColor: '#282828CC',
      border: '1px solid grey'
    }
  },
  tooltipAndArrow: function () {
    return {
      tooltip: {
        sx: style.tooltip
      },
      arrow: {
        sx: style.arrow
      }
    };
  },

  SelectWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center'
  },
  MenuProps: {
    width: '100%',
    zIndex: 10000,
    display: 'flex',
    position: 'absolute',
    mt: '-10px'
  },
  SelectArea: function (unit) {
    return {
      height: `${24 * unit}px`,
      width: `${100 * unit}px`,
      fontFamily: 'SpoqaHanSansNeo',
      fontSize: 'inherit',
      fontWeight: 500,
      textAlign: 'left',
      backgroundColor: '#282828',
      color: '#e2e2e2',
      '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline ': {
        border: 'none'
      },
      '& .MuiSvgIcon-root': {
        color: '#e2e2e2'
      }
    };
  },

  MenuItemArea: function (unit) {
    return {
      fontFamily: 'SpoqaHanSansNeo',
      fontSize: `${unit * 0.8}rem`,
      textAlign: 'left',
      backgroundColor: '#393939',
      color: '#e2e2e2'
    };
  }
};
