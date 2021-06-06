import React from 'react'

const Checkbox = (props) => {

        let obj = props.item
        let [key] = Object.keys(obj)
        let checked = obj[key]
        // console.log(obj[key])

    return (
        <div>
            <input type="checkbox" name={key} id="" defaultChecked={checked} onClick={(e) => props.change(e)} /> { key }
        </div>
    )
}

export default Checkbox