import { useState } from 'react'
import { useSchedule } from './ScheduleContext'
import { diasSemana, horariosLivres } from '../../data/data';



const ScheduleForm = ({horarioEdit, onSave, onCancel}) => {

    const {cursos, salas, periodos} = useSchedule()
    const [formData, setFormData] = useState(horarioEdit || {
        cursoId: '',
        salaId: '',
        disciplina: '',
        professor:'',
        diaSemana: '',
        horarioInicio: '',
        horarioFim:'',
        semestre:'',
        dataInicio: '',
        dataFim: '',
        periodoId:''
    });

    const handleSubmit = (e) => {
        e.preventDefault()
        onSave({
            ...formData,
            cursoId: parseInt(formData.cursoId),
            salaId: parseInt(formData.salaId)
        })
    }

     const handlePeriodoChange = (periodoId) => {
        if (!periodos || periodos.length === 0) {
            console.warn('Nenhum período disponível')
            return
        }
        
        const periodo = periodos.find(p => p.id === parseInt(periodoId))
        if (periodo) {
            setFormData({
                ...formData,
                periodoId:periodoId,
                semestre: periodo.semestre,
                dataInicio: periodo.dataInicio,
                dataFim: periodo.dataFim
            })
        }
    }
    const inputClasses = "px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"

    
  return (
    <form onSubmit={handleSubmit} className='bg-gray-50 p-8 rounded-lg mb-8 border border-gray-200 shadow-sm'>
            <h3 className='text-xl font-bold text-gray-900 mb-6'>
                {horarioEdit ? 'Editar Horário' : 'Novo Horário'}
            </h3>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6'>
               
                {periodos && periodos.length > 0 && (
                    <div className='flex flex-col gap-2 lg:col-span-2'>
                        <label className='text-sm font-semibold text-gray-700'>Período Letivo*</label>
                        <select 
                            className={inputClasses}
                            value={formData.periodoId || ''}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value === 'novo') {
                                    setFormData({
                                        ...formData,
                                        periodoId: 'novo',
                                        semestre: '',
                                        dataInicio: '',
                                        dataFim: ''
                                    });
                                } else {
                                    handlePeriodoChange(value);
                                }
                            }}
                            required>
                            <option value="">Selecione o período...</option>
                            {periodos.map(p => (
                                <option key={p.id} value={p.id}>
                                    {p.semestre} - {p.descricao} ({p.dataInicio} até {p.dataFim})
                                </option>
                            ))}
                            <option value="novo">Criar novo período...</option>
                        </select>
                    </div>
                )}

                {/* Campos de período */}
                {formData.periodoId === 'novo' && (
                    <div className='flex flex-col gap-2'>
                        <label className='text-sm font-semibold text-gray-700'>Semestre/Mês/Semana*</label>
                        <input 
                            className={inputClasses}
                            value={formData.semestre}
                            onChange={(e) => setFormData({...formData, semestre: e.target.value})}
                            placeholder='Ex: 2025.1'
                            required
                        />
                    </div>
                )}

                {/* {formData.periodoId && formData.periodoId !== 'novo' && (
                    <div className='flex flex-col gap-2'>
                        <label className='text-sm font-semibold text-gray-700'>Semestre</label>
                        <input 
                            className={`${inputClasses} bg-gray-100`}
                            value={formData.semestre}
                            type='text'
                            readOnly
                        />
                    </div>
                )} */}

                {formData.periodoId && (
                    <>
                        <div className='flex flex-col gap-2'>
                            <label className='text-sm font-semibold text-gray-700'>Data Início{formData.periodoId === 'novo' ? '*' : ''}</label>
                            <input 
                                className={formData.periodoId === 'novo' ? inputClasses : `${inputClasses} bg-gray-100`}
                                type='date'
                                value={formData.dataInicio}
                                onChange={(e) => setFormData({...formData, dataInicio: e.target.value})}
                                readOnly={formData.periodoId !== 'novo'}
                                required={formData.periodoId === 'novo'}
                            />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='text-sm font-semibold text-gray-700'>Data Fim{formData.periodoId === 'novo' ? '*' : ''}</label>
                            <input 
                                className={formData.periodoId === 'novo' ? inputClasses : `${inputClasses} bg-gray-100`}
                                type='date'
                                value={formData.dataFim}
                                onChange={(e) => setFormData({...formData, dataFim: e.target.value})}
                                readOnly={formData.periodoId !== 'novo'}
                                required={formData.periodoId === 'novo'}
                            />
                        </div>
                    </>
                )}

                {/* Resto dos campos */}
                <div className='flex flex-col gap-2'>
                    <label className='text-sm font-semibold text-gray-700'>Curso*</label>
                    <select 
                        className={inputClasses} 
                        value={formData.cursoId} 
                        onChange={(e) => setFormData({...formData, cursoId: e.target.value})}
                        required
                    >
                        <option value="">Selecione...</option>
                        {cursos && cursos.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
                    </select>
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-sm font-semibold text-gray-700'>Sala/Lab*</label>
                    <select 
                        className={inputClasses} 
                        value={formData.salaId} 
                        onChange={(e) => setFormData({...formData, salaId: e.target.value})}
                        required
                    >
                        <option value="">Selecione...</option>
                        {salas && salas.map(s => (
                            <option key={s.id} value={s.id}>
                                {s.nome} ({s.tipo})
                            </option>
                        ))}
                    </select>
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-sm font-semibold text-gray-700'>Disciplina*</label>
                    <input 
                        className={inputClasses} 
                        value={formData.disciplina} 
                        type='text'
                        onChange={(e) => setFormData({...formData, disciplina: e.target.value})}
                        required 
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-sm font-semibold text-gray-700'>Professor*</label>
                    <input 
                        className={inputClasses} 
                        value={formData.professor} 
                        type='text'
                        onChange={(e) => setFormData({...formData, professor: e.target.value})}
                        required 
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-sm font-semibold text-gray-700'>Dia da Semana*</label>
                    <select 
                        className={inputClasses} 
                        value={formData.diaSemana}
                        onChange={(e) => setFormData({...formData, diaSemana: e.target.value})}
                        required
                    >
                        <option value="">Selecione...</option>
                        {diasSemana.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-sm font-semibold text-gray-700'>Horário de Início*</label>
                    <select 
                        className={inputClasses} 
                        value={formData.horarioInicio}
                        onChange={(e) => setFormData({...formData, horarioInicio: e.target.value})}
                        required
                    >
                        <option value="">Selecione...</option>
                        {horariosLivres.map(h => <option key={h} value={h}>{h}</option>)}
                    </select>
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-sm font-semibold text-gray-700'>Horário de Término*</label>
                    <select 
                        className={inputClasses} 
                        value={formData.horarioFim}
                        onChange={(e) => setFormData({...formData, horarioFim: e.target.value})}
                        required
                    >
                        <option value="">Selecione...</option>
                        {horariosLivres.map(h => <option key={h} value={h}>{h}</option>)}
                    </select>
                </div>
            </div>

            <div className='flex gap-4 justify-end'>
                <button 
                    type='button' 
                    onClick={onCancel} 
                    className='px-6 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-700 font-semibold hover:bg-gray-50 transition-colors'
                >
                    Cancelar
                </button>
                <button 
                    type='submit'
                    className='px-6 py-2.5 bg-blue-600 rounded-lg text-white font-semibold hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-200 shadow-sm hover:shadow-md'
                >
                    {horarioEdit ? 'Atualizar' : 'Salvar'}
                </button>
            </div>
        </form>
  )
}

export default ScheduleForm
