export declare const justifyContent: {
    readonly 'justify-start': {
        readonly justifyContent: "flex-start";
    };
    readonly 'justify-end': {
        readonly justifyContent: "flex-end";
    };
    readonly 'justify-center': {
        readonly justifyContent: "center";
    };
    readonly 'justify-between': {
        readonly justifyContent: "space-between";
    };
    readonly 'justify-around': {
        readonly justifyContent: "space-around";
    };
    readonly 'justify-evenly': {
        readonly justifyContent: "space-evenly";
    };
};
export declare type JustifyContentClass = keyof typeof justifyContent;
