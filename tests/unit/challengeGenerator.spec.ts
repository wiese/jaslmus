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

  it("does not yield the same note twice in a row if it can help it (by generating another one)", () => {
    const baseNote = 5;
    const generator = challengeGenerator(baseNote, 2);

    const mathRandom = jest.spyOn(Math, "random");
    mathRandom
      .mockReturnValueOnce(0.1)
      .mockReturnValueOnce(0.1)
      .mockReturnValueOnce(0.5);
    expect(generator.next().value).toBe(5);
    expect(generator.next().value).toBe(6);
    expect(mathRandom).toHaveBeenCalledTimes(3);
  });

  it("yields the same note time and again if it's the only one allowed", () => {
    const baseNote = 5;
    const generator = challengeGenerator(baseNote, 1);

    expect(generator.next().value).toBe(baseNote);
    expect(generator.next().value).toBe(baseNote);
    expect(generator.next().value).toBe(baseNote);
  });
});
