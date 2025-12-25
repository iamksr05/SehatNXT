import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';

export default function ComingSoon() {
    const router = useRouter();
    return (
        <View className="flex-1 bg-white items-center justify-center p-5">
            <TouchableOpacity onPress={() => router.back()} className="absolute top-12 left-5 p-2 bg-slate-100 rounded-full">
                <ArrowLeft size={24} color="#334155" />
            </TouchableOpacity>
            <Text className="text-2xl font-bold text-slate-800 mb-2">Coming Soon</Text>
            <Text className="text-slate-500 text-center">This feature is under development and will be available shortly.</Text>
        </View>
    );
}
