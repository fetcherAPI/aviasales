import Filter from "../Filter";
import Header from "../Header";
import Loader from "../Loader/Loader";
import Sort from "../Sort/Sort";
import TicketsList from "../TicketsList";

import classes from "./App.module.scss";

export default function App() {
  return (
    <div className={classes.app}>
      <Header />
      <Loader />
      <main className={classes.main}>
        <Filter />
        <div className={classes.sectionTicket}>
          <Sort />
          <TicketsList />
        </div>
      </main>
    </div>
  );
}
