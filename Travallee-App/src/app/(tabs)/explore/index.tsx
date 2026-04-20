import React, { useState } from 'react';
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

type TabType = 'search' | 'favorites' | 'bookings' | 'reviews';

type IconName = 'search' | 'heart' | 'calendar' | 'star';

const tabs: Array<{ id: TabType; label: string; icon: IconName }> = [
  { id: 'search', label: 'Search', icon: 'search' },
  { id: 'favorites', label: 'Favorites', icon: 'heart' },
  { id: 'bookings', label: 'Bookings', icon: 'calendar' },
  { id: 'reviews', label: 'Reviews', icon: 'star' },
] as const;

export default function ExploreScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('search');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Discover</Text>
            <Text style={styles.subtitle}>Find your next stay and jump into booking in one flow.</Text>
          </View>
          <View style={styles.headerActions}>
            <Pressable style={styles.searchButton} onPress={() => router.push('/(tabs)/explore/search')}>
              <Ionicons name="options-outline" size={18} color={RealixColors.textPrimary} />
            </Pressable>
            <Pressable style={styles.backButton} onPress={() => router.replace('/(tabs)')}>
              <Ionicons name="arrow-back" size={18} color={RealixColors.textPrimary} />
            </Pressable>
          </View>
        </View>

        <Pressable style={styles.searchBar} onPress={() => router.push('/(tabs)/explore/search')}>
          <Ionicons name="search" size={18} color={RealixColors.textMuted} />
          <Text style={styles.searchText}>Search by city, country, or property</Text>
        </Pressable>

        {/* Tab Navigation */}
        <View style={styles.tabBar}>
          {tabs.map((tab) => (
            <Pressable
              key={tab.id}
              style={[styles.tabItem, activeTab === tab.id && styles.tabItemActive]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Ionicons
                name={tab.icon}
                size={16}
                color={activeTab === tab.id ? RealixColors.accent : RealixColors.textMuted}
              />
              <Text
                style={[
                  styles.tabLabel,
                  activeTab === tab.id && styles.tabLabelActive,
                ]}
              >
                {tab.label}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Tab Content */}
        {activeTab === 'search' && (
          <>
        <View style={styles.chipRow}>
          {filterChips.map((chip, index) => (
            <Pressable key={chip} style={[styles.chip, index === 0 && styles.chipActive]}>
              <Text style={[styles.chipText, index === 0 && styles.chipTextActive]}>{chip}</Text>
            </Pressable>
          ))}
        </View>

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

        <View style={styles.quickActions}>
          <Pressable style={styles.quickCard} onPress={() => router.push('/(tabs)/explore/map')}>
            <Ionicons name="map-outline" size={20} color={RealixColors.accent} />
            <Text style={styles.quickTitle}>Map View</Text>
            <Text style={styles.quickText}>Preview listing pins and price hotspots.</Text>
          </Pressable>
          <Pressable style={styles.quickCard} onPress={() => router.push('/(tabs)/explore/filter-price')}>
            <Ionicons name="options-outline" size={20} color={RealixColors.accent} />
            <Text style={styles.quickTitle}>Filters</Text>
            <Text style={styles.quickText}>Try pricing, language, and search filter states.</Text>
          </Pressable>
        </View>

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
          </>
        )}

        {/* Favorites Tab */}
        {activeTab === 'favorites' && (
          <View style={styles.emptyState}>
            <Ionicons name="heart-outline" size={48} color={RealixColors.textMuted} />
            <Text style={styles.emptyTitle}>No favorites yet</Text>
            <Text style={styles.emptyText}>Save your favorite properties to view them here</Text>
          </View>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <View style={styles.emptyState}>
            <Ionicons name="calendar-outline" size={48} color={RealixColors.textMuted} />
            <Text style={styles.emptyTitle}>No bookings yet</Text>
            <Text style={styles.emptyText}>Your upcoming bookings will appear here</Text>
          </View>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <View style={styles.emptyState}>
            <Ionicons name="star-outline" size={48} color={RealixColors.textMuted} />
            <Text style={styles.emptyTitle}>No reviews yet</Text>
            <Text style={styles.emptyText}>Leave reviews for properties you've stayed at</Text>
          </View>
        )}
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
  headerActions: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
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
    backgroundColor: RealixColors.cardBackground,
    borderWidth: 1,
    borderColor: RealixColors.border,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: RealixColors.cardBackground,
    borderWidth: 1,
    borderColor: RealixColors.border,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 18,
    backgroundColor: RealixColors.inputBackground,
    borderWidth: 1,
    borderColor: RealixColors.inputBorder,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  searchText: {
    fontSize: 14,
    color: RealixColors.textMuted,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginVertical: 4,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: RealixColors.cardBackground,
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
    backgroundColor: RealixColors.cardBackground,
    overflow: 'hidden',
  },
  heroImage: {
    height: 140,
    position: 'relative',
    overflow: 'hidden',
  },
  heroSky: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0d1a2e',
  },
  heroGrass: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 46,
    backgroundColor: '#16280f',
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
    borderBottomColor: '#161616',
  },
  heroBody: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 24,
    width: 170,
    height: 58,
    backgroundColor: '#222222',
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
    backgroundColor: '#1e3a5c',
  },
  heroDoor: {
    width: 20,
    height: 30,
    borderRadius: 2,
    backgroundColor: '#111111',
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
    backgroundColor: 'rgba(0,0,0,0.55)',
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
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  quickCard: {
    flex: 1,
    backgroundColor: RealixColors.cardBackground,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: RealixColors.border,
    padding: 14,
    gap: 8,
  },
  quickTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: RealixColors.textPrimary,
  },
  quickText: {
    fontSize: 12,
    lineHeight: 18,
    color: RealixColors.textSecondary,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  card: {
    width: '47.8%',
    backgroundColor: RealixColors.cardBackground,
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
  tabBar: {
    flexDirection: 'row',
    gap: 2,
    backgroundColor: RealixColors.cardBackground,
    borderRadius: 12,
    padding: 4,
    marginVertical: 8,
  },
  tabItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  tabItemActive: {
    backgroundColor: RealixColors.accent,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: RealixColors.textMuted,
  },
  tabLabelActive: {
    color: '#000000',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    gap: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: RealixColors.textPrimary,
  },
  emptyText: {
    fontSize: 14,
    color: RealixColors.textSecondary,
    textAlign: 'center',
    maxWidth: 280,
  },
});