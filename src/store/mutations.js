export const CREATE_BASIC = "CREATE_BASIC";
export const UPDATE_BASIC = "UPDATE_BASIC";
export const DELETE_BASIC = "DELETE_BASIC";
export const SET_BASIC = "SET_BASIC";
export const GET_BASIC = "GET_BASIC";

export const createBasic = (business, cb) => ({
  type: CREATE_BASIC,
  business,
  cb
});

export const updateBasic = (business, cb) => ({
  type: UPDATE_BASIC,
  business,
  cb
});

export const deleteBasic = (businessId) => ({
  type: DELETE_BASIC,
  businessId,
});

export const getBasic = () => ({
  type: GET_BASIC,
});

export const setBasic = (businesses) => ({
  type: SET_BASIC,
  businesses: businesses
});
