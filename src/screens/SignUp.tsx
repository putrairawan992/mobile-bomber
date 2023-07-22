/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react"
import { View } from "react-native"
import { Logo } from "../assets/icons/Logo";
import { Container, Content } from "../components";
import { TextInput } from "../components/Form/TextInput";
import Spacer from "../components/Spacer/Spacer";
import useTheme from "../theme/useTheme";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { SignUpPayloadInterface } from "../interfaces/UserInterface";
import Button from "../components/Button";
import { Text } from "../components/Text";
import { Section } from "../components/Section";
import GoogleFaceBookBtn from "../components/SignUpLogIn/GoogleFaceBookBtn";
import { Images } from "../theme";


export const SignUp = () => {
    const theme = useTheme();
    const formik = useFormik<SignUpPayloadInterface>({
        initialValues: {
            fullName: '',
            email: '',
            password: '',
            phone: ''
        },
        validationSchema: Yup.object({
            fullName: Yup.string().required('Fullname is required'),
            phone: Yup.string().required('Phone is required'),
            email: Yup.string()
                .email('Must be valid email')
                .required('Email is required'),
            password: Yup.string()
                .required('Password is required')
                .min(8, 'Password is too short - should be 8 chars minimum.')
                .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')

        }),
        // validateOnChange: false,
        // enableReinitialize: true,
        onSubmit: () => undefined,
    });
    return (
        <Container>
            <Content hasHeader contentContainerStyle={{
                flex: 1,
                justifyContent: 'center',
                backgroundColor: theme?.colors.BACKGROUND1,
                paddingHorizontal: 40
            }}>
                <Section isCenter>
                    <Logo size={80} color={theme?.colors.PRIMARY} />
                    <Spacer l />
                    <Text variant="ultra-large" fontWeight="bold" label="Sign Up" color={theme?.colors.TEXT_PRIMARY} style={{ marginBottom: 38 }} />
                </Section>
                <TextInput
                    value={formik.values.fullName}
                    label=""
                    errorText={formik.errors.fullName}
                    onChangeText={formik.handleChange('fullName')}
                    placeholder="Full name"
                />
                <Spacer l />
                <TextInput
                    value={formik.values.email}
                    label=""
                    errorText={formik.errors.email}
                    onChangeText={formik.handleChange('email')}
                    placeholder="E-mail address"
                />
                <Spacer l />
                <TextInput
                    value={formik.values.phone}
                    label=""
                    errorText={formik.errors.phone}
                    onChangeText={formik.handleChange('phone')}
                    placeholder="Phone Number"
                />
                <Spacer l />
                <TextInput
                    value={formik.values.password}
                    label=""
                    errorText={formik.errors.password}
                    onChangeText={formik.handleChange('password')}
                    placeholder="Password"
                    type="password"
                />
                <Spacer l />
                <Button
                    type="primary"
                    onPress={() => formik.handleSubmit()}
                    title="Sign Up"
                    isLoading={false}
                />
                <Spacer lxx />
                <Section isCenter >
                    <Text variant="small" label="Or log in using" color={theme?.colors.TEXT_SECONDARY} />
                </Section>
                <Spacer lxx />
                <Section isRow isBetween>
                    <GoogleFaceBookBtn
                        googleImg
                        btnImage={Images.Google}
                        btnText="Google"
                    />
                    <GoogleFaceBookBtn btnImage={Images.Facebook} btnText="Facebook" />

                </Section>
                <Section isCenter isRow style={{
                    marginTop: 128
                }}>
                    <Text variant="small" label="Don’t have an account yet? " color={theme?.colors.TEXT_SECONDARY} />
                    <Text variant="small" label="Sign up" color={theme?.colors.PRIMARY} />
                </Section>
            </Content>
        </Container>
    )
}