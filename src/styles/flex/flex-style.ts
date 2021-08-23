import { alignContent, AlignContentClass } from './align-content';
import { alignItems, AlignItemsClass } from './align-items';
import { alignSelf, AlignSelfClass } from './align-self';
import { flex, FlexClass } from './flex';
import { flexDirections, FlexDirectionsClass } from './flex-direction';
import { flexGrow, FlexGrowClass } from './flex-grow';
import { flexShrink, FlexShrinkClass } from './flex-shrink';
import { flexWrap, FlexWrapClass } from './flex-wrap';
import { justifyContent, JustifyContentClass } from './justify-content';

export type FlexStyleClass =
  | AlignContentClass
  | AlignItemsClass
  | AlignSelfClass
  | FlexDirectionsClass
  | FlexGrowClass
  | FlexShrinkClass
  | FlexWrapClass
  | FlexClass
  | JustifyContentClass;

export type FlexStyle = typeof alignItems &
  typeof flex &
  typeof flexDirections &
  typeof flexGrow &
  typeof flexShrink &
  typeof flexWrap &
  typeof justifyContent &
  typeof alignContent &
  typeof alignSelf;

export const buildFlex = (): FlexStyle => {
  return {
    ...alignItems,
    ...alignContent,
    ...alignSelf,
    ...flex,
    ...flexDirections,
    ...flexGrow,
    ...flexShrink,
    ...flexWrap,
    ...justifyContent,
  } as const;
};
