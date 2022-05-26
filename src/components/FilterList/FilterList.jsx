import Filter from "../Filter";

import classes from "./FilterList.module.scss";

export default function FilterList() {
  return (
    <div className={classes.filterBlock}>
      <h3 className={classes.title}>количество пересадок</h3>
      <Filter value='All' name='Все' />
      <Filter value='Without-change' name='Без пересадок' />
      <Filter value='One-change' name='1 пересадка' />
      <Filter value='Two-change' name='2 пересадки' />
      <Filter value='Tree-change' name='3 пересадки' />
    </div>
  );
}
