import { useOnboarding } from '@/hooks/use-onboarding';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const { width, height } = Dimensions.get('window');

// Multiple choice options for first question
const QUESTION_ONE_OPTIONS = [
  'Grounded',
  'Confident',
  'Kind',
  'Independent',
  'Creative',
  'Conscious',
  'Balanced',
];

// Multiple choice options for second question
const QUESTION_TWO_OPTIONS = [
  'Growth',
  'Stability',
  'Expression',
];

// Multiple choice options for third question
const QUESTION_THREE_OPTIONS = [
  'Calm',
  'Confidence',
  'Inspiration',
  'Joy',
  'Connection',
  'Freedom',
  'Resilient',
];

// Multiple choice options for fourth question
const QUESTION_FOUR_OPTIONS = [
  'Alone',
  'Creating',
  'With Friends',
  'Exploring',
];

// Multiple choice options for fifth question
const QUESTION_FIVE_OPTIONS = [
  'Art',
  'Writing',
  'Music',
  'Styling',
  'Content',
  'Not Sure Yet',
];

// Multiple choice options for seventh question
const QUESTION_SEVEN_OPTIONS = [
  'Fun',
  'Career',
  'Way to Connect',
];

// 25 Onboarding questions/screens
const ONBOARDING_QUESTIONS = [
  {
    id: 1,
    question: 'What 3 words best describe the kind of persoon you want to be?',
    image: require('@/assets/illus/one.png'),
    color: '#F7F6F2',
    type: 'multipleChoice',
    options: QUESTION_ONE_OPTIONS,
    maxSelections: 3,
  },
  {
    id: 2,
    question: 'Which matters more to you right now?',
    image: require('@/assets/illus/two.png'),
    color: '#F7F6F2',
    type: 'multipleChoice',
    options: QUESTION_TWO_OPTIONS,
    maxSelections: 1,
  },
  {
    id: 3,
    question: 'What emotions do you want more of in your daily life?',
    image: require('@/assets/illus/three.png'),
    color: '#F7F6F2',
    type: 'multipleChoice',
    options: QUESTION_THREE_OPTIONS,
    maxSelections: 3,
  },
  {
    id: 4,
    question: 'When do you feel most like yourself?',
    image: require('@/assets/illus/four.png'),
    color: '#F7F6F2',
    type: 'multipleChoice',
    options: QUESTION_FOUR_OPTIONS,
    maxSelections: 1,
  },
  {
    id: 5,
    question: 'How do you currently express yourself?',
    image: require('@/assets/illus/five.png'),
    color: '#F7F6F2',
    type: 'multipleChoice',
    options: QUESTION_FIVE_OPTIONS,
    maxSelections: 2,
  },
  // Add more until 25...
  {
    id: 6,
    question: "If time or money wasn't a constraint, what would you create or build?",
    image: require('@/assets/illus/six.png'),
    color: '#F7F6F2',
    type: 'textInput',
  },
  {
    id: 7,
    question: 'How do you see Creativity?',
    image: require('@/assets/illus/seven.png'),
    color: '#F7F6F2',
    type: 'multipleChoice',
    options: QUESTION_SEVEN_OPTIONS,
    maxSelections: 1,
  },
  {
    id: 25,
    question: 'Last question here?',
    image: require('@/assets/illus/first.png'),
    color: '#F7F6F2',
  },
];

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: string[] }>({});
  const [textInputs, setTextInputs] = useState<{ [key: number]: string }>({});
  const router = useRouter();
  const { completeOnboarding } = useOnboarding();

  const handleSelectOption = (option: string) => {
    const currentSelected = selectedOptions[currentStep] || [];
    const step = ONBOARDING_QUESTIONS[currentStep];
    const maxSelections = step.maxSelections || 1;

    if (currentSelected.includes(option)) {
      setSelectedOptions({
        ...selectedOptions,
        [currentStep]: currentSelected.filter(o => o !== option),
      });
    } else if (currentSelected.length < maxSelections) {
      setSelectedOptions({
        ...selectedOptions,
        [currentStep]: [...currentSelected, option],
      });
    }
  };

  const handleNext = () => {
    if (currentStep < ONBOARDING_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDone = async () => {
    await completeOnboarding();
    router.replace('/(tabs)');
  };

  const step = ONBOARDING_QUESTIONS[currentStep];
  const progress = ((currentStep + 1) / ONBOARDING_QUESTIONS.length) * 100;
  const isLastStep = currentStep === ONBOARDING_QUESTIONS.length - 1;

  return (
    <View style={[styles.container, { backgroundColor: step.color }]}>
      {/* Progress with arrows */}
      <View style={styles.navRow}>
        <TouchableOpacity
          style={[styles.navButton, currentStep === 0 && styles.navButtonDisabled]}
          onPress={handlePrevious}
          disabled={currentStep === 0}
        >
          <Text style={styles.navButtonText}>←</Text>
        </TouchableOpacity>

        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>

        <TouchableOpacity
          style={styles.navButton}
          onPress={isLastStep ? handleDone : handleNext}
        >
          <Text style={styles.navButtonText}>{isLastStep ? '✓' : '→'}</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {step.type === 'multipleChoice' && step.options ? (
        <View style={styles.contentContainer}>
          {/* Illustration */}
          <View style={styles.illustrationContainer}>
            {step.image && (
              <Image
                source={step.image}
                style={{ width: width * 0.85, height: 200 }}
                resizeMode="contain"
              />
            )}
          </View>

          {/* Question Text */}
          <View style={styles.textContainer}>
            <Text style={styles.question}>{step.question}</Text>
          </View>

          {/* Multiple Choice Options with FlatList */}
          <FlatList
            data={step.options}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={true}
            style={styles.optionsContainer}
            contentContainerStyle={{ paddingBottom: 24 }}
            renderItem={({ item: option }) => {
              const isSelected = (selectedOptions[currentStep] || []).includes(option);
              return (
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    isSelected && styles.optionButtonSelected,
                  ]}
                  onPress={() => handleSelectOption(option)}
                >
                  <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : step.type === 'textInput' ? (
        <ScrollView
          contentContainerStyle={styles.content}
          scrollEnabled={true}
        >
          {/* Illustration */}
          <View style={styles.illustrationContainer}>
            {step.image && (
              <Image
                source={step.image}
                style={{ width: width * 0.85, height: 200 }}
                resizeMode="contain"
              />
            )}
          </View>

          {/* Question Text */}
          <View style={styles.textContainer}>
            <Text style={styles.question}>{step.question}</Text>
          </View>

          {/* Text Input Box */}
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInputBox}
              placeholder="Write your thoughts here........"
              placeholderTextColor="#A8A8A8"
              multiline
              numberOfLines={8}
              value={textInputs[currentStep] || ''}
              onChangeText={(text) => setTextInputs({ ...textInputs, [currentStep]: text })}
            />
          </View>
        </ScrollView>
      ) : (
        <ScrollView
          contentContainerStyle={styles.content}
          scrollEnabled={true}
        >
          {/* Illustration */}
          <View style={styles.illustrationContainer}>
            {step.image && (
              <Image
                source={step.image}
                style={{ width: width * 0.85, height: 200 }}
                resizeMode="contain"
              />
            )}
          </View>

          {/* Question Text */}
          <View style={styles.textContainer}>
            <Text style={styles.question}>{step.question}</Text>
          </View>
        </ScrollView>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  navButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonDisabled: {
    backgroundColor: '#E0DDD9',
  },
  navButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  progressContainer: {
    flex: 1,
    height: 6,
    backgroundColor: '#E0DDD9',
    borderRadius: 3,
    marginHorizontal: 12,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#000000',
    borderRadius: 3,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationContainer: {
    width: '100%',
    height: 210,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 11,
  },
  question: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
    lineHeight: 36,
    maxWidth: width - 40,
  },
  optionsContainer: {
    width: '100%',
    flex: 1,
    marginTop: 10,
    paddingBottom: 32,
  },
  optionButton: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#000000',
    borderRadius: 10,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionButtonSelected: {
    backgroundColor: '#A8BCA5',
  },
  optionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  optionTextSelected: {
    color: '#FFFFFF',
  },
  textInputContainer: {
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  textInputBox: {
    backgroundColor: '#A8BCA5',
    borderRadius: 20,
    padding: 20,
    fontSize: 16,
    color: '#1a1a1a',
    textAlignVertical: 'top',
    minHeight: 200,
  },
});
