export const resizeMode = {
  'resize-center': {
    resizeMode: 'center',
  },
  'resize-contain': {
    resizeMode: 'contain',
  },
  'resize-cover': {
    resizeMode: 'cover',
  },
  'resize-repeat': {
    resizeMode: 'repeat',
  },
  'resize-stretch': {
    resizeMode: 'stretch',
  },
} as const;

export type ResizeModeClass = keyof typeof resizeMode;
