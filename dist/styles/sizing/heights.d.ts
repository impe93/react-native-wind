import { defualtSizes } from './sizes';
export declare type HeightStyle = {
    [key in HeightClass]: {
        height: string | number;
    };
};
export declare type HeightClass = `h-${keyof typeof defualtSizes}`;
export declare const buildHeights: () => HeightStyle;
