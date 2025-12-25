import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ChevronDown, Search, Bell, MapPin, ChevronRight, Star, Clock } from 'lucide-react-native';
import { useUser, useClerk } from '@clerk/clerk-expo';

export default function HomeScreen() {
    const router = useRouter();
    const { user } = useUser();
    const { signOut } = useClerk();

    // --- Mock Data (To be moved to assets or API later) ---
    const specialities = [
        { id: 1, name: 'Physician', icon: require('../../assets/adaptive-icon.png') }, // Placeholder icons
        { id: 2, name: 'Gynecology', icon: require('../../assets/adaptive-icon.png') },
        { id: 3, name: 'Dermatology', icon: require('../../assets/adaptive-icon.png') },
        { id: 4, name: 'Pediatrics', icon: require('../../assets/adaptive-icon.png') },
        { id: 5, name: 'Neurology', icon: require('../../assets/adaptive-icon.png') },
    ];

    const doctors = [
        {
            id: 'doc1',
            name: 'Dr. Richard James',
            speciality: 'General Physician',
            experience: '4 Years',
            rating: '4.9',
            distance: '1.2 km',
            image: require('../../assets/splash-icon.png'), // Placeholder
        },
        {
            id: 'doc2',
            name: 'Dr. Emily Larson',
            speciality: 'Gynecologist',
            experience: '3 Years',
            rating: '4.8',
            distance: '2.5 km',
            image: require('../../assets/splash-icon.png'), // Placeholder
        },
        {
            id: 'doc3',
            name: 'Dr. Sarah Patel',
            speciality: 'Dermatologist',
            experience: '5 Years',
            rating: '4.7',
            distance: '3.1 km',
            image: require('../../assets/splash-icon.png'),
        },

    ];

    const handleSignOut = async () => {
        try {
            await signOut();
            router.replace("/");
        } catch (err) {
            console.error("Sign out error", err);
        }
    };


    return (
        <View className="flex-1 bg-slate-50">

            {/* --- Header Section (Gradient) --- */}
            <View className="bg-blue-600 rounded-b-[30px] shadow-sm overflow-hidden z-20 pb-6 pt-12">
                <LinearGradient
                    colors={['#1d4ed8', '#3b82f6', '#60a5fa']} // Blue-700 -> Blue-500 -> Blue-400
                    className="absolute inset-0"
                />
                <View className="px-5">
                    {/* Top Row: User, Location, Bell */}
                    <View className="flex-row justify-between items-center mb-6">
                        <View className="flex-row items-center gap-3">
                            {/* Avatar */}
                            <TouchableOpacity onPress={handleSignOut} className="w-10 h-10 rounded-full bg-white/20 border border-white/20 items-center justify-center">
                                {user?.imageUrl ? (
                                    <Image source={{ uri: user.imageUrl }} className="w-8 h-8 rounded-full" />
                                ) : (
                                    <Text className="text-white font-bold text-lg">{user?.firstName?.[0] || "U"}</Text>
                                )}
                            </TouchableOpacity>

                            {/* Location */}
                            <View>
                                <Text className="text-[10px] text-blue-100 font-medium uppercase tracking-wider">Location</Text>
                                <TouchableOpacity className="flex-row items-center gap-1">
                                    <Text className="text-white font-bold text-sm">New York, USA</Text> {/* Placeholder */}
                                    <ChevronDown size={14} color="white" className="opacity-80" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Bell Icon */}
                        <TouchableOpacity className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-sm">
                            <Bell size={20} color="#2563eb" fill="#2563eb" />
                            {/* Badge */}
                            <View className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border border-white" />
                        </TouchableOpacity>
                    </View>

                    {/* Search Bar */}
                    <View className="flex-row items-center bg-white rounded-2xl px-4 py-3 shadow-lg shadow-blue-900/10">
                        <Search size={20} color="#94a3b8" />
                        <TextInput
                            placeholder="Search doctors, clinics..."
                            placeholderTextColor="#94a3b8"
                            className="flex-1 ml-3 text-base text-slate-700 font-medium"
                        />
                    </View>
                </View>
            </View>

            {/* --- Main Content Scroll --- */}
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                <View className="px-5 pt-6">

                    {/* --- Hero / Banner --- */}
                    <TouchableOpacity
                        className="bg-purple-50 rounded-3xl p-5 mb-6 flex-row items-center justify-between border border-purple-100 shadow-sm overflow-hidden"
                        onPress={() => router.push('/(main)/doctors')}
                        activeOpacity={0.9}
                    >
                        {/* Text Content */}
                        <View className="z-10 flex-1">
                            <Text className="text-2xl font-bold text-slate-800 leading-tight mb-3">
                                Book{'\n'}Appointment
                            </Text>
                            <View className="bg-white px-3 py-1 rounded-full self-start border border-green-200 flex-row items-center gap-1.5 shadow-sm">
                                <View className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <Text className="text-[10px] font-bold text-green-700 tracking-wide">LIVE TRACKING</Text>
                            </View>
                        </View>

                        {/* Image/Illustration Placeholder */}
                        <View className="w-24 h-24 bg-purple-200 rounded-2xl -mr-2 transform rotate-3 items-center justify-center">
                            <Text className="text-4xl">👨‍⚕️</Text>
                        </View>
                        {/* Decorative Background Blob */}
                        <View className="absolute right-[-20] bottom-[-20] w-32 h-32 bg-purple-200 rounded-full opacity-30" />
                    </TouchableOpacity>


                    {/* --- Categories --- */}
                    <View className="mb-8">
                        <Text className="text-lg font-bold text-slate-800 mb-4">Most searched specialties</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="overflow-visible">
                            {specialities.map((item) => (
                                <TouchableOpacity
                                    key={item.id}
                                    className="items-center mr-4"
                                    onPress={() => router.push('/(main)/doctors')}
                                >
                                    <View className="w-16 h-16 bg-slate-100 rounded-full items-center justify-center mb-2 border border-slate-50 shadow-sm">
                                        <Text className="text-2xl">🩺</Text>
                                    </View>
                                    <Text className="text-xs font-medium text-slate-600 text-center w-16" numberOfLines={1}>{item.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    {/* --- Offer / AQI Slider --- */}
                    <View className="mb-8">
                        <LinearGradient
                            colors={['#ecfdf5', '#ccfbf1']}
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            className="rounded-3xl p-5 border border-emerald-100 flex-row items-center justify-between"
                        >
                            <View>
                                <View className="flex-row items-center gap-1.5 mb-1">
                                    <View className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                    <Text className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">LIVE AQI</Text>
                                </View>
                                <Text className="text-xl font-bold text-slate-800 mb-1">New York</Text>
                                <Text className="text-emerald-700 font-bold text-sm">Good Air Quality</Text>
                                <Text className="text-xs text-slate-500 mt-2 max-w-[150px]">Perfect time for outdoor activities!</Text>
                            </View>

                            <View className="w-20 h-20 bg-emerald-500 rounded-full items-center justify-center border-4 border-white shadow-lg">
                                <Text className="text-white font-black text-2xl">42</Text>
                                <Text className="text-white text-[8px] font-bold">AQI</Text>
                            </View>
                        </LinearGradient>
                    </View>

                    {/* --- Top Doctors --- */}
                    <View className="mb-4">
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="text-lg font-bold text-slate-800">Top Doctors to Book</Text>
                            <TouchableOpacity onPress={() => router.push('/(main)/doctors')}>
                                <Text className="text-blue-600 font-bold text-xs">See All</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="overflow-visible">
                            {doctors.map((doc) => (
                                <TouchableOpacity
                                    key={doc.id}
                                    className="bg-white w-[160px] rounded-2xl p-0 mr-4 shadow-sm border border-slate-100 pb-3"
                                    onPress={() => router.push(`/(main)/appointment/${doc.id}`)}
                                >
                                    {/* Image Area */}
                                    <View className="h-28 bg-slate-100 rounded-t-2xl mb-3 overflow-hidden relative">
                                        <View className="w-full h-full items-center justify-center bg-blue-50">
                                            <Text className="text-3xl">👨‍⚕️</Text>
                                        </View>
                                        {/* Rating Badge */}
                                        <View className="absolute top-2 right-2 bg-white/90 px-1.5 py-0.5 rounded-md flex-row items-center gap-0.5 shadow-sm backdrop-blur-sm">
                                            <Star size={10} color="#eab308" fill="#eab308" />
                                            <Text className="text-[10px] font-bold text-slate-700">{doc.rating}</Text>
                                        </View>
                                        {/* Status Dot */}
                                        <View className="absolute top-2 left-2 w-2 h-2 rounded-full bg-green-500 border border-white" />
                                    </View>

                                    {/* Content */}
                                    <View className="px-3">
                                        <Text className="font-bold text-slate-900 text-sm mb-0.5" numberOfLines={1}>{doc.name}</Text>
                                        <Text className="text-[10px] text-slate-500 font-semibold mb-2">{doc.speciality}</Text>

                                        <View className="flex-row items-center gap-2 mb-3">
                                            <View className="flex-row items-center gap-0.5">
                                                <MapPin size={10} color="#94a3b8" />
                                                <Text className="text-[10px] text-slate-400 font-medium">{doc.distance}</Text>
                                            </View>
                                            <View className="flex-row items-center gap-0.5">
                                                <Clock size={10} color="#94a3b8" />
                                                <Text className="text-[10px] text-slate-400 font-medium">{doc.experience}</Text>
                                            </View>
                                        </View>

                                        <TouchableOpacity
                                            className="w-full bg-blue-50 py-1.5 rounded-lg items-center active:bg-blue-100"
                                            onPress={() => router.push(`/(main)/appointment/${doc.id}`)}
                                        >
                                            <Text className="text-blue-600 text-[10px] font-bold">Book Now</Text>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                </View>
            </ScrollView>
        </View>
    );
}
