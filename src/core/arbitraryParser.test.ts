import { parseArbitraryValue } from './arbitraryParser';

describe('arbitraryParser', () => {
  describe('Spacing - Margins', () => {
    it('should parse margin with raw number', () => {
      const result = parseArbitraryValue('m-[15]');
      expect(result).toEqual({ margin: 15 });
    });

    it('should parse margin with px suffix', () => {
      const result = parseArbitraryValue('m-[15px]');
      expect(result).toEqual({ margin: 15 });
    });

    it('should parse negative margin', () => {
      const result = parseArbitraryValue('-m-[10]');
      expect(result).toEqual({ margin: -10 });
    });

    it('should parse marginTop', () => {
      const result = parseArbitraryValue('mt-[20]');
      expect(result).toEqual({ marginTop: 20 });
    });

    it('should parse negative marginTop', () => {
      const result = parseArbitraryValue('-mt-[10]');
      expect(result).toEqual({ marginTop: -10 });
    });

    it('should parse marginHorizontal', () => {
      const result = parseArbitraryValue('mx-[12]');
      expect(result).toEqual({ marginHorizontal: 12 });
    });

    it('should parse marginVertical', () => {
      const result = parseArbitraryValue('my-[8]');
      expect(result).toEqual({ marginVertical: 8 });
    });

    it('should parse marginStart', () => {
      const result = parseArbitraryValue('ms-[16]');
      expect(result).toEqual({ marginStart: 16 });
    });

    it('should parse marginEnd', () => {
      const result = parseArbitraryValue('me-[16]');
      expect(result).toEqual({ marginEnd: 16 });
    });
  });

  describe('Spacing - Paddings', () => {
    it('should parse padding', () => {
      const result = parseArbitraryValue('p-[24]');
      expect(result).toEqual({ padding: 24 });
    });

    it('should parse paddingTop', () => {
      const result = parseArbitraryValue('pt-[10]');
      expect(result).toEqual({ paddingTop: 10 });
    });

    it('should parse paddingHorizontal', () => {
      const result = parseArbitraryValue('px-[16]');
      expect(result).toEqual({ paddingHorizontal: 16 });
    });
  });

  describe('Spacing - Gaps', () => {
    it('should parse gap', () => {
      const result = parseArbitraryValue('gap-[12]');
      expect(result).toEqual({ gap: 12 });
    });

    it('should parse row-gap', () => {
      const result = parseArbitraryValue('row-gap-[8]');
      expect(result).toEqual({ rowGap: 8 });
    });

    it('should parse col-gap', () => {
      const result = parseArbitraryValue('col-gap-[16]');
      expect(result).toEqual({ columnGap: 16 });
    });
  });

  describe('Spacing - Positioning', () => {
    it('should parse top', () => {
      const result = parseArbitraryValue('top-[5]');
      expect(result).toEqual({ top: 5 });
    });

    it('should parse negative top', () => {
      const result = parseArbitraryValue('-top-[10]');
      expect(result).toEqual({ top: -10 });
    });

    it('should parse left', () => {
      const result = parseArbitraryValue('left-[20]');
      expect(result).toEqual({ left: 20 });
    });
  });

  describe('Sizing', () => {
    it('should parse height with raw number', () => {
      const result = parseArbitraryValue('h-[240]');
      expect(result).toEqual({ height: 240 });
    });

    it('should parse height with px suffix', () => {
      const result = parseArbitraryValue('h-[240px]');
      expect(result).toEqual({ height: 240 });
    });

    it('should parse width', () => {
      const result = parseArbitraryValue('w-[300]');
      expect(result).toEqual({ width: 300 });
    });

    it('should parse width with percentage', () => {
      const result = parseArbitraryValue('w-[85%]');
      expect(result).toEqual({ width: '85%' });
    });

    it('should parse minHeight', () => {
      const result = parseArbitraryValue('min-h-[100]');
      expect(result).toEqual({ minHeight: 100 });
    });

    it('should parse maxHeight', () => {
      const result = parseArbitraryValue('max-h-[500]');
      expect(result).toEqual({ maxHeight: 500 });
    });

    it('should parse minWidth', () => {
      const result = parseArbitraryValue('min-w-[200]');
      expect(result).toEqual({ minWidth: 200 });
    });

    it('should parse maxWidth', () => {
      const result = parseArbitraryValue('max-w-[600]');
      expect(result).toEqual({ maxWidth: 600 });
    });
  });

  describe('Colors', () => {
    it('should parse background color with 6-digit hex', () => {
      const result = parseArbitraryValue('bg-[#f1354a]');
      expect(result).toEqual({ backgroundColor: '#f1354a' });
    });

    it('should parse background color with 3-digit hex', () => {
      const result = parseArbitraryValue('bg-[#fff]');
      expect(result).toEqual({ backgroundColor: '#fff' });
    });

    it('should parse background color with 8-digit hex (with alpha)', () => {
      const result = parseArbitraryValue('bg-[#ff0000ff]');
      expect(result).toEqual({ backgroundColor: '#ff0000ff' });
    });

    it('should parse background color with rgb', () => {
      const result = parseArbitraryValue('bg-[rgb(241,53,74)]');
      expect(result).toEqual({ backgroundColor: 'rgb(241,53,74)' });
    });

    it('should parse background color with rgba', () => {
      const result = parseArbitraryValue('bg-[rgba(0,0,0,0.5)]');
      expect(result).toEqual({ backgroundColor: 'rgba(0,0,0,0.5)' });
    });

    it('should parse text color', () => {
      const result = parseArbitraryValue('text-[#000]');
      expect(result).toEqual({ color: '#000' });
    });

    it('should parse text color with rgba', () => {
      const result = parseArbitraryValue('text-[rgba(255,255,255,0.8)]');
      expect(result).toEqual({ color: 'rgba(255,255,255,0.8)' });
    });

    it('should parse border color (using border-color prefix)', () => {
      const result = parseArbitraryValue('border-color-[#ccc]');
      expect(result).toEqual({ borderColor: '#ccc' });
    });

    it('should parse border color (using border prefix with hex)', () => {
      const result = parseArbitraryValue('border-[#ccc]');
      expect(result).toEqual({ borderColor: '#ccc' });
    });

    it('should parse shadow color', () => {
      const result = parseArbitraryValue('shadow-color-[#000]');
      expect(result).toEqual({ shadowColor: '#000' });
    });
  });

  describe('Typography', () => {
    it('should parse font size (using text prefix with number)', () => {
      const result = parseArbitraryValue('text-[19px]');
      expect(result).toEqual({ fontSize: 19 });
    });

    it('should parse font size with raw number', () => {
      const result = parseArbitraryValue('text-[19]');
      expect(result).toEqual({ fontSize: 19 });
    });

    it('should parse line height', () => {
      const result = parseArbitraryValue('leading-[24]');
      expect(result).toEqual({ lineHeight: 24 });
    });

    it('should parse letter spacing', () => {
      const result = parseArbitraryValue('tracking-[0.5]');
      expect(result).toEqual({ letterSpacing: 0.5 });
    });

    it('should parse rem values and convert to pixels', () => {
      const result = parseArbitraryValue('text-[1.5rem]');
      expect(result).toEqual({ fontSize: 24 }); // 1.5 * 16 = 24
    });
  });

  describe('Layout', () => {
    it('should parse opacity', () => {
      const result = parseArbitraryValue('opacity-[0.73]');
      expect(result).toEqual({ opacity: 0.73 });
    });

    it('should parse z-index', () => {
      const result = parseArbitraryValue('z-[999]');
      expect(result).toEqual({ zIndex: 999 });
    });

    it('should parse negative z-index', () => {
      const result = parseArbitraryValue('-z-[1]');
      expect(result).toEqual({ zIndex: -1 });
    });

    it('should parse border radius', () => {
      const result = parseArbitraryValue('rounded-[12]');
      expect(result).toEqual({ borderRadius: 12 });
    });

    it('should parse border top radius (multi-property)', () => {
      const result = parseArbitraryValue('rounded-t-[8]');
      expect(result).toEqual({
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
      });
    });

    it('should parse border width', () => {
      const result = parseArbitraryValue('border-[3]');
      expect(result).toEqual({ borderWidth: 3 });
    });

    it('should parse border top width', () => {
      const result = parseArbitraryValue('border-t-[2]');
      expect(result).toEqual({ borderTopWidth: 2 });
    });
  });

  describe('Aspect Ratio', () => {
    it('should parse aspect ratio as decimal', () => {
      const result = parseArbitraryValue('aspect-[1.777]');
      expect(result).toEqual({ aspectRatio: 1.777 });
    });
  });

  describe('Edge Cases', () => {
    it('should return null for invalid class names', () => {
      expect(parseArbitraryValue('invalid-class')).toBeNull();
      expect(parseArbitraryValue('m-4')).toBeNull(); // Not arbitrary syntax
      expect(parseArbitraryValue('m-[')).toBeNull(); // Malformed
      expect(parseArbitraryValue('m-[]]')).toBeNull(); // Extra bracket
    });

    it('should return null for unsupported prefixes', () => {
      expect(parseArbitraryValue('unknown-[10]')).toBeNull();
    });

    it('should return null for invalid hex colors', () => {
      expect(parseArbitraryValue('bg-[#gggggg]')).toBeNull();
    });

    it('should handle decimal values', () => {
      const result = parseArbitraryValue('opacity-[0.5]');
      expect(result).toEqual({ opacity: 0.5 });
    });

    it('should handle whitespace in values', () => {
      const result = parseArbitraryValue('bg-[ #fff ]');
      expect(result).toEqual({ backgroundColor: '#fff' });
    });

    it('should handle rgba with spaces', () => {
      const result = parseArbitraryValue('bg-[rgba(255, 255, 255, 0.5)]');
      expect(result).toEqual({ backgroundColor: 'rgba(255, 255, 255, 0.5)' });
    });
  });

  describe('Shadow and Elevation', () => {
    it('should parse shadow opacity', () => {
      const result = parseArbitraryValue('shadow-opacity-[0.3]');
      expect(result).toEqual({ shadowOpacity: 0.3 });
    });

    it('should parse shadow radius', () => {
      const result = parseArbitraryValue('shadow-radius-[10]');
      expect(result).toEqual({ shadowRadius: 10 });
    });

    it('should parse elevation', () => {
      const result = parseArbitraryValue('elevation-[5]');
      expect(result).toEqual({ elevation: 5 });
    });
  });

  describe('Platform-Specific Arbitrary Values', () => {
    it('should parse ios-prefixed arbitrary margin', () => {
      const result = parseArbitraryValue('ios:m-[15]');
      expect(result).toEqual({ margin: 15 });
    });

    it('should parse android-prefixed arbitrary margin', () => {
      const result = parseArbitraryValue('android:m-[15]');
      expect(result).toEqual({ margin: 15 });
    });

    it('should parse ios-prefixed arbitrary height', () => {
      const result = parseArbitraryValue('ios:h-[240]');
      expect(result).toEqual({ height: 240 });
    });

    it('should parse android-prefixed arbitrary width', () => {
      const result = parseArbitraryValue('android:w-[350]');
      expect(result).toEqual({ width: 350 });
    });

    it('should parse platform-prefixed negative values', () => {
      const result1 = parseArbitraryValue('ios:-mt-[10]');
      expect(result1).toEqual({ marginTop: -10 });

      const result2 = parseArbitraryValue('android:-ml-[5]');
      expect(result2).toEqual({ marginLeft: -5 });
    });

    it('should parse platform-prefixed hex colors', () => {
      const result1 = parseArbitraryValue('ios:bg-[#f1354a]');
      expect(result1).toEqual({ backgroundColor: '#f1354a' });

      const result2 = parseArbitraryValue('android:bg-[#ff0000]');
      expect(result2).toEqual({ backgroundColor: '#ff0000' });
    });

    it('should parse platform-prefixed rgba colors', () => {
      const result = parseArbitraryValue('ios:bg-[rgba(255,0,0,0.5)]');
      expect(result).toEqual({ backgroundColor: 'rgba(255,0,0,0.5)' });
    });

    it('should parse platform-prefixed text colors', () => {
      const result1 = parseArbitraryValue('ios:text-[#333]');
      expect(result1).toEqual({ color: '#333' });

      const result2 = parseArbitraryValue('android:text-[#666]');
      expect(result2).toEqual({ color: '#666' });
    });

    it('should parse platform-prefixed font sizes', () => {
      const result1 = parseArbitraryValue('ios:text-[19px]');
      expect(result1).toEqual({ fontSize: 19 });

      const result2 = parseArbitraryValue('android:text-[21px]');
      expect(result2).toEqual({ fontSize: 21 });
    });

    it('should parse platform-prefixed percentages', () => {
      const result1 = parseArbitraryValue('ios:w-[85%]');
      expect(result1).toEqual({ width: '85%' });

      const result2 = parseArbitraryValue('android:h-[50%]');
      expect(result2).toEqual({ height: '50%' });
    });

    it('should parse platform-prefixed opacity', () => {
      const result = parseArbitraryValue('ios:opacity-[0.73]');
      expect(result).toEqual({ opacity: 0.73 });
    });

    it('should parse platform-prefixed z-index', () => {
      const result = parseArbitraryValue('android:z-[999]');
      expect(result).toEqual({ zIndex: 999 });
    });

    it('should parse platform-prefixed border radius', () => {
      const result = parseArbitraryValue('ios:rounded-[12]');
      expect(result).toEqual({ borderRadius: 12 });
    });

    it('should parse platform-prefixed border width', () => {
      const result = parseArbitraryValue('android:border-[3]');
      expect(result).toEqual({ borderWidth: 3 });
    });

    it('should parse platform-prefixed padding', () => {
      const result1 = parseArbitraryValue('ios:p-[24]');
      expect(result1).toEqual({ padding: 24 });

      const result2 = parseArbitraryValue('android:pt-[12]');
      expect(result2).toEqual({ paddingTop: 12 });
    });

    it('should parse platform-prefixed gaps', () => {
      const result1 = parseArbitraryValue('ios:gap-[12]');
      expect(result1).toEqual({ gap: 12 });

      const result2 = parseArbitraryValue('android:gap-x-[8]');
      expect(result2).toEqual({ columnGap: 8 });
    });

    it('should return null for invalid platform-prefixed arbitrary values', () => {
      const result = parseArbitraryValue('ios:invalid-[10]');
      expect(result).toBeNull();
    });

    it('should return null for malformed platform prefix', () => {
      const result = parseArbitraryValue('web:m-[10]');
      // web is not supported (only ios and android)
      expect(result).toBeNull();
    });
  });
});
