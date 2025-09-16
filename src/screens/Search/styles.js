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
 
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    backgroundColor: "#ECF1F6",
    borderRadius: 40,
    padding: 10,
    paddingHorizontal: 16,
    marginBottom: 14,
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
  recentText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#66707A'
  }



  
}));
