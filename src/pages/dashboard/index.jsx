import React, { useEffect, useState } from 'react';
import { Form } from 'bootstrap-4-react';
import {db} from '../../services/firebaseConnection'
import { addDoc, collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

  const [listaAll, setListaAll] = useState([])

  const navigate = useNavigate()

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
        alert("Tarefa deletada!")
      }).catch(() => {
        alert("Error: Erro ao deletar!")
      })
  }


  useEffect(()=>{
    find()
    console.log(listaAll)
  }, [listaAll])

  function handleEdit(id){
    navigate('/edit', {state: { id: id }})
  }

  return (
    <div className='container '>
      <div className='row justify-content-center'>
        <h3 className='mt-5 p-5' style={{ fontSize: '2.5em', color: 'black', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}> Lista de Tarefas</h3>
      </div>


      <div className='container'>
        <div className="card-deck ">
              {listaAll.map((item, indice) => (
                <div className="card col-sm-4" key={item.id}>
                  <div className="card-header">Tarefa {indice + 1}</div>
                  <div className="card-body">
                  <h5 className="card-title">{item.tarefa}</h5>
                  <p className="card-text">Horas necessárias: {item.horas} horas</p>

                  
                  <div className='row'>
                  <button className="btn btn-danger m-1" onClick={() => handleDelete(item.id)}> Apagar
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash ml-2" viewBox="0 0 16 16">
                      <path
                        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
                      />
                      <path
                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
                      />
                    </svg>
                  </button>

                  <button className="btn btn-primary m-1" onClick={() => handleEdit(item.id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square mr-1" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                  </svg>
                  Editar
                  </button>
                  </div>
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
}

export default Dashboard
