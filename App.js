import { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
} from 'react-native';
import Login from './src/components/Login';
import TaskList from './src/components/TaskList';

import firebase from './src/services/firebaseConnection';

export default function App() {
  const [user, setUser] = useState(null);
  const [newTask, setNewTask] = useState('');

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function getUser() {
      if (!user) {
        return;
      }

      await firebase
        .database()
        .ref('tarefas')
        .child(user)
        .once('value', (snapshot) => {
          setTasks([]);

          snapshot?.forEach((childItem) => {
            let data = {
              key: childItem.key,
              nome: childItem.val().nome,
            };

            setTasks((oldTasks) => [...oldTasks, data]);
          });
        });
    }

    getUser();
  }, [user]);

  function handleDelete(key) {
    console.log(key);
  }

  function handleEdit(data) {
    console.log(data);
  }

  if (!user) {
    return <Login changeStatus={(user) => setUser(user)} />;
  }

  async function handleAdd() {
    if (newTask === '') {
      return;
    }

    let tarefas = await firebase.database().ref('tarefas').child(user);
    let chave = tarefas.push().key;

    tarefas
      .child(chave)
      .set({
        nome: newTask,
      })
      .then(() => {
        console.log('Tarefa criada');

        const data = {
          key: chave,
          nome: newTask,
        };

        setTasks((oldTasks) => [...oldTasks, data]);
      });

    // Fecha o teclado
    Keyboard.dismiss();

    setNewTask('');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerTask}>
        <TextInput
          style={styles.input}
          placeholder="O que vai fazer hoje?"
          value={newTask}
          onChangeText={(text) => setNewTask(text)}
        />

        <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <TaskList
            data={item}
            deleteItem={handleDelete}
            editItem={handleEdit}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 10,
    backgroundColor: '#F2F6FC',
  },
  containerTask: {
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#141414',
    height: 45,
  },
  buttonAdd: {
    backgroundColor: '#141414',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    paddingHorizontal: 14,
    borderRadius: 4,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 22,
  },
});
