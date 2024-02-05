import React,{  useState } from 'react';
import { View, TouchableOpacity, Text, TextInput, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const handleLoginPress = async () => {
    try {
      const dataToSend = {
        email: email,
        password: password,
        // 他にも必要なデータがあれば追加
      };
      const token = "取得したトークン";

      const response = await fetch('http://35.174.149.4/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log(responseData);

      // ユーザーIDを取得
      if (responseData.user_id) {
        // ログイン成功の場合の処理
        // Alert.alert('ログイン成功！');
        global.userId = responseData.user_id;
        global.userName = responseData.user_name;
        
        // 他の処理をここに追加することもできます
        props.navigation.navigate('IconMenu');
      } else {
        // 入力が不足している場合のエラー処理
        Alert.alert('メールアドレスとパスワードを入力してください。');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const handleCancel = () => {
    // キーボードを閉じる
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleCancel}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => props.navigation.navigate('LoginSignup')}>
          <Text style={styles.headerTitle}>まちなか鬼ごっこ</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
          <Text style={[styles.title, { textAlign: 'left', marginLeft: 10 }]}>ログイン</Text>
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
          <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
            <Text style={styles.buttonText}>ログイン</Text>
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
    // alignItems: 'center',
    backgroundColor: '#3D3D3D',
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
    fontSize: 36,
    textAlign: 'center',
    fontWeight: 400,
    fontWeight: 'bold',

    marginHorizontal: 0, //バナーの余白０
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
    marginBottom: 40,
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
    width: '30%',
    alignItems: 'center',
    marginBottom: 40,
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
  },
});

export default Login;