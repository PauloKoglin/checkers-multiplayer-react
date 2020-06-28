import './Board.css'
// import React, { Component } from 'react'
import React from 'react'
import Cell from '../cell/Cell'

function renderCells() {
    let cells = [...Array(100).keys()]
    let line = 0
    let index = 0
    let piece = ""
    return cells.map(cell => {
        if (index === 10) {
            line++
            index = 0
        }
        index++;

        piece = ""

        if (line < 3) piece = "red"
        if (line > 6) piece = "yellow"

        if (line % 2 === 0) {
            return cell % 2 === 0 ? <Cell index={cell} key={cell} color="brown" piece={piece}></Cell> : <Cell index={cell} key={cell} color="darkyellow"> </Cell>
        } else
            return cell % 2 === 0 ? <Cell index={cell} key={cell} color="darkyellow"></Cell> : <Cell index={cell} key={cell} color="brown" piece={piece}></Cell>
    })
}

export default props =>
    (<div className='board'>
        {
            renderCells()
        }
    </div>)

