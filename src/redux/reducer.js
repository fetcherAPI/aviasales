/* eslint-disable default-param-last */
/* eslint-disable indent */
import { combineReducers } from "redux";

import {
  SET_FETCHING,
  SET_FOUNDED,
  INC_TICKETS_AMOUNT,
  TOGGLE_FILTER,
  CAST_FILTERS,
  CHANGE_SORT,
  SET_SKIP_ERROR,
  APPEND_TICKETS,
} from "./constants";

const initialFilters = {
  filters: [
    { label: "Без пересадок", id: "filter0", checked: true, value: 0 },
    { label: "1 пересадка", id: "filter1", checked: false, value: 1 },
    { label: "2 пересадки", id: "filter2", checked: false, value: 2 },
    { label: "3 пересадки", id: "filter3", checked: false, value: 3 },
  ],
};

const initialSorters = {
  sorters: [
    { label: "Самый дешевый", id: "sortby_price", active: true },
    { label: "Самый быстрый", id: "sortby_time", active: false },
    { label: "Оптимальный", id: "sortby_optimal", active: false },
  ],
};

const initialTickets = {
  amount: 5,
  tickets: [],
  buffer: [],
  founded: 0,
};

const initialGeneral = {
  searchId: undefined,
  isFetching: false,
  skipError: "",
};

const filters = (state = initialFilters, action) => {
  let update;
  switch (action.type) {
    case TOGGLE_FILTER:
      update = state.filters.map((elem) =>
        elem.id === action.id ? { ...elem, checked: !elem.checked } : elem
      );
      return { ...state, filters: update };

    case CAST_FILTERS:
      update = state.filters.map((elem) => ({ ...elem, checked: action.flag }));
      return { ...state, filters: update };
    default:
      return state;
  }
};

const sorters = (state = initialSorters, action) => {
  let update;
  switch (action.type) {
    case CHANGE_SORT:
      update = state.sorters.map((elem) => {
        if (elem.id === action.id) {
          return elem.active ? elem : { ...elem, active: true };
        }
        return elem.active ? { ...elem, active: false } : elem;
      });
      return { ...state, sorters: update };
    default:
      return state;
  }
};

const tickets = (state = initialTickets, action) => {
  let update;
  switch (action.type) {
    case INC_TICKETS_AMOUNT:
      return { ...state, amount: state.amount + 5 };
    case SET_FOUNDED:
      return { ...state, founded: action.amount };
    case APPEND_TICKETS:
      if (state.tickets.length === 0) {
        update = state.tickets.concat(action.tickets);
        return { ...state, tickets: update };
      }
      if (!action.stop) {
        update = state.buffer.concat(action.tickets);
        return { ...state, buffer: update };
      }
      update = state.tickets.concat(action.tickets, state.buffer);
      return { ...state, buffer: [], tickets: update };
    default:
      return state;
  }
};

const general = (state = initialGeneral, action) => {
  switch (action.type) {
    case SET_FETCHING:
      return { ...state, isFetching: action.flag };
    case SET_SKIP_ERROR:
      return { ...state, skipError: action.message };
    default:
      return state;
  }
};

const reducer = combineReducers({ general, filters, sorters, tickets });

export default reducer;
