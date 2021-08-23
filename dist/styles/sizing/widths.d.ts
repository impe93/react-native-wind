import { defualtSizes } from './sizes';
export declare type WidthStyle = {
    [key in WidthClass]: {
        width: string | number;
    };
};
export declare type WidthClass = `w-${keyof typeof defualtSizes}`;
export declare const buildWidths: () => WidthStyle;
