/*
 *순서대로 X, Y, Z
 */
type CenterPointType = [number, number, number];

const getCenterPoint = (
  totalX: number,
  totalY: number,
  totalZ: number,
  totalCount: number
): CenterPointType => {
  return [totalX / totalCount, totalY / totalCount, totalZ / totalCount];
};

export default getCenterPoint;
