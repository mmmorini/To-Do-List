import { useEffect, useState } from 'react'
import './App.css'
import Tarea from './components/Tarea.tsx'


export interface tareaInterface {
  id: number,
  texto: string,
  completada: boolean,
  editando: boolean
}

function App() {
  const [ tareas, setTareas ] = useState<tareaInterface[]>(() => {
    const guardado = localStorage.getItem('tareas');
    return guardado ? JSON.parse(guardado) : [];
  });

  useEffect(() => {
    localStorage.setItem('tareas', JSON.stringify(tareas));
  }, [tareas]);


  const [ nuevoTexto, setNuevoTexto ] = useState<string>('')

  function agregarTarea() {
    if (nuevoTexto.trim() == "") return;

    const nuevaTarea = {
      id: Date.now(),
      texto: nuevoTexto,
      completada: false,
      editando: false,
    }

    setTareas([...tareas, nuevaTarea]);
    setNuevoTexto('');
  }

  function eliminarTarea(id: number) {
    const tareasFiltradas = tareas.filter(tarea => tarea.id !== id);
    setTareas(tareasFiltradas);
  }

  function completarTarea(id: number) {
    const tareasActualizadas = tareas.map(tarea => {
      if (tarea.id === id) {
        return { ...tarea, completada: !tarea.completada }
      } else {
        return tarea;
      }
    })
    setTareas(tareasActualizadas);
  }

  function editarTarea(id: number) {
    const tareasEditadas = tareas.map(tarea => {
      if (tarea.id === id) {
        return { ...tarea, editando: !tarea.editando }
      } else {
        return tarea;
      }
    })
    setTareas(tareasEditadas);
  }

  function editarTexto(id: number, nuevoTexto: string) {
    const textoEditado = tareas.map(tarea => {
      if (tarea.id === id) {
        return { ...tarea, texto: nuevoTexto }
      } else {
        return tarea;
      }
    })
    setTareas(textoEditado);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      agregarTarea();
    }
  }

  return (
    <div className="container">
      <div className="agregar-tarea">
        <p>LISTA DE TAREAS</p>
        <div>
          <input onKeyDown={handleKeyDown} type="text" value={nuevoTexto} placeholder='Nombre de tarea' onChange={e => setNuevoTexto(e.target.value)} />
          <button onClick={agregarTarea}>AGREGAR</button>
        </div>
      </div>
      <div className="tareas">
        {tareas.map(tarea => (
          <Tarea key={tarea.id} tarea={tarea} editarTexto={editarTexto} editarTarea={editarTarea} eliminarTarea={eliminarTarea} completarTarea={completarTarea}  />
        ))}
      </div>
    </div>
  )
}

export default App;