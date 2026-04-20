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

const AMENITY_ICONS: Record<string, string> = {
  'Swimming': '🏊',
  'Wifi': '📶',
  'Restaurant': '🍴',
  'Bar': '🍹',
  'Business': '💼',
  'Parking': '🚗',
  'Gym': '💪',
  'Pool': '🏊',
  'Free Wifi': '📶',
  'AC': '❄️',
  'TV': '📺',
  'Kitchen': '👨‍🍳',
};

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

  const ratingPercentages = [60, 20, 10, 1, 5];
  const displayAmenities = hotel.facilities?.slice(0, 5) || [];

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
          {/* Hero Image with Carousel */}
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
            <Pressable style={styles.favoriteButton}>
              <Ionicons name="heart-outline" size={16} color="white" />
            </Pressable>
          </View>

          {/* Property Info */}
          <View style={styles.section}>
            <Text style={styles.propertyName}>{hotel.hotelName}</Text>
            
            <View style={styles.locationRow}>
              <Ionicons name="location" size={12} color={RealixColors.textMuted} />
              <Text style={styles.locationText}>{hotel.hotelLocation}</Text>
            </View>
          </View>

          {/* About */}
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>About</Text>
            <Text style={styles.description}>{hotel.hotelDescription}</Text>
          </View>

          {/* Popular Amenities */}
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Popular Amenities</Text>
            <View style={styles.amenitiesGrid}>
              {displayAmenities.map((facility, index) => (
                <View key={index} style={styles.amenityItem}>
                  <Text style={styles.amenityIcon}>
                    {AMENITY_ICONS[facility] || '✓'}
                  </Text>
                  <Text style={styles.amenityLabel}>{facility}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.allAmenitiesLink}>All Amenities →</Text>
          </View>

          {/* Gallery */}
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Gallery</Text>
            <View style={styles.galleryContainer}>
              {hotel.hotelImages?.slice(0, 3).map((image, index) => (
                <View key={index} style={styles.galleryItem}>
                  <Image source={{ uri: image }} style={styles.galleryImage} />
                  {index === 2 && hotel.hotelImages.length > 3 && (
                    <View style={styles.galleryOverlay}>
                      <Text style={styles.galleryOverlayText}>+{hotel.hotelImages.length - 3}</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Location */}
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Location</Text>
            <View style={styles.mapPlaceholder}>
              <Ionicons name="location" size={24} color={RealixColors.textMuted} />
            </View>
          </View>

          {/* Reviews */}
          <View style={styles.section}>
            <View style={styles.reviewsHeader}>
              <Text style={styles.sectionHeader}>Reviews</Text>
              <Text style={styles.viewAllLink}>View all reviews</Text>
            </View>

            <View style={styles.ratingDisplay}>
              <Text style={styles.ratingNumber}>{hotel.rating.toFixed(1)}</Text>
              <Text style={styles.stars}>★★★★★</Text>
              <Text style={styles.ratingCount}>({hotel.numberOfReviews})</Text>
            </View>

            {/* Rating Bars */}
            <View style={styles.ratingBars}>
              {[5, 4, 3, 2, 1].map((star, index) => (
                <View key={star} style={styles.ratingBarRow}>
                  <Text style={styles.ratingBarStar}>{star}★</Text>
                  <View style={styles.ratingBarTrack}>
                    <View 
                      style={[
                        styles.ratingBarFill,
                        { 
                          width: `${ratingPercentages[index]}%`,
                          backgroundColor: [
                            '#FFB800',
                            '#FFC940', 
                            '#E8E0C8',
                            '#D8D0B8',
                            '#C8C0A8'
                          ][index]
                        }
                      ]} 
                    />
                  </View>
                  <Text style={styles.ratingBarPercent}>{ratingPercentages[index]}%</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Check-in/Check-out */}
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Check-in & Check-out</Text>
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

          {/* Contact */}
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Contact</Text>
            <View style={styles.contactRow}>
              <Ionicons name="call" size={14} color={RealixColors.accent} />
              <Text style={styles.contactText}>{hotel.contactNumber}</Text>
            </View>
          </View>

          {/* Price */}
          <View style={styles.section}>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Price:</Text>
              <Text style={styles.priceValue}>${hotel.pricePerNight} /night</Text>
            </View>
          </View>
        </ScrollView>

        {/* Bottom CTA Bar */}
        <View style={styles.bottomBar}>
          <Ionicons name="heart-outline" size={16} color="white" />
          <Pressable style={styles.bookButton}>
            <Text style={styles.bookButtonText}>Book Now</Text>
          </Pressable>
        </View>
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
    width: '100%',
    height: 280,
  },
  heroImage: {
    width: '100%',
    height: '100%',
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
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 8,
  },
  propertyName: {
    fontSize: 18,
    fontWeight: '700',
    color: RealixColors.textPrimary,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
  },
  locationText: {
    fontSize: 12,
    color: RealixColors.textMuted,
    flex: 1,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '700',
    color: RealixColors.textPrimary,
    marginTop: 8,
  },
  description: {
    fontSize: 12,
    color: RealixColors.textSecondary,
    lineHeight: 18,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8,
  },
  amenityItem: {
    alignItems: 'center',
    width: '18%',
  },
  amenityIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  amenityLabel: {
    fontSize: 9,
    color: RealixColors.textMuted,
    textAlign: 'center',
  },
  allAmenitiesLink: {
    fontSize: 11,
    color: '#7BC820',
    fontWeight: '600',
    marginTop: 8,
  },
  galleryContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  galleryItem: {
    flex: 1,
    height: 100,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: RealixColors.border,
    position: 'relative',
  },
  galleryImage: {
    width: '100%',
    height: '100%',
  },
  galleryOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  galleryOverlayText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
  },
  mapPlaceholder: {
    width: '100%',
    height: 120,
    backgroundColor: RealixColors.cardBackground,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewAllLink: {
    fontSize: 10,
    color: '#7BC820',
    fontWeight: '600',
  },
  ratingDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
  },
  ratingNumber: {
    fontSize: 22,
    fontWeight: '700',
    color: RealixColors.textPrimary,
  },
  stars: {
    color: '#FFB800',
    fontSize: 14,
    letterSpacing: -1,
  },
  ratingCount: {
    fontSize: 10,
    color: RealixColors.textMuted,
  },
  ratingBars: {
    marginTop: 12,
    gap: 6,
  },
  ratingBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingBarStar: {
    fontSize: 10,
    color: '#FFB800',
    minWidth: 20,
  },
  ratingBarTrack: {
    flex: 1,
    height: 6,
    backgroundColor: '#E8E8E8',
    borderRadius: 3,
    overflow: 'hidden',
  },
  ratingBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  ratingBarPercent: {
    fontSize: 10,
    color: RealixColors.textMuted,
    minWidth: 28,
    textAlign: 'right',
  },
  divider: {
    height: 1,
    backgroundColor: RealixColors.border,
    marginVertical: 16,
  },
  timeRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
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
    fontSize: 10,
    color: RealixColors.textMuted,
    marginBottom: 4,
  },
  timeValue: {
    fontSize: 13,
    fontWeight: '600',
    color: RealixColors.textPrimary,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  contactText: {
    fontSize: 12,
    color: RealixColors.textSecondary,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  priceLabel: {
    fontSize: 12,
    color: RealixColors.textMuted,
  },
  priceValue: {
    fontSize: 16,
    fontWeight: '700',
    color: RealixColors.textPrimary,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: RealixColors.border,
    backgroundColor: RealixColors.screenBackground,
  },
  bookButton: {
    flex: 1,
    backgroundColor: '#7BC820',
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
  },
  bookButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
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