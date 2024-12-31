import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, ScrollView } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useTheme } from '../../context/ThemeContext';
import { themeStyles } from '../../context/themeStyles';

interface Challenge {
  id: string;
  title: string;
  progress: number; // Progress percentage (0-1)
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Athlete';
}

const challenges: Challenge[] = [
  { id: '1', title: '10K Steps Daily', progress: 0.7, level: 'Intermediate' },
  { id: '2', title: '30-Day Yoga', progress: 0.5, level: 'Beginner' },
  { id: '3', title: 'Marathon Training', progress: 0.85, level: 'Athlete' },
];

const ChallengesPage: React.FC = () => {
  const { theme } = useTheme();
  const currentTheme = themeStyles[theme];

  const renderChallenge = ({ item }: { item: Challenge }) => (
    <View style={[styles.challengeCard, { backgroundColor: currentTheme.cardBackground }]}>
      <Text style={[styles.challengeTitle, { color: currentTheme.text }]}>{item.title}</Text>
      <Text style={[styles.level, { color: currentTheme.subtext }]}>Level: {item.level}</Text>
      <ProgressBar progress={item.progress} color={currentTheme.primary} style={styles.progressBar} />
      <Text style={[styles.progressText, { color: currentTheme.subtext }]}>{Math.round(item.progress * 100)}% Completed</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: currentTheme.background }]}>
      <Text style={[styles.pageTitle, { color: currentTheme.text }]}>Your Current Challenges</Text>

      <FlatList
        data={challenges}
        renderItem={renderChallenge}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        scrollEnabled={false} // Let the ScrollView handle scrolling
      />

      <View style={styles.chartsContainer}>
        <Text style={[styles.chartsTitle, { color: currentTheme.text }]}>Your Progress Charts</Text>
        <View style={[styles.chartPlaceholder, { backgroundColor: currentTheme.placeholder }]}>
          <Text style={[styles.chartPlaceholderText, { color: currentTheme.subtext }]}>[Charts will be here]</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  challengeCard: {
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  level: {
    fontSize: 14,
    marginBottom: 10,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  progressText: {
    fontSize: 12,
  },
  chartsContainer: {
    marginTop: 30,
  },
  chartsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chartPlaceholder: {
    height: Dimensions.get('window').width * 0.5,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartPlaceholderText: {
    fontSize: 14,
  },
});

export default ChallengesPage;
