import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, StatusBar, Image, Animated, Easing } from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "@/src/constants/color";
import { Typography } from "@/src/constants/typography";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function SplashScreen() {
  const router = useRouter();
  const logoWipe = useRef(new Animated.Value(0)).current;
  const contentOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    let isMounted = true;

    const bootstrap = async () => {
      const [token, hasOnboarded] = await Promise.all([
        AsyncStorage.getItem("token"),
        AsyncStorage.getItem("hasOnboarded"),
      ]);

      if (!isMounted) return;

      const targetRoute = !hasOnboarded
        ? "/(onboarding)/onboarding1"
        : !token
          ? "/(auth)/signup"
          : "/(tabs)";

      timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(logoWipe, {
            toValue: 1,
            duration: 450,
            easing: Easing.inOut(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(contentOpacity, {
            toValue: 0,
            duration: 450,
            delay: 120,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
        ]).start(({ finished }) => {
          if (finished && isMounted) {
            router.replace(targetRoute as any);
          }
        });
      }, 1400);
    };

    bootstrap();

    return () => {
      isMounted = false;
      if (timer) clearTimeout(timer);
      logoWipe.stopAnimation();
      contentOpacity.stopAnimation();
    };
  }, [router, logoWipe, contentOpacity]);

  const wipeTranslateY = logoWipe.interpolate({
    inputRange: [0, 1],
    outputRange: [160, 0],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <Animated.View style={[styles.content, { opacity: contentOpacity }]}>
        <View style={styles.brandBlock}>
          <View style={styles.logoShell}>
            <Image
              source={require("../utils/Images/Logo.png")}
              style={styles.logoImage}
              resizeMode="cover"
            />
            <Animated.View
              style={[styles.logoWipe, { transform: [{ translateY: wipeTranslateY }] }]}
            />
          </View>
        </View>
        <Text style={styles.appName}>Ghumgham</Text>
      </Animated.View>
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
    paddingHorizontal: 24,
  },
  brandBlock: {
    alignItems: "center",
    justifyContent: "center",
    transform: [{ translateY: -14 }],
  },
  logoImage: {
    width: 148,
    height: 148,
  },
  logoShell: {
    width: 148,
    height: 148,
    borderRadius: 74,
    overflow: "hidden",
  },
  logoWipe: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.background,
  },
  appName: {
    ...Typography.h2,
    color: Colors.textPrimary,
    marginTop: 16,
    letterSpacing: 0.4,
    fontWeight: "500",
  },
});
