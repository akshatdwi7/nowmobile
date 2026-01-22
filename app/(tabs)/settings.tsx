import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

interface SettingsItemProps {
  icon: any;
  title: string;
  onPress?: () => void;
}

function SettingsItem({ icon, title, onPress }: SettingsItemProps) {
  return (
    <TouchableOpacity style={styles.settingsItem} onPress={onPress}>
      <View style={styles.settingsItemLeft}>
        <IconSymbol name={icon} size={22} color="#000" />
        <ThemedText style={styles.settingsItemText}>{title}</ThemedText>
      </View>
      <IconSymbol name="chevron.right" size={20} color="#999" />
    </TouchableOpacity>
  );
}

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
}

function SettingsSection({ title, children }: SettingsSectionProps) {
  return (
    <View style={styles.section}>
      <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
      <View style={styles.sectionContent}>
        {children}
      </View>
    </View>
  );
}

export default function SettingsScreen() {
  const router = useRouter();
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <IconSymbol name="chevron.left" size={24} color="#000" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.editButton}>
          <IconSymbol name="pencil" size={20} color="#000" />
        </TouchableOpacity>
        
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <View style={styles.profileCircle} />
          </View>
          <ThemedText style={styles.profileName}>Saket Agrawal</ThemedText>
        </View>
      </View>

      <SettingsSection title="Account Settings">
        <SettingsItem icon="person.fill" title="Profile details" />
        <SettingsItem icon="lock.fill" title="Password & Security" />
        <SettingsItem icon="bell.fill" title="Notifications" />
      </SettingsSection>

      <SettingsSection title="Your Space">
        <SettingsItem icon="message.fill" title="Chats" onPress={() => router.push('/chats')} />
        <SettingsItem icon="clock.fill" title="Alignment Index" />
      </SettingsSection>

      <SettingsSection title="Settings">
        <SettingsItem icon="questionmark.circle.fill" title="Help & FAQ" />
        <SettingsItem icon="info.circle.fill" title="About Application" />
      </SettingsSection>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#F7F6F2',
  },
  header: {
    position: 'relative',
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 52,
    left: 16,
    zIndex: 10,
  },
  editButton: {
    position: 'absolute',
    top: 52,
    right: 16,
    zIndex: 10,
  },
  profileSection: {
    alignItems: 'center',
  },
  profileImageContainer: {
    marginBottom: 12,
  },
  profileCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#8B4513',
  },
  profileName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 13,
    color: '#8E8E93',
    marginBottom: 8,
    fontWeight: '400',
    textTransform: 'capitalize',
  },
  sectionContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E5E5',
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingsItemText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '400',
  },
});