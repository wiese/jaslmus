import { isRef, nextTick } from "vue";
import storedData from "@/storedData";

describe("storedData", () => {
  it("returns value reference", () => {
    const watchedValue = storedData("foo", "v3", "bar");
    expect(isRef(watchedValue)).toBeTruthy();
  });

  it("builds lookup key using name and version", () => {
    const getItem = jest.spyOn(window.localStorage.__proto__, "getItem");

    storedData("foo", "v3", "bar");

    expect(getItem).toHaveBeenCalledWith("storedData_foo_v3");
  });

  it("returns default value reference if value not stored ", () => {
    jest.spyOn(window.localStorage.__proto__, "getItem").mockReturnValue(null);
    const defaultValue = "bar";
    const watchedValue = storedData("foo", "v3", defaultValue);
    expect(isRef(watchedValue)).toBeTruthy();
    expect(watchedValue.value).toStrictEqual(defaultValue);
  });

  it("returns value reference from store if value stored", () => {
    jest
      .spyOn(window.localStorage.__proto__, "getItem")
      .mockReturnValue('{"yes":"works"}');
    const watchedValue = storedData("foo", "v3", "bar");
    expect(watchedValue.value).toStrictEqual({ yes: "works" });
  });

  it("updates store if value is changed", () => {
    const setItem = jest.spyOn(window.localStorage.__proto__, "setItem");

    const watchedValue = storedData("foo", "v2", { foo: 5 });
    watchedValue.value.foo = 6;

    return nextTick(() => {
      expect(setItem).toHaveBeenCalledWith("storedData_foo_v2", '{"foo":6}');
    });
  });
});
