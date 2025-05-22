import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native'
import React from 'react'
import { auth } from '../config/firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'

const RegisterScreen = ({ navigation })=> {

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    const handleRegister = async () => {
        try {
            console.log("Iniciando registro...")
            await createUserWithEmailAndPassword(auth, email, senha)
            Alert.alert('Sucesso', 'Conta criado com sucesso!')
            navigation.replace('Main')
        } catch (error) {
            console.error('Erro ao registrar: ', error)
            Alert.alert('Erro', error.message)
        }
    }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registre-se!</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
       />

      <TextInput
        placeholder="Senha"
        style={styles.input}
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
       />

       <Button title="Cadastrar" onPress={handleRegister} />
       <Button title="Voltar para o Login" onPress={() => navigation.goBack()} />

    </View>
  )
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    input: { width: '100%', borderBottomWidth: 1, marginBottom: 20, padding: 8 },
  })

export default RegisterScreen