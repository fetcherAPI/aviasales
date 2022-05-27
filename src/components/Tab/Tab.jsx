import { useState } from "react";

import classes from "./Tab.module.scss";

export default function Tab() {
  const [cheap, setCheap] = useState(false);
  const [fast, setFast] = useState(false);
  const handleClickCheap = () => {
    setCheap((prevState) => !prevState);
  };

  const handleClickFast = () => {
    setFast((prevState) => !prevState);
  };

  return (
    <div className={classes.tab}>
      <button
        className={
          cheap
            ? `${classes.tabLink} ${classes.tabLink__active}`
            : classes.tabLink
        }
        onClick={handleClickCheap}
      >
        самый дешевый
      </button>
      <button
        className={
          fast
            ? `${classes.tabLink} ${classes.tabLink__active}`
            : classes.tabLink
        }
        onClick={handleClickFast}
      >
        самый быстрый
      </button>
    </div>
  );
}
