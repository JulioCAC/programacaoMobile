import { View, Text, Alert, TextInput, Button, StyleSheet} from 'react-native'
import React, { useEffect, useState } from 'react'
import { getDoc, doc } from 'firebase/firestore'
import { adicionarCurso, atualizarCurso } from '../service/CursoService'
import { db } from '../config/firebaseConfig'

const CursoFormScreen = ({ route, navigation  }) => {

    const itemId = route.params?.itemId
    const [nome, setNome] = useState("")
    const [descricao, setDescricao] = useState("")
    const [editando, setEditando] = useState(false)

    useEffect(() => {
        if (itemId) {
            const buscarCurso = async () => {
                const docRef = doc(db, 'cursos', itemId)
                const docSnap = await getDoc(docRef)
                if (docSnap.exists) {
                    setNome(docSnap.data().name)
                    setDescricao(docSnap.data().description)
                    setEditando(true)
                } 
            }
            buscarCurso()
        }
    }, [itemId])

    const handleSalvar = async () => {
        if ( !nome || !descricao ) {
            Alert.alert('Erro', 'Preencha todos os campos!')
            return
          }
    
          try {
            if (editando) {
              await atualizarCurso(itemId, { name: nome, description: descricao })
              Alert.alert('Curso atualizado com sucesso!')
            } else {
              await adicionarCurso({ name: nome, description: descricao })
              Alert.alert('Curso criado com sucesso!')
            }
            navigation.goBack()
          } catch (error) {
            Alert.alert('Erro', 'Algo deu errado ao salvar!')
          }
    }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {editando ? 'Editar Curso' : 'Adicionar Curso'}
      </Text>
      <TextInput placeholder='Nome do curso' style={styles.input} value={nome} onChangeText={setNome}/>
      <TextInput placeholder='Descrição do curso' style={styles.input} value={descricao} onChangeText={setDescricao}/>
      <Button title={editando ? 'Salvar Alterações' : 'Criar Curso'} onPress={handleSalvar}></Button>
    </View>
  )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#f5f5f5' },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    input: { borderBottomWidth: 1, marginBottom: 20, padding: 8 },
  })
  

export default CursoFormScreen