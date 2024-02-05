import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useRef, Component, useContext } from 'react'

const ChatHome = (props) => {
    const [chatTops, setChatTops] = useState([
        //  サンプル
        { iconimage: require('./assets/image/torokko_trolley_rail_businesswoman.png'), name: 'まちこ', message: '頑張りましょう！', date: '2022/11/01', time: '12:01', bell: 1 },
        { iconimage: require('./assets/image/yaruki_moeru_man.png'), name: 'まちた', message: 'うおおおおおおおおおおおおおおおおおおおおおお', date: '2022/12/1', time: '12:01', bell: 0 },
        { iconimage: require('./assets/image/torokko_trolley_rail_businesswoman.png'), name: 'まちこ', message: '頑張りましょう！', date: '2022/11/01', time: '12:01', bell: 1 },
        { iconimage: require('./assets/image/yaruki_moeru_man.png'), name: 'まちた', message: 'うおおおおおおおおおおおおおおおおおおおおおお', date: '2022/12/1', time: '12:01', bell: 0 },
        { iconimage: require('./assets/image/torokko_trolley_rail_businesswoman.png'), name: 'まちこ', message: '頑張りましょう！', date: '2022/11/01', time: '12:01', bell: 1 },
        { iconimage: require('./assets/image/yaruki_moeru_man.png'), name: 'まちた', message: 'うおおおおおおおおおおおおおおおおおおおおおお', date: '2022/12/1', time: '12:01', bell: 0 },
        { iconimage: require('./assets/image/torokko_trolley_rail_businesswoman.png'), name: 'まちこ', message: '頑張りましょう！', date: '2022/11/01', time: '12:01', bell: 1 },
        { iconimage: require('./assets/image/yaruki_moeru_man.png'), name: 'まちた', message: 'うおおおおおおおおおおおおおおおおおおおおおお', date: '2022/12/1', time: '12:01', bell: 0 },
        { iconimage: require('./assets/image/torokko_trolley_rail_businesswoman.png'), name: 'まちこ', message: '頑張りましょう！', date: '2022/11/01', time: '12:01', bell: 1 },
        { iconimage: require('./assets/image/yaruki_moeru_man.png'), name: 'まちた', message: 'うおおおおおおおおおおおおおおおおおおおおおお', date: '2022/12/1', time: '12:01', bell: 0 },

    ])

    return (
        <View style={styles.body}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => props.navigation.navigate('IconMenu')}>
                    <Text style={styles.headerTitle}>まちなか鬼ごっこ</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.backLink} onPress={() => props.navigation.navigate('IconMenu')}>
                <Image style={styles.arrow} source={require('./assets/image/arrow.png')} />
                <Text style={styles.backText}>戻る</Text>
            </TouchableOpacity>
            <ScrollView>
                {chatTops.map((chatTop, index) => (
                    <TouchableOpacity key={index} onPress={() => props.navigation.navigate('ChatScreen', { data: chatTop.name })} >
                        <View style={styles.chatSelect}>
                            <Image style={styles.icon} source={chatTop.iconimage} />
                            <View style={styles.chatInfo}>
                                <View style={styles.chatData}>
                                    <Text style={styles.userName} numberOfLines={1}>{chatTop.name}</Text>
                                    <Text style={styles.chatTime}>{chatTop.date} {chatTop.time}</Text>
                                </View>
                                <Text style={styles.chatText} numberOfLines={1}>{chatTop.message}</Text>
                            </View>
                            <View style={chatTop.bell > 0 ? styles.chatBell : styles.notChatBell}>
                                <Text style={styles.chatCount}>{chatTop.bell}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#3D3D3D',
        // fontFamily: "SourceHanSans"
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
        // fontFamily: "NicoKakuv2",
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
    chatSelect: {
        flex: 1,
        marginLeft: 14,
        marginRight: 14,
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#DEDEDE"
    },

    icon: {
        width: "20%",
        height: "100%",
        flexShrink: 0,
    },
    chatInfo: {
        flexDirection: 'column'
    },
    chatData: {
        marginTop: 10,
        flexDirection: 'row'
    },
    userName: {
        display: "flex",
        marginRight: 0,
        width: "37%",
        color: "#FFF",
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "bold",
        verticalAlign: "middle"
    },
    chatTime: {
        marginRight: 1,
        marginLeft: "auto",
        marginBottom: 15,
        color: "#FFF",
        textAlign: "right",
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "bold",
    },
    chatText: {
        width: 241,
        // width: "70%",
        height: 28,
        color: "rgba(255, 255, 255, 0.80)",
        fontSize: 18,
        fontStyle: "normal",
        verticalAlign: "middle"
    },
    notChatBell: {
        display: "none"
    },
    chatBell: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 6.5,
        marginRight: 6.5,
        marginTop: 20,
        // width: 34,
        height: "50%",
        borderRadius: 17,
        backgroundColor: "#FF5A5A",
        overflow: "hidden",
    },
    chatCount: {
        color: "#FFF",
        fontSize: 20,
        fontWeight: "bold",
    }
});
export default ChatHome;