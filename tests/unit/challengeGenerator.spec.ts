import challengeGenerator from "@/challengeGenerator";

describe("challengeGenerator", () => {
  it("can be constructed with a base note and note limit", () => {
    const generator = challengeGenerator(5, 3);

    expect(generator.next).toBeInstanceOf(Function);
  });

  it("yields value between base note and note limit", () => {
    const baseNote = 5,
      noteLimit = 3;
    const generator = challengeGenerator(baseNote, noteLimit);

    const next = generator.next();

    expect(next.done).toBeFalsy();
    expect(next.value).toBeGreaterThanOrEqual(baseNote);
    expect(next.value).toBeLessThanOrEqual(baseNote + noteLimit);
  });
});
