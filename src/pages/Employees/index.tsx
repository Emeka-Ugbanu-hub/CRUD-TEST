
/**
* Employees.tsx*

* Copyright © 2022 - All Rights Reserved. *

* Unauthorized copying of this file, via any medium is strictly prohibited.
* This file and all it's contents are proprietary and confidential. *

* Maintained by Emeka Ugbanu, 2022
* @file Employees.tsx
* @author Emeka Ugbanu
* @section License
*/

import React, { useState, useEffect, useContext } from "react";
import DoneIcon from "../../assets/icons/done.svg";
import CancelIcon from "../../assets/icons/cancel.svg";
import RefundedIcon from "../../assets/icons/refunded.svg";
import EditIcon from "../../assets/icons/edit.svg";
import DeleteIcon from "../../assets/icons/delete.svg";
import NewIcon from "../../assets/icons/plus.svg";
import ImportIcon from "../../assets/icons/import.svg";
import ExportIcon from "../../assets/icons/export.svg";
import { AddModal, EditModal } from "../../components/Modal";
import "./style.css";
import { all_employee } from "../../constants/employee";
import { calculateRange, sliceData } from "../../utils/table-pagination";
import modalContext from "../../context/modalContext";
import Papa from "papaparse";
import { generateCSV } from "../../utils/csvFileToArray";
import { isValidDate } from "../../utils/checkDate";
import { isNumeric } from "../../utils/checkNum";
import ErrorNotif from "../../components/ErroNotif";

interface Employ {
  date: String;
  name: String;
  description: String;
  salary: String;
  status: String;
  title: String;
}

