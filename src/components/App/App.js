import FilterList from "../FilterList";
import Header from "../Header";
import Tab from "../Tab";
import TicketList from "../TicketList";

import classes from "./App.module.scss";

const tickets = [
  {
    id: 1,
    title: ["В ПУТИ", "MOW-HKT", "HKT-MOW", "В ПУТИ", 2, 3],
    value: ["10:45 – 08:00", "21:45 – 01:00", "10:45 – 08:00", "21:45 – 01:00"],
  },
  {
    id: 2,
    title: ["MOW-HKT", "HKT-MOW", "В ПУТИ", "В ПУТИ", 2, 3],
    value: ["10:45 – 08:00", "21:45 – 01:00", "10:45 – 08:00", "21:45 – 01:00"],
  },
  {
    id: 2,
    title: ["MOW-HKT", "HKT-MOW", "В ПУТИ", "В ПУТИ", 2, 3],
    value: ["10:45 – 08:00", "21:45 – 01:00", "10:45 – 08:00", "21:45 – 01:00"],
  },
];

export default function App() {
  return (
    <div className={classes.app}>
      <Header />
      <main className={classes.main}>
        <FilterList />
        <div className={classes.sectionTicket}>
          <Tab />
          <TicketList tickets={tickets} />
        </div>
      </main>
    </div>
  );
}
