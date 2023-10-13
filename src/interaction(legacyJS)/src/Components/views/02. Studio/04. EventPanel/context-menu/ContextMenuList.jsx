import { Divider } from "@mui/material";
import MenuList from "@mui/material/MenuList";
import ContextMenuItem from "../views/ContextMenuItem";

export default function ContextMenuList(props) {
  const { items, isDivided, ...restProps } = props;
  return (
    <>
      <MenuList sx={{ p: "6px" }}>
        {items.map((item) => {
          return (
            <ContextMenuItem
              key={`ContextMenu ${item.stringKey}`}
              onClick={item.onClick}
              disabled={Object.prototype.hasOwnProperty.call(item, "disabled") ? item.disabled : false}
              stringKey={item.stringKey}
              {...restProps}
            />
          );
        })}
      </MenuList>
      {isDivided && (
        <Divider
          sx={{ backgroundColor: "#393939", margin: "0px 6px 0px 6px" }}
        />
      )}
    </>
  );
}
