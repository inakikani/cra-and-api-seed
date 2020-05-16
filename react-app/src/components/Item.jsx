import React, { useState, useEffect } from 'react'
import { Box, Divider } from '@material-ui/core'
import { useParams } from 'react-router-dom'

export default function Item() {

    const { itemId } = useParams()
    const [item] = useStateItemById(itemId)
    console.log('item', item)
    
    return (
        <Box p={2}>
            <h1>
                Item Name : {item.name}
            </h1>
            <Divider />
            <Box px={2}>
                {item && item.sections && item.sections
                    .map(({type, data}, idx) => {
                    return (
                        <React.Fragment  key={idx}>
                            <h2>
                                section type : <b>{type}</b>
                            </h2>
                            <p>Some data associated with the section : {data}</p>
                        </React.Fragment>
                    )
                })}
            </Box>
        </Box>
    )
}

// here is an example of a react custom hook :)
function useStateItemById(itemId){
    console.log('fetch item hook')
    const [item, setItem] = useState([])
    const [err, setErr] = useState()
    useEffect(() => {
        fetch(`/api/items/${itemId}`)
        .then(res => res.json())
        .then(setItem)
        .catch(setErr)
        return function cleanup(){/* do noting for this particular hook */}
    }, [itemId])
    return [item, err]
}