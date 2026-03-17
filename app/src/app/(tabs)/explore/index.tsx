import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  RealixColors,
  realixDestinations,
  realixDiscoverProperty,
} from '@/src/constants/screens/realix';

const filterChips = ['Popular', 'Beach', 'Family', 'Luxury', 'Budget'] as const;

export default function ExploreScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Discover</Text>
            <Text style={styles.subtitle}>Find your next stay and jump into booking in one flow.</Text>
          </View>
          <Pressable style={styles.searchButton}>
            <Ionicons name="options-outline" size={18} color={RealixColors.textPrimary} />
          </Pressable>
        </View>

        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color={RealixColors.textMuted} />
          <Text style={styles.searchText}>Search by city, country, or property</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
          {filterChips.map((chip, index) => (
            <Pressable key={chip} style={[styles.chip, index === 0 && styles.chipActive]}>
              <Text style={[styles.chipText, index === 0 && styles.chipTextActive]}>{chip}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <Pressable style={styles.heroCard} onPress={() => router.push('/(tabs)/explore/detail')}> 
          <View style={styles.heroImage}>
            <View style={styles.heroSky} />
            <View style={styles.heroGrass} />
            <View style={styles.heroRoof} />
            <View style={styles.heroBody}>
              <View style={styles.heroWindow} />
              <View style={styles.heroDoor} />
              <View style={styles.heroWindow} />
            </View>
            <View style={styles.heartDot}>
              <Ionicons name="heart-outline" size={14} color={RealixColors.textMuted} />
            </View>
          </View>
          <View style={styles.heroContent}>
            <Text style={styles.heroName}>{realixDiscoverProperty.name}</Text>
            <View style={styles.heroAddressRow}>
              <Ionicons name="location" size={12} color={RealixColors.textMuted} />
              <Text style={styles.heroAddress}>{realixDiscoverProperty.location}</Text>
            </View>
            <Text style={styles.heroPrice}>
              <Text style={styles.heroPriceStrong}>${realixDiscoverProperty.nightlyPrice}</Text>/night
            </Text>
          </View>
        </Pressable>

        <View style={styles.grid}>
          {realixDestinations.map((destination) => (
            <View key={destination.id} style={styles.card}>
              <View style={[styles.cardIconWrap, { backgroundColor: destination.color }]}> 
                <Text style={styles.cardIcon}>{destination.emoji}</Text>
              </View>
              <Text style={styles.cardTitle}>{destination.label}</Text>
              <Text style={styles.cardBody}>Boutique villas, countryside homes, and seaside escapes.</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: RealixColors.pageBackground,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    gap: 18,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: RealixColors.textPrimary,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: 22,
    color: RealixColors.textSecondary,
    maxWidth: 260,
  },
  searchButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: RealixColors.screenBackground,
    borderWidth: 1,
    borderColor: RealixColors.border,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 18,
    backgroundColor: RealixColors.screenBackground,
    borderWidth: 1,
    borderColor: RealixColors.border,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  searchText: {
    fontSize: 14,
    color: RealixColors.textMuted,
  },
  chipRow: {
    gap: 10,
    paddingRight: 12,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: RealixColors.screenBackground,
    borderWidth: 1,
    borderColor: RealixColors.border,
  },
  chipActive: {
    backgroundColor: RealixColors.accent,
    borderColor: RealixColors.accent,
  },
  chipText: {
    color: RealixColors.textSecondary,
    fontWeight: '600',
  },
  chipTextActive: {
    color: '#ffffff',
  },
  heroCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: RealixColors.border,
    backgroundColor: RealixColors.screenBackground,
    overflow: 'hidden',
  },
  heroImage: {
    height: 140,
    position: 'relative',
    overflow: 'hidden',
  },
  heroSky: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#9ecfea',
  },
  heroGrass: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 46,
    backgroundColor: '#5aa54b',
  },
  heroRoof: {
    position: 'absolute',
    alignSelf: 'center',
    top: 24,
    width: 0,
    height: 0,
    borderLeftWidth: 78,
    borderRightWidth: 78,
    borderBottomWidth: 50,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#8b7060',
  },
  heroBody: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 24,
    width: 170,
    height: 58,
    backgroundColor: '#e8ddd0',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 14,
    paddingBottom: 10,
  },
  heroWindow: {
    width: 30,
    height: 22,
    borderRadius: 3,
    backgroundColor: '#b8d8f0',
  },
  heroDoor: {
    width: 20,
    height: 30,
    borderRadius: 2,
    backgroundColor: '#8b7060',
  },
  heartDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  heroContent: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 4,
  },
  heroName: {
    fontSize: 16,
    fontWeight: '700',
    color: RealixColors.textPrimary,
  },
  heroAddressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  heroAddress: {
    flex: 1,
    fontSize: 11,
    color: RealixColors.textMuted,
  },
  heroPrice: {
    color: RealixColors.textSecondary,
    fontSize: 13,
  },
  heroPriceStrong: {
    fontSize: 18,
    fontWeight: '700',
    color: RealixColors.textPrimary,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  card: {
    width: '47.8%',
    backgroundColor: RealixColors.screenBackground,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: RealixColors.border,
    padding: 16,
    gap: 10,
  },
  cardIconWrap: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardIcon: {
    fontSize: 24,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: RealixColors.textPrimary,
  },
  cardBody: {
    fontSize: 13,
    lineHeight: 20,
    color: RealixColors.textSecondary,
  },
});