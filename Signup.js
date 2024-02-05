import React, { useState } from 'react';
import { View, TouchableOpacity, Text, TextInput, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Signup = (props) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [confirmSecureTextEntry, setConfirmSecureTextEntry] = useState(true);

  const handleSignUpPress = async () => {
    try {
      if (userName && email && password && confirmPassword) {
        if (password === confirmPassword) {
          // 新規登録の処理を実行する
          const dataToSend = {
            name: userName,
            email: email,
            password: password,
            tel: '1',
            affiliation: 'a',
            birth: "2002/12/2",
            registration_date: "2002/12/2",
          };
          

          const token = "取得したトークン";

          const response = await fetch('http://35.174.149.4/api/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const responseData = await response.json();

          // ユーザーIDを取得
          const userId = responseData.user_id;
          global.userId = responseData.user_id;
          global.userName = responseData.user_name;
          console.log('User ID:', userId);
          // 登録成功の場合の処理
          Alert.alert('アカウントが登録されました！');
          props.navigation.navigate('IconMenu');
        } else {
          // パスワードが一致しない場合のエラー処理
          Alert.alert('パスワードが一致しません。');
        }
      } else {
        // 入力が不足している場合のエラー処理
        Alert.alert('全ての項目を入力してください。');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const toggleConfirmSecureTextEntry = () => {
    setConfirmSecureTextEntry(!confirmSecureTextEntry);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => props.navigation.navigate('LoginSignup')}>
            <Text style={styles.headerTitle}>まちなか鬼ごっこ</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>新規登録</Text>
          <TextInput
            style={styles.input}
            placeholder="ユーザ名"
            onChangeText={(text) => setUserName(text)}
            value={userName}
          />
          <TextInput
            style={styles.input}
            placeholder="メールアドレス"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="パスワード"
              secureTextEntry={secureTextEntry}
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
            <TouchableOpacity onPress={toggleSecureTextEntry}>
              <FontAwesome name={secureTextEntry ? 'eye-slash' : 'eye'} size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="パスワード確認"
              secureTextEntry={confirmSecureTextEntry}
              onChangeText={(text) => setConfirmPassword(text)}
              value={confirmPassword}
            />
            <TouchableOpacity onPress={toggleConfirmSecureTextEntry}>
              <FontAwesome name={confirmSecureTextEntry ? 'eye-slash' : 'eye'} size={24} color="black" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSignUpPress}
          >
            <Text style={styles.buttonText}>アカウント登録</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#3D3D3D'
  },
  header: {
    height: "11%",
    flexShrink: 0,
    backgroundColor: "#222",
  },
  headerTitle: {
    marginTop: 50,
    marginRight: "auto",
    marginLeft: 10,
    flexShrink: 0,
    color: "#fff",
    textAlign: 'center',
    fontSize: 36,
    fontWeight: "bold",
    marginHorizontal: 0,
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 70,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 80,
    marginBottom: 40,
    color: 'white',
  },
  input: {
    backgroundColor: '#8A8A8A',
    borderRadius: 8,
    padding: 15,
    width: '80%',
    marginBottom: 20,
    color: 'white',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8A8A8A',
    borderRadius: 8,
    padding: 15,
    width: '80%',
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    color: 'white',
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    width: '40%',
    alignItems: 'center',
    marginBottom: 40,
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
  },
});

export default Signup;
