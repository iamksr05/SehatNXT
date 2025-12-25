import { View, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Calendar, CheckCircle } from 'lucide-react-native';

export default function AppointmentScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    return (
        <View className="flex-1 bg-white">
            <View className="pt-12 pb-4 px-5 border-b border-slate-100 flex-row items-center gap-4">
                <TouchableOpacity onPress={() => router.back()} className="p-2 bg-slate-50 rounded-full">
                    <ArrowLeft size={20} color="#334155" />
                </TouchableOpacity>
                <Text className="text-lg font-bold text-slate-800">Book Appointment</Text>
            </View>

            <View className="flex-1 items-center justify-center p-6">
                <View className="w-16 h-16 bg-blue-100 rounded-full items-center justify-center mb-4">
                    <Calendar size={32} color="#2563eb" />
                </View>
                <Text className="text-xl font-bold text-slate-800 text-center mb-2">Booking Flow</Text>
                <Text className="text-slate-500 text-center mb-6">
                    You are viewing the booking page for Doctor ID: <Text className="font-mono text-slate-700">{id}</Text>.
                    Full booking form implementation will go here.
                </Text>
                <TouchableOpacity
                    className="bg-blue-600 px-6 py-3 rounded-xl flex-row items-center gap-2"
                    onPress={() => router.back()}
                >
                    <CheckCircle size={20} color="white" />
                    <Text className="text-white font-bold">Confirm Booking (Mock)</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
