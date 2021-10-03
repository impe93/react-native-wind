import { FlexStyle } from './styles/flex/flex-style';
import { LayoutStyle } from './styles/layout/layout';
import { HeightStyle } from './styles/sizing/heights';
import { CustomSizes } from './styles/sizing/sizes';
import { WidthStyle } from './styles/sizing/widths';
import { MarginStyles } from './styles/spacing/margins';
import { PaddingStyles } from './styles/spacing/paddings';
import { CustomSpaces } from './styles/spacing/spaces';

export type Valueof<T> = T[keyof T];

export type Styles =
  | MarginStyles
  | PaddingStyles
  | HeightStyle
  | WidthStyle
  | FlexStyle
  | LayoutStyle;

export type StylesClasses<S extends string, T = Styles> = T extends Record<
  string,
  unknown
>
  ? S extends `${infer I1} ${infer I2}`
    ? I1 extends keyof T
      ? `${I1} ${StylesClasses<I2>}`
      : `${keyof T & string}`
    : S extends keyof T
    ? `${S}`
    : keyof T & string
  : '';

export type CustomConfig = {
  theme?: {
    spacing?: CustomSpaces;
    sizing?: CustomSizes;
  };
};
