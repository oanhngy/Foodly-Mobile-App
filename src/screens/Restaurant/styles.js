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
  productDescription: {
    color: "#66707A",
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 40,
    padding: 10,
    paddingHorizontal: 16,
    marginBottom: 10,
    marginEnd: 10,
  },
  categoryList: {
    marginVertical: 20,
  },
  backContainer: {
    borderRadius: 22,
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ecf0f4",
  },
  headerContainer: {
    flexDirection: "row",
    position: "absolute",
    top: 0,
    zIndex: 1,
    marginHorizontal: 10,
    marginTop: 20,
  },
  bodyContainer: {
    paddingHorizontal: Mixin.moderateSize(16),
    marginTop: 20,
  },
  restaurantImage: {
    width: "100%",
    height: 200,
  },
  restaurantAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  avatarContainer: {
    padding: 5,
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 40,
    top: 150,
    left: 20,
  },
  cartIcon: {
    width: 16,
    height: 16,
    marginHorizontal: 6,
  },
  cartContainer: {
    position: "absolute",
    bottom: 20,
    backgroundColor: theme.colors.primary,
    padding: 8,
    borderRadius: 40,
    flexDirection: "row",
    alignItems: "center",
    width: '90%',
    alignSelf: 'center',
  },
  quantityContainer: {
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  }
}));
