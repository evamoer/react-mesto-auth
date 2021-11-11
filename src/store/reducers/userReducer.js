const userState = {
  name: "",
  about: "",
  avatar: "",
  cohort: "",
  _id: "",
};
const GET_USER = "GET_USER";
const UPDATE_PROFILE = "UPDATE_PROFILE";
const UPDATE_AVATAR = "UPDATE_AVATAR";

export const userReducer = (state = userState, action) => {
  switch (action.type) {
    case GET_USER: {
      return {
        ...state,
        name: action.payload.name,
        about: action.payload.about,
        avatar: action.payload.avatar,
        cohort: action.payload.cohort,
        _id: action.payload._id,
      };
    }
    case UPDATE_PROFILE:
      return {
        ...state,
        name: action.payload.name,
        about: action.payload.about,
      };
    case UPDATE_AVATAR:
      return {
        ...state,
        avatar: action.payload.avatar,
      };
    default:
      return state;
  }
};

export const getUserAction = (payload) => ({
  type: GET_USER,
  payload: payload,
});

export const updateProfileAction = (payload) => ({
  type: UPDATE_PROFILE,
  payload: payload,
});

export const updateAvatarAction = (payload) => ({
  type: UPDATE_AVATAR,
  payload: payload,
});
