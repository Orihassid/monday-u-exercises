import renderer from "react-test-renderer";
import { ListItem } from "../ListItem";

const pendingTodo = {
  itemId: 1,
  itemName: "shopping",
  imageUrl: null,
  isPokemon: 0,
  pokemonId: null,
  status: 0,
};


test("renders correctly pending todo", () => {
  const tree = renderer
    .create(<ListItem item={pendingTodo}  key={pendingTodo.itemId} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders correctly given wrong item props", () => {

    const item = {
        id: 3,
        text: "Pokemon",
     };
  const tree = renderer
    .create(<ListItem  item={item} key={item.id} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
