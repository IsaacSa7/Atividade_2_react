import React, { useEffect, useState } from 'react';
import { Form } from 'bootstrap-4-react';
import {db} from '../../services/firebaseConnection'
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

      alert("Tarefa Adicionada!")
      
    } catch (error) {
      alert("Error: Não foi possível adicionar a tarefa!")
    }
  }

  return (
    
    <div className='container mt-5'>
      <div className='row justify-content-center'>
        <div className='col-7 card ' style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <div className='row justify-content-center'>
            <h3 className='mt-5 p-5' style={{ fontSize: '2.5em', color: 'black', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}> Cadastrar Tarefa</h3>
          </div>

          <div className='container'>
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
      </div>
    </div>
    
  )
}

export default Cadastro
