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

  productImage: {
    width: "100%",
    height: 200
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  bodyContainer: {
    paddingHorizontal: Mixin.moderateSize(16),
    marginVertical: Mixin.moderateSize(16),
  },
  productDescription: {
    color: "#afb3c4",
    fontSize: 15,
    marginVertical: 10,
  },
  
  title: {
    fontSize: 16,
    fontWeight: "300",
    flex: 1,
    marginVertical: 24,
  },
  sizeItem: {
    borderRadius: 30,
    marginStart: 12,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 2,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#9CA4AB",
  },
  quantityButton: {
    padding: 6,
    borderRadius: 20,
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 8,
    fontWeight: "bold",
  },
  notes: {
    backgroundColor: "#F2F2F2",
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    height: 90,
    textAlignVertical: 'top'
  },
  line: {
    height: 1,
    backgroundColor: "#BFC6CC",
    marginVertical: 16,
  },

  quantityContainerSmall: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 1,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#BFC6CC",
  },
  quantityButtonSmall: {
    padding: 3,
    borderRadius: 20,
  },
  quantityTextSmall: {
    fontSize: 14,
    marginHorizontal: 10,
  },
  topingText: {
    fontSize: 16,
    fontWeight: '500',
    marginStart: 16,
  }
}));
