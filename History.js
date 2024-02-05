import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert } from 'react-native';

const History = (props) => {
    // サンプルの参加履歴データ
    const joinHistoryData = [
        { id: '1', date: '2023-11-01', role: 'オニ', result: '検挙数: 2人', rank: '3位' },
        { id: '2', date: '2023-11-05', role: '逃走者', result: '賞金: ￥10,000,000', rank: '1位' },
        { id: '3', date: '2023-11-10', role: 'オニ', result: '検挙数: 1人', rank: '4位' },
        { id: '4', date: '2023-11-15', role: '逃走者', result: '賞金: ￥5,000,000', rank: '2位' },
        { id: '5', date: '2023-11-20', role: 'オニ', result: '検挙数: 3人', rank: '5位' },
        { id: '6', date: '2023-11-25', role: '逃走者', result: '賞金: ￥8,000,000', rank: '2位' },
        { id: '7', date: '2023-11-30', role: 'オニ', result: '検挙数: 1人', rank: '3位' },
        { id: '8', date: '2023-12-05', role: '逃走者', result: '賞金: ￥12,000,000', rank: '1位' },
    ];

    const renderJoinItem = ({ item }) => {
        let rankImage;
        switch (item.rank) {
            // 画像もらってないので仮アイコンで
            case '1位':
                rankImage = require('./assets/image/rank1.png');
                break;
            case '2位':
                rankImage = require('./assets/image/rank2.png');
                break;
            case '3位':
                rankImage = require('./assets/image/rank3.png');
                break;
            default:
                rankImage = null;
                break;
        };

        return (
            <View style={styles.joinItem}>
                <Text style={styles.date}>{item.date}</Text>
                <View style={styles.resultContainer}>
                    <Text style={styles.role}>{item.role}</Text>
                    <Text style={styles.resultText}>{item.result}</Text>
                    <Text style={styles.rank}>{item.rank}</Text>
                    {rankImage && <Image source={rankImage} style={styles.rankImage} />}
                </View>
            </View>
        );
    };

    return (
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

                <Text style={styles.title}>参加履歴</Text>
                <FlatList
                    data={joinHistoryData}
                    keyExtractor={(item) => item.id}
                    renderItem={renderJoinItem}
                    style={styles.joinList}
                />
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
      marginHorizontal: 0, //バナーの余白０
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
        marginTop: 30,
        marginBottom: 30,
        height: '75%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
        color: 'white',
    },
    joinList: {
        width: '80%',
    },
    joinItem: {
        backgroundColor: '#333333',
        borderRadius: 8,
        padding: 15,
        marginVertical: 10,
        borderWidth: 1,         // 白い枠の幅
        borderColor: 'white',  // 白い枠の色
    },
    date: {
        fontSize: 18,
        color: 'white',
        marginBottom: 10,
    },
    resultContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    rankImage: {
        width: 20,
        height: 20,
        position: 'absolute',
        top: -10,
        right: -14,
        transform: [{ rotate: '30deg' }], // 45度回転
    },

    role: {
        fontSize: 18,
        color: 'white',
    },
    resultText: {
        fontSize: 18,
        color: 'white',
    },
    rank: {
        fontSize: 28,
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 10,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        left: 10,
        top: -60,
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
});

export default History;
