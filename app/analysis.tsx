import AnalysisScreen from "../src/screens/AnalysisScreen";
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Analysis() {
  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        <AnalysisScreen />
      </View>
    </SafeAreaProvider>
  );
}
