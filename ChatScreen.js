import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ChatScreen = (props) => {
  const [messages, setMessages] = useState([
    //  サンプル
    { name: "Aさん", icon: require("./assets/image/icon.png"), text: 'aaaaaaaaaa', isMine: false, date: '2022/11/01', time: ' 12:00' },
    { name: "自分", icon: require("./assets/image/icon.png"), text: 'aaaaaaaaaa', isMine: true, date: '2022/11/01', time: '12:01' },
    { name: "Aさん", icon: require("./assets/image/icon.png"), text: 'aaaaaaaaaa', isMine: false, date: '2022/11/01', time: ' 12:00' },
    { name: "Aさん", icon: require("./assets/image/icon.png"), text: 'aaaaaaaaaa', isMine: false, date: '2022/11/01', time: ' 12:00' },
  ]);
  const [input, setInput] = useState('');
  const [image, setImage] = useState(null);
  const [textFootHeight, setTextFootHeight] = useState(0);

  const scrollViewRef = useRef();

  const sendMessage = () => {
    if (input.trim() !== '' || image !== null) {
      const date = new Date();
      const dateString = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
      setMessages([...messages, { text: input, image: image, isMine: true, date: dateString }]);
      setInput('');
      setImage(null);
    }
  };

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("画像ライブラリへのアクセス許可が必要です！");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }

    setImage(pickerResult.uri);
  };

  useEffect(() => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <View style={styles.body}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => props.navigation.navigate('IconMenu')}>
          <Text style={styles.headerTitle}>まちなか鬼ごっこ</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.backLinkCollar}>
        <TouchableOpacity onPress={() => props.navigation.navigate('ChatHome')}>
          <View style={styles.backLink}>
            <Image style={styles.arrow} source={require('./assets/image/arrow.png')} />
            <Text style={styles.backText}>{props.route.params.data}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.chatView} ref={scrollViewRef}>
        {messages.map((message, index) => (
          <View key={index} style={message.isMine ? styles.myChatIndex : styles.chatIndex}>
            {!message.isMine && <Image style={styles.icon} source={message.icon} />}
            <View>
              <Text style={message.isMine ? styles.myChatName : styles.ChatName}>{message.name}</Text>
              <View style={message.isMine ? styles.myChatTextBox : styles.chatTextBox}>
                {message.text && <Text multiline style={styles.chatText}>{message.text}</Text>}
                {message.image && <Image source={{ uri: message.image }} style={{ width: 200, height: 200 }} />}
              </View>
              <Text style={styles.chatTime}>{message.date} {message.time}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={[styles.textFeed, { height: Math.max(100, textFootHeight + 70) }]}>
          <View style={[image ? styles.imageIndex : styles.textIndex, { height: Math.max(50, textFootHeight + 20) }]}>
          <TouchableOpacity onPress={openImagePickerAsync}>
            <Image style={styles.imageButton} source={require('./assets/image/image.png')} />
            </TouchableOpacity>
            <TextInput
              multiline
              value={input}
              onChangeText={setInput}
              placeholder={image ? "画像を選択中" : "チャットを入力"}
              style={[image ? styles.imageInput : styles.textInput,  { height: Math.max(50, textFootHeight) }]}
              onContentSizeChange={(event) => {
                setTextFootHeight(event.nativeEvent.contentSize.height);
              }}
              editable={image === null} // 画像が選択されていない場合のみ、テキスト入力を許可します
            />
            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
              <Image style={[{ width: "100%" }, { height: "100%" }]} source={require('./assets/image/send.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};


const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#3D3D3D'
  },
  header: {
    height: 101,
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
  },
  backLinkCollar: {
    backgroundColor: "rgba(61, 61, 61, 0.1)",
    marginBottom: 0
  },
  backLink: {
    marginLeft: 9,
    marginTop: 16,
    marginBottom: 15,
    flexDirection: "row",
  },
  arrow: {
    width: 30,
    height: 30,
  },
  backText: {
    marginTop: "auto",
    marginBottom: "auto",
    marginLeft: "10px",
    width: "234px",
    height: "55px",
    color: "#FFF",
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: 500
  },
  scrollView: {
    flex: 1,
    flexGrow: 1,
  },
  chatIndex: {
    flexDirection: "row",
    marginBottom: 20,

  },
  myChatIndex: {
    flexDirection: "row-reverse",
    marginBottom: 20,
  },
  ChatName: {
    color: "#aaa",
    fontSize: 14,
    marginLeft: 10,
    marginTop: 8
  },
  myChatName: {
    display: "none"
  },
  chatTextBox: {
    borderRadius: 15,
    backgroundColor: "#D9D9D9",
    padding: 3,
    overflow: "hidden",
    flexShrink: 1
  },
  myChatTextBox: {
    marginRight: 10,
    borderRadius: 15,
    backgroundColor: "#FFF",
    padding: 3,
    overflow: "hidden",
    flexShrink: 1
  },
  chatText: {
    flex: 1,
    flexDirection: 'row',
    maxWidth: 206,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 14,
    marginRight: 14,
    fontSize: 20,
  },
  chatTime: {
    color: "#aaa",
    fontSize: 14,
    marginLeft: 10,
    marginTop: 1
  },
  textFeed: {
    marginTop: 'auto',
    height: 79,
    flexShrink: 0,
    backgroundColor: "#2A2A2A"
  },
  icon: {
    width: "18%",
    height: "100%",
    marginLeft: 17,
  },  
  textIndex: {
    marginTop: 10,
    marginLeft: "auto",
    marginRight: "auto",
    flexDirection: "row",
    width: 356,
    backgroundColor: "#8A8A8A",
    borderRadius: 50,
  },
  imageIndex: {
    marginTop: 10,
    marginLeft: "auto",
    marginRight: "auto",
    flexDirection: "row",
    width: 356,
    backgroundColor: "#555",
    borderRadius: 50,
  },
  imageButton: {
    marginTop: "auto",
    marginBottom: "auto",
    marginLeft: 5,
    width: 45,
    height: 45
  },
  textInput: {
    display: "flex",
    marginLeft: 5,
    marginTop: 6,
    marginBottom: 6,
    width: 257,
    flexDirection: "column",
    justifyContent: "center",
    flexShrink: 0,
    color: "#fff",
    fontSize: 22
  },
  imageInput: {
    display: "flex",
    marginLeft: 5,
    marginTop: 6,
    marginBottom: 6,
    width: 257,
    flexDirection: "column",
    justifyContent: "center",
    flexShrink: 0,
    color: "#fff",
    fontSize: 22
  },
  sendButton: {
    marginTop: "auto",
    marginBottom: "auto",
    marginLeft: 0,
    width: 35,
    height: 35
  }
});

export default ChatScreen;
