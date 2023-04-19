import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import React, {useState} from 'react';
import {useStripe} from '@stripe/stripe-react-native';
const Payment = () => {
  const stripe = useStripe();
  const [name, setName] = useState('');
  const subscribe = async () => {
    try {
      const res = await fetch('http://10.0.2.2:8080/pay', {
        method: 'POST',
        body: JSON.stringify({name}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(res);
      const data = await res.json();
      if (!res.ok) return alert(data.message);
      const clientSecret = data.clientSecret;
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: 'Dhiraj Jaiswal',
      });
      if (initSheet.error) return alert(initSheet.error.message);
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret,
      });
      if (presentSheet.error) return alert(presentSheet.error.message);
      alert('payment completed');
    } catch (error) {
      console.log(error);
      alert('try after sometime');
    }
  };
  return (
    <View
      style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
      <TextInput
        value={name}
        onChangeText={text => setName(text)}
        placeholder="Name"
        style={styles.textInput}
      />
      <Button color={'red'} onPress={subscribe} title="Subscribe" />
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  textInput: {
    width: '80%',
    padding: 10,
    fontSize: 20,
    color: '#000',
    borderWidth: 1,
    borderColor: '#000',
    marginVertical: 15,
  },
});
