import { makeStyles } from "@rneui/themed";
import { Mixin } from "../../helpers";

export default makeStyles((theme) => ({
  container: {
    backgroundColor: "white",
    height: "100%",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 60,
  },
  headerTitle: {
    fontSize: Mixin.moderateSize(20),
    textAlign: "center",
    fontWeight: "bold",
    flex: 1,
  },
  breakLine: {
    elevation: 8,
    height: 0.5,
    width: Mixin.device_width,
    backgroundColor: theme.colors?.grey5,
  },
  itemInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Mixin.moderateSize(24),
    borderBottomWidth: 1,
    borderBottomColor: '#BFC6CC',
    paddingVertical: 16,
    marginTop: 10
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  info: {
    color: '#434E58',
    fontSize: 16,
    fontWeight: "600",
    marginTop: 4
  }
}));
