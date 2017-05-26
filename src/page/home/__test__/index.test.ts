import { sum } from './calc';
test('adds 1 + 2 equals 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('test 10 + 33 equals 43', () => {
  expect(sum(10, 33)).toBe(43);
})
