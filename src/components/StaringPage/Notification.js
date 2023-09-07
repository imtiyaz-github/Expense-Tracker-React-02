import classes from "./Notfication.module.css";


const Notification = (props) => {
  let specailClasses = " ";

  if (props.status === "error") {
    specailClasses += classes.error;
  }
  if (props.status === "success") {
    specailClasses = classes.success;
  }

  const cssClasses = `${classes.notification} ${specailClasses}`;

  return (
    <section className={cssClasses}>
      <h2>{props.title}</h2>
      <p>{props.message}</p>
    </section>
  );
};
export default Notification;