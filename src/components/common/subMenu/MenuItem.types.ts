export type MenuItemType = {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  children?: MenuItemType[];
};
