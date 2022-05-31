import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { setFounded } from "../../redux/actions";

import Ticket from "./Ticket";
import MoreButton from "./MoreButton";
import tss from "./TicketsList.module.scss";

const optimalValue = (price, duration) => price + 12.5 * duration;

const mapSorter = {
  sortby_price: (i, j) => i.price - j.price,
  sortby_time: (i, j) => i.duration - j.duration,
  sortby_optimal: (i, j) =>
    optimalValue(i.price, i.duration) - optimalValue(j.price, j.duration),
};

const TicketsList = ({ tickets, filters, sorters, amount, handleFounded }) => {
  const stops = filters.reduce(
    (acc, elem) => (elem.checked ? [...acc, elem.value] : acc),
    []
  );
  let data = [...tickets];
  if (stops.length < filters.length) {
    data = data.filter((ticket) => {
      const tStops = [...new Set(ticket.stops)];
      return tStops.some((elem) => stops.includes(elem));
    });
  }
  handleFounded(data.length);
  if (tickets.length && data.length === 0) {
    return (
      <div className={tss.note}>
        Нет билетов удовлетворяющих фильтрам поиска
      </div>
    );
  }

  const func = sorters.filter((elem) => elem.active)[0].id;
  const shownTickets = data.sort(mapSorter[func]).slice(0, amount);

  return (
    <>
      <ul className={tss.tickets}>
        {shownTickets.map((elem) => (
          <Ticket
            data={elem}
            key={`ticket_p_${elem.price}_c_${elem.carrier}_d_${elem.duration}`}
          />
        ))}
      </ul>
      <MoreButton />
    </>
  );
};

TicketsList.propTypes = {
  tickets: PropTypes.arrayOf(
    PropTypes.shape({
      price: PropTypes.number,
      carrier: PropTypes.string,
      segments: PropTypes.arrayOf(
        PropTypes.shape({
          origin: PropTypes.string,
          destination: PropTypes.string,
          date: PropTypes.string,
          stops: PropTypes.arrayOf(PropTypes.string),
          duration: PropTypes.number,
        })
      ),
    })
  ).isRequired,
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      id: PropTypes.string,
      checked: PropTypes.bool,
      value: PropTypes.number,
    })
  ).isRequired,
  sorters: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      id: PropTypes.string,
      active: PropTypes.bool,
    })
  ).isRequired,
  amount: PropTypes.number.isRequired,
  handleFounded: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  tickets: state.tickets.tickets,
  filters: state.filters.filters,
  sorters: state.sorters.sorters,
  amount: state.tickets.amount,
});

const mapDispatchToProps = (dispatch) => ({
  handleFounded: (amount) => dispatch(setFounded(amount)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TicketsList);
