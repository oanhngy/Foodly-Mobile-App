import { makeStyles } from "@rneui/themed";
import { Mixin } from "../../helpers";

export default makeStyles((theme) => ({
  container: {
    backgroundColor: "white",
    height: "100%",
    flex: 1,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  body: {
    paddingHorizontal: Mixin.moderateSize(16),
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
    marginHorizontal: Mixin.moderateSize(12),
    borderBottomWidth: 1,
    borderBottomColor: '#BFC6CC',
    paddingVertical: 16,
    marginTop: 10,
  },

  bankNumber: {
    color: '#66707A',
    marginTop: 6,
  },
  buttonChange: {
    borderRadius: 24,
    backgroundColor: theme.colors?.primary,
    width: 86,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  }
}));
