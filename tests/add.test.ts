    // tests/math.test.ts
    import { add } from './add';

    describe('Math functions', () => {
      test('should correctly add two numbers', () => {
        expect(add(1, 2)).toBe(3);
      });

      test('should handle negative numbers', () => {
        expect(add(-1, 5)).toBe(4);
      });
    });