import Filter from "../Filter";
import Header from "../Header";
import Tab from "../Tab";
import TicketsList from "../TicketsList";

import classes from "./App.module.scss";

export default function App() {
  return (
    <div className={classes.app}>
      <Header />
      <main className={classes.main}>
        <Filter />
        <div className={classes.sectionTicket}>
          <Tab />
          <TicketsList />
        </div>
      </main>
    </div>
  );
}
