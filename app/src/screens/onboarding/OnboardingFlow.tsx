import React from 'react';
import { View, ScrollView, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

const OnboardingFlow = () => {
  const [currentScreen, setCurrentScreen] = React.useState(1);

  const screens = [
    {
      id: 1,
      label: 'Splash',
      component: <SplashScreen />,
    },
    {
      id: 2,
      label: 'Onboarding',
      component: <OnboardingScreen1 />,
    },
    {
      id: 3,
      label: 'Onboarding',
      component: <OnboardingScreen2 />,
    },
    {
      id: 4,
      label: 'Onboarding',
      component: <OnboardingScreen3 />,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {screens.map((screen) => (
        <View key={screen.id} style={styles.screenContainer}>
          <Text style={styles.screenLabel}>{screen.label}</Text>
          <View style={styles.phoneFrame}>
            <StatusBar />
            <View style={styles.screenContent}>{screen.component}</View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const SplashScreen = () => (
  <View style={[styles.screen, { backgroundColor: '#FFFFFF' }]}>
    <View style={styles.centerContent}>
      <View style={styles.hexagonContainer}>
        <View style={styles.hexagon}>
          <Text style={styles.hexagonIcon}>🏠</Text>
        </View>
      </View>
      <Text style={styles.appName}>RoomWise</Text>
    </View>
  </View>
);

const OnboardingScreen1 = () => (
  <View style={[styles.screen, { backgroundColor: '#F5F5F5' }]}>
    <View style={styles.centerContent}>
      <Text style={styles.placeholderText}>Get Ready</Text>
    </View>
  </View>
);

const OnboardingScreen2 = () => (
  <View style={styles.screen}>
    <Image
      source={{
        uri: 'https://images.unsplash.com/photo-1549707526-8a74e9c2c3e8?w=400&h=800&fit=crop',
      }}
      style={styles.backgroundImage}
    />
    <View style={styles.gradientOverlay} />
    <View style={styles.contentOverlay}>
      <View style={styles.textContent}>
        <Text style={styles.heading}>Global Accessibility</Text>
        <Text style={styles.subheading}>
          Traveling abroad? No worries. Our app supports multiple languages and currencies
        </Text>
      </View>
      <View style={styles.pagination}>
        <View style={styles.dot} />
        <View style={[styles.dot, styles.dotActive]} />
        <View style={styles.dot} />
      </View>
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.ghostButton}>
          <Text style={styles.ghostButtonText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

const OnboardingScreen3 = () => (
  <View style={styles.screen}>
    <Image
      source={{
        uri: 'https://images.unsplash.com/photo-1576077345644-24c23f645d1f?w=400&h=800&fit=crop',
      }}
      style={styles.backgroundImage}
    />
    <View style={styles.gradientOverlay} />
    <View style={styles.contentOverlay}>
      <View style={styles.textContent}>
        <Text style={styles.heading}>Safe and Secure</Text>
        <Text style={styles.subheading}>
          Rest assured, your payment information is safe with us.
        </Text>
      </View>
      <View style={styles.pagination}>
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={[styles.dot, styles.dotActive]} />
      </View>
      <TouchableOpacity style={[styles.primaryButton, { width: '90%' }]}>
        <Text style={styles.primaryButtonText}>Get started</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const StatusBar = () => (
  <View style={styles.statusBar}>
    <Text style={styles.statusBarText}>11:20</Text>
    <View style={styles.statusBarRight}>
      <Text style={styles.statusBarIcon}>📶</Text>
      <Text style={styles.statusBarIcon}>🔋</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8e8e8',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  screenContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  screenLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  phoneFrame: {
    width: 220,
    aspectRatio: 9 / 19.5,
    backgroundColor: '#000',
    borderRadius: 40,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  statusBar: {
    height: 44,
    backgroundColor: '#000',
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
  },
  statusBarText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  statusBarRight: {
    flexDirection: 'row',
    gap: 4,
  },
  statusBarIcon: {
    fontSize: 12,
  },
  screenContent: {
    flex: 1,
  },
  screen: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hexagonContainer: {
    marginBottom: 20,
  },
  hexagon: {
    width: 100,
    height: 100,
    backgroundColor: '#7BF23A',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ scaleY: 0.866 }],
  },
  hexagonIcon: {
    fontSize: 50,
  },
  appName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    marginTop: 20,
  },
  placeholderText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#999',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  contentOverlay: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textContent: {
    marginBottom: 30,
    width: '100%',
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  subheading: {
    fontSize: 14,
    color: '#FFF',
    textAlign: 'center',
    lineHeight: 20,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 30,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  dotActive: {
    backgroundColor: '#FFF',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  ghostButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#7BF23A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ghostButtonText: {
    color: '#7BF23A',
    fontSize: 14,
    fontWeight: '600',
  },
  primaryButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: '#7BF23A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default OnboardingFlow;
