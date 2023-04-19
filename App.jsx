import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {StripeProvider} from '@stripe/stripe-react-native';
import Payment from './components/Payment';

const App = () => {
  return (
    <View style={styles.container}>
      <StripeProvider publishableKey="pk_test_51My5mQSB1dpi75S4DhSeVZNOUL37xVfBmw20uIHvoPxnch3cAR7xkfSNcn5GTBjapD1LHTsgKybbAq8QooXlZiyc0073YhwCFW">
        <Payment />
      </StripeProvider>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
