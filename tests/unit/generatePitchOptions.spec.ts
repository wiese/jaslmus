import generatePitchOptions from "@/generatePitchOptions";

describe("generatePitchOptions", () => {
  it("returns values between base note and note limit", () => {
    const options = generatePitchOptions(60, 10, false);

    expect(options).toStrictEqual([60, 61, 62, 63, 64, 65, 66, 67, 68, 69]);
  });

  it("omits accidentals if configured", () => {
    const options = generatePitchOptions(60, 9, true);

    expect(options).toStrictEqual([60, 62, 64, 65, 67, 69, 71, 72, 74]);
  });
});
