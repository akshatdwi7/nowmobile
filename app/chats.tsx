import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

interface ChatItemProps {
  name: string;
  message: string;
  time: string;
  unreadCount?: number;
  avatar?: string;
  initials?: string;
  avatarColor?: string;
  isOnline?: boolean;
}

function ChatItem({ name, message, time, unreadCount, initials, avatarColor, isOnline }: ChatItemProps) {
  return (
    <TouchableOpacity style={styles.chatItem}>
      <View style={styles.avatarContainer}>
        <View style={[styles.avatar, { backgroundColor: avatarColor || '#8B4513' }]}>
          {initials && <ThemedText style={styles.avatarText}>{initials}</ThemedText>}
        </View>
        {isOnline && <View style={styles.onlineBadge} />}
      </View>
      
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <ThemedText style={styles.chatName}>{name}</ThemedText>
          <ThemedText style={styles.chatTime}>{time}</ThemedText>
        </View>
        <View style={styles.chatMessageRow}>
          <ThemedText style={styles.chatMessage} numberOfLines={1}>{message}</ThemedText>
          {unreadCount && unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <ThemedText style={styles.unreadText}>{unreadCount}</ThemedText>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function ChatsScreen() {
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <IconSymbol name="chevron.left" size={24} color="#000" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Chats</ThemedText>
      </View>

      <View style={styles.searchContainer}>
        <IconSymbol name="magnifying.glass" size={18} color="#8E8E93" />
        <TextInput
          style={styles.searchInput}
          placeholder="Type in the name.."
          placeholderTextColor="#C7C7CC"
        />
      </View>

      <ScrollView style={styles.chatList}>
        <ChatItem
          name="Athalia Putri"
          message="Good morning, did you sleep well?"
          time="Today"
          unreadCount={1}
          initials="AP"
          avatarColor="#8B4513"
          isOnline={true}
        />
        <ChatItem
          name="Raki Devon"
          message="How is it going?"
          time="17/6"
          initials="RD"
          avatarColor="#2B7EFF"
        />
        <ChatItem
          name="Erlan Sadewa"
          message="Aight, noted"
          time="17/6"
          unreadCount={1}
          initials="ES"
          avatarColor="#8B4513"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F6F2',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 16,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    top: 60,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#000',
  },
  chatList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  chatItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  onlineBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#34C759',
    borderWidth: 2,
    borderColor: '#fff',
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  chatTime: {
    fontSize: 13,
    color: '#8E8E93',
  },
  chatMessageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chatMessage: {
    fontSize: 14,
    color: '#8E8E93',
    flex: 1,
  },
  unreadBadge: {
    backgroundColor: '#5856D6',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
    marginLeft: 8,
  },
  unreadText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});
