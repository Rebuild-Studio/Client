import { Button } from "@mui/material";

const MxButton = (props) => {
  const { onClick, style, children, ...other } = props;
  const buttonProps = { ...other }; // Copy all other props

  // Remove specific props from the buttonProps object
  delete buttonProps.onClick;
  delete buttonProps.style;
  delete buttonProps.children;

  return (
    <Button
      sx={{ ...sx.buttonStyle(style), ...style }}
      onClick={onClick}
      {...buttonProps}
      disableRipple
    >
      {children}
    </Button>
  );
};

export default MxButton;
const sx = {
  buttonStyle: function (style) {
    return {
      padding: 0,
      margin: 0,
      minWidth: 0,
      minHeight: 0,
      "&:hover": {
        backgroundColor: `${
          style?.backgroundColor ? style.backgroundColor : "transparent"
        }`,
      },
    };
  },
};
