export type Valueof<T> = T[keyof T];

export type Spaces = Record<string | number, number>;

export type StyleKeys = keyof {};
export type StyleValues = Valueof<{}>;
export type Styles = Record<StyleKeys, StyleValues>;
