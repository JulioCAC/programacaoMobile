import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button, Alert} from 'react-native';
import { useState, React, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { deletarCurso, getCursos } from '../service/CursoService'; 


const HomeScreen = ({ navigation }) => {
  const [itens, setItens] = useState([]);

  const carregarCursos = async () => {
    const cursos = await getCursos();
    setItens(cursos);
  }

  useFocusEffect(
    useCallback(() => { 
      carregarCursos();
    }, [])
  );

  const confirmarExclusao = (id) => {
    Alert.alert('Confirmar', 'Deseja realmente excluir este curso?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', 
        onPress: async () => {
        await deletarCurso(id)
         carregarCursos() 
        } }
    ]);
  }
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('Details', {  /* curso: item*/ itemId: item.id, name: item.name, description: item.description })}>
      <Text style={styles.itemTitle}>{item.name}</Text>
      <Text style={styles.itemDescription}>{item.description}</Text>
      <Button title='🗑️' onPress={() => confirmarExclusao(item.id)} color="#d9534f"  />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📚Cursos Disponíveis</Text>
      <Button title='Adicionar Curso' onPress={() => navigation.navigate('CursoForm')} />
      <FlatList
        data={itens} 
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop:25, backgroundColor: '#f5f5f5' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  itemContainer: { backgroundColor: '#fff', padding: 15, marginBottom: 10, borderRadius: 8, elevation: 2 },
  itemTitle: { fontSize: 18, fontWeight: 'bold' },
  itemDescription: { fontSize: 14, color: '#555' },
  })

export default HomeScreen;
