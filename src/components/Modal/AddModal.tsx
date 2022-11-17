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
        style={{
          position: "absolute",
          overflow: "scroll",
          zIndex: 99,
          width: `${40}%`,
          height: `${70}vh`,
          padding: `${2}rem`,
          left: `${30}%`,
          background: "#015C92",
        }}
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
