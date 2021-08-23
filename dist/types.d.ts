import { MarginStyles } from './styles/spacing/margins';
import { PaddingStyles } from './styles/spacing/paddings';
import { CustomSpaces } from './styles/spacing/spaces';
export declare type Valueof<T> = T[keyof T];
export declare type Styles = MarginStyles | PaddingStyles;
export declare type CustomConfig = {
    theme?: {
        spacing?: CustomSpaces;
    };
};
