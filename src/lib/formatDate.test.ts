import { formatDate } from "./formatDate";

it("formats a valid date string", () => {
  const result = formatDate("2026-06-15T10:00:00Z");
  expect(result).toMatch(/15 Jun 2026/);
  expect(result).toMatch(/\d{2}:\d{2}/);
});

it("returns em dash for null", () => {
  expect(formatDate(null)).toBe("—");
});

it("returns em dash for undefined", () => {
  expect(formatDate(undefined)).toBe("—");
});

it("handles a date with single-digit day", () => {
  const result = formatDate("2026-03-05T08:05:00Z");
  expect(result).toMatch(/5 Mar 2026/);
});
