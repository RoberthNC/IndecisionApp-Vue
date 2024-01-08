import { shallowMount } from "@vue/test-utils";
import Counter from "@/components/Counter.vue";

describe("Counter Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Counter);
  });
  // test("Should be equal to snapshot", () => {
  //   const wrapper = shallowMount(CounterVue);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  test("h2 should have default value", () => {
    expect(wrapper.find("h2")).toBeTruthy();
    const h2 = wrapper.find("h2");
    expect(h2.text()).toBe("Counter");
  });

  test("Default value should be 100 in P", () => {
    const value = wrapper.find("[data-testid='counter']").text();
    expect(value).toBe("100");
  });

  test("Should increase and decrease the counter number", async () => {
    const [increaseBtn, decreaseBtn] = wrapper.findAll("button");
    await increaseBtn.trigger("click");
    await increaseBtn.trigger("click");
    await increaseBtn.trigger("click");
    await decreaseBtn.trigger("click");
    await decreaseBtn.trigger("click");
    const value = wrapper.find("[data-testid='counter']").text();
    expect(value).toBe("101");
  });

  test("Should establish default value", () => {
    const { start } = wrapper.props();
    const value = wrapper.find("[data-testid='counter'").text();
    expect(+value).toBe(start);
  });

  test("Should show title prop", () => {
    const title = "Hola Mundo!!!";
    const wrapper = shallowMount(Counter, {
      props: {
        title,
        // start: "5",
      },
    });
    expect(wrapper.find("h2").text()).toBe(title);
  });
});
