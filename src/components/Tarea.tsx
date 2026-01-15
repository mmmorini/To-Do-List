import type { tareaInterface } from "../App"
import './Tarea.css';

interface tareaProp {
    tarea: tareaInterface
    editarTexto: (id: number, texto: string) => void,
    editarTarea: (id: number) => void,
    eliminarTarea: (id: number) => void,
    completarTarea: (id: number) => void
}

function Tarea({ tarea, editarTexto, editarTarea, eliminarTarea, completarTarea } : tareaProp ) {
    function handleKeyDownEditar(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            editarTarea(tarea.id);
        }
    }

    return(
        <div className={tarea.completada ? 'tarea-item completa' : 'tarea-item'}>
            { tarea.editando ? (
                <input onKeyDown={handleKeyDownEditar} type='text' value={tarea.texto} onChange={(e) => editarTexto(tarea.id, e.target.value)}></input>
              ) : (
                <span className={tarea.completada ? "tachar" : ""}>{tarea.texto}</span>
              )}
            <div className="buttons">
                <button onClick={() => eliminarTarea(tarea.id)}>ELIMINAR</button>
                {!tarea.completada && (
                    <button onClick={() => editarTarea(tarea.id)}>{tarea.editando ? 'GUARDAR' : 'EDITAR'}</button>
                )}
                {!tarea.completada && (
                    <button onClick={() => completarTarea(tarea.id)}>COMPLETADA</button>
                )}
            </div>
        </div>
    )
}

export default Tarea;