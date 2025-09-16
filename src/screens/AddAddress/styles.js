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
    marginBottom: 4
  },
  body: {
    paddingHorizontal: Mixin.moderateSize(16),
    flex: 1
  },
  inputStyle: {
    borderColor: '#D1D8DD',
    borderRadius: 16,
    borderWidth: 1,
    height: 50,
    paddingHorizontal: 16,
    justifyContent: 'center',
    fontSize: 16
  },
  pickerStyle: {
    borderColor: '#D1D8DD',
    borderRadius: 16,
    borderWidth: 1,
    height: 50,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    marginBottom: 8,
    marginTop: 16
  },
  
  buttonStyle: {
    marginBottom: 30,
    paddingHorizontal: 16,
  }
}));
