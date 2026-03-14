import React, { useEffect } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { useRouter } from "expo-router";
import { HexagonLogo } from "@/src/components/ui";
import { Colors } from "@/src/constants/color";
import { Typography } from "@/src/constants/typography";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "expo-router/build/global-state/routing";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const token = AsyncStorage.getItem("token");
    const hasonboarded = AsyncStorage.getItem("hasOnboarded");
    let timer:any;


    if (!token) {
      timer =  setTimeout(() => {
        router.replace("/(auth)/signup" as any);
      }, 2000);
    }
    if (!hasonboarded) {
     timer =  setTimeout(() => {
        router.replace('/(onboarding)/onboarding1' as any);
      }, 2000)
      
    }


    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <View style={styles.content}>
        <HexagonLogo size={100} text="GG" />
        <Text style={styles.appName}>Ghumgham</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  appName: {
    ...Typography.h2,
    color: Colors.textPrimary,
    marginTop: 24,
    fontWeight: "500",
  },
});
