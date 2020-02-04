export default {
  pushItem(state, item) {
    state.items.push(item);
  },
  initItems(state) {
    state.items = [
      {
        itemName: "New Option"
      }
    ];
  },
  setItems(state, items) {
    state.items = items;
  },

  editItems(state, payload) {
    state.items[payload.index] = {
      itemName: payload.itemName,
      order: payload.index
    };
  },

  deleteItemFromItems(state, index) {
    state.items.splice(index, 1);
  },
  reorderItems(state) {
    state.items.forEach((item, index) => {
      item.order = index;
    });
  }
};
