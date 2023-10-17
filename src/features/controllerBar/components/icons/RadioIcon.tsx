interface Props {
  checked: boolean;
}

const RadioIcon = ({ checked }: Props) => {
  if (checked) {
    return <img src="/icons/controllerBar/radio-checked.svg" alt="체크박스" />;
  } else {
    return (
      <img src="/icons/controllerBar/radio-unchecked.svg" alt="체크박스" />
    );
  }
};

export default RadioIcon;
