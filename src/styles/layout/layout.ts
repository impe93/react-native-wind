import { display, DisplayClass } from './display';
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
  | DisplayClass;

export type LayoutStyle = typeof resizeMode &
  typeof overflow &
  typeof position &
  typeof zIndex &
  typeof display &
  TopBottomLeftRightStyle;

export const buildLayout = (): LayoutStyle => {
  return {
    ...resizeMode,
    ...overflow,
    ...position,
    ...zIndex,
    ...buildTopBottomLeftRight(),
    ...display,
  } as const;
};
