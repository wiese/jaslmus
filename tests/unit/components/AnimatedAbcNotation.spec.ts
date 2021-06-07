import { shallowMount } from "@vue/test-utils";
import AnimatedAbcNotation from "@/components/AnimatedAbcNotation.vue";
import AbcNotation from "@/components/AbcNotation.vue";

describe("AnimatedAbcNotation", () => {
  it("can be mounted with an abc notation and an animation duration and passes abc along", () => {
    const abc = "X:1\nK:C\nC",
      animationDuration = 1000;
    const wrapper = shallowMount(AnimatedAbcNotation, {
      props: {
        abc,
        animationDuration
      }
    });
    expect(wrapper.findComponent(AbcNotation).attributes("abc")).toBe(abc);
  });

  it("subscribes to AbcNotation's rendered event and processes its staff lines", () => {
    const path0Definition =
        "M 15 33.835 L 79.051 33.835 L 79.051 34.535000000000004 L 15 34.535000000000004 z",
      path1Definition =
        "M 15 41.585 L 79.051 41.585 L 79.051 42.285000000000004 L 15 42.285000000000004 z",
      path0DefinitionProcessed =
        "M 0 33.835 L 79.051 33.835 L 79.051 34.535000000000004 L 0 34.535000000000004 z",
      path1DefinitionProcessed =
        "M 0 41.585 L 79.051 41.585 L 79.051 42.285000000000004 L 0 42.285000000000004 z";

    const AbcNotation = {
      name: "AbcNotation",
      template: `<svg>
  <g class="abcjs-staff">
    <path d="${path0Definition}" />
    <path d="${path1Definition}" />
  </g>
</svg>`
    };

    const wrapper = shallowMount(AnimatedAbcNotation, {
      props: {
        abc: "X:1\nK:C\nC",
        animationDuration: 1000
      },
      global: {
        stubs: {
          AbcNotation
        }
      }
    });
    const abc = wrapper.findComponent(AbcNotation);
    const paths = abc.findAll(".abcjs-staff path");
    expect(paths).toHaveLength(2);
    expect(paths[0].attributes("d")).toBe(path0Definition);
    expect(paths[1].attributes("d")).toBe(path1Definition);

    abc.trigger("rendered");

    expect(paths).toHaveLength(2);
    expect(paths[0].attributes("d")).toBe(path0DefinitionProcessed);
    expect(paths[1].attributes("d")).toBe(path1DefinitionProcessed);
  });
});
