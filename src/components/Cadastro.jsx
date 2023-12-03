import React, { useEffect, useState } from 'react';
import { Form } from 'bootstrap-4-react';
import {db} from '../services/firebaseConnection'
import { addDoc, collection, getDocs, doc, deleteDoc } from 'firebase/firestore';

const Cadastro = () => {

  const [tarefa, setTarefa] = useState()
  const [horas, setHoras] = useState()
  const [listaAll, setListaAll] = useState([])

  async function registrer(e){
    e.preventDefault()

    try {

      const docRef = await addDoc(collection(db, "teste"),{
        tarefa: tarefa,
        horas: horas
      })

      setTarefa('')
      setHoras('')
      
    } catch (error) {
      
    }

  }

  async function find(e){
    const lista = collection(db, 'teste')
    await getDocs(lista).then((snapshot)=>{
      let list = []
      snapshot.forEach((doc) => {
        list.push({
          id: doc.id,
          tarefa: doc.data().tarefa,
          horas: doc.data().horas
        })
      })
      setListaAll(list)
    })
  }

  async function handleDelete(id){
    const docRef = doc(db, 'teste', id)
    await deleteDoc(docRef).then(
      ()=>{
        alert("Usuário deletado")
      }).catch(() => {
        alert("Error: Erro ao deletar!")
      })
  }


  useEffect(()=>{
    find()
    console.log(listaAll)
  }, [listaAll])

  return (
    
    <div className='container mt-5'>
      <div className='row justify-content-center align-items-center'>
        <div className='col-7 card '>
          <div className='row justify-content-center mb-3 mt-3'>
            <h3>Cadastro de tarefas</h3>
          </div>
          <form onSubmit={registrer}>
            <Form.Group>
              <label>Insira o nome da Tarefa: </label>
              <Form.Input type="text" value={tarefa} onChange={(e)=> setTarefa(e.target.value)}/>
            </Form.Group>

            <Form.Group>
              <label>Insira a quantidade de horas necessárias:</label>
              <Form.Input type="number" value={horas} onChange={(e)=> setHoras(e.target.value)}/>
            </Form.Group>

            <div className='row justify-content-center mb-3'>
              <button type='submit' className='btn col-5 btn-primary mt-5 rounded'>Enviar</button>
            </div>
          </form>
        </div>
      </div>


      <br />
      <br />
      <div className='containet-table'>
        <br />
        <h3>Lista de Tarefas</h3>
        <ol>
        {
          listaAll.map((item)=>(
            <li className="lista" key={item.id}> 
              <b>Tarefa:</b> {item.tarefa} - Horas necessárias para {item.tarefa}: {item.horas} horas
              &nbsp; <button className='btn cursor-pointer btn-danger rounded' onClick={() => handleDelete(item.id)}> Apagar 
              &nbsp;
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
              </svg>

              </button>
              <br />
              <br />
            </li>
          ))
        }
        </ol>
      </div>
    </div>
    
  )
}

export default Cadastro
