import List from "../List";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../store";
import AppContainer from "../../AppContainer/AppContainer";

const items = [
  {
    itemId: 1,
    itemName: "shopping",
    imageUrl: null,
    isPokemon: 0,
    pokemonId: null,
    status: false,
  },
  {
    itemId: 2,
    itemName: "beach",
    imageUrl: null,
    isPokemon: 0,
    pokemonId: null,
    status: true,
  },
];

describe("List", () => {
  test("should render both items (one done and one not)", () => {
    render(
      <Provider store={store}>
        <List items={items} searchInputValue={""} />;
      </Provider>
    );
    const shoppingTodo = screen.getByTestId(`item-${items[0].itemId}`);
    expect(shoppingTodo).toBeInTheDocument();
    const checkbox = screen.getAllByRole("checkbox");
    expect(checkbox[0]).not.toBeChecked();

    const beachTodo = screen.getByTestId(`item-${items[0].itemId}`);
    expect(beachTodo).toBeInTheDocument();
    expect(checkbox[1]).toBeChecked();
  });
});

test("should call fetchItems function", () => {
  const mockGetItemsAction = jest.fn(() => items);
  render(
    <Provider store={store}>
      <AppContainer items={items} getItemsAction={mockGetItemsAction} />
    </Provider>
  );
  expect(mockGetItemsAction).toHaveBeenCalled();
});
