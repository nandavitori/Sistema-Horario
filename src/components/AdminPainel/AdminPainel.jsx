import { useState } from 'react'
import { useSchedule } from '../Schedule/ScheduleContext'
import {Plus} from 'lucide-react'
import ScheduleForm from '../Schedule/ScheduleForm'
import ScheduleList from '../Schedule/ScheduleList'
const AdminPainel = () => {
    const {adcionarHorario, atualizarHorario} = useSchedule()
    const [showForm, setShowForm] = useState()
    const [horarioEdit, setHorarioEdit] = useState(null)

    const handleSave = (horario) => {
        if(horarioEdit){
            atualizarHorario(horarioEdit.id, horario)
        }else{
            adcionarHorario(horario)
        }
        setShowForm(false);
        setHorarioEdit(null)
    }

    const handleEdit = (horario) =>{
        setHorarioEdit(horario)
        setShowForm(true)
    }

    const handleCancel = () => {
        setShowForm(false)
        setHorarioEdit(null)
    }
  return (
    <div className=' rounded-lg shadow-smp-8'>
      <div className='flex justify-between items-center mb-8 pb-6 border-b-2 border-gray-200'>
        <div>
            <h2 className='text-3xl font-bold text-gray-900 mb-2'>Painel Administrativo</h2>
        </div>

        <button onClick={() => setShowForm(true)} className='flex items-center gap-2 px-6 py-2.5 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-700 hover:-translate-y-0.5 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0' disabled={showForm}>
            <Plus size={20} /> 
            Novo Horario
        </button>
      </div>

      {showForm && (
        <ScheduleForm horarioEdit={horarioEdit} onSave={handleSave} onCancel={handleCancel} />
      )}

      <ScheduleList onEdit={handleEdit} />
    </div>
  )
}

export default AdminPainel
