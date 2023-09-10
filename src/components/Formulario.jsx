/* eslint-disable react/prop-types */
import {useState, useEffect} from 'react';
import Error from './Error';

function Formulario({pacientes,setPacientes, paciente, setPaciente}) {
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false);

  useEffect(() => {
    if(Object.keys(paciente).length > 0){
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
    }
  },[paciente])
  
  const getID = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);

    return random+fecha
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if([nombre, propietario, email, fecha, sintomas].includes('')){
      console.log("Hay almenos un string vacio")
      setError(true)
      return;
    }

    setError(false)

    // Crear Paciente
    const objetoPaciente = {
      nombre, 
      propietario,
      email,
      fecha,
      sintomas,
    }

    if(paciente.id){
      //Editando el registro
      objetoPaciente.id = paciente.id

      const pacienteActualizado = pacientes.map(pacienteState => pacienteState.id === 
        paciente.id ? objetoPaciente : pacienteState)

        setPacientes(pacienteActualizado)
        setPaciente({})
    } 
    else{
      //Nuevo registro
      objetoPaciente.id = getID();
      setPacientes([...pacientes, objetoPaciente])
    }
    // Reininciar Formulario
    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')
  }

  return ( 
    <div className="md:w-1/2 lg:w-2/5">
      <h1 className="font-black text-3xl text-center">Seguimiento Pacientes</h1>
      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {' '}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form action="" className="bg-while shadow-md rounded-lg py-10 px-5 mb-10" onSubmit={handleSubmit}>
        
        {error && <Error>
          <p>Todos los campos son obligatorios</p>
          </Error>}
        <div className="mb-5">
          <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">Nombre Mascota {nombre} </label>
          <input id="mascota" type="text" placeholder="Nombre de la Mascota" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={nombre} onChange={(e) => setNombre(e.target.value)}/>
        </div>
        <div className="mb-5">
          <label htmlFor="nombre" className="block text-gray-700 uppercase font-bold">Nombre Propietario</label>
          <input id="nombre" type="text" placeholder="Nombre del Propietario" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={propietario} onChange={(e) => setPropietario(e.target.value)}/>
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Email</label>
          <input id="email" type="text" placeholder="Email Contacto Propietario" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="mb-5">
          <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">Alta</label>
          <input id="alta" type="date" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={fecha} onChange={(e) => setFecha(e.target.value)}/>
        </div>
        <div className="mb-5">
          <label htmlFor="asintomas" className="block text-gray-700 uppercase font-bold">Nombre Propietario</label>
          <textarea
          id="sintomas"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"          
          placeholder="Describe los sintomas"
          value={sintomas} onChange={(e) => setSintomas(e.target.value)}
          />
        </div>
        <input type="submit" className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
        value={paciente.id ? 'Editar Paciente': 'Agregar Paciente'}
        />
      </form>
    </div>
  )
}

export default Formulario
