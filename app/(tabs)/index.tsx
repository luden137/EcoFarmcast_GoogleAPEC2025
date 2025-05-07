import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import useAuth from '@/src/hooks/useAuth';
import LoginScreen from '@/src/screens/auth/LoginScreen';

export default  LoginScreen;

// export default function HomeScreen() {
//   const theme = useTheme();
//   const { currentUser } = useAuth();
//
//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.header}>F
//         <Text style={styles.greeting}>Hello, {currentUser?.displayName || 'Farmer'}</Text>
//         <Text style={styles.subtitle}>Welcome to EcoFarmCast</Text>
//       </View>
//
//       <View style={styles.dashboardContainer}>
//         <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
//           <View style={styles.cardHeader}>
//             <Ionicons name="leaf" size={24} color={theme.colors.primary} />
//             <Text style={[styles.cardTitle, { color: theme.colors.primary }]}>Farm Overview</Text>
//           </View>
//           <Text style={styles.cardDescription}>
//             Complete your farm profile to get personalized recommendations.
//           </Text>
//           <View style={styles.progressContainer}>
//             <View style={styles.progressBar}>
//               <View
//                 style={[
//                   styles.progressFill,
//                   {
//                     width: '30%',
//                     backgroundColor: theme.colors.primary
//                   }
//                 ]}
//               />
//             </View>
//             <Text style={styles.progressText}>30% Complete</Text>
//           </View>
//           <TouchableOpacity
//             style={[styles.button, { backgroundColor: theme.colors.primary }]}
//           >
//             <Text style={styles.buttonText}>Continue Setup</Text>
//           </TouchableOpacity>
//         </View>
//
//         <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
//           <View style={styles.cardHeader}>
//             <Ionicons name="analytics" size={24} color={theme.colors.primary} />
//             <Text style={[styles.cardTitle, { color: theme.colors.primary }]}>Sustainability Score</Text>
//           </View>
//           <View style={styles.scoreContainer}>
//             <View style={[styles.scoreCircle, { borderColor: theme.colors.primary }]}>
//               <Text style={[styles.scoreText, { color: theme.colors.primary }]}>N/A</Text>
//             </View>
//             <Text style={styles.scoreDescription}>
//               Complete your farm profile to calculate your sustainability score.
//             </Text>
//           </View>
//         </View>
//
//         <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
//           <View style={styles.cardHeader}>
//             <Ionicons name="calendar" size={24} color={theme.colors.primary} />
//             <Text style={[styles.cardTitle, { color: theme.colors.primary }]}>Seasonal Tips</Text>
//           </View>
//           <Text style={styles.cardDescription}>
//             Based on your location and the current season, here are some tips:
//           </Text>
//           <View style={styles.tipsList}>
//             <View style={styles.tipItem}>
//               <Ionicons name="checkmark-circle" size={20} color={theme.colors.primary} />
//               <Text style={styles.tipText}>Prepare soil for upcoming planting season</Text>
//             </View>
//             <View style={styles.tipItem}>
//               <Ionicons name="checkmark-circle" size={20} color={theme.colors.primary} />
//               <Text style={styles.tipText}>Monitor water usage as temperatures rise</Text>
//             </View>
//             <View style={styles.tipItem}>
//               <Ionicons name="checkmark-circle" size={20} color={theme.colors.primary} />
//               <Text style={styles.tipText}>Consider crop rotation for soil health</Text>
//             </View>
//           </View>
//         </View>
//       </View>
//     </ScrollView>
//   );
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   header: {
//     padding: 20,
//     paddingTop: 60,
//     backgroundColor: '#2e7d32',
//   },
//   greeting: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   subtitle: {
//     fontSize: 16,
//     color: 'rgba(255, 255, 255, 0.8)',
//     marginTop: 4,
//   },
//   dashboardContainer: {
//     padding: 16,
//   },
//   card: {
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 16,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginLeft: 8,
//   },
//   cardDescription: {
//     fontSize: 14,
//     marginBottom: 16,
//     lineHeight: 20,
//   },
//   progressContainer: {
//     marginBottom: 16,
//   },
//   progressBar: {
//     height: 8,
//     backgroundColor: '#e0e0e0',
//     borderRadius: 4,
//     overflow: 'hidden',
//     marginBottom: 8,
//   },
//   progressFill: {
//     height: '100%',
//     borderRadius: 4,
//   },
//   progressText: {
//     fontSize: 12,
//     textAlign: 'right',
//   },
//   button: {
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   scoreContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 8,
//   },
//   scoreCircle: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     borderWidth: 3,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 16,
//   },
//   scoreText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   scoreDescription: {
//     flex: 1,
//     fontSize: 14,
//     lineHeight: 20,
//   },
//   tipsList: {
//     marginTop: 8,
//   },
//   tipItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   tipText: {
//     marginLeft: 8,
//     fontSize: 14,
//     flex: 1,
//   },
// });
