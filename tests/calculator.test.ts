import { phraseAnalysis } from "../src/lib";

describe("basic operations", () => {
  it("addition", () => {
    expect(phraseAnalysis("2+2")).toBe("4");
    expect(phraseAnalysis("0+3")).toBe("3");
    expect(
      phraseAnalysis("22222222222222222222222222222222222222222222222222+55555555555555555555555555555555555555555555555555")
    ).toBe("77777777777777777777777777777777777777777777777777");
  });
});
