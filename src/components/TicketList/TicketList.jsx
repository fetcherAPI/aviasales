import Ticket from "../Ticket";

import classes from "./TicketList.module.scss";

export default function TicketList({ tickets }) {
  console.log(tickets);
  const tiketsList = tickets.map((ticket) => (
    <Ticket key={ticket.id} title={ticket.title} value={ticket.value} />
  ));

  return <ul className={classes.list}>{tiketsList}</ul>;
}
