import { FlexStyle } from './styles/flex/flex-style';
import { LayoutStyle } from './styles/layout/layout';
import { AspectRatioStyle } from './styles/sizing/aspect-ratio';
import { HeightStyle } from './styles/sizing/heights';
import { MaxHeightStyle } from './styles/sizing/max-height';
import { MaxWidthStyle } from './styles/sizing/max-width';
import { MinHeightStyle } from './styles/sizing/min-height';
import { MinWidthStyle } from './styles/sizing/min-width';
import { CustomSizes } from './styles/sizing/sizes';
import { WidthStyle } from './styles/sizing/widths';
import { MarginStyles } from './styles/spacing/margins';
import { PaddingStyles } from './styles/spacing/paddings';
import { CustomSpaces } from './styles/spacing/spaces';
import { CustomFontSizes } from './styles/typography/font-size';
import { CustomFontFamilies } from './styles/typography/font-family';
import { TypographyStyle } from './styles/typography/typography';
import { ViewStyle } from './styles/view/view';

export type Valueof<T> = T[keyof T];

export type Styles =
  & MarginStyles
  & PaddingStyles
  & HeightStyle
  & WidthStyle
  & MaxWidthStyle
  & MaxHeightStyle
  & MinWidthStyle
  & MinHeightStyle
  & FlexStyle
  & LayoutStyle
  & TypographyStyle
  & ViewStyle
  & AspectRatioStyle;

export type StyleValue = Valueof<Styles>;

export type CustomConfig = {
  theme?: {
    spacing?: CustomSpaces;
    sizing?: CustomSizes;
    colors?: Record<string, Record<string, string> | string>;
    fontFamily?: CustomFontFamilies;
  };
  fontSize?: CustomFontSizes;
};
