const roundToNDecimalPlaces = (value: number, n: number): number => {
  const factor = Math.pow(10, n);
  return Math.round(value * factor) / factor;
}

export { roundToNDecimalPlaces };