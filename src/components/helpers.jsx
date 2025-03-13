// // Copyright (c) Microsoft Corporation. All rights reserved.
// // Licensed under the MIT License.

// export function concatMultilineString(str, trim) {
//   const nonLineFeedWhiteSpaceTrim = /(^[\t\f\v\r ]+|[\t\f\v\r ]+$)/g; // Local variable to avoid resetting lastIndex.
//   if (Array.isArray(str)) {
//     let result = "";
//     for (let i = 0; i < str.length; i++) {
//       const s = str[i];
//       if (i < str.length - 1 && !s.endsWith("\n")) {
//         result = result.concat(`${s}\n`);
//       } else {
//         result = result.concat(s);
//       }
//     }
//     // If trimming is requested, remove leading/trailing non-linefeed whitespace.
//     return trim ? result.replace(nonLineFeedWhiteSpaceTrim, "") : result;
//   }
//   return trim
//     ? str.toString().replace(nonLineFeedWhiteSpaceTrim, "")
//     : str.toString();
// }

// helpers.js
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

export function concatMultilineString(str, trim) {
  const nonLineFeedWhiteSpaceTrim = /(^[\t\f\v\r ]+|[\t\f\v\r ]+$)/g;
  if (Array.isArray(str)) {
    let result = "";
    for (let i = 0; i < str.length; i++) {
      const s = str[i];
      if (i < str.length - 1 && !s.endsWith("\n")) {
        result = result.concat(`${s}\n`);
      } else {
        result = result.concat(s);
      }
    }
    return trim ? result.replace(nonLineFeedWhiteSpaceTrim, "") : result;
  }
  return trim
    ? str.toString().replace(nonLineFeedWhiteSpaceTrim, "")
    : str.toString();
}
