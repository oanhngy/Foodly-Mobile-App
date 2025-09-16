import { Icon } from "@rneui/themed";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { images } from "../../../assets";
import AppText from "../../components/atoms/AppText";
import AppButton from "../../components/atoms/Button";
import { ErrorModal } from "../../components/atoms/ErrorModal";
import { HookHelper } from "../../helpers";
import { formatVndPrice } from "../../helpers/currencyHelper";
import { useGetNavigation } from "../../helpers/hookHelper";
import useStyles from "./styles";
import { useOrder } from "../../services/order";
import AppHeader from "../../components/atoms/Header";

const ProductItem = (props) => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const styles = useStyles(theme);
  return (
    <View style={styles.productItem}>
      <Image
        source={
          props.product.image ? { uri: props.product.image } : images.product
        }
        style={styles.productImage}
      />
      <View style={styles.quantityContainer}>
        <AppText>{props.quantity}x</AppText>
      </View>

      <View style={{ flex: 1, marginStart: 16 }}>
        <AppText h5>{props.product.name}</AppText>
        <AppText
          body2
          style={{ marginTop: 8, paddingEnd: 50 }}
          numberOfLines={1}
        >
          {props.product.description}
        </AppText>
      </View>

      <AppText style={styles.priceText}>
        {formatVndPrice(props.product.price)}
      </AppText>
    </View>
  );
};

export const OrderDetailScreen = () => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const styles = useStyles(theme);
  const { navigation, route } = useGetNavigation();
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState();
  const [order, setOrder] = useState();
  const { onGetOrderById, onDeleteOrder } = useOrder();
  const idOrder = route.params.orderId;

  const getOrder = async () => {
    const response = await onGetOrderById(idOrder);
    if (response.isSuccessful) {
      setOrder(response.order);
    } else {
      setError({
        title: "Error",
        description: response.error.message,
      });
      setShowError(true);
    }
  };

  const deleteOrder = async () => {
    const response = await onDeleteOrder(idOrder);
    if (response.isSuccessful) {
      navigation.navigate("Home");
    } else {
      setError({
        title: "Error",
        description: response.error.message,
      });
      setShowError(true);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  const tryAgain = () => {
    setShowError(false);
    setError(undefined);
  };
  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={{ position: "absolute", zIndex: 1, left: 0, padding: 10 }}
        >
          <Icon name="chevron-left" size={30} />
        </TouchableOpacity>
        <AppText style={styles.headerTitle}>Order Detail</AppText>
      </View>
      <View style={{ overflow: "hidden", paddingBottom: 10 }}>
        <View style={styles.breakLine} />
      </View> */}
      <AppHeader title={"Order Detail"} shadow />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.body}>
          <AppText style={styles.title}>Status</AppText>
          <AppText style={styles.statusText}>{order?.status}</AppText>
          <Image source={images.progress} style={styles.progress} />
          <View style={styles.rowContainer}>
            <AppText style={styles.statusDetail}>Follow the order</AppText>
            <Icon name="chevron-right" size={24} />
          </View>
        </View>
        <View style={styles.bigLine} />
        <FlatList
          scrollEnabled={false}
          data={order?.order}
          renderItem={({ item }) => <ProductItem {...item} />}
          keyExtractor={(key, index) => index.toString()}
          ItemSeparatorComponent={() => <View style={styles.line} />}
        />

        <View style={styles.line} />

        <View style={styles.infoContainer}>
          <AppText style={styles.infoText}>
            Quantity ({order?.order?.length} items)
          </AppText>
          <AppText subtitle1>{formatVndPrice(order?.totalPayment)}</AppText>
        </View>

        <View style={styles.infoContainer}>
          <AppText style={styles.infoText}>Shipping fee : 1,5 km</AppText>
          <AppText subtitle1>{formatVndPrice(order?.shipPayment)}</AppText>
        </View>

        <View style={styles.infoContainer}>
          <AppText style={styles.infoText}>Voucher</AppText>
          <AppText subtitle1 primary>
            -{formatVndPrice(0)}
          </AppText>
        </View>
        <View style={styles.infoContainer}>
          <AppText style={styles.infoText}>Yummy</AppText>
          <AppText subtitle1 primary>
            -{formatVndPrice(0)}
          </AppText>
        </View>

        <View style={styles.infoContainer}>
          <AppText style={[styles.infoText, { fontWeight: "bold" }]}>
            Total Pament
          </AppText>
          <AppText h5 primary>
            {formatVndPrice(order?.totalPayment + order?.shipPayment)}
          </AppText>
        </View>
        <View style={styles.line} />

        <View style={styles.infoContainer}>
          <AppText style={[styles.infoText, { fontWeight: "bold" }]}>
            Payment Method
          </AppText>
          <View style={styles.cashContainer}>
            <AppText>$</AppText>
          </View>
          <AppText subtitle1>Cash</AppText>
        </View>
        <View style={styles.line} />
        <View style={styles.infoContainer}>
          <AppText style={styles.infoText}>Order code</AppText>
          <AppText subtitle1>{order?.id}</AppText>
        </View>
        <View style={styles.infoContainer}>
          <AppText style={styles.infoText}>Receiver</AppText>
          <AppText subtitle1>{order?.address?.fullName}</AppText>
        </View>
        <View style={styles.infoContainer}>
          <AppText style={styles.infoText}>Phone number</AppText>
          <AppText subtitle1>{order?.address?.phoneNumber}</AppText>
        </View>
        <View style={styles.infoContainer}>
          <AppText style={styles.infoText}>Address</AppText>
          <AppText subtitle1>{order?.address?.address}</AppText>
        </View>

        <AppButton
          title="Cancel order"
          cancel
          buttonStyle={styles.buttonStyle}
          onPress={() => deleteOrder()}
        />
        <ErrorModal
          confirmTitle={"Try again"}
          onConfirm={() => tryAgain()}
          isVisible={showError}
          title={error?.title || ""}
          description={error?.description}
        />
      </ScrollView>
    </View>
  );
};
