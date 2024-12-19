import React, { useState } from 'react'

function App() {
  const [cep, setCep] = useState("")
  const [cepData, setCepData] = useState(null)
  const [error, setError] = useState(null)

  async function fetchCep() {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      const data = await response.json()
      setError(null)
      if(data.erro) {
        setError("CEP não encontrado")
      }
      setCepData(data)   
    } catch (error) {
      setError("CEP não encontrado")
    }
  }

  return (
    <div>
      <label>
        CEP
        <input type="text" value={cep} onChange={(e) => setCep(e.target.value)}/>
      </label>
      <button onClick={fetchCep}>Buscar</button>
      {error && <p>{error}</p>}
      {cepData && !error && (
        <div>
          <h2>Estado: {cepData.estado}-{cepData.uf}</h2>
          <h2>Cidade: {cepData.localidade}</h2>
          <h2>Região: {cepData.regiao}</h2>
        </div>
      )}
    </div>
  )
}

export default App