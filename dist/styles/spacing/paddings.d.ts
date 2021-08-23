import { Valueof } from '../../types';
import { positions } from './positions';
import { MergedSpaces, spaces } from './spaces';
declare type PaddingReactNativeNames = 'paddingTop' | 'paddingBottom' | 'paddingLeft' | 'paddingRight' | 'paddingHorizontal' | 'paddingVertical' | 'padding';
export declare type PaddingStyles = {
    [key in PaddingClass]: {
        [k in PaddingReactNativeNames]?: Valueof<MergedSpaces>;
    };
};
export declare type PaddingClass = `p${typeof positions[number]}-${keyof typeof spaces}`;
export declare const buildPaddings: () => PaddingStyles;
export {};
