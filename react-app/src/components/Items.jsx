import React, { useState, useEffect } from 'react'
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core'
import FolderIcon from '@material-ui/icons/Folder';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useHistory, useRouteMatch, Switch, Route } from 'react-router-dom';
import Item from './Item';

function ItemsList({items}){
    
    const history = useHistory()
    const { url } = useRouteMatch();
    const navigateTo = item => e => {
        history.push(`${url}/${item.id}`)
    }

    return (
        <List>
            {items.map((item, idx) => (
                <ListItem key={idx}>
                    <ListItemAvatar>
                        <Avatar>
                        <FolderIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={item.name}
                        secondary={`This item has ${item.sections.length} section(s)`}
                    />
                    <ListItemSecondaryAction>
                        <IconButton 
                            onClick={navigateTo(item)}
                            edge="end" aria-label="delete"
                        >
                            <ChevronRightIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            ))}
        </List>
    )
}

export default function Items() {
    const [items, err] = useStateAllItems() /* defined below, you'd want it in a separate file */
    
    const { path } = useRouteMatch();

    // render an error message if err
    // note that because this component is basically just a function, 
    // we could also use try/catch and render on error thrown pretty cool
    if(err) return (<h1 style={{color: 'red'}}>an error </h1>)
    
    return items.length > 0
        ? (
            <Switch>
                <Route exact path={path}>
                    <ItemsList items={items} />
                </Route>
                <Route path={`${path}/:itemId`}>
                    <Item />
                </Route>
            </Switch>
        )
        : <h1>THERE ARE NO ITEMS TO DISPLAY</h1>
}

// here is an example of a react custom hook :)
function useStateAllItems(){
    console.log('fetch items hook')
    const [items, setItems] = useState([])
    const [err, setErr] = useState()
    useEffect(() => {
        fetch('/api/items')
        .then(res => res.json())
        .then(body => {
            console.log('body.items', body.items)
            setItems(body.items)
        })
        .catch(setErr)
        return function cleanup(){/* do noting for this particular hook */}
    }, [])
    return [items, err]
}