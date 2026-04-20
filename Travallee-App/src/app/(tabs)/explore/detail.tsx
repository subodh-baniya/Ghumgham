import React, { useState, useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View, Image, ActivityIndicator, PanResponder } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RealixColors } from '@/src/constants/screens/realix';
import axios from 'axios';
import { API_ENDPOINTS_HOTEL } from '@/src/constants/api';

interface HotelDetail {
  _id: string;
  hotelName: string;
  hotelDescription: string;
  hotelLocation: string;
  hotelImages: string[];
  propertyType: string;
  facilities: string[];
  checkinTime: string;
  checkoutTime: string;
  contactNumber: string;
  pricePerNight: number;
  rating: number;
  numberOfReviews: number;
  ownerName: string;
  isFeatured: boolean;
  verified: boolean;
  rooms: any[];
  createdAt: string;
  updatedAt: string;
}


export default function HotelDetailScreen() {
  const router = useRouter();
  const { hotelId } = useLocalSearchParams();
  const [hotel, setHotel] = useState<HotelDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderRelease: (evt, gestureState) => {
        // Left swipe (negative dx means moving left)
        if (gestureState.dx < -50) {
          router.back();
        }
      },
    })
  ).current;

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        if (!hotelId) {
          setError('Hotel ID not found');
          setLoading(false);
          return;
        }

        // Use GET_HOTEL_BY_ID endpoint: /api/v1/hotels/{hotelId}
        const HOTEL_DETAIL_URL = API_ENDPOINTS_HOTEL.GET_HOTEL_BY_ID.replace(':id', hotelId as string);
        
        const response = await axios.get(HOTEL_DETAIL_URL, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          timeout: 15000,
        });

        if (response.data.success && response.data.data) {
          setHotel(response.data.data);
        } else if (response.data._id) {
          // Handle case where response is directly the hotel object
          setHotel(response.data);
        } else {
          setError('Failed to load hotel data');
        }
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || 'Failed to load hotel details');
      } finally {
        setLoading(false);
      }
    };

    fetchHotelData();
  }, [hotelId]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar style="light" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={RealixColors.accent} />
        </View>
      </SafeAreaView>
    );
  }

  if (error || !hotel) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar style="light" />
        <View style={styles.header}>
          <Pressable style={styles.headerIcon} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={18} color={RealixColors.textPrimary} />
          </Pressable>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error || 'Hotel not found'}</Text>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="light" />
      <View style={styles.swipeContainer} {...panResponder.panHandlers}>
        <View style={styles.header}>
        <Pressable style={styles.headerIcon} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={18} color={RealixColors.textPrimary} />
        </Pressable>
        <View style={styles.headerRight}>
          <Pressable style={styles.headerIcon}>
            <Ionicons name="heart-outline" size={16} color={RealixColors.textSecondary} />
          </Pressable>
          <Pressable style={styles.headerIcon}>
            <Ionicons name="ellipsis-horizontal" size={16} color={RealixColors.textSecondary} />
          </Pressable>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Image Carousel */}
        <View style={styles.imageCarousel}>
          {hotel.hotelImages && hotel.hotelImages.length > 0 ? (
            <>
              <Image
                source={{ uri: hotel.hotelImages[currentImageIndex] }}
                style={styles.heroImage}
              />
              {hotel.hotelImages.length > 1 && (
                <View style={styles.imageIndicators}>
                  {hotel.hotelImages.map((_, index) => (
                    <View
                      key={index}
                      style={[
                        styles.indicator,
                        index === currentImageIndex && styles.indicatorActive,
                      ]}
                    />
                  ))}
                </View>
              )}
            </>
          ) : (
            <View style={styles.noImageContainer}>
              <Ionicons name="image-outline" size={40} color={RealixColors.textMuted} />
            </View>
          )}
        </View>

        {/* Hotel Info */}
        <View style={styles.section}>
          <Text style={styles.name}>{hotel.hotelName}</Text>
          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{hotel.propertyType}</Text>
            </View>
            {hotel.verified && (
              <View style={[styles.badge, { backgroundColor: '#27ae60' }]}>
                <Ionicons name="checkmark-circle" size={12} color="#fff" />
                <Text style={styles.badgeText}>Verified</Text>
              </View>
            )}
            {hotel.isFeatured && (
              <View style={[styles.badge, { backgroundColor: RealixColors.orange }]}>
                <Text style={styles.badgeText}>Featured</Text>
              </View>
            )}
          </View>
          <View style={styles.locationRow}>
            <Ionicons name="location" size={12} color={RealixColors.textMuted} />
            <Text style={styles.locationText}>{hotel.hotelLocation}</Text>
          </View>
        </View>

        {/* Rating */}
        <View style={styles.section}>
          <View style={styles.ratingContainer}>
            <View style={styles.ratingLeft}>
              <Ionicons name="star" size={18} color={RealixColors.orange} />
              <Text style={styles.ratingNumber}>{hotel.rating.toFixed(1)}</Text>
              <Text style={styles.ratingCount}>({hotel.numberOfReviews} reviews)</Text>
            </View>
            <View style={styles.priceBox}>
              <Text style={styles.priceLabel}>From</Text>
              <Text style={styles.price}>${hotel.pricePerNight}</Text>
              <Text style={styles.priceUnit}>/night</Text>
            </View>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.about}>{hotel.hotelDescription}</Text>
        </View>

        {/* Facilities */}
        {hotel.facilities && hotel.facilities.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Facilities</Text>
            <View style={styles.facilitiesGrid}>
              {hotel.facilities.map((facility, index) => (
                <View key={index} style={styles.facilityItem}>
                  <Ionicons name="checkmark-circle" size={14} color={RealixColors.accent} />
                  <Text style={styles.facilityText}>{facility}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Check-in/Check-out */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Check-in & Check-out</Text>
          <View style={styles.timeRow}>
            <View style={styles.timeBox}>
              <Text style={styles.timeLabel}>Check-in</Text>
              <Text style={styles.timeValue}>{hotel.checkinTime}</Text>
            </View>
            <View style={styles.timeBox}>
              <Text style={styles.timeLabel}>Check-out</Text>
              <Text style={styles.timeValue}>{hotel.checkoutTime}</Text>
            </View>
          </View>
        </View>

        {/* Contact Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact</Text>
          <View style={styles.contactRow}>
            <Ionicons name="call" size={14} color={RealixColors.accent} />
            <Text style={styles.contactText}>{hotel.contactNumber}</Text>
          </View>
          <View style={styles.contactRow}>
            <Ionicons name="person" size={14} color={RealixColors.accent} />
            <Text style={styles.contactText}>{hotel.ownerName}</Text>
          </View>
        </View>

        {/* Rooms */}
        {hotel.rooms && hotel.rooms.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Available Rooms</Text>
            <Text style={styles.roomCount}>{hotel.rooms.length} rooms available</Text>
          </View>
        )}

        {/* CTA Buttons */}
        <View style={styles.ctaContainer}>
          <Pressable style={styles.callButton}>
            <Ionicons name="call" size={16} color="#fff" />
            <Text style={styles.callButtonText}>Call Hotel</Text>
          </Pressable>
          <Pressable style={styles.bookButton}>
            <Text style={styles.bookButtonText}>Book Now</Text>
          </Pressable>
        </View>
      </ScrollView>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: RealixColors.pageBackground,
  },
  swipeContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: RealixColors.pageBackground,
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: RealixColors.cardBackground,
  },
  headerRight: {
    flexDirection: 'row',
    gap: 8,
  },
  content: {
    paddingBottom: 32,
  },
  imageCarousel: {
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: 280,
    backgroundColor: RealixColors.border,
  },
  imageIndicators: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  indicatorActive: {
    backgroundColor: '#fff',
    width: 20,
  },
  noImageContainer: {
    width: '100%',
    height: 280,
    backgroundColor: RealixColors.cardBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: RealixColors.textPrimary,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: RealixColors.cardBackground,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: RealixColors.textSecondary,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
  },
  locationText: {
    fontSize: 13,
    color: RealixColors.textSecondary,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: RealixColors.cardBackground,
    borderRadius: 16,
    marginHorizontal: 20,
  },
  ratingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ratingNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: RealixColors.textPrimary,
  },
  ratingCount: {
    fontSize: 11,
    color: RealixColors.textMuted,
  },
  priceBox: {
    alignItems: 'flex-end',
  },
  priceLabel: {
    fontSize: 11,
    color: RealixColors.textMuted,
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: RealixColors.accent,
  },
  priceUnit: {
    fontSize: 11,
    color: RealixColors.textMuted,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: RealixColors.textPrimary,
  },
  about: {
    fontSize: 13,
    lineHeight: 20,
    color: RealixColors.textSecondary,
  },
  facilitiesGrid: {
    gap: 8,
  },
  facilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 6,
  },
  facilityText: {
    fontSize: 13,
    color: RealixColors.textSecondary,
  },
  timeRow: {
    flexDirection: 'row',
    gap: 12,
  },
  timeBox: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: RealixColors.cardBackground,
    borderRadius: 12,
    alignItems: 'center',
  },
  timeLabel: {
    fontSize: 11,
    color: RealixColors.textMuted,
    marginBottom: 4,
  },
  timeValue: {
    fontSize: 14,
    fontWeight: '600',
    color: RealixColors.textPrimary,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
  },
  contactText: {
    fontSize: 13,
    color: RealixColors.textSecondary,
  },
  roomCount: {
    fontSize: 13,
    color: RealixColors.textMuted,
  },
  ctaContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 12,
    marginBottom: 20,
  },
  callButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: '#e74c3c',
  },
  callButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  bookButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: RealixColors.accent,
  },
  bookButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 14,
    color: RealixColors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  backButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: RealixColors.accent,
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
});