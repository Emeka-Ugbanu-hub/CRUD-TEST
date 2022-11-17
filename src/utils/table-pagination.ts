/**
* {calculateRange,sliceData}.ts*

* Copyright © 2022 - All Rights Reserved. *

* Unauthorized copying of this file, via any medium is strictly prohibited.
* This file and all it's contents are proprietary and confidential. *

* Maintained by Emeka Ugbanu, 2022
* @file {calculateRange,sliceData}.ts
* @author Emeka Ugbanu
* @section License
*/

const calculateRange = (data: any, rowsPerPage: any) => {
  const range = [];
  const num = Math.ceil(data.length / rowsPerPage);
  for (let i = 1; i <= num; i++) {
    range.push(i);
  }
  return range;
};

const sliceData = (data: any, page: any, rowsPerPage: any) => {
  return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
};

export { calculateRange, sliceData };
