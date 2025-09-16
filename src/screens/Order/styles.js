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
  bodyContainer: {
    paddingHorizontal: Mixin.moderateSize(16),
  },
  map: {
    height: 124,
    width: "100%",
    borderRadius: 8,
    marginBottom: 16,
  },
  headerStyle: {
    paddingHorizontal: Mixin.moderateSize(16),
  },
 
  subText: {
    color: "#8f90a0",
  },
  productImage: {
    width: 94,
    height: 94,
    borderRadius: 4,
    marginEnd: Mixin.moderateSize(16),
  },
  tabContainer: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 24,
  },
  orderContainer: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 16,
  },
  spaceBetween: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  quantityContainer: {
    backgroundColor: 'white',
    borderRadius: 32,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 4,
    left: 4,
  },
  editContainer: {
    borderRadius: 32,
    width: 32,
    height: 32,
    backgroundColor: '#D1D8DD',
    justifyContent: 'center', 
    alignItems: 'center',
  },
  foodName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  addItem: {
    borderRadius: 24,
    backgroundColor: '#E3E9ED',
    flexDirection: "row",
    alignItems: "center",
    width: 110,
    height: 36,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "300",
    marginVertical: 24,
  },
  productAdd: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom:60,
    right: 4,
  },
  productImageYou: {
    width: 142,
    height: 102,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  saleContainer: {
    backgroundColor: '#332C45',
    borderRadius: 30,
    width: 100,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saleText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white'
  },
  productItem: {
    marginEnd: 16,
  },
  bigLine: {
    height: 8,
    width: '100%',
    backgroundColor: '#F3F3F3',
    marginTop: 16,
  },
  infoText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#434E58',
    flex: 1
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: '#BFC6CC',
    marginVertical: 16,
  },
  buttonStyle: {
    marginBottom: 30,
    marginTop: 60,
  }
}));
