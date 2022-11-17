/**
* EditModal.tsx*

* Copyright © 2022 - All Rights Reserved. *

* Unauthorized copying of this file, via any medium is strictly prohibited.
* This file and all it's contents are proprietary and confidential. *

* Maintained by Emeka Ugbanu, 2022
* @file EditModal.tsx
* @author Emeka Ugbanu
* @section License
*/

import React, { useState, useContext } from "react";
import closeIcon from "../../assets/icons/close.svg";
import modalContext from "../../context/modalContext";
import "./styles.css";

/**
 * @interface IReportsTableProperties
 */
 interface IEditModalProperties {
  data: {
    index:Number,
    data:any ;
  };
  EditChange: (edit: any, data: any) => void /**< function Used to edit modal */;
}

const EditModal = ({ data, EditChange }: IEditModalProperties) => {
  const showModal = useContext(modalContext);
  const [edit, setEdit] = useState<any>({
    name: data.data.name,
    title: data.data.title,
    description: data.data.description,
    salary: data.data.salary,
    date: data.data.date,
    status: data.data.status,
  });
  const updateData = (e: React.ChangeEvent<HTMLInputElement>|any) => {
    setEdit({
      ...edit,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          EditChange(edit, data.index);
        }}
        className="form"
      >
        <img
          src={closeIcon}
          style={{ width: `${40}px`, height: `${40}px`, marginLeft: `${90}%` }}
          alt="cancelModal-icon"
          onClick={showModal.setEdit}
        />
        <div className="input-div">
          <span>Name</span>
          <input
            type="text"
            required
            className="input"
            name="name"
            defaultValue={data.data.name}
            onChange={updateData}
          />
        </div>
        <div className="input-div">
          <span>Title</span>
          <input
            type="text"
            required
            className="input"
            name="title"
            defaultValue={data.data.title}
            onChange={updateData}
          />
        </div>
        <div className="input-div">
          <span>Description</span>
          <textarea
            className="input"
            defaultValue={data.data.description}
            name="description"
            required
            style={{ height: `${100}px` }}
            onChange={updateData}
          ></textarea>
        </div>
        <div className="input-div">
          <span>Salary</span>
          <input
            type="number"
            required
            className="input"
            name="salary"
            defaultValue={Number(
              data.data.salary.toString().replace(/\,/g, "")
            )}
            onChange={updateData}
          />
        </div>
        <div className="input-div">
          <span>Date</span>
          <input
            type="date"
            required
            className="input"
            name="date"
            defaultValue={data.data.date}
            onChange={updateData}
          />
        </div>
        <div className="input-div">
          <span>Status</span>
          <select
            className="input"
            name="status"
            defaultValue={data.data.status}
            onChange={updateData}
          >
            <option value="Paid">Paid</option>
            <option value="Refunded">Refunded</option>
            <option value="Canceled">Canceled</option>
          </select>
        </div>

        <button className="save" type="submit">
          Save
        </button>
      </form>
    </>
  );
};

export default EditModal;
