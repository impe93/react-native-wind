import { MarginClass, MarginStyles } from './styles/spacing/margins';
import { PaddingClass, PaddingStyles } from './styles/spacing/paddings';
export declare type Valueof<T> = T[keyof T];
export declare type Styles = MarginStyles | PaddingStyles;
export declare type StyleClass = MarginClass | PaddingClass;
