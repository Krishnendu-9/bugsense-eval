// Cart store: a tiny reducer-based store used by the cart pages.
export function cartReducer(state, action) {
  switch (action.type) {
    case 'add': {
      const qty = (state.lines[action.sku] || 0) + 1;
      return { ...state, lines: { ...state.lines, [action.sku]: qty } };
    }
    case 'remove': {
      const qty = state.lines[action.sku];
      // A3: a line whose quantity already dropped to 0 is treated as corruption.
      if (!qty) throw new Error('Invalid cart state');
      return { ...state, lines: { ...state.lines, [action.sku]: qty - 1 } };
    }
    default:
      return state;
  }
}

export function createStore(reducer, initial) {
  let state = initial;
  return {
    getState: () => state,
    dispatch(action) {
      state = reducer(state, action);
      return action;
    },
  };
}
