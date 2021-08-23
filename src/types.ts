import { FlexStyle } from './styles/flex/flex-style';
import { HeightStyle } from './styles/sizing/heights';
import { CustomSizes } from './styles/sizing/sizes';
import { WidthStyle } from './styles/sizing/widths';
import { MarginStyles } from './styles/spacing/margins';
import { PaddingStyles } from './styles/spacing/paddings';
import { CustomSpaces } from './styles/spacing/spaces';

export type Valueof<T> = T[keyof T];

export type Styles = MarginStyles | PaddingStyles | HeightStyle | WidthStyle | FlexStyle;

export type CustomConfig = {
  theme?: {
    spacing?: CustomSpaces
    sizing?: CustomSizes
  }
}
