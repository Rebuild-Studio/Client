interface Props {
  direction: 'up' | 'down';
}

const ArrowIcon = ({ direction }: Props) => {
  if (direction === 'up') {
    return <img src="/icons/controllerBar/arrow-up.svg" alt="화살표(위)" />;
  } else {
    return <img src="/icons/controllerBar/arrow-down.svg" alt="화살표(아래)" />;
  }
};

export default ArrowIcon;
