/**
* AddModal.tsx*

* Copyright © 2022 - All Rights Reserved. *

* Unauthorized copying of this file, via any medium is strictly prohibited.
* This file and all it's contents are proprietary and confidential. *

* Maintained by Emeka Ugbanu, 2022
* @file AddModal.tsx
* @author Emeka Ugbanu
* @section License
*/

import React, { useState, useContext } from "react";
import closeIcon from "../../assets/icons/close.svg";
import modalContext from "../../context/modalContext";
import "./styles.css";
const AddModal = ({ handleSubmit }: any) => {
  const showModal = useContext(modalContext);
  const [data, setData] = useState<any>({
    name: "",
    title: "",
    description: "",
    salary: "",
    date: "",
    status: "Paid",
  });

  const updateData = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(data);
        }}
       className="form"
      >
        <img
          src={closeIcon}
          style={{ width: `${40}px`, height: `${40}px`, marginLeft: `${90}%` }}
          alt="cancelModal-icon"
          onClick={showModal.setAdd}
        />
        <div className="input-div">
          <span>Name</span>
          <input
            type="text"
            required
            className="input"
            name="name"
            value={data.name}
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
            value={data.title}
            onChange={updateData}
          />
        </div>
        <div className="input-div">
          <span>Description</span>
          <textarea
            className="input"
            value={data.description}
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
            value={data.salary}
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
            value={data.date}
            onChange={updateData}
          />
        </div>
        <div className="input-div">
          <span>Status</span>
          <select
            className="input"
            onChange={updateData}
            name="status"
            value={data.status}
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

export default AddModal;
