export declare const flexDirections: {
    readonly 'flex-row': {
        readonly flexDirection: "row";
    };
    readonly 'flex-row-reverse': {
        readonly flexDirection: "row-reverse";
    };
    readonly 'flex-col': {
        readonly flexDirection: "column";
    };
    readonly 'flex-col-reverse': {
        readonly flexDirection: "column-reverse";
    };
};
export declare type FlexDirectionsClass = keyof typeof flexDirections;
