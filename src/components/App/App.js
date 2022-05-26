import FilterList from "../FilterList";
import Header from "../Header";

import classes from "./App.module.scss";

export default function App() {
  return (
    <div className={classes.app}>
      <Header />
      <main className={classes.main}>
        <FilterList />
      </main>
    </div>
  );
}
