import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function TaskList({ data }) {
  return (
    <View>
      <Text>{data.nome}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
