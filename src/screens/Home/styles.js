import { makeStyles } from "@rneui/themed";
import { Mixin } from "../../helpers";

export default makeStyles((theme) => ({
  container: {
    backgroundColor: "white",
    height: "100%",
    flex: 1,
    marginBottom: 60,
  },
  header: {
    flexDirection: "row",
    marginVertical: 20,
    paddingHorizontal: Mixin.moderateSize(16),
  },
  body: {
    marginHorizontal: Mixin.moderateSize(16),
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  exploreSearchIcon: {
    position: "absolute",
    paddingLeft: "10%",
    zIndex: 1,
    bottom: 15,
    marginStart: "2%",
  },
  exploreSearchInput: {
    borderRadius: 30,
    alignSelf: "center",
    width: Mixin.device_width * 0.9,
    height: 40,
    backgroundColor: "#ECF1F6",
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  categoryItem: {
    alignItems: "center",
    marginBottom: 14,
    width: 80
  },
  categoryList: {
    marginVertical: 30,
  },
  categoryIcon: {
    width: 48,
    height: 48,
  },

  searchIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    tintColor: "#7f8086",
    marginRight: 10,
  },
  menuContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  deliverText: {
    fontSize: 20,
  },
  headerCenter: {
    flex: 1,
    marginHorizontal: 15,
    flexDirection: "row",
    alignItems: 'center'
  },

  cartContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginEnd: 10
  },
  cartIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  bannerImage: {
    width: "100%",
    height: 140,
    borderRadius: 10,
    resizeMode: "contain",
    marginBottom: 24,
  },
  voucherImage: {
    width: 260,
    height: 120,
    borderRadius: 16,
    marginBottom: 4
  },
  listItem: {
    marginEnd: 16,
  },
  restaurantImage: {
    width: 210,
    height: 140,
  },

}));
