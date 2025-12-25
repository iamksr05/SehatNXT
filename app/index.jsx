import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useSignIn } from '@clerk/clerk-expo';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';

// Use 10.0.2.2 for Android Emulator, or your LAN IP for physical device
const API_URL = "http://192.168.55.41:5001/api";

export default function LoginScreen() {
    const { signIn, setActive, isLoaded } = useSignIn();
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [validationError, setValidationError] = useState("");

    const onSignInPress = async () => {
        if (!isLoaded) return;
        setLoading(true);
        setValidationError("");

        try {
            // 1. Clerk Login
            const completeSignIn = await signIn.create({
                identifier: email,
                password,
            });

            // 2. Set Active Session
            await setActive({ session: completeSignIn.createdSessionId });

            // 3. Verify with Backend (Optional sync if needed)
            // const res = await axios.post(`${API_URL}/auth/login`, { email, password });

            // Navigate to Home
            // Alert.alert("Success", "Logged in successfully!");
            router.replace('/(main)/home');
            console.log("Login Success");

        } catch (err) {
            console.error(JSON.stringify(err, null, 2));

            // Check for specific error code: session_exists
            if (err.errors && err.errors[0].code === 'session_exists') {
                // Or navigate directly if user is already signed in
                router.replace('/(main)/home');
                return;
            }

            const msg = err.errors ? err.errors[0].message : "Invalid credentials or Network Error";
            setValidationError(msg);
            Alert.alert("Login Failed", msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1 justify-center px-6"
            >
                <View className="items-center mb-10">
                    {/* Logo Placeholder */}
                    <View className="w-20 h-20 bg-blue-600 rounded-2xl items-center justify-center mb-4 shadow-lg shadow-blue-200">
                        <Text className="text-white text-3xl font-bold">S</Text>
                    </View>
                    <Text className="text-3xl font-bold text-slate-800">SehatNxt</Text>
                    <Text className="text-slate-500 mt-2">Your Health, Your Hands</Text>
                    {validationError ? <Text className="text-red-500 font-bold mt-4 text-center">{validationError}</Text> : null}
                </View>

                <View className="space-y-4">
                    <View>
                        <Text className="text-slate-700 font-medium mb-2">Email Address</Text>
                        <TextInput
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-base text-slate-800"
                            placeholder="Enter your email"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>

                    <View>
                        <Text className="text-slate-700 font-medium mb-2">Password</Text>
                        <TextInput
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-base text-slate-800"
                            placeholder="Enter your password"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>

                    <TouchableOpacity
                        className="w-full bg-blue-600 py-4 rounded-xl mt-4 shadow-lg shadow-blue-200"
                        onPress={onSignInPress}
                        disabled={loading}
                    >
                        <Text className="text-white text-center font-bold text-lg">
                            {loading ? "Signing In..." : "Sign In"}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="mt-4" onPress={() => router.push('/(auth)/sign-up')}>
                        <Text className="text-center text-slate-500">
                            Don't have an account? <Text className="text-blue-600 font-bold">Sign Up</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
