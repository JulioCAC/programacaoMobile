import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { AntDesign, Ionicons } from '@expo/vector-icons'

const LoginScreen = ({ navigation }) => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔐 Login</Text>

      <TextInput
        placeholder="Digite seu nome"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        placeholder="Digite sua senha"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
       />

       <Button title="Entrar" onPress={() => navigation.replace('Main') } />

       <Text style={styles.orText}>Ainda não tem conta?</Text>
       <Button title='Cadastre-se' onPress={() => navigation.navigate('Register')} />

       
       <Text style={styles.orText}>Ou entre com</Text>

        {/* Botão do Google */}
       <TouchableOpacity style={styles.socialButton}>
            <AntDesign name="google" size={24} color="white" />
            <Text style={styles.socialText}>Entrar com Google</Text>
       </TouchableOpacity>

       {/* Botão do Github */}

       <TouchableOpacity style={[styles.socialButton, styles.githubButton]}>
        <Ionicons name="logo-github" size={24} color="white" />
        <Text style={styles.socialText}>Entre com o github</Text>
       </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    input: { width: '100%', borderBottomWidth: 1, marginBottom: 20, padding: 8 },
    orText: { marginVertical: 20, fontSize: 16, color: '#555' },
    socialButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', padding: 10, backgroundColor: '#DB4437', borderRadius: 5, marginVertical: 5 },
    socialText: { color: 'white', fontSize: 16, marginLeft: 10 },
    githubButton: { backgroundColor: '#333' }
  })
  

export default LoginScreen