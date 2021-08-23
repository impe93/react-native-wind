export declare const alignContent: {
    readonly 'content-center': {
        readonly alignContent: "center";
    };
    readonly 'content-start': {
        readonly alignContent: "flex-start";
    };
    readonly 'content-end': {
        readonly alignContent: "flex-end";
    };
    readonly 'content-between': {
        readonly alignContent: "space-between";
    };
    readonly 'content-around': {
        readonly alignContent: "space-around";
    };
    readonly 'content-stretch': {
        readonly alignContent: "stretch";
    };
};
export declare type AlignContentClass = keyof typeof alignContent;
