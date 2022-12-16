import logo from '../assets/github.png'
import { Container } from './styles'
import { Input } from '../components/Input'
import Button from '../components/Button'
import ItemRepo from '../components/ItemRepo'
import { useState } from 'react'
import { api } from '../services/api'

const App = () => {
  
  const [ repos, setRepos ] = useState([])
  const [ currentRepo, setCurrentRepo ] = useState('')

  const handleSearchRepo = async () => {
    const { data }= await api.get(`repos/${currentRepo}`)

    if(data.id) {

      const isExist = repos.find(repo => repo.id === data.id)
      if(!isExist) {

        setRepos(prev => [...prev, data])
        setCurrentRepo('')
        return
      }
    }
    alert('Não encontrado')
  }

  const handleRemoveRepo = (id) => {
    const check  = repos.filter(repo => repo.id !== id)
    setRepos(check)
   
  }

  return (
    <Container>
        <img src={logo} height={72} width={72} alt="Git logo" />
        <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)} />
        <Button onClick={handleSearchRepo} />
        {repos.map(repo => <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo} />)}
    </Container>
  )
}

export { App }

