/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react"
import { View } from "react-native"
import { LogoLabel } from "../assets/icons/LogoLabel";
import { Container } from "../components";
import { AuthStackParams } from "../navigation/AuthScreenStack";
import useTheme from "../theme/useTheme";


export const SplashScreen = () => {
    const navigation = useNavigation<any>();
    const theme = useTheme();
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('SignUp');
        }, 2000)
    }, [])
    return (
        <Container>
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: theme?.colors.BACKGROUND1
            }}>
                <LogoLabel size={228} color={theme?.colors.PRIMARY} />
            </View>
        </Container>
    )
}