import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Table, Rows } from 'react-native-table-component';
import YourComponent from './function/function';
// import SendLocation from './function/SendLocation';
import Menu from './Menu';

let flag = true;
const DigitalDateTime = () => {
  const [time, setTime] = useState('');
  const [currentMinute, setCurrentMinute] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      let d = new Date();
      let hour = d.getHours().toString().padStart(2, '0');
      let minute = d.getMinutes().toString().padStart(2, '0');
      let seconds = d.getSeconds().toString().padStart(2, '0');
      setTime(hour + ':' + minute + ':' + seconds);

      // 分が変わったときに currentMinute を更新
      if (minute !== currentMinute) {
        setCurrentMinute(minute);
      }
    }, 1000);

    // クリーンアップ関数
    return () => clearInterval(intervalId);
  }, [currentMinute]);

  return (
    <View>
      <Text style={{ color: '#fff', fontSize: 30 }}>🔔{time}</Text>
    </View>
  );
};


const Map = (props) => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [message, setMessage] = useState('位置情報取得中・・・');
  const [gameData, setGameData] = useState(null);
  const [currentMinute, setCurrentMinute] = useState(''); // ここを追加
  const [renderedComponent, setRenderedComponent] = useState(<YourComponent />);

  // YourComponent を15分ごとに更新
  useEffect(() => {
    console.log('parseInt(currentMinute) % 15');
    console.log(parseInt(currentMinute) % 15);
    console.log(currentMinute);

    if (parseInt(currentMinute) % 15 === 0) {
      console.log("Updating YourComponent...");
      setRenderedComponent(<YourComponent />);
    }
  }, [currentMinute]);

  const sendLocationToServer = async (lat, long) => {
    try {
      const dataToSend = {
        team_id: global.teamId,
        latitude: lat,
        longitude: long,
        // 他にも必要なデータがあれば追加
      };

      // console.log(dataToSend);
      const response = await fetch('http://35.174.149.4/up_location', {
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
      // console.log(responseData);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setMessage('位置情報の取得が許可されていません。');
          return;
        }
  
        const location = await Location.getCurrentPositionAsync({});
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
  
        const locationIntervalId = setInterval(async () => {
          const d = new Date();
          const seconds = d.getSeconds().toString().padStart(2, '0');
          if (seconds === '00' && flag) {
            // sendLocationToServer 関数の実装が必
            // console.log("このまま奪って隠して忘れたい");
            sendLocationToServer(location.coords.latitude, location.coords.longitude);
            flag = false;
          } else if (seconds === '01' && !flag) {
            flag = true;
          }
        }, 1000);
  
        // クリーンアップ関数
        return () => {
          clearInterval(locationIntervalId);
        };
      } catch (error) {
        console.error(error);
        // エラーが発生した場合の適切な処理を追加
      }
    };
  
    fetchData();
  }, []); // [latitude, longitude] を依存リストから削除
  

  const tableData = [['￥', global.score]];

  if (latitude !== null && longitude !== null) {
    return (
      <View style={styles.container}>
        {/* <SendLocation /> */}
        <View style={styles.header}>
          <TouchableOpacity>
            <Text style={styles.headerTitle}>まちなか鬼ごっこ</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.timer}>
          <Text style={styles.timertext}><DigitalDateTime /></Text>
        </View>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.02922,
            longitudeDelta: 0.02521,
          }}
          showsUserLocation={true}
        >
          {renderedComponent}
        </MapView>
        <View style={styles.middole}></View>
        <Table style={styles.textbox}>
          <Rows data={tableData} textStyle={styles.tableText} />
        </Table>
        <View style={styles.middole}></View>
        <View style={styles.middole}></View>
        <Menu />
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1, justifyContent: 'flex-start', backgroundColor: '#333', }}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Text style={styles.headerTitle}>まちなか鬼ごっこ</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.messages}>{message}</Text>
      </View>
    );
  }
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333'
  },
  map: {
    flex: 5,
    width: '80%',
    alignSelf: 'center',
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
  text: {
    color: '#fff',
    fontSize: 20,
  },
  timertext: {
    color: '#fff',
    fontSize: 30,

  },
  textbox: {
    flex: 3,
    backgroundColor: '#ddd',
    width: '80%',
    height: '80%',
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 30,
  },
  timer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  middole: {
    flex: 1,
  },
  tableText: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    paddingTop: 30,
  },
  fotter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  button: {
    width: '25%',
    height: 100,
    borderRadius: 10,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messages: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: "auto",
    marginBottom: "auto",
    marginLeft: "auto",
    marginRight: "auto",
    color: 'white',
  }
});

export default Map;
