import React, { useState, useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { 
  Pressable, ScrollView, StyleSheet, Text, View, Image, 
  ActivityIndicator, PanResponder, Dimensions 
} from 'react-native';
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

const getAmenityIcon = (facility: string): string => {
  const lowerFacility = facility.toLowerCase();
  const iconMap: Record<string, string> = {
    'swimming': '☀',
    'wifi': '⬢',
    'free wifi': '⬢',
    'restaurant': '🍴',
    'bar': '🍸',
    'business': '💼',
    'parking': '⊟',
    'gym': '⊗',
    'pool': '☀',
    'ac': '⊙',
    'tv': '▭',
    'kitchen': '⌂',
    'air conditioning': '⊙',
  };
  return iconMap[lowerFacility] || '·';
};

export default function HotelDetailScreen() {
  const router = useRouter();
  const { hotelId } = useLocalSearchParams();
  const [hotel, setHotel] = useState<HotelDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // Only activate swipe when sufficient horizontal movement
        return Math.abs(gestureState.dx) > 30 && Math.abs(gestureState.dy) < 10;
      },
      onPanResponderRelease: (evt, gestureState) => {
        // Swipe left only
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
        <View style={styles.headerBar}>
          <Pressable style={styles.headerBtn} onPress={() => router.back()}>
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

  const ratingPercentages = [60, 20, 10, 1, 5];
  const displayAmenities = hotel.facilities?.slice(0, 5) || [];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="light" />
      <View style={styles.headerBar}>
        <Pressable style={styles.headerBtn} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={18} color={RealixColors.textPrimary} />
        </Pressable>
        <View style={styles.headerRight}>
          <Pressable style={styles.headerBtn}>
            <Ionicons name="heart-outline" size={16} color={RealixColors.textSecondary} />
          </Pressable>
          <Pressable style={styles.headerBtn}>
            <Ionicons name="ellipsis-horizontal" size={16} color={RealixColors.textSecondary} />
          </Pressable>
        </View>
      </View>

      <ScrollView 
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        {...panResponder.panHandlers}
      >
        {/* Hero Image */}
        <View style={styles.heroSection}>
          {hotel.hotelImages && hotel.hotelImages.length > 0 ? (
            <Image
              source={{ uri: hotel.hotelImages[currentImageIndex] }}
              style={styles.heroImage}
            />
          ) : (
            <View style={styles.noImage}>
              <Ionicons name="image-outline" size={40} color={RealixColors.textMuted} />
            </View>
          )}
          
          <Pressable style={styles.favoriteBtn}>
            <Ionicons name="heart-outline" size={14} color="#fff" />
          </Pressable>

          {hotel.hotelImages && hotel.hotelImages.length > 1 && (
            <View style={styles.dots}>
              {hotel.hotelImages.map((_, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.dot,
                    idx === currentImageIndex && styles.dotActive,
                  ]}
                />
              ))}
            </View>
          )}
        </View>

        {/* Body Content */}
        <View style={styles.bodyContent}>
          
          {/* Name & Location */}
          <Text style={styles.propName}>{hotel.hotelName}</Text>
          <View style={styles.locRow}>
            <View style={styles.pin} />
            <Text style={styles.locText}>{hotel.hotelLocation}</Text>
          </View>

          {/* About */}
          <Text style={styles.secTitle}>About</Text>
          <Text style={styles.aboutText}>{hotel.hotelDescription}</Text>

          {/* Amenities */}
          <Text style={styles.secTitle}>Popular Amenities</Text>
          <View style={styles.amenRow}>
            {displayAmenities.map((facility, idx) => (
              <View key={idx} style={styles.amenity}>
                <View style={styles.amenIcon}>
                  <Text style={styles.amenIconText}>{getAmenityIcon(facility)}</Text>
                </View>
                <Text style={styles.amenLabel}>{facility}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.allLink}>All Amenities →</Text>

          {/* Gallery */}
          <Text style={styles.secTitle}>Gallery</Text>
          <View style={styles.galleryRow}>
            {hotel.hotelImages?.slice(0, 3).map((img, idx) => (
              <View key={idx} style={styles.thumb}>
                <Image source={{ uri: img }} style={styles.thumbImg} />
                {idx === 2 && hotel.hotelImages.length > 3 && (
                  <View style={styles.thumbOverlay}>
                    <Text style={styles.overlayText}>+{hotel.hotelImages.length - 3}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>

          {/* Map */}
          <Text style={styles.secTitle}>Location</Text>
          <View style={styles.mapBox}>
            <View style={styles.mapPin} />
          </View>

          {/* Reviews */}
          <View style={styles.revHead}>
            <Text style={styles.secTitle}>Reviews</Text>
            <Text style={styles.revAll}>View all reviews</Text>
          </View>
          <View style={styles.revScore}>
            <Text style={styles.bigNum}>{hotel.rating.toFixed(1)}</Text>
            <Text style={styles.stars}>★★★★★</Text>
            <Text style={styles.revCount}>({hotel.numberOfReviews})</Text>
          </View>

          {/* Rating Bars */}
          {[5, 4, 3, 2, 1].map((star, idx) => (
            <View key={star} style={styles.barRow}>
              <Text style={styles.barLbl}>{star}</Text>
              <View style={styles.barTrack}>
                <View
                  style={[
                    styles.barFill,
                    {
                      width: `${ratingPercentages[idx]}%`,
                      backgroundColor: [
                        '#FFB800',
                        '#FFC940',
                        '#E8E0C8',
                        '#D8D0B8',
                        '#C8C0A8',
                      ][idx],
                    },
                  ]}
                />
              </View>
              <Text style={styles.barPct}>{ratingPercentages[idx]}%</Text>
            </View>
          ))}

          {/* Divider */}
          <View style={styles.dividerLine} />

          {/* Price */}
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Price:</Text>
            <Text style={styles.priceValue}>${hotel.pricePerNight} /night</Text>
          </View>

        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <Pressable style={styles.heartOutline}>
          <Ionicons name="heart-outline" size={14} color="#fff" />
        </Pressable>
        <Pressable style={styles.bookBtn}>
          <Text style={styles.bookTxt}>Book Now</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: RealixColors.pageBackground,
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: RealixColors.cardBackground,
  },
  headerBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: RealixColors.rowBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 6,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  heroSection: {
    width: '100%',
    height: 160,
    backgroundColor: RealixColors.border,
    position: 'relative',
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  noImage: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: RealixColors.border,
  },
  favoriteBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dots: {
    position: 'absolute',
    bottom: 8,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  dotActive: {
    width: 14,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  bodyContent: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  propName: {
    fontSize: 16,
    fontWeight: '700',
    color: RealixColors.textPrimary,
    marginBottom: 2,
  },
  locRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginBottom: 8,
  },
  pin: {
    width: 8,
    height: 10,
    borderRadius: 4,
    borderWidth: 1.2,
    borderColor: RealixColors.textMuted,
    flex: 0,
  },
  locText: {
    fontSize: 11,
    color: RealixColors.textSecondary,
    flex: 1,
  },
  secTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: RealixColors.textPrimary,
    marginTop: 6,
    marginBottom: 4,
  },
  aboutText: {
    fontSize: 11,
    color: RealixColors.textSecondary,
    lineHeight: 14,
    marginBottom: 8,
  },
  amenRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 4,
    flexWrap: 'wrap',
  },
  amenity: {
    alignItems: 'center',
    width: '20%',
  },
  amenIcon: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: RealixColors.rowBackground,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  amenIconText: {
    fontSize: 15,
    color: RealixColors.textPrimary,
  },
  amenLabel: {
    fontSize: 9,
    color: RealixColors.textMuted,
    textAlign: 'center',
    fontWeight: '500',
  },
  allLink: {
    fontSize: 10,
    color: RealixColors.accent,
    fontWeight: '600',
    marginBottom: 8,
  },
  galleryRow: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 8,
  },
  thumb: {
    flex: 1,
    height: 40,
    borderRadius: 5,
    backgroundColor: RealixColors.border,
    overflow: 'hidden',
    position: 'relative',
  },
  thumbImg: {
    width: '100%',
    height: '100%',
  },
  thumbOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.65)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  mapBox: {
    width: '100%',
    height: 65,
    backgroundColor: RealixColors.rowBackground,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  mapPin: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: RealixColors.accent,
    borderWidth: 1.5,
    borderColor: RealixColors.cardBackground,
  },
  revHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  revAll: {
    fontSize: 7.5,
    color: RealixColors.accent,
    fontWeight: '600',
  },
  revScore: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 7,
  },
  bigNum: {
    fontSize: 18,
    fontWeight: '700',
    color: RealixColors.textPrimary,
  },
  stars: {
    fontSize: 10,
    color: '#FFB800',
    letterSpacing: 0.5,
  },
  revCount: {
    fontSize: 10,
    color: RealixColors.textSecondary,
    fontWeight: '500',
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 3,
  },
  barLbl: {
    fontSize: 10,
    color: RealixColors.textSecondary,
    width: 10,
    textAlign: 'right',
    fontWeight: '500',
  },
  barTrack: {
    flex: 1,
    height: 5,
    backgroundColor: RealixColors.rowBackground,
    borderRadius: 2.5,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 2.5,
  },
  barPct: {
    fontSize: 10,
    color: RealixColors.textSecondary,
    width: 24,
    textAlign: 'right',
    fontWeight: '500',
  },
  dividerLine: {
    height: 1,
    backgroundColor: RealixColors.border,
    marginVertical: 8,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  priceLabel: {
    fontSize: 9,
    color: RealixColors.textSecondary,
  },
  priceValue: {
    fontSize: 12,
    fontWeight: '700',
    color: RealixColors.textPrimary,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: RealixColors.border,
    backgroundColor: RealixColors.cardBackground,
  },
  heartOutline: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.2,
    borderColor: RealixColors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookBtn: {
    flex: 1,
    backgroundColor: RealixColors.accent,
    borderRadius: 18,
    paddingVertical: 8.5,
    alignItems: 'center',
  },
  bookTxt: {
    fontSize: 12,
    fontWeight: '700',
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
    fontSize: 13,
    color: RealixColors.textSecondary,
    textAlign: 'center',
    marginBottom: 16,
  },
  backButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: RealixColors.accent,
  },
  backButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
  },
});