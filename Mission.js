import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import MissionReport from './MissionReport';
import Menu from './Menu';


const Mission = (props) => {
  const [missions, setMissions] = useState([]);
  const [selectedMission, setSelectedMission] = useState(null);
  const [showMissionReport, setShowMissionReport] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const url = `http://35.174.149.4/get_mission_list/${global.eventId}/0`;
        const response = await fetch(url, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setMissions(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect will run once after the initial render

  const handlePress = (mission) => {
    // クリックされたミッションの情報をステートに設定
    setSelectedMission(mission);
    // MissionReportを表示するためにステートを更新
    setShowMissionReport(true);
  
    // 遷移先のページに詳細情報を渡す
    props.navigation.navigate('MissionReport', { mission_id: mission.mission_id });
    
  };

  const handleGoBack = () => {
    // 戻るボタンがクリックされたときの処理
    // MissionReportを非表示にし、選択されたミッション情報をリセット
    setShowMissionReport(false);
    setSelectedMission(null);
  };

  return (
    <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => props.navigation.navigate('Map')}>
                    <Text style={styles.headerTitle}>まちなか鬼ごっこ</Text>
                </TouchableOpacity>
            </View>
            {/* <TouchableOpacity style={styles.backLink} onPress={() => props.navigation.navigate('Map')}>
                <Image style={styles.arrow} source={require('./assets/image/arrow.png')} />
                <Text style={styles.backText}>戻る</Text>
            </TouchableOpacity> */}
      <Text style={styles.title}>ミッション</Text>
      {/* ミッション一覧 */}
      {!showMissionReport && (
        <ScrollView style={styles.missionList}>
          {missions.map((mission, index) => (
            <React.Fragment key={mission.id}>
              <TouchableOpacity
                style={styles.missionItem}
                onPress={() => handlePress(mission)}
              >
                <Text style={styles.missionNumber}>{`No.${mission.mission_class === 0 ? '1' : index+1}`}</Text>
                <View style={styles.missionDetails}>
                  <Text style={styles.missionText}>{mission.mission_title}</Text>
                  <Text style={styles.missionReward}>{` ${mission.reward}`}</Text>
                </View>
              </TouchableOpacity>
              {index < missions.length - 1 && <View style={styles.divider} />}
            </React.Fragment>
          ))}
        </ScrollView>
      )}

      <Menu />
    </View>
  );
}

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
        fontWeight: 'bold',
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
    missionList: {
        marginTop: 100,
        paddingHorizontal: 10,
        marginBottom: 100,
        height: '75%',
    },
    missionItem: {
        backgroundColor: '#3D3D3D',
        borderRadius: 8,
        padding: 15,
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    missionNumber: {
        color: '#FFFFFF',
        fontSize: 30,
        marginRight: 10,
    },
    missionDetails: {
        flex: 1,
        flexDirection: 'column',
    },
    missionText: {
        color: '#FFFFFF',
        fontSize: 22,
    },
    missionReward: {
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
      top: 120,
      left: 20,
      flexDirection: 'row',
      alignItems: 'center',
      zIndex: 1,
    },
    backButtonImage: {
      width: 30,
      height: 30,
      resizeMode: 'contain',
    },
    backButtonText: {
      color: '#FFFFFF',
      marginLeft: 5,
    },
  });
  
export default Mission;