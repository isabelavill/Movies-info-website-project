import {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import api from '../../services/api'
import './filmes.css'

function Filmes(){
    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key:'f914a2b2f8d4271fc4d2f03133cd355f',
                    language:"pt-BR",
                }
            })
            .then((response)=>{ /*se ele achar o filme*/
                setFilme(response.data)
                setLoading(false)
            })
            .catch(()=>{/*se não achar*/
                console.log('Filme não encontrado')
                navigate("/", {replace:true}) /*volta p home caso n encontre o filme*/
                return
            }) 
        }
        loadFilme();

        return () => { /*quando sai da tela do filme especifico*/
            console.log("componenete foi desmontado")
        }
    },[navigate, id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix")

        let filmesSalvos = JSON.parse(minhaLista) || []; /*se minhaLista existir continuo com ela, se não inicio um array vazio*/

        const hasFilme = filmesSalvos.some( (filmesSalvo) => filmesSalvo.id===filme.id) /*ver se meu filme já esta salvo*/
        
        if(hasFilme){
            toast.warn('Esse filme já está salvo.')
            return
        }

        filmesSalvos.push(filme) /*adicionando o filme na lista*/
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos))
        toast.success('Filme salvo com sucesso!')
    }

    if (loading){
        return(
            <div className='filme-info'>
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return(
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
            <h3>Sinopse</h3>
            <span>{filme.overview}</span> <br/>
            <strong>Avaliação: {filme.vote_average} / 10</strong>

            <div className="area-buttons"> 
                <button onClick={salvarFilme}>Salvar</button>

                <button>
                    <a href={`https://youtube.com/results?search_query=${filme.title} Trailer`} target='blank' rel='external'>Trailer</a>
                </button>
            </div>
        </div>
    )
}

export default Filmes;