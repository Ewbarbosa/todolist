import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, SafeAreaView, StatusBar, TouchableOpacity, FlatList, Modal } from 'react-native';
import * as Animatable from 'react-native-animatable';

{/* IMPORT PARA QUE AS TASK SEJAM SALVAS MESMO SE FECHAR O APP */ }
import AsyncStorage from '@react-native-async-storage/async-storage';

{/* IMPORT PRA UTILIZAR ICONES */ }
import { Ionicons } from '@expo/vector-icons'

import TaskList from './src/components/TaskList';

{/* AQUI É CRIADO UM BOTÃO ANIMADO RECEBENDO UM TouchableOpacity QUE É UM BOTÃO PERSONALIZAVEL */ }
const BtnAnimado = Animatable.createAnimatableComponent(TouchableOpacity);

export default function App() {

  {/* Variavel LIST com os objetos*/ }
  const [task, setTask] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [telaCadastro, setTeclaCadastro] = useState(false);

  {/* FUNCAO UTILIZANDO ASYNCSTORAGE PARA BUSCAR AS TAREFAS AO INICIAR O APP */ }
  useEffect(() => {
    async function carregarTask() {
      const taskStorage = await AsyncStorage.getItem('@task');

      if (taskStorage) {
        setTask(JSON.parse(taskStorage));
      }
    }

    carregarTask();
  }, []
  )

  {/* FUNCAO UTILIZANDO ASYNCSTORAGE PARA SALVAR AS TAREFAS ALTERADAS */}
  useEffect(() => {
     async function savarTasks(){
      await AsyncStorage.setItem('@task', JSON.stringify(task))
     }

     savarTasks();
  }, [task])

  {/* FUNCAO PARA ADICIONAR UMA NOVA TASK */ }
  function taskAdd() {
    if (newTask === '') return;

    const data = {
      key: newTask,
      task: newTask
    };

    setTask([...task, data]);
    setTeclaCadastro(false);
    setNewTask('');
  }


  {/* FUNCAO PARA RETORNAR TODAS AS TAREFAS QUE É DIFERENTE DA QUE FOI CLICADA*/ }
  const TaskDelete = useCallback((data) => {
    const find = task.filter(r => r.key !== data.key);
    setTask(find);
  })

  return (

    <SafeAreaView style={styles.container}>

      <View style={styles.container}>
        <Text style={styles.title}>Minhas Tarefas</Text>
      </View>

      <FlatList
        marginHorizontal={10}
        showsHorizontalScrollIndicator={false}
        data={task}
        keyExtractor={(item) => String(item.key)}
        renderItem={({ item }) => <TaskList data={item} TaskDelete={TaskDelete} />}
      />

      {/* Aqui é a tela de cadastro, a propriedade visible recebe a funcao telaCadastro*/}
      <Modal animationType='slide' transparent={false} visible={telaCadastro}>
        <SafeAreaView style={styles.telaCad}>

          <View style={styles.telaCadReder}>

            <TouchableOpacity onPress={() => setTeclaCadastro(false)}>
              <Ionicons style={{ marginLeft: 8, marginRight: 5 }} name='md-arrow-back' size={35} color='#fff' />
            </TouchableOpacity>

            <Text style={styles.txt}>Nova tarefa</Text>

          </View>

          <Animatable.View style={styles.telaCadBody} animation='fadeInUp' useNativeDriver>

            <TextInput
              placeholder='Digite sua nova tarefa...'
              autoCorrect={false}
              placeholderTextColor='#c9c7c7'
              style={styles.input}
              multiline={true}
              value={newTask}
              onChangeText={(texto) => setNewTask(texto)}
            />

            <TouchableOpacity style={styles.btnNovaTarefa} onPress={taskAdd}>
              <Text style={styles.txtNovaTarefa}>Adicionar</Text>
            </TouchableOpacity>

          </Animatable.View>

        </SafeAreaView>
      </Modal>

      {/* No onPress é passada uma funcao anonima alterando o estado do setTeclaCadastro para TRUE assim abrindo a tela*/}
      <BtnAnimado style={styles.fab}
        useNativeDriver
        animation='bounceInUp'
        duration={1500}
        onPress={() => setTeclaCadastro(true)}
      >
        <Ionicons name="ios-add" size={35} color='#fff' />
      </BtnAnimado>

      {/* AQUI HABILITA O AJUSTE AUTOMATICO DA STATUSBAR RECORTE DA CAMERA */}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

{/* AQUI FICA OS ESTILOS DOS COMPONENTES*/ }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000'
  },
  title: {
    color: '#ffffff',
    marginTop: 20,
    paddingBottom: 10,
    fontSize: 25,
    textAlign: 'center'
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: '#0080c0',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    right: 25,
    bottom: 25,
    elevation: 2,
    zIndex: 9,
    shadowColor: '#c0c0c0',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 1,
      height: 3
    }
  },
  telaCad: {
    backgroundColor: '#000000',
    flex: 1
  },
  telaCadReder: {
    marginLeft: 10,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  txt: {
    color: '#fff',
    fontSize: 25
  },
  telaCadBody: {
    marginTop: 15,
  },
  input: {
    fontSize: 15,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30,
    backgroundColor: '#fff',
    padding: 9,
    height: 80,
    textAlignVertical: 'top',
    color: '#000',
    borderRadius: 10,
    fontSize: 20
  },
  btnNovaTarefa: {
    backgroundColor: '#fff',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 5,
    height: 40
  },
  txtNovaTarefa: {
    fontSize: 20
  }
});
