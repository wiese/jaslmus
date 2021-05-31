import midiToAbc from "@/midiToAbc";

describe("midiToAbc", () => {
  it("converts midi pitch to ABC notation", () => {
    const abc = midiToAbc(60, false);
    expect(abc).toBe("C");
  });

  it("converts interpretable pitch to flat if so configured", () => {
    const abc = midiToAbc(61, false);
    expect(abc).toBe("_D");
  });

  it("converts interpretable pitch to sharp if so configured", () => {
    const abc = midiToAbc(61, true);
    expect(abc).toBe("^C");
  });
});
