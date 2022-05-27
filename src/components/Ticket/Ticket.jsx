import S7Logo from "../../assets/S7Logo.svg";

import Details from "./Details/Details";
import classes from "./Ticket.module.scss";

export default function Ticket(props) {
  const { title, value } = props;
  const infos = value.map((i) => <Info key={i} title={title} value={value} />);
  return (
    <div className={classes.card}>
      <div className={classes.header}>
        <h1 className={classes.title}>13 3434 р</h1>
        <img src={S7Logo} alt='logo' className={classes.logo} />
      </div>
      <div className={classes.details}>{infos}</div>
    </div>
  );
}

function Info(props) {
  const { title, value } = props;
  const details = value.map((item, i) => (
    <Details key={i} title={title[i]} value={item} />
  ));

  return <div className={classes.description}>{details}</div>;
}
