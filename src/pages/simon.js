import React from 'react';
import './simon.css'
import {createStore} from 'redux'
import uno from '../1.wav'
import dos from '../2.wav'
import tres from '../3.wav'
import cuatro from '../4.wav'
import $ from 'jquery'
import {Button} from '@mui/material'

var sound1 = new Audio(uno);
var sound2 = new Audio(dos);
var sound3 = new Audio(tres);
var sound4 = new Audio(cuatro);

var soundBoard =[sound1, sound2, sound3, sound4]

function getRandomInt(min, max){
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random()*(max-min+1))+min
}

function getSerie(){
    var s =[]
    for(var i=0;i<24;i++){
        s[i] = getRandomInt(0,3)
    }
    return s
}

function check(partial,length,playerInput){
    return partial[length]===playerInput[length];
}

function lightUp(tile){
    var toAnimate = $("#tile"+tile);
    console.log(toAnimate)
    toAnimate.addClass("anim");
    soundBoard[tile].playbackRate = 0.7;
    soundBoard[tile].play()

    setTimeout(function(){
        toAnimate.removeClass("anim");
    },500)

}

const initialStore = {
    series: getSerie(),
    partial: [],
    playerInput: [],
    strictMode: false,
    turn:'',
    status:'Beginning',
    clickable: false,
    lightUp: lightUp,
    length: -1,
}

function reducer(state = initialStore, {type, payload}){
    switch(type){
        case 't.start':{
            return {...state, status:payload}
        }
        case 't.changeTurn': {
            return {...state, turn:payload, clickable: true}
        }
        case 't.partialS':{
            return {...state,partial:payload}
        }   
        case 't.updateController': {
            return {...state,length:payload}
        }
        case 't.setStrict': {
            return {...state,strictMode:!state.strictMode}
        }
        case 't.restart':{
            return{...initialStore, series:getSerie(), strictMode:state.strictMode}
        }
        case 't.updateInput':{
            state.length++;
            state.playerInput= [...state.playerInput,payload]
            var nextTurn=check(state.partial,state.length,state.playerInput)

            if(state.partial.length==state.series.length){
                alert('YOu won')
                return{...initialStore, series:getSerie()}
            }
            if(state.playerInput.length==state.partial.length&&nextTurn)
            {
                state.lightUp(payload)
                let incremented=state.series.slice(0,state.playerInput.length+1)
                return{...state,partial:incremented,turn:'PlaySeq', playerInput:[]}
            }
            if(nextTurn){
                state.lightUp(payload)
                return{...state}
            }else if(!state.strictMode){
                alert('Wrog Input, Pay attention')
                return{...state,turn:'PlaySeq', playerInput:[]}
            }else{
                alert('You lose')
                return{...initialStore,series:getSerie(), strictMode:state.strictMode}
            }
        }
        default:
            return state
    }
}

function updateInputs(num){
    return{
        type: 't.updateInput',
        payload: num
    }
}
function updateController(num){
    return{
        type: 't.updateController',
        payload: -1
    }
}

function start(){
    return{
        type: 't.start',
        payload: 'Running'
    }
}

function partialS(arr){
return{
    type: 't.partialS',
    payload: arr
}

}

function changeTurnToPlayer(){
    return{
        type: 't.changeTurn',
        payload: 'player'
    }
}

function toggleStrict(){
    return{
        type: 't.setStrict',
        payload: null
    }
}

function restart(){
    return{
        type: 't.restart',
        payload: null
    }
}

const store = createStore(reducer)


class Simon extends React.Component {
    componentDidMount(){
        this.unsubscribe = store.subscribe(()=>this.forceUpdate())
    }

    componentWillUnmount(){
        this.unsubscribe();
    }



    lightUp = (tile)=>{
        var toAnimate = $("#tile"+tile);
        console.log(toAnimate)
        toAnimate.addClass("anim");
        soundBoard[tile].playbackRate = 0.7;
        soundBoard[tile].play()

        setTimeout(function(){
            toAnimate.removeClass("anim");
        },500)

    }

    render() {
        let state = store.getState();
        console.log(state)
        return (
            <div className={'flex-container'}>
                <Color1 name= 'colors t-l' clickable={state.clickable} id='tile0'/>
                <Color2 name= 'colors t-r' clickable={state.clickable} id='tile1'/>
                <Color3 name= 'colors b-l' clickable={state.clickable} id='tile2'/>
                <Color4 name= 'colors b-r' clickable={state.clickable} id='tile3'/>
                <Control name= 'center' series={state.series} lightUp={state.lightUp} turn={state.turn} status={state.status} partial={state.partial} mode={state.strictMode}/>
            </div>
        )
    }
}



class Color1 extends React.Component{
    onClick = (item)=>{
        if(this.props.clickable){
            store.dispatch(updateInputs(0))
        }
    }
    render(){
        var item = this.props.item
        return(
            <div className={this.props.name} onClick={this.onClick} id={this.props.id}>

            </div>
        )
    }
}

class Color2 extends React.Component{
    onClick = (item)=>{
        if(this.props.clickable){
            store.dispatch(updateInputs(1))
        }
    }
    render(){
        var item = this.props.item
        return(
            <div className={this.props.name} onClick={this.onClick} id={this.props.id}>
                
            </div>
        )
    }
}

class Color3 extends React.Component{
    onClick = (item)=>{
        if(this.props.clickable){
            store.dispatch(updateInputs(2))
        }
    }
    render(){
        var item = this.props.item
        return(
            <div className={this.props.name} onClick={this.onClick} id={this.props.id}>
                
            </div>
        )
    }
}

class Color4 extends React.Component{
    onClick = (item)=>{
        if(this.props.clickable){
            store.dispatch(updateInputs(3))
        }
    }
    render(){
        var item = this.props.item
        return(
            <div className={this.props.name} onClick={this.onClick} id={this.props.id}>
                
            </div>
        )
    }
}

class Control extends React.Component{
    startGame = () => {
        let first = this.props.series.slice(0,3);
        this.playSeq(first)
        store.dispatch(start())
        store.dispatch(partialS(first))
    }
    toggle = () => {
        store.dispatch(toggleStrict())
    }
    restart = ()=>{
        store.dispatch(restart())
    }
    playSeq = (sequence)=>{
        let i = 0
        var interval =setInterval(()=>{
            this.props.lightUp(sequence[i])
            i++
            if(i>=sequence.length){
                clearInterval(interval)
                store.dispatch(changeTurnToPlayer())
                store.dispatch(updateController())
            }
        },1200)
    }
    render(){
        if(this.props.turn==='PlaySeq'){
            this.playSeq(this.props.partial)
        }
        return(
            <div className={this.props.name}>
                <h2 style={{marginTop:20}}>Simon Game</h2>
                <div>
                    <h1 className='count' style={{float:'left'}}>{this.props.partial.length}</h1>
                    <Button variant="contained" className={this.props.status != 'Beginning'?'btn btn-danger disabled':'btn btn-danger active'} onClick={this.props.status == 'Beginning'? this.startGame:null} style={{float:'left',marginRight:-15}}>Start</Button>
                </div>
                {/*<div>
                    <button className={this.props.mode? 'led led-on': 'led'}></button>
                    <button className='round-btn' style={{top: 5}} onClick={this.toggle}></button>
                    <h5>STRICT</h5>
                </div>*/}
                <Button className='btn btn-success' style={{marginTop: -8}} onClick={this.restart}>Restar Game</Button>
            </div>
        )
    }
}

export default Simon