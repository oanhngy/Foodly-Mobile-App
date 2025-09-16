import { makeStyles } from "@rneui/themed";
import { Mixin } from "../../helpers";

export default makeStyles((theme) => ({
  container: {
    backgroundColor: "white",
    paddingHorizontal: Mixin.moderateSize(16),
    height: "100%",
    flex: 1,
  },

  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
}));
