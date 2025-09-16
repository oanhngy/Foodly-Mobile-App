import { makeStyles } from "@rneui/themed";
import { Mixin } from "../../helpers";


export default makeStyles((theme) => ({
  container: {
    backgroundColor: "white",
    height: "100%",
    flex: 1,
  },
  body: {
    paddingHorizontal: Mixin.moderateSize(16),
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  categoryList: {
    marginVertical: 20,
  },
  exploreSearchInput: {
    borderRadius: 30,
    alignSelf: "center",
    width: Mixin.device_width * 0.7,
    height: 40,
    backgroundColor: "#ECF1F6",
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  searchIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    tintColor: "#7f8086",
    marginRight: 10,
  },
  filterContainer: {
    flexDirection: "row",
    backgroundColor: '#E3E9ED',
    borderRadius: 30,
    paddingHorizontal: 20,
    height: 32,
    alignItems: "center",
    marginHorizontal: 10,
  },
  breakLine: {
    elevation: 8,
    height: 0.5,
    width: Mixin.device_width,
    backgroundColor: theme.colors?.grey5,
  },
  topFilter: {
    height: 40,
  }
}));
