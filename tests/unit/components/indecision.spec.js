import { shallowMount } from "@vue/test-utils";
import Indecision from "@/components/Indecision.vue";

describe("Testing on Indecision.vue Component", () => {
  let wrapper;
  let consoleLogSpy;

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          answer: "yes",
          forced: false,
          image: "https://yesno.wtf/assets/yes/2.gif",
        }),
    })
  );

  beforeEach(() => {
    wrapper = shallowMount(Indecision);
    consoleLogSpy = jest.spyOn(console, "log");
    jest.clearAllMocks();
  });

  // test("Should make match with snapshot", () => {
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  test("Write on input should not trigger nothing", async () => {
    const getAnswerSpy = jest.spyOn(wrapper.vm, "getAnswer");
    const input = wrapper.find("input");
    await input.setValue("Hola Mundo");
    // expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    expect(getAnswerSpy).not.toHaveBeenCalled();
  });

  test('Write "?" symbol should trigger getAnswer', async () => {
    const getAnswerSpy = jest.spyOn(wrapper.vm, "getAnswer");
    const input = wrapper.find("input");
    await input.setValue("?");
    expect(getAnswerSpy).toHaveBeenCalled();
  });

  test("Testing in getAnswer", async () => {
    await wrapper.vm.getAnswer();
    const img = wrapper.find("img");
    expect(img.exists()).toBe(true);
    expect(wrapper.vm.image).toBe("https://yesno.wtf/assets/yes/2.gif");
    expect(wrapper.vm.answer).toBe("Sí!");
  });

  test("Testing in getAnswer - Error on API", async () => {
    fetch.mockImplementationOnce(() => Promise.reject("API is down"));
    await wrapper.vm.getAnswer();
    const img = wrapper.find("img");
    expect(img.exists()).toBe(false);
    expect(wrapper.vm.answer).toBe("Could not be loaded by API");
  });
});
