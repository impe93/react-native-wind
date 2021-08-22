import { MarginClass, MarginStyles } from './styles/spacing/margins';
import { PaddingClass, PaddingStyles } from './styles/spacing/paddings';

export type Valueof<T> = T[keyof T];

export type Styles = MarginStyles | PaddingStyles;
export type StyleClass = MarginClass | PaddingClass
