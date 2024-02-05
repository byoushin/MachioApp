import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, Alert } from 'react-native';
const LoginSignup = (props) => {
  const handleLoginPress = () => {
    // Alert.alert('ログインボタンが押されました！');
    // 他の処理をここに追加することもできます
    props.navigation.navigate('Login');
  };

  const handleSignUpPress = () => {
    // Alert.alert('新規登録ボタンが押されました！');
    // 他の処理をここに追加することもできます
    props.navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity>
                        <Text style={styles.headerTitle}>まちなか鬼ごっこ</Text>
                    </TouchableOpacity>
                </View>
      <View style={styles.contentContainer}>
        <Image source={require('./assets/image/test.png')} style={styles.logo} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleLoginPress}
          >
            <Text style={styles.buttonText}>ログイン</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.button}
            onPress={handleSignUpPress}
          >
            <Text style={styles.buttonText}>新規登録</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    // alignItems: 'center',
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
    marginHorizontal: 0, //バナーの余白０
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 70, //ロゴとボタン上下位置
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 60,
  },
  buttonContainer: {
    width: '80%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
  },
});

export default LoginSignup;