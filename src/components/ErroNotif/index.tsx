/**
* ErrorNotif.tsx*

* Copyright © 2022 - All Rights Reserved. *

* Unauthorized copying of this file, via any medium is strictly prohibited.
* This file and all it's contents are proprietary and confidential. *

* Maintained by Emeka Ugbanu, 2022
* @file ErrorNotif.tsx
* @author Emeka Ugbanu
* @section License
*/
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
