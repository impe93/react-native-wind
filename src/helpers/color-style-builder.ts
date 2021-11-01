import { colors } from '../theme/colors';

export const colorStyleBuilder = (
  classPrefix: string,
  styleName: string,
): Record<string, Record<string, string>> => {
  const styles: Record<string, Record<string, string>> = {};

  Object.keys(colors).forEach((ck) => {
    if (typeof colors[ck] === 'object') {
      Object.keys(colors[ck]).forEach((cs) => {
        styles[`${classPrefix}-${ck}-${cs}`] = {
          [styleName]: colors[ck][cs],
        };
      });
    } else {
      styles[`${classPrefix}-${ck}`] = {
        [styleName]: colors[ck] as string,
      };
    }
  });

  return styles;
};
