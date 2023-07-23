/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { ReactNode } from 'react';
import { Bookmark } from '../assets/icons/Bookmark';
import { Heart } from '../assets/icons/Heart';
import { Search } from '../assets/icons/Search';
import { User } from '../assets/icons/User';
import Spacer from '../components/Spacer/Spacer';
import { Text } from '../components/Text';
import BookedScreen from '../screens/Booked';
import HomeScreen from '../screens/Home';
import ProfileScreen from '../screens/Profile';
import SavedScreen from '../screens/Saved';
import useTheme from '../theme/useTheme';


export type MainStackParams = {
    Home: undefined;
    Saved: undefined;
    Booked: undefined;
    Profile: undefined;
};

interface TabBarProps {
    focused: boolean;
}

interface TabBarContentProps {
    focused: boolean;
    title: string;
    icon: ReactNode;
}

const Tab = createBottomTabNavigator<MainStackParams>();

function MainScreenStack() {

    const TabBarContent = (item: TabBarContentProps) => {
        return (
            <>
                {item.icon}
                <Spacer sx />
                <Text
                    variant="small"
                    fontWeight='medium'
                    label={item.title}
                    color={item.focused ? theme?.colors.PRIMARY : '#0C0C26'}
                />
            </>
        )
    }
    const theme = useTheme();

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: 74,
                    backgroundColor: theme?.colors.BACKGROUND2
                }
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen}
                options={({ route }) => ({
                    tabBarIcon: ({ focused }: TabBarProps) => (
                        <TabBarContent
                            focused={focused}
                            title="Search"
                            icon={(<Search
                                color={focused ? theme?.colors.PRIMARY : theme?.colors.INACTIVE_TABS}
                                size={28}
                            />)}
                        />
                    ),
                    headerShown: false,
                    tabBarLabel() {
                        return false;
                    },
                })}
            />
            <Tab.Screen name="Saved" component={SavedScreen}
                options={({ route }) => ({
                    tabBarIcon: ({ focused }: TabBarProps) => (
                        <TabBarContent
                            focused={focused}
                            title="Saved"
                            icon={(<Heart
                                color={focused ? theme?.colors.PRIMARY : theme?.colors.INACTIVE_TABS}
                                size={28}
                            />)}
                        />
                    ),
                    headerShown: false,
                    tabBarLabel() {
                        return false;
                    },
                })}
            />
            <Tab.Screen name="Booked" component={BookedScreen}
                options={({ route }) => ({
                    tabBarIcon: ({ focused }: TabBarProps) => (
                        <TabBarContent
                            focused={focused}
                            title="Booked"
                            icon={(<Bookmark
                                color={focused ? theme?.colors.PRIMARY : theme?.colors.INACTIVE_TABS}
                                size={28}
                            />)}
                        />
                    ),
                    headerShown: false,
                    tabBarLabel() {
                        return false;
                    },
                })}
            />
            <Tab.Screen name="Profile" component={ProfileScreen}
                options={({ route }) => ({
                    tabBarIcon: ({ focused }: TabBarProps) => (
                        <TabBarContent
                            focused={focused}
                            title="Profile"
                            icon={(<User
                                color={focused ? theme?.colors.PRIMARY : theme?.colors.INACTIVE_TABS}
                                size={28}
                            />)}
                        />
                    ),
                    headerShown: false,
                    tabBarLabel() {
                        return false;
                    },
                })}
            />
        </Tab.Navigator>
    );
}

export default MainScreenStack;