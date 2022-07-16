import React from 'react'
import styled from 'styled-components'


class CalculatorPage extends React.Component {
    constructor(){
        super();
        this.state  = {
          calculatedValue: 0,
          rigthHand:null,
          operation:null
        }
        this.handleCalculatorButton = this.handleCalculatorButton.bind(this);
      }
    render() {
    return(
        <StyledCalculatorPage>
            <div>
                <h1>Calculadora React</h1>
            </div>
            <Calculator className="animate__animated animate__fadeInUp">
                <CalculatorRow>
                    <TextCalculator>{this.state.rigthHand}{this.state.operation}</TextCalculator>
                </CalculatorRow>
                <CalculatorRow>
                    <TextCalculator>{this.state.calculatedValue}</TextCalculator>
                </CalculatorRow>
                <CalculatorRow>
                    <CalculatorButton onClick={(e)=>this.handleCalculatorButton(e,"1")}>1</CalculatorButton>
                    <CalculatorButton onClick={(e)=>this.handleCalculatorButton(e,"2")}>2</CalculatorButton>
                    <CalculatorButton onClick={(e)=>this.handleCalculatorButton(e,"3")}>3</CalculatorButton>
                    <CalculatorButton onClick={(e)=>this.handleCalculatorButton(e,"+")}>+</CalculatorButton>

                </CalculatorRow>
                <CalculatorRow>
                    <CalculatorButton onClick={(e)=>this.handleCalculatorButton(e,"4")}>4</CalculatorButton>
                    <CalculatorButton onClick={(e)=>this.handleCalculatorButton(e,"5")}>5</CalculatorButton>
                    <CalculatorButton onClick={(e)=>this.handleCalculatorButton(e,"6")}>6</CalculatorButton>
                    <CalculatorButton onClick={(e)=>this.handleCalculatorButton(e,"-")}>-</CalculatorButton>

                </CalculatorRow>
                <CalculatorRow>
                    <CalculatorButton onClick={(e)=>this.handleCalculatorButton(e,"7")}>7</CalculatorButton>
                    <CalculatorButton onClick={(e)=>this.handleCalculatorButton(e,"8")}>8</CalculatorButton>
                    <CalculatorButton onClick={(e)=>this.handleCalculatorButton(e,"9")}>9</CalculatorButton>
                    <CalculatorButton onClick={(e)=>this.handleCalculatorButton(e,"*")}>*</CalculatorButton>

                </CalculatorRow>
                <CalculatorRow>
                    <CalculatorButton onClick={(e)=>this.handleCalculatorButton(e,"del")}>Del</CalculatorButton>
                    <CalculatorButton onClick={(e)=>this.handleCalculatorButton(e,"0")}>0</CalculatorButton>
                    <CalculatorButton onClick={(e)=>this.handleCalculatorButton(e,"=")}>=</CalculatorButton>
                    <CalculatorButton onClick={(e)=>this.handleCalculatorButton(e,"/")}>/</CalculatorButton>

                </CalculatorRow>
            </Calculator>
        </StyledCalculatorPage>

    )
    }

    calcula(simbolFunction,but){
        if(this.state.operation===null){
            this.setState({calculatedValue:0,rigthHand:this.state.calculatedValue,operation:but})
        }
        else{
            let x = parseInt(this.state.rigthHand)
            let y = parseInt(this.state.calculatedValue)
            let result = simbolFunction(x,y)
            this.setState({calculatedValue:0,rigthHand:result,operation:but})
        }
    }

    isSimbol(but){
        return but==='+'||but==='/'||but==='*'||but==='-'||but==='='
    }

    handleCalculatorButton(event,but){
        if(this.isSimbol(but)&&this.state.operation==='+'){
            this.calcula((x,y)=>{
                return x+y;
            },but)
            return;
        }
        if(this.isSimbol(but)&&this.state.operation==='-'){
            this.calcula((x,y)=>{
                return x-y;
            },but)
            return;

        }
        if(this.isSimbol(but)&&this.state.operation==='*'){
            this.calcula((x,y)=>{
                return x*y;
            },but)

            return;

        }
        if(this.isSimbol(but)&&this.state.operation==='/'){
            this.calcula((x,y)=>{
                return x/y;
            },but)
            return;

        }
        if(this.isSimbol(but)&&this.state.operation===null){
            this.calcula(()=>{},but)
            return;
        }
        if(but==='='){
            
            return;

        }
        if(but==='del'){
            this.setState({operation:null,rigthHand:null,calculatedValue:0})
            return
        }
        if(this.state.calculatedValue===0){
            this.setState({calculatedValue: but})  
        }else
            this.setState({calculatedValue: this.state.calculatedValue + but});
    }
}

const StyledCalculatorPage = styled.div`
    min-height: 90vh;
    width: 100vw;
    background-color: #282c34;

    display: flex;
    flex-direction: column;
    justify-content: top;
    align-items: center;
    color: #fff;
`;
const Calculator = styled.div`
    min-height: 60vh;
    width: 60vw;
    display: table;
    background-color: #eee;
    border-radius: 15px;
    justify-content: center;
    align-items: center;

`
const CalculatorRow = styled.div`
    display: table-row;
    width: 100%;
    height: 100%;
    color: orangered;
    border-radius: 15px;
    border-size: 2px;
    border-color: orangered;
`
const CalculatorButton = styled.button`
    width:25%;
    color: orangered;
    font-size:30px;
    font-weight:bold;
    border-radius: 15px;
    border-size: 2px;
    border-color: orangered;
`
const TextCalculator = styled.h2`
    font-size:45px;
    max-height:35px;
`


export default CalculatorPage;