import { ReduxHelper } from "../../helpers";

export const prefix = "USER";

export const setAvatar = ReduxHelper.generateLocalAction(prefix, "SET_AVATAR");
