import { Slot, Stack } from "expo-router";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import "../global.css";

const tokenCache = {
    async getToken(key) {
        try {
            const item = await SecureStore.getItemAsync(key);
            return item;
        } catch (error) {
            await SecureStore.deleteItemAsync(key);
            return null;
        }
    },
    async saveToken(key, value) {
        try {
            return SecureStore.setItemAsync(key, value);
        } catch (err) {
            return;
        }
    },
};

const publishableKey = "pk_test_aGVscGVkLWFudC05OC5jbGVyay5hY2NvdW50cy5kZXYk";

export default function RootLayout() {
    return (
        <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
            <ClerkLoaded>
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="index" />
                    <Stack.Screen name="(auth)" />
                    <Stack.Screen name="(main)" />
                </Stack>
            </ClerkLoaded>
        </ClerkProvider>
    );
}
