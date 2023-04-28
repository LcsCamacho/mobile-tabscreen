import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import React from 'react';
import ScreenIMC from './screens/imc';
import ScreenEmprestimo from './screens/emprestimo';

type TabBarIconProps = {
  focused: boolean;
  color: string;
  size: number;
};
type TabBarIconName =
  'user' |
  'user-alt' |
  'dollar-sign' |
  'settings-outline' |
  'build' |
  'build-outline' |
  'car' |
  'car-outline' |
  'person' |
  'person-outline' |
  'ellipse' |
  'ellipse-outline'
  ;
const getTabBarIcon = (name: string) => {
  return ({ focused, color, size }: TabBarIconProps) => {
    let iconName: TabBarIconName;
    switch (name) {
      case 'Imc':
        iconName = focused ? 'user-alt' : 'user';
        break;
      case 'Empréstimo':
        iconName = focused ? 'dollar-sign' : 'dollar-sign';
        break;
      default:
        iconName = focused ? 'ellipse' : 'ellipse-outline';
        break;
    }
    return <FontAwesome5 name={iconName} size={size} color={color} />;
  };
};
const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: getTabBarIcon(route.name),
          tabBarActiveTintColor: '#006eff',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Imc" component={ScreenIMC} />
        <Tab.Screen name="Empréstimo" component={ScreenEmprestimo} />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
