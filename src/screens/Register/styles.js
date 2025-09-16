import { makeStyles } from "@rneui/themed";
import { Mixin } from "../../helpers";

export default makeStyles((theme) => ({
  container: {
    width: "100%",
    backgroundColor: theme.colors?.white,
    flex: 1,
  },
  body: {
    width: "100%",
    paddingHorizontal: Mixin.moderateSize(16),
    height: "100%",
  },
  rowView: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    width: "100%",
    marginBottom: Mixin.moderateSize(20),
  },
  inputStyle: {
    marginTop: Mixin.moderateSize(8),
  },
  forgotText: {
    fontWeight: "600",
    color: "#FB344F",
    textAlign: "right",
  },

  inputContainer: {
    marginBottom: Mixin.moderateSize(10),
  },
  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    right: 15,
  },
  registerContainer: {
    alignSelf: "center",
    flexDirection: "row",
  },

  primaryText: {
    color: theme.colors?.primary,
    fontWeight: "700",
  },
  buttonContainer: {
    marginVertical: Mixin.moderateSize(20),
  }
  
}));
