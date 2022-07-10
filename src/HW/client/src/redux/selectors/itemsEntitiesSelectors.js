const getItemsEntities = state => state.itemsEntities;


export const getItems = (state) => getItemsEntities(state).items;
export const getSearchInput = (state) => state.itemsEntities.searchInput

