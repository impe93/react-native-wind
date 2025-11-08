import { backfaceVisibility, BackfaceVisibilityClass } from './backface-visibility';
import { boxSizing, BoxSizingClass } from './box-sizing';
import { direction, DirectionClass } from './direction';
import { display, DisplayClass } from './display';
import {
  buildColumnGap,
  buildGap,
  buildRowGap,
  ColumnGapClass,
  GapClass,
  GapStyle,
  RowGapClass,
} from './gap';
import { isolation, IsolationClass } from './isolation';
import { objectFit, ObjectFitClass } from './object-fit';
import { buildOpacity, OpacityClass, OpacityStyle } from './opacity';
import { overflow, OverflowClass } from './overflow';
import { position, PositionClass } from './position';
import { resizeMode, ResizeModeClass } from './resize-mode';
import {
  buildTopBottomLeftRight,
  TopBottomLeftRightClass,
  TopBottomLeftRightStyle,
} from './top-bottom-left-right';
import { zIndex, ZIndexClass } from './z-index';

export type LayoutClass =
  | ResizeModeClass
  | OverflowClass
  | PositionClass
  | TopBottomLeftRightClass
  | ZIndexClass
  | DisplayClass
  | BackfaceVisibilityClass
  | ObjectFitClass
  | OpacityClass
  | GapClass
  | RowGapClass
  | ColumnGapClass
  | DirectionClass
  | IsolationClass
  | BoxSizingClass;

export type LayoutStyle = typeof resizeMode &
  typeof overflow &
  typeof position &
  typeof zIndex &
  typeof display &
  typeof backfaceVisibility &
  typeof objectFit &
  TopBottomLeftRightStyle &
  OpacityStyle &
  GapStyle &
  typeof direction &
  typeof isolation &
  typeof boxSizing;

export const buildLayout = (): LayoutStyle => {
  return {
    ...resizeMode,
    ...overflow,
    ...position,
    ...zIndex,
    ...buildTopBottomLeftRight(),
    ...display,
    ...backfaceVisibility,
    ...objectFit,
    ...buildOpacity(),
    ...buildGap(),
    ...buildRowGap(),
    ...buildColumnGap(),
    ...direction,
    ...isolation,
    ...boxSizing,
  } as const;
};
