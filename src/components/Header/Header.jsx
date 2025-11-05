import logo from '../../assets/logouepa.png'

const Header = ({isAdmin, setIsAdmin}) => {
  return (
    <header className='bg-[#1c1aa3c4] shadow-md'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex justify-between items-center py-4'>
                <div className='flex items-center gap-3'>
                    <img src={logo} alt="Logo UEPA" className='max-w-[100px] w-h=[100px]'/>
                </div>
                <button onClick={() => setIsAdmin(!isAdmin)} className='bg-[#ec1f1fc4] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#3230b3] hover:-translate-y-0.5 transition-all duration-200 shadow-sm hover:shadow-md'> 
                    {isAdmin ? 'Visualizar grade' : 'Painel Admin'}
                </button>
            </div>
        </div>
    </header>
  )
}

export default Header
