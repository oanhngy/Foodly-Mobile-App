import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";

import { Icon } from "@rneui/themed";
import AppText from "../../components/atoms/AppText";
import { ErrorModal } from "../../components/atoms/ErrorModal";
import { HookHelper } from "../../helpers";
import { useAppSelector, useGetNavigation } from "../../helpers/hookHelper";
import useStyles from "./styles";


export const PersonalInfoScreen = () => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const { navigation } = useGetNavigation();
  const styles = useStyles(theme);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState();
  const authenticationReducer = useAppSelector(
    (state) => state.AuthenticationReducer
  );
  const userInfo = authenticationReducer.userInfo;
  const tryAgain = () => {
    setShowError(false);
    setError(undefined);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}
        style={{ position: "absolute", zIndex: 1, left: 0, padding: 10 }}
        >
          <Icon
            name="chevron-left"
            size={30}
          />
        </TouchableOpacity>
        <AppText style={styles.headerTitle}>Personal Information</AppText>

      </View>
      <View style={{ overflow: "hidden", paddingBottom: 10 }}>
        <View style={styles.breakLine} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.itemInfo}>
          <View style={{ flex: 1 }}>
            <AppText style={styles.infoTitle}>Name</AppText>
            <AppText style={styles.info}>{userInfo.fullName}</AppText>
          </View>
          <Icon name="chevron-right" size={30} color="#747783" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.itemInfo}>
          <View style={{ flex: 1 }}>
            <AppText style={styles.infoTitle}>Email</AppText>
            <AppText style={styles.info}>{userInfo.email}</AppText>
          </View>
          <Icon name="chevron-right" size={30} color="#747783" />
        </TouchableOpacity>


        <TouchableOpacity style={styles.itemInfo}>
          <View style={{ flex: 1 }}>
            <AppText style={styles.infoTitle}>Date of birth</AppText>
            <AppText style={styles.info}>07/03/2003</AppText>
          </View>
          <Icon name="chevron-right" size={30} color="#747783" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.itemInfo}>
          <View style={{ flex: 1 }}>
            <AppText style={styles.infoTitle}>Gender</AppText>
            <AppText style={styles.info}>Male</AppText>
          </View>
          <Icon name="chevron-right" size={30} color="#747783" />
        </TouchableOpacity>



      </ScrollView>
      <ErrorModal
        confirmTitle={"Try again"}
        onConfirm={() => tryAgain()}
        isVisible={showError}
        title={error?.title || ""}
        description={error?.description}
      />
    </View>
  );
};
