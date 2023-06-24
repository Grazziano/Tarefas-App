import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import Login from './src/components/Login';

export default function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    return <Login changeStatus={(user) => setUser(user)} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>Dentro da tela tarefas</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 10,
  },
});
