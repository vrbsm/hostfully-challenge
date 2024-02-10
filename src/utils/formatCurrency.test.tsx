import { formattedAmount } from "./formatCurrency";

describe("formatCurrency", () => {
  it("format positive amounts correctly", () => {
    const value = 123.1;
    expect(formattedAmount(value)).toBe("$123.10");
  });
  it("format negative amounts correctly", () => {
    const value = -123.1;
    expect(formattedAmount(value)).toBe("-$123.10");
  });
  it("format zero correctly", () => {
    const value = 0;
    expect(formattedAmount(value)).toBe("$0.00");
  });
});
