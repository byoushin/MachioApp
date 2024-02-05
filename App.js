import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginSignup from './LoginSignup';
import Login from './Login';
import Signup from './Signup';
import IconMenu from './IconMenu';
import Invitecode from './Invitecode';
import ChatHome from './ChatHome';
import ChatScreen from './ChatScreen';
import History from './History';
import Map from './Map';
import Mission from './Mission';
import Notification from './Notification';
import ChatHomeUse from './ChatHomeUse';
import ChatScreenUse from './ChatScreenUse';
import Menu from './Menu';
import MissionReport from './MissionReport';
const Stack = createStackNavigator();

const App: () => React.Node = () => {
 


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Chat'>
        <Stack.Screen name="LoginSignup" component={LoginSignup} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
        <Stack.Screen name="IconMenu" component={IconMenu} options={{ headerShown: false }} />
        <Stack.Screen name="Invitecode" component={Invitecode} options={{ headerShown: false }} />
        <Stack.Screen name='History' component={History} options={{ headerShown: false }} />
        <Stack.Screen name='Menu' component={Menu} options={{ headerShown: false }} />
        <Stack.Screen name='Map' component={Map} options={{ headerShown: false }} />
        <Stack.Screen name="Mission" component={Mission} options={{ headerShown: false }} />
        <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
        <Stack.Screen name="MissionReport" component={MissionReport} options={{ headerShown: false }} />

        {/* <Stack.Screen name="ChatHome" component={ChatHome} options={{ headerShown: false }} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ChatHomeUse" component={ChatHomeUse} options={{ headerShown: false }} /> */}
        <Stack.Screen name="ChatScreenUse" component={ChatScreenUse} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );

};
export default App;
