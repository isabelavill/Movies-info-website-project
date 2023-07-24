import './favoritos.css'
import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import {toast} from 'react-toastify'
function Favoritos(){

    const [filmes, setFilmes] = useState([])
    useEffect(()=>{
        const minhaLista = localStorage.getItem('@primeflix')
        setFilmes(JSON.parse(minhaLista) || [])//convertendostring json em array / se n houver nada devolve array vazio
    }, [])

    function excluirFilme(id, tit){
        let filtroFilmes=filmes.filter((item)=>{
            return (item.id !== id) //retorna todos os itens menos o q eu cliquei p excluir
        })

        setFilmes(filtroFilmes)
        localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes))
        toast.success(`${tit} removido da sua lista de favoritos.`)
    }
    return(
        <div className='meus-filmes'>
            <h1>Meus filmes</h1>
            {filmes.length===0 && <span>Você não possui nenhum filme salvo. </span>}
            <ul>
            {filmes.map((item)=>{
                return(
                    <li key={item.id}>
                        <span>{item.title}</span>
                        <div>
                            <Link to={`/filmes/${item.id}`}>Ver detalhes</Link>
                            <button onClick={()=>excluirFilme(item.id, item.title)}>Excluir</button>
                        </div>
                    </li>
                )
            })}
            </ul>
        </div>
    )
}

export default Favoritos;