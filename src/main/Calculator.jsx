import React, { Component } from 'react';
import './Calculator.css';


import Button from '../components/Button';
import Display from '../components/Display';

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component {

    /* state recebe o operador spread de initialState*/
    state = { ...initialState }

    constructor(props) {
        super(props)

        this.clearMemory = this.clearMemory.bind(this);
        this.setOperation = this.setOperation.bind(this);
        this.addDigit = this.addDigit.bind(this);
    }


    clearMemory() {
        this.setState({ ...initialState })
    }

    setOperation(operation) {

        if (this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true })
        } else {
            const equals = operation === '='
            const currentOperation = this.state.operation

            const values = [...this.state.values]
        
            switch (currentOperation) {
                case '/': values[0] = parseFloat(values[0]) / parseFloat(values[1])
                    
                    break;
                case '*': values[0] = parseFloat(values[0]) * parseFloat(values[1])
                    
                    break;
                case '-': values[0] = parseFloat(values[0]) - parseFloat(values[1])
                    
                    break;
                case '+': values[0] = parseFloat(values[0]) + parseFloat(values[1])
                    
                    break;
            
                default: values[0] = this.state.values[0]
                    break;
            }
            values[1] = 0

            this.setState ({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }
        console.log(operation);
    }

    addDigit(n) {

        /* Se o displey já conter um "ponto" e o "ponto" for clicado novamente, este será ignorado */
        if ( n === '.' && this.state.displayValue.includes('.')) {
            return
        }

        /* Limpar o display pq só contém o dígito "0" OU quando clearDisplay estiver true*/
        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay

        /* Se clearDisplay for "true", vazio, senão pego valor do display*/
        const currentValue = clearDisplay ? '' : this.state.displayValue

        /* pega valor atual, concatenando com outros digitos */
        const displayValue = currentValue + n

        /* display recebe valor clicado, sem limpar mais */
        this.setState({ displayValue, clearDisplay: false})


        /* Se diferente de "ponto" */
        if(n !== '.') {
            /* pega valor atual e armazena em i */
            const i = this.state.current
            
            /* pega valor string e transforma em Float */
            const newValue = parseFloat(displayValue)

            /* pega array de values */
            const values = [this.state.values]
            
            /* indice 0 recebe o valor em float do display */
            values[i] = newValue

            /* substitui o valor 0 do array */
            this.setState({values})
            console.log(values);
        }

    }



    render() {
        return (
            <div className="calculator">
                <Display value={this.state.displayValue} />
                <Button label="AC" click={this.clearMemory} triple />
                <Button label="/" click={this.setOperation} operation />
                <Button label="7" click={this.addDigit} />
                <Button label="8" click={this.addDigit} />
                <Button label="9" click={this.addDigit} />
                <Button label="*" click={this.setOperation} operation />
                <Button label="4" click={this.addDigit} />
                <Button label="5" click={this.addDigit} />
                <Button label="6" click={this.addDigit} />
                <Button label="-" click={this.setOperation} operation />
                <Button label="1" click={this.addDigit} />
                <Button label="2" click={this.addDigit} />
                <Button label="3" click={this.addDigit} />
                <Button label="+" click={this.setOperation} operation />
                <Button label="0" click={this.addDigit} double />
                <Button label="." click={this.addDigit} />
                <Button label="=" click={this.setOperation} operation />
            </div>
        )
    }
}
