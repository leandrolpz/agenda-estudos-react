import Botao from "../botao";
import { Relogio } from "./Relogio";
import style from './Cronometro.module.scss'
import { tempoParaSegundos } from "../../common/util/time";
import { ITarefa } from "../../types/Tarefas";
import { useEffect, useState } from "react";

interface Props{
    selecionado:ITarefa | undefined
    finalizarTarefa:() =>void
}

export function Cronometro({selecionado, finalizarTarefa}:Props){
    const[tempo, setTempo] = useState(0)
    useEffect( ()=> {
        setTempo (tempoParaSegundos(String(selecionado?.tempo)))
    },[selecionado])

    function regressive(contador: number = 0){
        setTimeout(() => {
            if(contador > 0){
                    setTempo(contador-1)
                    return regressive(contador-1)
            }
            finalizarTarefa()
        },1000)
    }

    return(
        <div className={style.cronometro}>
            <p className={style.titulo}> Escolha uma tarefa e inicie o Cronometro</p>
            Tempo : {tempo}
            <div className={style.relogioWrapper}>
                <Relogio
                tempo={tempo}/>    
            </div>
            <Botao onClick={( ) => regressive(tempo)}>
                Iniciar!
            </Botao>
        </div>
    )
}