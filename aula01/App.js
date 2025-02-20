import { View, Text } from 'react-native'
import React from 'react'
import Exercicio1 from './src/components/exercicio1'
import Exercicio2 from './src/components/Exercicio2'

const App = () => {
  return (
    <View>
      <Exercicio1 nome="Júlio"/>
      <Exercicio2/>
    </View>
  )
}

export default App