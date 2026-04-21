import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import {
  Alert,
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useAuth } from '@/src/context/AuthContext';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import {
  RealixCard,
  RealixHeader,
  RealixScreen,
} from '@/src/components/realix/screen-shell';
import { RealixColors } from '@/src/constants/screens/realix';
import { API_ENDPOINTS_AUTH } from '@/src/constants/api';

export default function EditProfileScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initials = useMemo(() => {
    return name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((item) => item[0]?.toUpperCase())
      .join('');
  }, [name]);

  // Fetch user profile data on component mount
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const token = await SecureStore.getItemAsync('userToken');
        if (!token) {
          setError('No authentication token found');
          return;
        }

        const response = await axios.get(API_ENDPOINTS_AUTH.PROFILE, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          withCredentials: true,
          timeout: 10000,
        });

        if (response.data.success && response.data.data) {
          const userData = response.data.data;
          setName(userData.Name || '');
          setEmail(userData.email || '');
          setNumber(userData.number || '');
        }
      } catch (err: any) {
        console.error('Failed to load profile details', err.message);
        setError('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  // Handle save profile changes
  const handleSaveChanges = useCallback(async () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert('Validation Error', 'Name and email are required fields');
      return;
    }

    try {
      setSaving(true);
      setError(null);

      const token = await SecureStore.getItemAsync('userToken');
      if (!token) {
        Alert.alert('Error', 'Authentication token not found');
        return;
      }

      const updateData = {
        Name: name.trim(),
        email: email.trim(),
        ...(number.trim() && { number: number.trim() }),
      };

      const response = await axios.post(
        API_ENDPOINTS_AUTH.UPDATE_PROFILE,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          withCredentials: true,
          timeout: 10000,
        }
      );

      if (response.data.success) {
        Alert.alert(
          'Success',
          'Profile updated successfully',
          [{ text: 'OK', onPress: () => router.back() }]
        );
      } else {
        Alert.alert('Error', response.data.message || 'Failed to update profile');
      }
    } catch (err: any) {
      console.error('Error updating profile:', err);
      const errorMessage = err.response?.data?.message || 'Failed to update profile. Please try again.';
      Alert.alert('Error', errorMessage);
      setError(errorMessage);
    } finally {
      setSaving(false);
    }
  }, [name, email, number, router]);

  if (loading) {
    return (
      <RealixScreen contentContainerStyle={styles.content}>
        <RealixHeader title="Edit Profile" showBack />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={RealixColors.accent} />
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </RealixScreen>
    );
  }

  return (
    <RealixScreen contentContainerStyle={styles.content}>
      <StatusBar style="dark" />
      <RealixHeader title="Edit Profile" showBack />

      <RealixCard style={styles.card}>
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>{initials || 'U'}</Text>
            </View>
            <Pressable style={styles.avatarBadge}>
              <Ionicons name="create-outline" size={14} color="#ffffff" />
            </Pressable>
          </View>
          <Text style={styles.name}>{name || 'User'}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>

        {error && (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle-outline" size={16} color={RealixColors.danger} />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <View style={styles.formGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            style={styles.input}
            placeholder="Enter your name"
            editable={!saving}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.input}
            placeholder="Enter your email"
            editable={!saving}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            value={number}
            onChangeText={setNumber}
            keyboardType="phone-pad"
            style={styles.input}
            placeholder="Enter your phone number"
            editable={!saving}
          />
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.saveButton,
            pressed && styles.pressed,
            saving && styles.disabledButton,
          ]}
          onPress={handleSaveChanges}
          disabled={saving}
        >
          {saving ? (
            <>
              <ActivityIndicator color="#ffffff" style={{ marginRight: 8 }} />
              <Text style={styles.saveButtonText}>Saving...</Text>
            </>
          ) : (
            <Text style={styles.saveButtonText}>Save Changes</Text>
          )}
        </Pressable>
      </RealixCard>
    </RealixScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: RealixColors.textSecondary,
  },
  card: {
    paddingHorizontal: 18,
    paddingVertical: 22,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarWrap: {
    marginBottom: 10,
  },
  avatarCircle: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: '#8b5cf6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '700',
  },
  avatarBadge: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: RealixColors.accentToggle,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: RealixColors.textPrimary,
  },
  email: {
    marginTop: 4,
    fontSize: 13,
    color: RealixColors.textMuted,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
    gap: 8,
  },
  errorText: {
    flex: 1,
    fontSize: 13,
    color: RealixColors.danger,
    fontWeight: '500',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: RealixColors.textCaption,
    marginBottom: 8,
  },
  input: {
    minHeight: 52,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: RealixColors.inputBorder,
    backgroundColor: '#ffffff',
    paddingHorizontal: 14,
    fontSize: 15,
    color: RealixColors.textPrimary,
  },
  textArea: {
    minHeight: 96,
    paddingTop: 14,
    textAlignVertical: 'top',
  },
  passwordWrap: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 48,
  },
  eyeButton: {
    position: 'absolute',
    right: 14,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  saveButton: {
    marginTop: 6,
    minHeight: 54,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: RealixColors.accent,
  },
  disabledButton: {
    opacity: 0.6,
  },
  saveButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
  },
  pressed: {
    opacity: 0.8,
  },
});