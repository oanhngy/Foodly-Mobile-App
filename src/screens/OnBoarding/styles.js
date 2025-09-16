import { makeStyles } from "@rneui/themed";
import { Mixin } from "../../helpers";

export default makeStyles((theme) => ({
  container: {
    width: "100%",
    backgroundColor: theme.colors?.white,
    flex: 1,
    alignItems: "center",
  },
  topBg: {
    width: "100%",
    height: "100%",
    aspectRatio: 1,
    position: "absolute",
  },
  logo: {
    width: Mixin.moderateSize(250),
    height: Mixin.moderateSize(250),
    marginTop: Mixin.moderateSize(100),
  },
  buttonStyle: {
    backgroundColor: theme.colors?.primary,
    marginHorizontal: Mixin.moderateSize(20),
  },
  inputContainer: {
    marginBottom: Mixin.moderateSize(10),
  },
  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  registerContainer: {
    marginTop: Mixin.moderateSize(20),
    alignSelf: "center",
    flexDirection: "row",
  },
  unregisterText: {
    fontWeight: "500",
  },
  primaryText: {
    color: theme.colors?.primary,
    fontWeight: "700",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    marginTop: Mixin.moderateSize(20),
  },
  line: {
    width: Mixin.moderateSize(120),
    height: 1,
    backgroundColor: "#EEEEEE",
  },
}));
