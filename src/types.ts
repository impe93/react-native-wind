import { MarginStyles } from './styles/spacing/margins';
import { PaddingStyles } from './styles/spacing/paddings';
import { CustomSpaces } from './styles/spacing/spaces';

export type Valueof<T> = T[keyof T];

export type Styles = MarginStyles | PaddingStyles;

export type CustomConfig = {
  theme?: {
    spacing?: CustomSpaces
  }
}
