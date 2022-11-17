/**
* isNumeric.ts*

* Copyright © 2022 - All Rights Reserved. *

* Unauthorized copying of this file, via any medium is strictly prohibited.
* This file and all it's contents are proprietary and confidential. *

* Maintained by Emeka Ugbanu, 2022
* @file isNumeric.ts
* @author Emeka Ugbanu
* @section License
*/

/**
 * Check if a string is numeric
 * @param str accepts string
 * @returns boolean
 */
export const isNumeric = (str: number) => {
  if (typeof str != "string") return false; // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
};
