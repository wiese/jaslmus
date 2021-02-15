import { shallowMount } from "@vue/test-utils";
import AbcNotation from "@/components/AbcNotation.vue";
import { default as AbcJs } from "abcjs";

describe("AbcNotation.vue", () => {
  it("Calls abcjs with abc notation passed", () => {
    const title = "Some on the water";
    const abc = `T:${title}\nc d e`;
    const abcjsRenderFunction = jest.spyOn(AbcJs, "renderAbc");

    const wrapper = shallowMount(AbcNotation, {
      props: { abc }
    });
    expect(wrapper.exists()).toBeTruthy();
    expect(abcjsRenderFunction).toHaveBeenCalledTimes(1);
    expect(abcjsRenderFunction.mock.calls[0][1]).toBe(abc);
  });
});
