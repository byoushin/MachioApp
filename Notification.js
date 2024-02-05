import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import Menu from './Menu';


const Notification = (props) => {
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://35.174.149.4/get_notification_list', {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setNotification(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect will run once after the initial render

  const handlePress = (notification) => {
    alert(` ${notification.title}/n${notification.sentence} `);
    // ここでデータベースからミッションの詳細データを取得する処理を追加することができます
  };

  return (
    <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => props.navigation.navigate('Map')}>
                    <Text style={styles.headerTitle}>まちなか鬼ごっこ</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.backLink} onPress={() => props.navigation.navigate('Map')}>
                <Image style={styles.arrow} source={require('./assets/image/arrow.png')} />
                <Text style={styles.backText}>戻る</Text>
            </TouchableOpacity>
      <Text style={styles.title}>通知</Text>
      {/* ミッション一覧 */}
      <ScrollView style={styles.notificationList}>
        {notification.map((notificationItem, index) => (
          <React.Fragment key={notificationItem.notification_id}>
            <TouchableOpacity
              style={styles.notificationItem}
              onPress={() => handlePress(notificationItem)}
            >
              <View style={styles.notificationDetails}>
                <Text style={styles.sentence}>{notificationItem.title}</Text>
              </View>
            </TouchableOpacity>
            {index < notification.length - 1 && <View style={styles.divider} />}
          </React.Fragment>
        ))}
      </ScrollView>
      <Menu />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3D3D3D',
        justifyContent: 'flex-start'
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
    },
    backLink: {
        marginLeft: 9,
        marginTop: 16,
        marginBottom: 15,
        flexDirection: "row",
    },
    arrow: {
        width: "8%",
        height: "auto",
    },
    backText: {
        marginTop: "auto",
        marginBottom: "auto",
        color: "#FFF",
        fontSize: 20,
        fontStyle: "normal",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: -60,
        color: 'white',
        textAlign: 'center', // 追加
    },
    banner: {
        backgroundColor: '#000000',
        padding: 10,
        paddingTop: 60,
    },
    bannerText: {
        color: '#FFFFFF',
        fontSize: 24,
    },
    notificationList: {
        marginTop: 100,
        paddingHorizontal: 10,
        marginBottom: 100,
        height: '75%',
    },
    notificationItem: {
        backgroundColor: '#3D3D3D',
        borderRadius: 8,
        padding: 15,
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    notificationNumber: {
        color: '#FFFFFF',
        fontSize: 30,
        marginRight: 10,
    },
    notificationDetails: {
        flex: 1,
        flexDirection: 'column',
    },
    sentence: {
        color: '#FFFFFF',
        fontSize: 22,
    },
    notificationReward: {
        color: '#FFFFFF',
        fontSize: 18,
        textAlign: 'right',
    },
    divider: {
        height: 1,
        backgroundColor: '#FFFFFF',
        marginVertical: 8, // 余白を狭くしました
    },
    backButton: {
        position: 'absolute',
        top: 120, // 少し下に配置しました
        left: 10,
        zIndex: 1,
        flexDirection: 'row', // 水平にアイコンとテキストを配置するために追加
        alignItems: 'center', // アイコンとテキストを中央揃えにするために追加
    },
    backButtonImage: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    backButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        marginLeft: 5,
    },
    menuBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 20,
        backgroundColor: '#000000',
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    menuButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    imageButton: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
});
export default Notification;