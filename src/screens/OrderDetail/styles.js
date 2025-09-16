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
    marginBottom: 4,
  },
  productImage: {
    width: 56,
    height: 56,
    borderRadius: 8,
  },
  productItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Mixin.moderateSize(24),
  },
  quantityContainer: {
    backgroundColor: 'white',
    borderRadius: 24,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 2,
    left: 28,
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#66707A'
  },
  line: {
    height: 1,
    backgroundColor: '#BFC6CC',
    width: "100%",
    marginVertical: 16,
  },
  bigLine: {
    height: 8,
    width: '100%',
    backgroundColor: '#F3F3F3',
    marginVertical: 16,
  },
  infoText: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1
  },
  infoContainer: {
    marginVertical: 4,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Mixin.moderateSize(16),
  },
  cashContainer: {
    borderWidth: 1,
    paddingHorizontal: 12,
    marginEnd: 8,
  },
  buttonStyle: {
    marginVertical: 30,
    paddingHorizontal: Mixin.moderateSize(16),
  },
  title: {
    fontSize: 20,
    fontWeight: '500'
  },
  statusText: {
    fontWeight: '500',
    marginVertical: 8,
  },
  statusDetail: {
    fontSize: 16,
    fontWeight: '300',
    color: "#434E58",
  },
  progress: {
    width: '100%',
    height: 24,
    marginVertical: 16,
  }
}));
