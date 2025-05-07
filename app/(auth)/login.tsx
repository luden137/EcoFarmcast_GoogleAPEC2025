import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from 'react-native-paper';
import useAuth from '@/src/hooks/useAuth';
// import * as Google from 'expo-auth-session/providers/google';
import { signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/src/config/firebase';
import LoginScreen from '@/src/screens/auth/LoginScreen';

export default  LoginScreen;
// export default function LoginScreen() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { login } = useAuth();
//   const theme = useTheme();
//
//   const [request, response, promptAsync] = Google.useAuthRequest({
//     expoClientId: 'YOUR_EXPO_CLIENT_ID',
//     iosClientId: 'YOUR_IOS_CLIENT_ID',
//     androidClientId: 'YOUR_ANDROID_CLIENT_ID',
//     webClientId: 'YOUR_WEB_CLIENT_ID',
//   });
//
//   useEffect(() => {
//     if (response?.type === 'success') {
//       const { id_token } = response.authentication || {};
//       if (id_token) {
//         const credential = GoogleAuthProvider.credential(id_token);
//         signInWithCredential(auth, credential)
//           .then(() => router.replace('/(tabs)'))
//           .catch((err) => Alert.alert('Google Sign-In Failed', err.message));
//       }
//     }
//   }, [response]);
//
//   const handleGoogleLogin = () => {
//     promptAsync();
//   };
//
//   const handleLogin = async () => {
//     if (!email || !password) {
//       Alert.alert('Error', 'Please enter both email and password');
//       return;
//     }
//
//     try {
//       setLoading(true);
//       await login(email, password);
//       // On successful login, navigate to the main app
//       router.replace('/(tabs)');
//     } catch (error: any) {
//       Alert.alert('Login Failed', error.message || 'Please check your credentials and try again');
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   const goToSignUp = () => {
//     // Since we can't directly navigate to signup, we'll use the back button in the header
//     Alert.alert(
//       'Sign Up',
//       'Please use the Sign Up option from the auth screen.',
//       [{ text: 'OK' }]
//     );
//   };
//
//   return (
//     <View style={styles.container}>
//       <View style={styles.formContainer}>
//         <Text style={[styles.title, { color: theme.colors.primary }]}>EcoFarmCast</Text>
//         <Text style={styles.subtitle}>Login to your account</Text>
//
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Email</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter your email"
//             value={email}
//             onChangeText={setEmail}
//             keyboardType="email-address"
//             autoCapitalize="none"
//           />
//         </View>
//
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Password</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter your password"
//             value={password}
//             onChangeText={setPassword}
//             secureTextEntry
//           />
//         </View>
//
//         <TouchableOpacity
//           style={[styles.button, { backgroundColor: theme.colors.primary }]}
//           onPress={handleLogin}
//           disabled={loading}
//         >
//           <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Login'}</Text>
//         </TouchableOpacity>
//
//         <TouchableOpacity
//           style={[styles.button, { backgroundColor: '#DB4437' }]}
//           onPress={handleGoogleLogin}
//           disabled={loading}
//         >
//           <Text style={styles.buttonText}>{loading ? 'Signing in...' : 'Sign in with Google'}</Text>
//         </TouchableOpacity>
//
//         <View style={styles.footer}>
//           <Text style={styles.footerText}>Don't have an account? </Text>
//           <TouchableOpacity onPress={goToSignUp}>
//             <Text style={[styles.link, { color: theme.colors.primary }]}>Sign Up</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//     backgroundColor: '#FFFFFF',
//   },
//   formContainer: {
//     width: '100%',
//     maxWidth: 400,
//     alignSelf: 'center',
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     marginBottom: 8,
//     textAlign: 'center',
//   },
//   subtitle: {
//     fontSize: 18,
//     marginBottom: 24,
//     textAlign: 'center',
//     opacity: 0.7,
//   },
//   inputContainer: {
//     marginBottom: 16,
//   },
//   label: {
//     marginBottom: 8,
//     fontSize: 16,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 16,
//   },
//   button: {
//     padding: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 16,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   footer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 24,
//   },
//   footerText: {
//     fontSize: 16,
//   },
//   link: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });
