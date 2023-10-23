interface BaseMenuItem {
  label: string;
  disabled: boolean;
}

/**
 * 자식이 없는 아이템
 */
interface Item extends BaseMenuItem {
  onClick: () => void;
}

/**
 * 자식이 있는 아이템
 */
interface ItemWithChildren extends Item {
  children: MenuItemType[];
}

export type MenuItemType = Item | ItemWithChildren;
