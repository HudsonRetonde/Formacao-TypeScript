import { NegociacoesDoDia } from './../src/interfaces/negociacao-do-dia.js';
import { DiasDaSemana } from './../enums/dias-da-semana.js';
import { MensagemView } from './../views/mensagem-view.js';
import { Negociacao } from '../models/negociacao.js';
import { Negociacoes } from '../models/negociacoes.js';
import { NegociacoesView } from '../views/negociacoes-view.js';

export class NegociacaoController {
    private inputData: HTMLInputElement;
    private inputQuantidade: HTMLInputElement;
    private inputValor: HTMLInputElement;
    private negociacoes = new Negociacoes();
    private negociacoesView = new NegociacoesView('#negociacoesView');
    private mensagemView = new MensagemView('#mensagemView');


    constructor() {
        this.inputData = document.querySelector('#data') as HTMLInputElement;
        this.inputQuantidade = document.querySelector('#quantidade') as HTMLInputElement;
        this.inputValor = document.querySelector('#valor') as HTMLInputElement;
        this.mensagemView.update('Negociação realizada com sucesso!') 
        this.negociacoesView.update(this.negociacoes);
    }

    public adiciona(): void {
        const t1 = performance.now();
        const negociacao = Negociacao.criaDe(
            this.inputData.value,
            this.inputQuantidade.value,
            this.inputValor.value
        );

        if(!this.ehDiaUtil(negociacao.data)){
            this.mensagemView.update('Apenas negociações em dias úteis são aceitas...');
            return;
        } 

        this.negociacoes.adiciona(negociacao);
        console.log(negociacao.paraTexto());
        console.log(this.negociacoes.paraTexto());
        this.limparFormulario();
        this.atualizaView();
        
        const t2 = performance.now();
        console.log(`Tempo de execução do método adciona: ${t2 - t1} segundos.`);
    }

    public importaDados(): void {
       /*
            .then((negociacoesDeHoje) => {
                for(let negociacao of negociacoesDeHoje) {
                    this.negociacoes.adiciona(negociacao);
                }
                this.negociacoesView.update(this.negociacoes);
            }) */
    }

    private ehDiaUtil(data: Date){
        return data.getDay() > DiasDaSemana.DOMINGO && data.getDay() < DiasDaSemana.SABADO;
    }

    private limparFormulario(): void {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }

    private atualizaView(): void {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('Negociação adcionada com sucesso!')
    }
}
