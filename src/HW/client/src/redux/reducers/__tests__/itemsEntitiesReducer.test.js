import itemsEntitiesReducer from "../itemsEntitiesReducer";
import { addItems } from "../../actions/itemsEntitiesActions";

const oldItems = [
  { id: 1, text: "one", isPokemon: false },
  { id: 2, text: "two", isPokemon: false },
  { id: 3, text: "three", isPokemon: false },
];

const newItems = [
  { id: 4, text: "four", isPokemon: true },
  { id: 5, text: "five", isPokemon: true },
];

test("should return the initial state", () => {
  expect(itemsEntitiesReducer(undefined, { type: undefined })).toEqual({
    tasksStatus: true,
    searchInput: "",
    items: [],
  });
});

test("should add new todos to empty list", () => {
  const previousState = {
    items: [],
  };
  expect(itemsEntitiesReducer(previousState, addItems(newItems))).toEqual({
    items: [...newItems],
  });
});

test(' should add new todos to the existing list', () => {
    const previousState = { items: [...oldItems] };
    expect(itemsEntitiesReducer(previousState, addItems(newItems))).toEqual(
      { items: [...oldItems, ...newItems] }
    )
  })