const Employees = () => {
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState<Employ[]>(all_employee);
  const [page, setPage] = useState<Number>(1);
  const [pagination, setPagination] = useState<any>([]);
  const [editData, setEditData] = useState<{ data: Object; index: Number }>({
    data: {},
    index: 0,
  });
  const [error, setError] = useState(false);
  useEffect(() => {
    setPagination(calculateRange(all_employee, 5));
    setOrders(sliceData(all_employee, page, 5));
  }, []);
  //handle Delete function
  const handleDelete = (id: String) => {
    const removeItem = orders.filter((user) => user.name !== id);
    setOrders(removeItem);
  };
  const handleClear = () => {
    setOrders([]);
  };
  const handleSubmit = (data: any) => {
    setOrders((prev) => [...prev, data]);
    showModal.setAdd();
  };
  //handle Search function
  const __handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    if (event.target.value !== "") {
      let search_results = orders.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase())
      );
      setOrders(search_results);
    } else {
      __handleChangePage(1);
    }
  };
  //handle Import function
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      Papa.parse(e.target.files[0], {
        header: true,
        skipEmptyLines: true,

        complete: function (results: any) {
          const rowsArray: any = [];
          const valuesArray: any = [];

          results.data.map((d: any) => {
            rowsArray.push(Object.keys(d));
            valuesArray.push(Object.values(d));
          });
          //validate import csv file
          const testBoolean = results.data.some((m: any) => {
            if (
              isValidDate(m.date.toString()) &&
              ["Paid", "Canceled", "Refunded"].includes(m.status.trim()) &&
              isNumeric(m.salary)
            ) {
              return true;
            } else {
              return false;
            }
          });

          if (
            results.data.length !== 0 &&
            rowsArray[0].toString() ===
              [
                "name",
                "description",
                "id",
                "date",
                "title",
                "status",
                "salary",
              ].toString() &&
            rowsArray[0].length === 7 &&
            testBoolean === true
          ) {
            // Filtered Values
            setOrders(results.data);
          } else {
            setError(true);
            setTimeout(() => {
              setError(false);
            }, 3000);
          }
        },
      });
    }
  };
  //handle Export function
  const handleExport = (orders: Object) => {
    const csvHeader = [
      { label: "name", key: "name" },
      { label: "description", key: "description" },
      { label: "id", key: "id" },
      { label: "date", key: "date" },
      { label: "title", key: "title" },
      { label: "status", key: "status" },
      { label: "salary", key: "salary" },
    ];

    generateCSV(csvHeader, orders, "yourfile");
  };
  //handle Edit function
  const handleEdit = (order: Object, index: Number) => {
    setEditData((editData) => ({
      ...editData,
      data: order,
      index: index,
    }));
    showModal.setEdit();
  };
  //Edit Function Filter
  const handleEditChange = (edit: Employ, index: number) => {
    orders[index] = edit;
    showModal.setEdit();
  };
  // Change Page
  const __handleChangePage = (new_page: Number) => {
    setPage(new_page);
    setOrders(sliceData(all_employee, new_page, 5));
  };
  const showModal = useContext(modalContext);

  return (
    <div className="dashboard-content">
      {error && <ErrorNotif />}
      <div className="dashboard-content-container">
        <div className="dashboard-content-header">
          <h2>Orders List</h2>
          <div
            style={{
              width: `${50}%`,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <button className="header-button" onClick={showModal.setAdd}>
              <span style={{ marginTop: `${5}px` }}>New</span>{" "}
              <img
                alt="new-icon"
                style={{ width: `${30}px`, marginLeft: `${1}rem` }}
                src={NewIcon}
              />
            </button>
            {showModal.addModal && <AddModal handleSubmit={handleSubmit} />}
            {showModal.editModal && (
              <EditModal EditChange={handleEditChange} data={editData} />
            )}
            <label htmlFor="import" className="header-button import">
              <input
                id="import"
                type={"file"}
                accept={".csv"}
                onChange={handleImport}
                style={{ display: "none" }}
              />
              <span style={{ marginTop: `${5}px` }}>Import</span>
              <span className="tooltip">*.csv*</span>
              <img
                alt="export-icon"
                style={{ width: `${35}px`, marginLeft: `${1}rem` }}
                src={ImportIcon}
              />
            </label>
            <button
              className="header-button"
              onClick={() => handleExport(orders)}
            >
              <span style={{ marginTop: `${5}px` }}>export</span>{" "}
              <img
                alt="import-icon"
                style={{ width: `${25}px`, marginLeft: `${1}rem` }}
                src={ExportIcon}
              />
            </button>
            <button
              className="header-button"
              style={{ background: "red", border: "none" }}
              onClick={handleClear}
            >
              <span style={{ marginTop: `${8}px` }}>Clear</span>
            </button>
          </div>
          <div className="dashboard-content-search">
            <input
              type="text"
              value={search}
              placeholder="Search.."
              className="dashboard-content-input"
              onChange={(e) => __handleSearch(e)}
            />
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>STATUS</th>
              <th>TITLE</th>
              <th>DESCRIPTION</th>
              <th>SALARY</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

          {orders.length !== 0 ? (
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>
                    <span>#{index}</span>
                  </td>
                  <td>
                    <span>{order.date}</span>
                  </td>
                  <td>
                    <div>
                      {order.status === "Paid" ? (
                        <img
                          src={DoneIcon}
                          alt="paid-icon"
                          className="dashboard-content-icon"
                        />
                      ) : order.status === "Canceled" ? (
                        <img
                          src={CancelIcon}
                          alt="canceled-icon"
                          className="dashboard-content-icon"
                        />
                      ) : order.status === "Refunded" ? (
                        <img
                          src={RefundedIcon}
                          alt="refunded-icon"
                          className="dashboard-content-icon"
                        />
                      ) : null}
                      <span>{order.status}</span>
                    </div>
                  </td>
                  <td>
                    <div>
                      <span style={{ fontWeight: 900, fontSize: `${1}rem` }}>
                        {order.name}
                      </span>
                    </div>
                    <span>{order.title}</span>
                  </td>
                  <td>
                    <span>{order.description}</span>
                  </td>
                  <td>
                    <span>${Number(order.salary).toLocaleString()}</span>
                  </td>
                  <td>
                    <div className="action-div">
                      <img
                        alt="edit-icon"
                        src={EditIcon}
                        style={{pointerEvents:showModal.addModal || showModal.editModal?"none":"auto"}}
                        onClick={() => handleEdit(order, index)}
                      />
                      <img
                        alt="delete-icon"
                        src={DeleteIcon}
                        style={{pointerEvents:showModal.addModal || showModal.editModal?"none":"auto"}}
                        onClick={() => handleDelete(order.name)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : null}
        </table>

        {orders.length !== 0 ? (
          <div className="dashboard-content-footer">
            {pagination.map((item: number, index: number) => (
              <span
                key={index}
                className={item === page ? "active-pagination" : "pagination"}
                onClick={() => __handleChangePage(item)}
              >
                {item}
              </span>
            ))}
          </div>
        ) : (
          <div className="dashboard-content-footer">
            <span className="empty-table">No data</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Employees;
