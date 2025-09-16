import { makeStyles } from "@rneui/themed";
import { Mixin } from "../../helpers";

export default makeStyles((theme) => ({
  container: {
    backgroundColor: "white",
    // paddingHorizontal: Mixin.moderateSize(16),
    height: "100%",
    flex: 1,
  },
  header: {
    marginHorizontal: Mixin.moderateSize(16),
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",    
  },
  
  
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  imageContainer: {
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginEnd: 12,
  },
  priceText: {
    color: "#75757f",
  },
  
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 1,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#BFC6CC",
  },
  quantityButton: {
    padding: 3,
    borderRadius: 20,
  },
  quantityText: {
    fontSize: 14,
    marginHorizontal: 10,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",    
    width: "100%",
    justifyContent: 'center'
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
  },
  
  body: {
    marginHorizontal: Mixin.moderateSize(16),
    flex: 1
  },

  emptyDescription: {
    color: "#78828A",
    fontSize: 18,
    textAlign: "center",
  },
  note: {
    fontSize: 12,
    color: '#66707A',
    marginVertical: 8
  },
  realPrice: {
    color: '#9CA4AB',
    textDecorationLine: 'line-through',
    fontSize: 12,
    marginStart: 8,
    flex: 1
  },
  line: {
    height: 1,
    backgroundColor: '#BFC6CC',
    marginVertical: 24
  },
  buttonStyle: {
    paddingHorizontal: Mixin.moderateSize(16),
    marginBottom: Mixin.moderateSize(16),
  }

}));
