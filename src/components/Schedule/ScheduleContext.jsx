import { createContext, useContext, useState } from 'react'
import { initialData } from '../../data/data'

export const ScheduleContext = createContext();

export const useSchedule = () => {
  const context = useContext(ScheduleContext);
  if (!context) throw new Error('useSchedule deve ser usado dentro de ScheduleProvider');
  return context;
};



export const ScheduleProvider = ({children}) => {
    const [cursos] = useState(initialData.cursos)
    const [salas] = useState(initialData.salas)
    const [horarios, setHorarios] = useState(initialData.horarios)
    const [periodos] = useState(initialData.periodos)
    const [periodoAtivo, setPeriodoAtivo] = useState(initialData.periodos[0]?.id)

    const adicionarHorario = (novoHorario) => {
        setHorarios([...horarios, {...novoHorario, id: Date.now()}])
    }

    const atualizarHorario = (id, horarioAtualizado) => {
      setHorarios(horarios.map(h => h.id === id ? {...horarioAtualizado, id} : h))
    }

    const removerHorario = (id) => {
      setHorarios(horarios.filter(h => h.id !== id))
    }

  return (
   <ScheduleContext.Provider value={{cursos, salas, horarios, periodos, periodoAtivo, setPeriodoAtivo, adicionarHorario, atualizarHorario, removerHorario}}>
    {children}
   </ScheduleContext.Provider>
  )
}
