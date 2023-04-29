import React from "react";

import {createStackNavigator} from '@react-navigation/stack';

import SignInScreen from '../SignIn/SignInScreen';
import SplashScreen from "../SplashScreen/SplashScreen";
const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}:any) =>(
    <RootStack.Navigator screenOptions={{ headerShown:false}}>
        <RootStack.Screen name="SplashScreen" component={SplashScreen}/>
        <RootStack.Screen name="SignInScreen" component={SignInScreen} />
    </RootStack.Navigator>
)

export default RootStackScreen;