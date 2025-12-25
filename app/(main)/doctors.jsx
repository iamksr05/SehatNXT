import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Star, MapPin, Clock } from 'lucide-react-native';

export default function DoctorsScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();

    // Mock Data (Reused)
    const doctors = [
        { id: 'doc1', name: 'Dr. Richard James', speciality: 'General Physician', experience: '4 Years', rating: '4.9', distance: '1.2 km' },
        { id: 'doc2', name: 'Dr. Emily Larson', speciality: 'Gynecologist', experience: '3 Years', rating: '4.8', distance: '2.5 km' },
        { id: 'doc3', name: 'Dr. Sarah Patel', speciality: 'Dermatologist', experience: '5 Years', rating: '4.7', distance: '3.1 km' },
        { id: 'doc4', name: 'Dr. Christopher Lee', speciality: 'Pediatrician', experience: '2 Years', rating: '4.6', distance: '0.8 km' },
    ];

    return (
        <View className="flex-1 bg-slate-50">
            {/* Header */}
            <View className="pt-12 pb-4 px-5 bg-white shadow-sm flex-row items-center gap-4">
                <TouchableOpacity onPress={() => router.back()} className="p-2 bg-slate-50 rounded-full">
                    <ArrowLeft size={20} color="#334155" />
                </TouchableOpacity>
                <Text className="text-lg font-bold text-slate-800">Top Doctors</Text>
            </View>

            <ScrollView className="flex-1 p-5" contentContainerStyle={{ paddingBottom: 40 }}>
                {doctors.map((doc) => (
                    <TouchableOpacity
                        key={doc.id}
                        className="bg-white rounded-2xl p-3 mb-4 flex-row gap-4 shadow-sm border border-slate-100"
                        onPress={() => router.push(`/(main)/appointment/${doc.id}`)}
                    >
                        {/* Image Placeholder */}
                        <View className="w-20 h-20 bg-blue-50 rounded-xl items-center justify-center">
                            <Text className="text-2xl">👨‍⚕️</Text>
                        </View>

                        <View className="flex-1 justify-center">
                            <View className="flex-row justify-between items-start">
                                <View>
                                    <Text className="text-blue-600 text-[10px] font-bold uppercase tracking-wide mb-0.5">{doc.speciality}</Text>
                                    <Text className="text-base font-bold text-slate-800 mb-1">{doc.name}</Text>
                                </View>
                                <View className="flex-row items-center gap-1 bg-yellow-50 px-1.5 py-0.5 rounded-md border border-yellow-100">
                                    <Star size={10} color="#ca8a04" fill="#ca8a04" />
                                    <Text className="text-xs font-bold text-yellow-700">{doc.rating}</Text>
                                </View>
                            </View>

                            <View className="flex-row items-center gap-3 mt-1">
                                <View className="flex-row items-center gap-1">
                                    <Clock size={12} color="#94a3b8" />
                                    <Text className="text-xs text-slate-500">{doc.experience}</Text>
                                </View>
                                <View className="flex-row items-center gap-1">
                                    <MapPin size={12} color="#94a3b8" />
                                    <Text className="text-xs text-slate-500">{doc.distance}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}
