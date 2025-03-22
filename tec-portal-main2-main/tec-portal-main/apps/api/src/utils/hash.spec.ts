import { hash, compare } from './hash';

describe('hash utility', () => {
  describe('hash function', () => {
    it('should generate a hash for a given string', async () => {
      const data = 'some string';
      const result = await hash(data);
      expect(result).toBeDefined();
      expect(result).not.toEqual(data);
    });

    it('should generate unique hashes for different inputs', async () => {
      const data1 = 'some string 1';
      const data2 = 'some string 2';
      const hash1 = await hash(data1);
      const hash2 = await hash(data2);
      expect(hash1).not.toEqual(hash2);
    });

    it('should generate different hashes for the same input on different calls', async () => {
      const data = 'some string';
      const hash1 = await hash(data);
      const hash2 = await hash(data);
      expect(hash1).not.toEqual(hash2);
    });
  });

  describe('compare function', () => {
    it('should return true for a string and its hash', async () => {
      const data = 'some string';
      const hashedData = await hash(data);
      const result = await compare(data, hashedData);
      expect(result).toBe(true);
    });

    it('should return false for a string and a different hash', async () => {
      const data = 'some string';
      const differentData = 'some other string';
      const hashedData = await hash(differentData);
      const result = await compare(data, hashedData);
      expect(result).toBe(false);
    });

    it('should handle empty strings correctly', async () => {
      const data = '';
      const hashedData = await hash(data);
      const result = await compare(data, hashedData);
      expect(result).toBe(true);
    });
  });
});
