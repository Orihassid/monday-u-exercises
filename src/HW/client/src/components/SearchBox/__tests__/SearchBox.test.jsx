import renderer from "react-test-renderer";
import SearchBox from "../SearchBox";



test("search correctly", () => {
    const tree = renderer
      .create(<SearchBox searchInputValue={'shopping'}  />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });