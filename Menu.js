import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // useNavigation をインポート

const Menu = (props) => {
    const navigation = useNavigation(); // useNavigation フックを使用して navigation オブジェクトを取得

    const MenuItem = ({ onPress, imageSource }) => {
        return (
            <TouchableOpacity style={styles.menuButton} onPress={onPress}>
                <Image source={imageSource} style={styles.imageButton} />
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.menuBar}>
                <MenuItem onPress={() => navigation.navigate('Map')} imageSource={require('./assets/image/button1.png')} />
                <MenuItem onPress={() => navigation.navigate('Mission')} imageSource={require('./assets/image/button3.png')} />
                <MenuItem onPress={() => navigation.navigate('Notification')} imageSource={require('./assets/image/button2.png')} />
                {/* <MenuItem onPress={() => navigation.navigate('ChatScreenUse')} imageSource={require('./assets/image/button4.png')} /> */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
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

export default Menu;
