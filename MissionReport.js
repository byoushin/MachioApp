import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRoute } from '@react-navigation/native';
import Menu from './Menu';


const MissionReport = (props) => {
    const route = useRoute();
    const passedData = route.params;
    const [selectedButton, setSelectedButton] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        // カメラロールへのアクセス許可をリクエスト
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('この機能を使用するにはカメラロールへのアクセス許可が必要です。');
            }
        })();
    }, []);

    const handleButtonPress = (buttonNumber) => {
        setSelectedButton(buttonNumber);
        alert(`ボタン ${buttonNumber} がクリックされました！`);
    };

    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.cancelled) {
                setSelectedImage(result.uri);
            }
        } catch (E) {
            console.error(E);
        }
    };

    const submitMissionReport = async () => {
        const formData = new FormData();
        var team_id = 1;
        formData.append('thumbnail', {
            uri: selectedImage,
            type: 'image/jpeg', // 画像のMIMEタイプに合わせて調整
            name: 'mission_photo.jpg',
        });

        formData.append('mission_id', passedData.mission_id);
        formData.append('team_id', global.teamId);  // これはどこから来るのかを確認してください
    
        try {
           const response = await fetch('http://35.174.149.4/add_mission_photograph', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    // 他の必要なヘッダーを追加する場合はここに追加
                },
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const responseData = await response.json();
            console.log(responseData);
    
            // 成功時の処理を追加
            alert('ミッション報告を提出しました！');
        } catch (error) {
            console.error(error);
            // エラー時の処理を追加
            alert('ミッション報告の提出に失敗しました。');
        }
    };

    return (
        <View style={styles.container}>
            {/* バックボタン */}
            <TouchableOpacity style={styles.backLink} onPress={() => props.navigation.navigate('Map')}>
                <Image style={styles.arrow} source={require('./assets/image/arrow.png')} />
                <Text style={styles.backText}>戻る</Text>
            </TouchableOpacity>
            {/* ミッション報告セクション */}
            <View style={styles.missionReportContainer}>
                <Text style={styles.missionReportTitle}>ミッション報告</Text>
                <Text style={styles.missionReportTitle}>{ passedData.mission_title }</Text>
                <Text style={styles.missionReportTitle}>{ passedData.mission_sentence }</Text>
                <Text style={styles.missionReportTitle}>{ passedData.reward }</Text>
                <TouchableOpacity style={styles.chooseImageButton} onPress={pickImage}>
                    <View style={styles.chooseImageWrapper}>
                        {!selectedImage && <Text style={styles.buttonText}>画像を選択</Text>}
                        {selectedImage && <Image source={{ uri: selectedImage }} style={styles.selectedImagePreview} />}
                    </View>
                </TouchableOpacity>
            </View>

            {/* 提出ボタン */}
            <TouchableOpacity style={styles.submitButton} onPress={submitMissionReport}>
                <Text style={styles.submitButtonText}>提出</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3D3D3D',
        justifyContent: 'flex-start',
    },
    banner: {
        backgroundColor: '#000000',
        padding: 10,
        alignItems: 'left',
        paddingTop: 60,
    },
    bannerText: {
        color: '#FFFFFF',
        fontSize: 24,
    },
    missionReportContainer: {
        padding: 20,
        backgroundColor: '#3D3D3D',
        margin: 20
    },
    missionReportTitle: {
        color: '#FFFFFF',
        fontSize: 22,
        marginBottom: 10,
        bottom: '-8%',
        left: '32%',
    },
    chooseImageButton: {
        marginBottom: 20,
    },
    chooseImageWrapper: {
        bottom: '-20%',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 5,
        padding: 10,
        borderColor: '#FFFFFF',
        position: 'relative',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        textAlign: 'center',
    },
    selectedImagePreview: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    menuBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
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
    submitButton: {
        
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: '23%',
        left: '10%',
        width: '80%',
    },
    submitButtonText: {
        color: '#000000',
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
    backLink: {
        marginLeft: 9,
        marginTop: 40,
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
});
// const resizedImage = await ImageManipulator.manipulateAsync(
//     result.uri,
//     [{ resize: { width: 300, height: 300 } }],
//     { compress: 0.5, format: 'jpeg' }
// );
export default MissionReport;