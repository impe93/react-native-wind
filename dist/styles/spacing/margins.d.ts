import { Valueof } from '../../types';
import { positions } from './positions';
import { MergedSpaces, spaces } from './spaces';
declare type MarginReactNativeNames = 'marginTop' | 'marginBottom' | 'marginLeft' | 'marginRight' | 'marginHorizontal' | 'marginVertical' | 'margin';
export declare type MarginStyles = {
    [key in MarginClass]: {
        [k in MarginReactNativeNames]?: Valueof<MergedSpaces>;
    };
};
export declare type MarginClass = `m${typeof positions[number]}-${keyof typeof spaces}`;
export declare const buildMargins: () => MarginStyles;
export {};
