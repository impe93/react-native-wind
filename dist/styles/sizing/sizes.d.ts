export declare type DefualtSizes = typeof sizes;
export declare type CustomSizes = Record<string | number, number | string>;
export declare type MergedSizes = DefualtSizes & CustomSizes;
export declare const sizes: {
    readonly 0: 0;
    readonly 0.25: 1;
    readonly 0.5: 2;
    readonly 1: 4;
    readonly 1.5: 6;
    readonly 2: 8;
    readonly 2.5: 10;
    readonly 3: 12;
    readonly 3.5: 14;
    readonly 4: 16;
    readonly 5: 20;
    readonly 6: 24;
    readonly 7: 28;
    readonly 8: 32;
    readonly 9: 36;
    readonly 10: 40;
    readonly 11: 44;
    readonly 12: 48;
    readonly 14: 56;
    readonly 16: 64;
    readonly 20: 80;
    readonly 24: 96;
    readonly 28: 112;
    readonly 32: 128;
    readonly 36: 144;
    readonly 40: 160;
    readonly 44: 176;
    readonly 48: 192;
    readonly 52: 208;
    readonly 56: 224;
    readonly 60: 240;
    readonly 64: 256;
    readonly 72: 288;
    readonly 80: 320;
    readonly 96: 384;
    readonly '1/2': "50%";
    readonly '1/3': "33.333333%";
    readonly '2/3': "66,666667%";
    readonly '1/4': "25%";
    readonly '2/4': "50%";
    readonly '3/4': "75%";
    readonly '1/5': "20%";
    readonly '2/5': "40%";
    readonly '3/5': "60%";
    readonly '4/5': "80%";
    readonly '1/6': "16.666667%";
    readonly '2/6': "33.333333%";
    readonly '3/6': "50%";
    readonly '4/6': "66,666667%";
    readonly '5/6': "83.333333%";
    readonly '1/12': "8.333333%";
    readonly '2/12': "16.666667%";
    readonly '3/12': "25%";
    readonly '4/12': "33.333333%";
    readonly '5/12': "41.666667%";
    readonly '6/12': "50%";
    readonly '7/12': "58.333333%";
    readonly '8/12': "66.666667%";
    readonly '9/12': "75%";
    readonly '10/12': "83.333333%";
    readonly '11/12': "91.666667%";
    readonly full: "100%";
};
export declare const mergeSizes: (customSizes: CustomSizes) => MergedSizes;
