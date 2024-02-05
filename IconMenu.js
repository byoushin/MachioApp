import React, { useState, useEffect } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    Text,
    StyleSheet,
    Alert,
    Keyboard,
    TouchableWithoutFeedback,
    TextInput,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

const IconMenu = (props) => {
    const [userIcon, setUserIcon] = useState(null);
    const [username, setUsername] = useState('ユーザ名');
    const [editingUsername, setEditingUsername] = useState(false);
    const [newUsername, setNewUsername] = useState('');

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permission to access media library was denied');
            }
        })();
    }, []);

    const handleIconPress = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            setUserIcon(result.uri);
        }
    };

    const handleChangeUsername = () => {
        setEditingUsername(true);
    };

    const handleSaveUsername = () => {
        const trimmedUsername = newUsername.trim();
        if (trimmedUsername.length > 0) {
            setUsername(trimmedUsername);
            setEditingUsername(false);
            setNewUsername('');
        } else {
            Alert.alert('エラー', 'ユーザ名を入力してください。');
        }
    };

    const handleCancelUsername = () => {
        setEditingUsername(false);
        setNewUsername('');
    };

    const handleButtonPress = (buttonName) => {
        Alert.alert(`ボタン ${buttonName} が押されました`);
    };

    const handleUsernameChange = (text) => {
        // ユーザ名の文字数を制限
        if (text.length <= 30) {
            setNewUsername(text);
        }
    };

    const handleDeleteIcon = () => {
        setUserIcon(null);
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity>
                        <Text style={styles.headerTitle}>まちなか鬼ごっこ</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={handleIconPress}>
                        {userIcon ? (
                            <>
                                <TouchableOpacity style={styles.deleteIcon} onPress={handleDeleteIcon}>
                                    <FontAwesome5 name="trash-alt" size={20} color="black" />
                                </TouchableOpacity>
                                <Image source={{ uri: userIcon }} style={styles.userIcon} />
                            </>
                        ) : (
                            <TouchableOpacity onPress={handleIconPress}>
                                <View style={styles.placeholderIcon}>
                                    <View style={styles.iconBorder}>
                                        <Image source={require('./assets/image/icon.png')} style={{ width: 200, height: 200, resizeMode: 'contain' }} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    </TouchableOpacity>
                    {editingUsername ? (
                        <View style={styles.editableUsernameContainer}>
                            <TextInput
                                style={styles.editableUsername}
                                value={newUsername}
                                onChangeText={handleUsernameChange}
                                placeholder="新しいユーザ名"
                                placeholderTextColor="white"
                                maxLength={30}
                            />
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.saveButton} onPress={handleSaveUsername}>
                                    <Text style={styles.saveButtonText}>保存</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.cancelButton} onPress={handleCancelUsername}>
                                    <Text style={styles.cancelButtonText}>キャンセル</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : (
                        <Text style={styles.username} onPress={handleChangeUsername}>
                            {global.userName}
                        </Text>
                    )}
                </View>
                <View style={styles.userInfoContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('Invitecode')}>
                        <Text style={styles.buttonText}>コード入力</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('ChatHome')}>
                        <Text style={styles.buttonText}>チャット</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('History')}>
                        <Text style={styles.buttonText}>参加履歴</Text>
                    </TouchableOpacity> */}
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
        marginHorizontal: 0, //バナーの余白０
    },
    iconContainer: {
        alignItems: 'center',
        marginTop: 80,
    },
    userIcon: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    placeholderIcon: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconBorder: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 3,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteIcon: {
        position: 'absolute',
        top: 5,
        right: 5,
        padding: 5,
        zIndex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 8,
    },
    username: {
        fontSize: 30,
        marginBottom: 50,
        textDecorationLine: 'underline',
        color: 'white',
        borderBottomWidth: 2,
        borderBottomColor: '#8D8D8D',
    },
    editableUsernameContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    editableUsername: {
        fontSize: 20,
        marginBottom: 10,
        color: 'white',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 8,
        padding: 5,
        width: 200,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    saveButton: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 10,
        width: 50,
        alignItems: 'center',
        marginRight: 10,
    },
    saveButtonText: {
        color: 'black',
        fontSize: 15,

    },
    cancelButton: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 10,
        width: 100,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
    },
    cancelButtonText: {
        color: 'black',
        fontSize: 16,
    },
    userInfoContainer: {
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 20,
        width: 300,
        alignItems: 'center',
        marginBottom: 5,
        borderWidth: 1,
        borderColor: 'black',
        marginTop: 10,
    },
    buttonText: {
        color: 'black',
        fontSize: 18,
    },
});

export default IconMenu;