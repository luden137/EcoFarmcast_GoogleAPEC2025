// import React, { useState } from 'react';
// import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
// import { router } from 'expo-router';
// import { useTheme } from 'react-native-paper';

import onboardingScreen from "../src/screens/OnboardingScreen";

export default onboardingScreen;
// import useAuth from '@/src/hooks/useAuth';
//
// export default function OnboardingScreen() {
//   const [currentStep, setCurrentStep] = useState(1);
//   const theme = useTheme();
//   const { currentUser } = useAuth();
//
//   // Redirect to login if not authenticated
//   React.useEffect(() => {
//     if (!currentUser) {
//       router.replace('/');
//     }
//   }, [currentUser]);
//
//   const handleNext = () => {
//     if (currentStep < 3) {
//       setCurrentStep(currentStep + 1);
//     } else {
//       // Complete onboarding
//       router.replace('/(tabs)');
//     }
//   };
//
//   const handleBack = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1);
//     }
//   };
//
//   const renderStep = () => {
//     switch (currentStep) {
//       case 1:
//         return (
//           <View style={styles.stepContainer}>
//             <Text style={styles.stepTitle}>Welcome to EcoFarmCast</Text>
//             <Text style={styles.stepDescription}>
//               EcoFarmCast helps you optimize your farm operations for sustainability and profitability.
//             </Text>
//             <Text style={styles.stepDescription}>
//               Let's set up your farm profile to get personalized recommendations.
//             </Text>
//           </View>
//         );
//       case 2:
//         return (
//           <View style={styles.stepContainer}>
//             <Text style={styles.stepTitle}>Farm Information</Text>
//             <Text style={styles.stepDescription}>
//               In the next steps, you'll be asked to provide information about:
//             </Text>
//             <View style={styles.bulletPoints}>
//               <Text style={styles.bulletPoint}>- Your farm size and location</Text>
//               <Text style={styles.bulletPoint}>- Current crops and livestock</Text>
//               <Text style={styles.bulletPoint}>- Equipment and resources</Text>
//               <Text style={styles.bulletPoint}>- Sustainability goals</Text>
//             </View>
//             <Text style={styles.stepDescription}>
//               This information helps us provide accurate recommendations.
//             </Text>
//           </View>
//         );
//       case 3:
//         return (
//           <View style={styles.stepContainer}>
//             <Text style={styles.stepTitle}>Ready to Begin</Text>
//             <Text style={styles.stepDescription}>
//               You're all set to start using EcoFarmCast!
//             </Text>
//             <Text style={styles.stepDescription}>
//               After this step, you'll be taken to the main dashboard where you can:
//             </Text>
//             <View style={styles.bulletPoints}>
//               <Text style={styles.bulletPoint}>- Enter detailed farm data</Text>
//               <Text style={styles.bulletPoint}>- View sustainability analysis</Text>
//               <Text style={styles.bulletPoint}>- Get AI-powered recommendations</Text>
//               <Text style={styles.bulletPoint}>- Track your progress over time</Text>
//             </View>
//           </View>
//         );
//       default:
//         return null;
//     }
//   };
//
//   return (
//     <ScrollView contentContainerStyle={styles.scrollContainer}>
//       <View style={styles.container}>
//         <View style={styles.progressContainer}>
//           {[1, 2, 3].map((step) => (
//             <View
//               key={step}
//               style={[
//                 styles.progressDot,
//                 {
//                   backgroundColor:
//                     step <= currentStep ? theme.colors.primary : '#e0e0e0',
//                 },
//               ]}
//             />
//           ))}
//         </View>
//
//         {renderStep()}
//
//         <View style={styles.buttonContainer}>
//           {currentStep > 1 && (
//             <TouchableOpacity
//               style={[styles.button, styles.backButton]}
//               onPress={handleBack}
//             >
//               <Text style={styles.backButtonText}>Back</Text>
//             </TouchableOpacity>
//           )}
//           <TouchableOpacity
//             style={[
//               styles.button,
//               styles.nextButton,
//               { backgroundColor: theme.colors.primary },
//             ]}
//             onPress={handleNext}
//           >
//             <Text style={styles.nextButtonText}>
//               {currentStep === 3 ? 'Get Started' : 'Next'}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </ScrollView>
//   );
// }
//
// const styles = StyleSheet.create({
//   scrollContainer: {
//     flexGrow: 1,
//   },
//   container: {
//     flex: 1,
//     padding: 20,
//     justifyContent: 'space-between',
//   },
//   progressContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginVertical: 30,
//   },
//   progressDot: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     marginHorizontal: 5,
//   },
//   stepContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },
//   stepTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   stepDescription: {
//     fontSize: 16,
//     textAlign: 'center',
//     marginBottom: 15,
//     lineHeight: 24,
//   },
//   bulletPoints: {
//     alignSelf: 'flex-start',
//     marginVertical: 15,
//     width: '100%',
//   },
//   bulletPoint: {
//     fontSize: 16,
//     marginBottom: 10,
//     lineHeight: 24,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 40,
//     marginBottom: 20,
//   },
//   button: {
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//     borderRadius: 8,
//     minWidth: 120,
//     alignItems: 'center',
//   },
//   backButton: {
//     backgroundColor: 'transparent',
//     borderWidth: 1,
//     borderColor: '#ccc',
//   },
//   nextButton: {
//     flex: 1,
//     marginLeft: 10,
//   },
//   backButtonText: {
//     fontSize: 16,
//     color: '#555',
//   },
//   nextButtonText: {
//     fontSize: 16,
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });
