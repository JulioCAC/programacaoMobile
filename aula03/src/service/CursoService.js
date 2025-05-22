import { addDoc, collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore'
import { db } from '../config/firebaseConfig'

const cursosRef = collection(db, "cursos")

// Buscar todos os cursos (R)
export const getCursos = async () => {
    const snapshot = await getDocs(cursosRef)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

// Adicionar um novo curso (C)
export const adicionarCurso =  async (curso) => {
    const docRef = await addDoc(cursosRef, curso)
    return docRef.id
}

// Atualizar curso existente
export const atualizarCurso = async (id, novosDados) => {
    const cursoRef = doc(db, 'cursos', id)
    await updateDoc(cursoRef, novosDados)
}

// Deletar curso por ID
export const deletarCurso = async (id) => {
    const cursoRef = doc(db, 'cursos', id)
    await deleteDoc(cursoRef)
}