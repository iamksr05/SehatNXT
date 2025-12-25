import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSignUp } from '@clerk/clerk-expo';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignUpScreen() {
    const { isLoaded, signUp, setActive } = useSignUp();
    const router = useRouter();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pendingVerification, setPendingVerification] = useState(false);
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);

    // 1. Create the user
    const onSignUpPress = async () => {
        if (!isLoaded) return;
        setLoading(true);

        try {
            await signUp.create({
                firstName,
                lastName,
                emailAddress: email,
                password,
            });

            // Prepare for email verification
            await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
            setPendingVerification(true);
        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
            Alert.alert("Sign Up Failed", err.errors ? err.errors[0].message : "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    // 2. Verify the email code
    const onPressVerify = async () => {
        if (!isLoaded) return;
        setLoading(true);

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code,
            });

            if (completeSignUp.status === 'complete') {
                await setActive({ session: completeSignUp.createdSessionId });
                router.replace('/(main)/home');
            } else {
                console.error(JSON.stringify(completeSignUp, null, 2));
                Alert.alert("Verification Failed", "Please check your code.");
            }
        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
            Alert.alert("Error", err.errors ? err.errors[0].message : "Invalid code.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}>

                    <View className="mb-8">
                        <Text className="text-3xl font-bold text-slate-800">Create Account</Text>
                        <Text className="text-slate-500 mt-2">Join SehatNxt today</Text>
                    </View>

                    {!pendingVerification ? (
                        <View className="space-y-4">
                            <View className="flex-row space-x-2">
                                <View className="flex-1">
                                    <Text className="text-slate-700 font-medium mb-1">First Name</Text>
                                    <TextInput
                                        className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3"
                                        placeholder="John"
                                        value={firstName}
                                        onChangeText={setFirstName}
                                    />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-slate-700 font-medium mb-1">Last Name</Text>
                                    <TextInput
                                        className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3"
                                        placeholder="Doe"
                                        value={lastName}
                                        onChangeText={setLastName}
                                    />
                                </View>
                            </View>

                            <View>
                                <Text className="text-slate-700 font-medium mb-1">Email</Text>
                                <TextInput
                                    className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3"
                                    placeholder="john@example.com"
                                    autoCapitalize='none'
                                    value={email}
                                    onChangeText={setEmail}
                                />
                            </View>

                            <View>
                                <Text className="text-slate-700 font-medium mb-1">Password</Text>
                                <TextInput
                                    className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3"
                                    placeholder="Min 8 characters"
                                    secureTextEntry
                                    value={password}
                                    onChangeText={setPassword}
                                />
                            </View>

                            <TouchableOpacity
                                className="bg-blue-600 py-4 rounded-xl mt-4 shadow-lg shadow-blue-200"
                                onPress={onSignUpPress}
                                disabled={loading}
                            >
                                <Text className="text-white text-center font-bold text-lg">
                                    {loading ? "Creating..." : "Sign Up"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View className="space-y-4">
                            <Text className="text-slate-600 mb-4">
                                We sent a verification code to <Text className="font-bold">{email}</Text>
                            </Text>

                            <View>
                                <Text className="text-slate-700 font-medium mb-1">Verification Code</Text>
                                <TextInput
                                    className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-center text-xl tracking-widest"
                                    placeholder="123456"
                                    value={code}
                                    onChangeText={setCode}
                                    keyboardType="numeric"
                                />
                            </View>

                            <TouchableOpacity
                                className="bg-blue-600 py-4 rounded-xl mt-4"
                                onPress={onPressVerify}
                                disabled={loading}
                            >
                                <Text className="text-white text-center font-bold text-lg">
                                    {loading ? "Verifying..." : "Verify Email"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    <TouchableOpacity className="mt-6" onPress={() => router.back()}>
                        <Text className="text-center text-slate-500">
                            Already have an account? <Text className="text-blue-600 font-bold">Log In</Text>
                        </Text>
                    </TouchableOpacity>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
