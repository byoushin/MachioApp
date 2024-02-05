import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect, useRef, Component, useContext } from 'react'

const MissionCheck = (props) => {
    const [missionlist, setMissionlist] = useState([
        // テスト画像
        { number: 1, team: "A", image: require('./assets/image/test.png') },
        { number: 53, team: "マルフォイ", image: require('./assets/image/foi.png') },
    ])

    // missionlistが空でない場合は最後の要素を取得し、空の場合はnullを設定する
    let lastElement = missionlist.length > 0 ? missionlist[missionlist.length - 1] : null;

    // 成功ボタンが押されたときに呼び出される関数
    const clear = () => {
        Alert.alert('成功');
    };

    // 失敗ボタンが押されたときに呼び出される関数
    const fail = () => {
        Alert.alert('失敗');
    };


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity>
                    <Text style={styles.headerTitle}>まちなか鬼ごっこ</Text>
                </TouchableOpacity>
            </View>
            {/* <TouchableOpacity style={styles.backLink}>
                <Image style={styles.arrow} source={require('./assets/image/arrow.png')} />
                <Text style={styles.backText}>戻る</Text>
            </TouchableOpacity> */}
            <View style={styles.contentContainer}>
                {lastElement && (
                    <>
                        <Text style={styles.teams}>No.{lastElement.number} チーム{lastElement.team}</Text>
                        <Image style={styles.image} source={lastElement.image} />
                    </>
                )}
            </View>
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.buttonIndex} onPress={clear}>
                    <Text style={styles.buttonText}>達成</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonIndex} onPress={fail}>
                    <Text style={styles.buttonText}>失敗</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

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
    teams: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
        color: 'white',
    },
    image: {
        width: 320,
        height: 320,
        marginTop: 5,
        marginBottom: 10,
    },
    buttons: {
        flexDirection: "row",
        marginRight: "auto",
        marginLeft: "auto"
    },
    buttonIndex: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 15,
        width: '30%',
        alignItems: 'center',
        marginBottom: 40,
        marginLeft: 10,
        marginRight: 10
    },
    buttonText: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',

    },
});
export default MissionCheck;