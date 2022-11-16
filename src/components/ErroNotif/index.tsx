import "./styles.css";
const ErrorNotif = () => {
  return (
    <>
      <div className="toast">
        <ul>
          <li>
            Make sure your csv file header follow is in this order: [ "name",
            "description", "id", "date", "title", "status", "salary", ]
          </li>
          <li>Make sure your csv file date follows this date format: yy-mm-dd  </li>
          <li>Make sure your csv file status is either Paid,Canceled or Refunded</li>
          <li>Make sure your csv file salary is a valid number</li>
          <li>Make sure your fields are not empty</li>
        </ul>
      </div>
    </>
  );
};

export default ErrorNotif;
