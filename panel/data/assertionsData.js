export const assertionsData = [
    {
      "parent":" <MyComponent />;",
      "wrapper":" shallow(<MyComponent />);",
      "expect":" wrapper.contains(this.prop.onClick());",
      "equal": "to.equal(true)"
    }
];