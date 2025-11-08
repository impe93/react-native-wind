import { spaces } from '../spacing/spaces';

type GapProperties = {
  [key in GapClass]: {
    gap: number | string;
  };
};

type RowGapProperties = {
  [key in RowGapClass]: {
    rowGap: number | string;
  };
};

type ColumnGapProperties = {
  [key in ColumnGapClass]: {
    columnGap: number | string;
  };
};

export type GapStyle = GapProperties & RowGapProperties & ColumnGapProperties;

export type GapClass = `gap-${keyof typeof spaces}`;
export type RowGapClass = `row-gap-${keyof typeof spaces}`;
export type ColumnGapClass = `col-gap-${keyof typeof spaces}`;

export const buildGap = (): GapProperties => {
  const gaps: GapProperties = {} as GapProperties;
  Object.keys(spaces).forEach((s) => {
    gaps[`gap-${s}`] = {
      gap: spaces[s],
    };
  });
  return gaps;
};

export const buildRowGap = (): RowGapProperties => {
  const rowGaps: RowGapProperties = {} as RowGapProperties;
  Object.keys(spaces).forEach((s) => {
    rowGaps[`row-gap-${s}`] = {
      rowGap: spaces[s],
    };
  });
  return rowGaps;
};

export const buildColumnGap = (): ColumnGapProperties => {
  const columnGaps: ColumnGapProperties = {} as ColumnGapProperties;
  Object.keys(spaces).forEach((s) => {
    columnGaps[`col-gap-${s}`] = {
      columnGap: spaces[s],
    };
  });
  return columnGaps;
};

