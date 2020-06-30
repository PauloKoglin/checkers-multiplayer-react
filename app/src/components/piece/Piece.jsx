import './Piece.css'
import React, { Component } from 'react'

export default class Piece extends Component {

    state = {
        position: this.props.index,
        selected: false,
        classes: new Array(this.props.color)
    }

    // constructor(props) {
    //     super(props)
    // }

    setSelected(selected) {
        selected ? this.addClass('selected') : this.removeClass('selected')
        this.setState({ selected: selected })
    }

    addClass(param) {
        this.state.classes.push(param)
    }

    removeClass(param) {
        let list = this.state.classes.filter(c => c !== param)
        this.setState({ classes: list })
    }

    getClasses() {
        let list = ''
        this.state.classes.forEach(item => list += item + ' ')
        console.log(this.state)
        return list
    }

    selectPiece() {
        this.setSelected(!this.state.selected)
    }

    render() {
        return (
            <div className={this.getClasses()}
                onMouseDown={() => this.selectPiece()}>
            </div>)
    }
}


