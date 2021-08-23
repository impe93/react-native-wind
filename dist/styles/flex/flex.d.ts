export declare const flex: {
    readonly 'flex-1': {
        readonly flexGrow: 1;
        readonly flexShrink: 1;
        readonly flexBasis: "0%";
    };
    readonly 'flex-auto': {
        readonly flexGrow: 1;
        readonly flexShrink: 1;
        readonly flexBasis: "auto";
    };
    readonly 'flex-initial': {
        readonly flexGrow: 0;
        readonly flexShrink: 1;
        readonly flexBasis: "auto";
    };
    readonly 'flex-none': {
        readonly flexGrow: 0;
        readonly flexShrink: 0;
        readonly flexBasis: "auto";
    };
};
export declare type FlexClass = keyof typeof flex;
