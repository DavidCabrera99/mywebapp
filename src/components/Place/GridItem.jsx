import React from "react"
import {CompactPicker} from "react-color"
import {STORAGE_URL} from "../../Constants"
import  "./GridItem.css"
import Backendless from "backendless"

class GridItem extends React.Component {
    constructor(props){
        super(props)
        this.state={
            color: props.color,
            displayColorPicker: false,
        }
    }
    handleClick =()=>{
        this.setState({displayColorPicker:!this.state.displayColorPicker})
    }
    handleClose= () =>{
        this.setState({displayColorPicker:false})
    }
    onColorChange = ({hex})=>{
        this.setState({color:hex})
    }
    onColorPickerClose= () =>{
        let {rowIndex, columnIndex}=this.props
        rowIndex++
        columnIndex++
        const color = this.state.color;
        Backendless.Data.of('place').save({
            rowIndex,
            columnIndex,
            color
        }).then((saved) => {
        }).catch((err) => {
          console.log(err);
        })
        this.props.channelSend({
            rowIndex,
            columnIndex,
            color
        })
    }
    render(){
        return(
            <div className="GridItem" onClick={this.handleClick} style={{
                background: this.props.color
            }}>
                {this.state.displayColorPicker?
            (
                <div className="GridItemPopover">
                    <div className="GridItemCover" onClick={this.handleClose}/>
                    <CompactPicker
                        color={this.state.color}
                        onChange={this.onColorChange}
                        onChangeComplete={this.onColorPickerClose}
                        />
                </div>
            ):null}
            </div>
        )
    }

}

export default GridItem;