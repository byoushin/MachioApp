import React, { useState } from 'react';
import { View, TouchableOpacity, Text, TextInput, StyleSheet, Alert, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Invitecode = (props) => {
    const [invitationCode, setInvitationCode] = useState('');

    const handleJoin = async () => {
        // ここで招待コードの確認などの処理を追加する
        // 例: バックエンドとの通信、コードの妥当性の検証など
        try {
            const dataToSend = {
                event_id: invitationCode,
                user_id: global.userId,
                // 他にも必要なデータがあれば追加
              };
            const response = await fetch('http://35.174.149.4/participation', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });
    
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            console.log(data);
            global.participationId = data.participation.id;
            global.teamId = data.participation.team_id;
            global.eventId = data.participation.event_id;
            global.score = data.teamParticipation.score;

            // setMissions(data);
            // console.log('Error occurred at this point:', error);

          } catch (error) {
            console.error('Error fetching data:', error);
          }
        // 仮でアラートを表示する例
        if (invitationCode.trim() !== '') {
            props.navigation.navigate('Map');
        } else {
            Alert.alert('エラー', 'コードを入力してください。');
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('IconMenu')}>
                        <Text style={styles.headerTitle}>まちなか鬼ごっこ</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.backLink} onPress={() => props.navigation.navigate('IconMenu')}>
                    <Image style={styles.arrow} source={require('./assets/image/arrow.png')} />
                    <Text style={styles.backText}>戻る</Text>
                </TouchableOpacity>
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>コード入力</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="コードを入力してください"
                        onChangeText={setInvitationCode}
                        value={invitationCode}
                    />
                    <TouchableOpacity style={styles.joinButton} onPress={handleJoin}>
                        <Text style={styles.joinButtonText}>参加</Text>
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
    },
    backLink: {
        flexDirection: "row",
        marginTop: 16,
        marginLeft: 9,
        marginBottom: 15,
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
    contentContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 30,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        left: 5,
        top: -70,
        padding: 10,
    },
    backButtonIcon: {
        width: 24,
        height: 24,
        tintColor: 'white',
        marginRight: 5,
    },
    backButtonText: {
        color: 'white',
        fontSize: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
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
    joinButton: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 15,
        width: '70%',
        alignItems: 'center',
    },
    joinButtonText: {
        color: 'black',
        fontSize: 20,
    },
});

export default Invitecode;