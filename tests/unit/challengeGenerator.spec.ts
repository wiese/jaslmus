import challengeGenerator, {
  AccidentalsConfiguration,
  Challenge
} from "@/challengeGenerator";

describe("challengeGenerator", () => {
  it("can be constructed with a base note and note limit", () => {
    const generator = challengeGenerator(60, 3, AccidentalsConfiguration.flats);

    expect(generator.next).toBeInstanceOf(Function);
  });

  it("yields Challenge of note (abc notation) and pitch (midi)", () => {
    const baseNote = 60;
    const generator = challengeGenerator(
      baseNote,
      1,
      AccidentalsConfiguration.flats
    );

    const next = generator.next();

    expect((next.value as Challenge).pitch).toBe(baseNote);
    expect((next.value as Challenge).note).toBe("C");
  });

  describe("depending on accidentals configuration", () => {
    it("yields Challenge note as flat", () => {
      const baseNote = 61;
      const generator = challengeGenerator(
        baseNote,
        1,
        AccidentalsConfiguration.flats
      );

      const next = generator.next();

      expect((next.value as Challenge).pitch).toBe(baseNote);
      expect((next.value as Challenge).note).toBe("_D");
    });

    it("yields Challenge note as sharp", () => {
      const baseNote = 61;
      const generator = challengeGenerator(
        baseNote,
        1,
        AccidentalsConfiguration.sharps
      );

      const next = generator.next();

      expect((next.value as Challenge).pitch).toBe(baseNote);
      expect((next.value as Challenge).note).toBe("^C");
    });

    it("yields Challenge note as sharp or flat", () => {
      const baseNote = 63;
      const generator = challengeGenerator(
        baseNote,
        1,
        AccidentalsConfiguration.random
      );
      const mathRandom = jest.spyOn(Math, "random");
      mathRandom
        .mockReturnValueOnce(0.1) // first call is the random pitch selection
        .mockReturnValueOnce(0.1);

      const nextSharp = generator.next();

      expect(mathRandom).toHaveBeenCalledTimes(2);
      expect((nextSharp.value as Challenge).pitch).toBe(baseNote);
      expect((nextSharp.value as Challenge).note).toBe("^D");

      mathRandom.mockReset();

      mathRandom
        .mockReturnValueOnce(0.1) // first call is the random pitch selection
        .mockReturnValueOnce(0.9);

      const nextFlat = generator.next();

      expect(mathRandom).toHaveBeenCalledTimes(2);
      expect((nextFlat.value as Challenge).pitch).toBe(baseNote);
      expect((nextFlat.value as Challenge).note).toBe("_E");
    });
  });

  it("yields value between base note and note limit", () => {
    const baseNote = 60,
      noteLimit = 3;
    const generator = challengeGenerator(
      baseNote,
      noteLimit,
      AccidentalsConfiguration.flats
    );

    const next = generator.next();

    expect(next.done).toBeFalsy();
    expect((next.value as Challenge).pitch).toBeGreaterThanOrEqual(baseNote);
    expect((next.value as Challenge).pitch).toBeLessThanOrEqual(
      baseNote + noteLimit
    );
  });

  it("does not yield the same note twice in a row if it can help it (by finding another one)", () => {
    const baseNote = 60;
    const generator = challengeGenerator(
      baseNote,
      2,
      AccidentalsConfiguration.flats
    );

    const mathRandom = jest.spyOn(Math, "random");
    mathRandom
      .mockReturnValueOnce(0.1)
      .mockReturnValueOnce(0.1)
      .mockReturnValueOnce(0.5);
    expect((generator.next().value as Challenge).pitch).toBe(60);
    expect((generator.next().value as Challenge).pitch).toBe(61);
    expect(mathRandom).toHaveBeenCalledTimes(3);
  });

  it("yields the same note time and again if it's the only one allowed", () => {
    const baseNote = 60;
    const generator = challengeGenerator(
      baseNote,
      1,
      AccidentalsConfiguration.flats
    );

    expect((generator.next().value as Challenge).pitch).toBe(baseNote);
    expect((generator.next().value as Challenge).pitch).toBe(baseNote);
    expect((generator.next().value as Challenge).pitch).toBe(baseNote);
  });
});
