import { createHandleReducer } from "../../helpers/reduxHelpers";
import { UserActions } from "../actions";

const initialState = {
  avatar: null,
};

const setAvatar = (state, action) => {
  state.avatar = action.payload;
};

const UserReducer = createHandleReducer(initialState, (builder) => {
  builder.addCase(UserActions.setAvatar.request, setAvatar);
});

export default UserReducer;
