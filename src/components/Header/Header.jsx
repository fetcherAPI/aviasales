import logoImg from "../../assets/Logo.png";

import classes from "./Header.module.scss";

export default function Header() {
  return (
    <header className={classes.header}>
      <img
        className={classes.header__logo}
        src={logoImg}
        alt='aviasales logo'
      />
    </header>
  );
}
