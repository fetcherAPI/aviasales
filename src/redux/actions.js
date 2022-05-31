import api from "../services/APIService";

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

// set fetching (loading) state
export const setFetching = (flag) => ({ type: SET_FETCHING, flag });

// set founded tickets
export const setFounded = (amount) => ({ type: SET_FOUNDED, amount });

// increment renderTickets amount
export const incTicketsAmount = () => ({ type: INC_TICKETS_AMOUNT });

// toggle filter checkbox
export const toggleFilter = (id) => ({ type: TOGGLE_FILTER, id });

// cast all filters to flag value
export const castFilters = (flag) => ({ type: CAST_FILTERS, flag });

// change active sort tab
export const changeSort = (id) => ({ type: CHANGE_SORT, id });

// set skipError
export const skipError = (message) => ({ type: SET_SKIP_ERROR, message });

// get search id
async function getSearchId(service) {
  const res = await service.getSearchId();
  return res;
}

function refineTickets(data) {
  return data.map((elem) => ({
    ...elem,
    duration: elem.segments[0].duration + elem.segments[1].duration,
    stops: [elem.segments[0].stops.length, elem.segments[1].stops.length],
  }));
}

// append tickets data
export const appendTickets = (data, stop) => ({
  type: APPEND_TICKETS,
  tickets: refineTickets(data),
  stop,
});

async function loadMoreTickets(service, dispatch, apiKey = undefined) {
  let searchId = apiKey;
  if (!searchId) {
    searchId = await getSearchId(service);
    dispatch(setFetching(true));
  }
  dispatch(skipError(""));
  const data = await service.getTickets(searchId);
  if (data === -1) {
    dispatch(skipError(`Error, trying again…`));
    // console.log(`Error. Recieved ${res.status}, couldn't fetch getTickets.`);
    return loadMoreTickets(service, dispatch, searchId);
  }
  dispatch(appendTickets(data.tickets, data.stop));
  if (!data.stop) {
    return loadMoreTickets(service, dispatch, searchId);
  }
  dispatch(setFetching(false));
  return 1;
}

export function asyncMoreTickets() {
  return (dispatch) => {
    loadMoreTickets(api, dispatch);
  };
}
