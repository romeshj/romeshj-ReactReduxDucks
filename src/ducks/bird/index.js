/* INDEX FILE

This file, from a module perspective, behaves as the duck file form the original proposal.
It exports as default the reducer function of the duck.
It exports as named export the selectors and the operations.
Optionally it exports the actions and types if they are needed in other ducks.

*/

import reducer from "./reducers";

import * as duckSelectors from "./selectors";
import * as duckOperations from "./operations";

export {
  duckSelectors,
  duckOperations
};

export default reducer;
