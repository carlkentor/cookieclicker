import Grid from "./Grid";
import { Card } from "components/ui";
import { shallow, mount } from "enzyme";

it("renders Child component", () => {
  const children = [<Card key="1" />, <Card key="2" />];
  const wrapper = mount(<Grid>{children}</Grid>);
  expect(wrapper.find(Card)).toHaveLength(children.length);
});
