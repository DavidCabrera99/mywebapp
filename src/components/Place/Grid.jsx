import React, {Component} from "react"
import GridItem from "./GridItem"
import {STORAGE_URL} from "../../Constants"
import "./Grid.css"
import Backendless from "backendless"
import { color } from "@mui/system"
import {FaPaintBrush} from "react-icons/fa"

export default class Grid extends Component {
    constructor(props){
        super(props)
        this.state={
            drawing:null,
            channel:null,
            count:0
        }
        const orderEventHandler = Backendless.Data.of( 'place' ).rt()

        const onObjectCreate = (obj)=>{
            console.log(obj)
        }

        orderEventHandler.addCreateListener( '*', onObjectCreate );

        function onMessage( message ) {

            let {rowIndex, columnIndex,color} = message.message
            const r = +rowIndex
            const c = +columnIndex
            let l = [...this.state.drawing]
            this.state.drawing[r-1][c-1]=color
            
            console.log(l)
            this.setState({drawing:l,count:this.state.count+1})
          }
          
          const channel = Backendless.Messaging.subscribe( 'place' )
          channel.addMessageListener( onMessage.bind(this) )
    }
    channelSend(message){
        Backendless.Messaging.publish('place',message)
    }
    messageRecivied(message){
        let temp = this.state.drawing
        console.log(temp)
        temp[message.rowIndex][message.columnIndex]=message.color
        this.setState(temp)
    }
    componentDidMount(){
        // var channel = Backendless.Messaging.subscribe('place')
        
        // channel.addMessageListener(this.messageRecivied)
        
        // this.setState({channel:channel})
        
        // let dataQuery = Backendless.DataQueryBuilder.create()
        // dataQuery.setPageSize(15)
        // dataQuery.setWhereClause("rowIndex = "+1)
        // Backendless.Data.of('place').find(dataQuery).then(result=>console.log(result))
        // for(let a=1; a<16;a++){
        //     let dataQuery = Backendless.DataQueryBuilder.create()
        //     dataQuery.setPageSize(15)
        //     dataQuery.setWhereClause("rowIndex = "+a)
        //     Backendless.Data.of('place').find(dataQuery).then(result=>{
        //         result.map(({rowIndex,columnIndex,color})=>{
        //             Temp[rowIndex-1][columnIndex-1]=color
        //             return true
        //         })
        //         this.setState({
        //             drawing: Temp
        //         })
        //         console.log(Temp)
        //     })
        // }
        // for(let i=1; i<16;i++){
        //     for(let j=1; j<16;j++){
        //         let dataQuery = Backendless.DataQueryBuilder.create()
        //         dataQuery.setPageSize(1)
        //         dataQuery.setWhereClause('rowIndex ='+i+' AND columnIndex= '+j)
        //         dataQuery.setSortBy('created DESC')
        //         Backendless.Data.of('place').find(dataQuery).then(result=>{
        //             console.log(result + " " + i+"-"+j)
        //             const {rowIndex, columnIndex,color} = result[0]
        //             Temp[rowIndex-1][columnIndex-1]=color
        //             if(Temp.length ===15 && Temp[14].length ===15)
        //             this.setState({
        //                             drawing: Temp
        //                 })
        //         }).catch(err=>console.log(err))

        //     }
        // }
        Backendless.APIServices.invoke('GetBoard', 'getBoarg', null).then(obj=>{
            this.setState({drawing:obj})
        })
        
    }

    render(){

        console.log("rerender", this.state.drawing)
        if(!this.state.drawing){
            return <div>"Loading...
                <FaPaintBrush />
            </div>
        }
        const gridItems = []
        for(let rowIndex=0; rowIndex< this.state.drawing.length; rowIndex++){
            gridItems[rowIndex]=[]
            for(let columnIndex=0; columnIndex<this.state.drawing[rowIndex].length; columnIndex++){
                gridItems[rowIndex].push(<GridItem key={rowIndex*15+columnIndex} color= {this.state.drawing[rowIndex][columnIndex]} rowIndex={rowIndex} columnIndex={columnIndex} channelSend={this.channelSend.bind(this)}/>)
            }
        }

        return(
            <>
            <div style={{marginTop:'25px'}}>
                {gridItems.map(rowItem=>{
                    return <div className="GridRow">{rowItem}</div>
                })}
            </div>
            </>
        )
    }
}