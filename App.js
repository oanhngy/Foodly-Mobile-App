// import React, { useEffect } from "react";

// import { Provider } from "react-redux";
// import configureStore from "./src/stores/configurations/configureStore";
// import { PersistGate } from "redux-persist/integration/react";
// import { MainApp } from "./src/navigation/MainApp";
// import { setJSExceptionHandler } from "react-native-exception-handler";
// import { LoadingProvider } from "./src/helpers/loadingHelper";
// import { Alert } from "react-native";

// const errorHandler = (e, isFatal) => {
//   console.log(e, isFatal);
//   if (isFatal) {
//     Alert.alert(
//       "Error",
//       "There is a problem with app, please contact us for more information",
//       [{ text: "Close" }]
//     );
//   } else {
//   }
// };

// setJSExceptionHandler(errorHandler, true);
// const App = () => {
//   return (
//     <Provider store={configureStore().store}>
//       <PersistGate loading={null} persistor={configureStore().persistor}>
//         <LoadingProvider>
//           <MainApp />
//         </LoadingProvider>
//       </PersistGate>
//     </Provider>
//   );
// };

// export default App;

import React from "react";

import { Provider } from "react-redux";
import configureStore from "./src/stores/configurations/configureStore";
import { PersistGate } from "redux-persist/integration/react";
import { MainApp } from "./src/navigation/MainApp";
import { setJSExceptionHandler } from "react-native-exception-handler";
import { LoadingProvider } from "./src/helpers/loadingHelper";
import { Alert, Text, View } from "react-native";

// ✅ Import biến từ .env để test
import { API_KEY } from "@env";

const errorHandler = (e, isFatal) => {
  console.log(e, isFatal);
  if (isFatal) {
    Alert.alert(
      "Error",
      "There is a problem with app, please contact us for more information",
      [{ text: "Close" }]
    );
  } else {
  }
};

setJSExceptionHandler(errorHandler, true);

const App = () => {
  return (
    <Provider store={configureStore().store}>
      <PersistGate loading={null} persistor={configureStore().persistor}>
        <LoadingProvider>
          {/* ✅ Test hiển thị API_KEY từ .env */}
          <View style={{ marginTop: 40, padding: 20 }}>
            <Text>Test API Key from .env: {API_KEY}</Text>
          </View>
          {/* ✅ End test: Xóa đoạn View/Text này sau khi xác nhận hiển thị đúng */}
          
          <MainApp />
        </LoadingProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
