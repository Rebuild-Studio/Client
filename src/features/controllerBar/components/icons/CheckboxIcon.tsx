interface Props {
  checked: boolean;
}

const CheckboxIcon = ({ checked }: Props) => {
  if (checked) {
    return (
      <img src="/icons/controllerBar/checkbox-checked.svg" alt="체크박스" />
    );
  } else {
    return (
      <img src="/icons/controllerBar/checkbox-unchecked.svg" alt="체크박스" />
    );
  }
};

export default CheckboxIcon;
