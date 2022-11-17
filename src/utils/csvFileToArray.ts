/**
* generateCSV.ts*

* Copyright © 2022 - All Rights Reserved. *

* Unauthorized copying of this file, via any medium is strictly prohibited.
* This file and all it's contents are proprietary and confidential. *

* Maintained by Emeka Ugbanu, 2022
* @file generateCSV.ts
* @author Emeka Ugbanu
* @section License
*/

//Function to convert the JSON(Array of objects) to CSV.
const arrayToCsv = (headers: any, data: any) => {
  const csvRows = [];
  // getting headers.
  const headerValues = headers.map((header: any) => header.label);
  csvRows.push(headerValues.join(",")); // Push into array as comma separated values
  // Getting rows.
  for (const row of data) {
    const rowValues = headers.map((header: any) => {
      const escaped = ("" + row[header.key]).replace(/["]+/g, ""); // To replace the unwanted quotes.
      return `"${escaped}"`; // To escape the comma in a address like string.
    });
    csvRows.push(rowValues.join(",")); // Push into array as comma separated values.
  }
  return csvRows.join("\n"); // To enter the next rows in the new line '\n'
};
// Function to download the generated CSV as a .csv file.
const download = (data: any, fileName: any) => {
  const blob = new Blob([data], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("hidden", "");
  a.setAttribute("href", url);
  a.setAttribute("download", fileName + ".csv");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
export const generateCSV = (header: any, data: any, filename: any) => {
  const csvData = arrayToCsv(header, data);
  download(csvData, filename);
};
