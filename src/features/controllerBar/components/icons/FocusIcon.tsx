import Icon from '@components/common/Icon.tsx';

const FocusIcon = () => {
  return (
    <Icon
      defaultSrc="/icons/controllerBar/focus.svg"
      activeSrc="/icons/controllerBar/focus-active.svg"
      alt="포커스 아이콘"
      activated={false}
    />
  );
};

export default FocusIcon;
