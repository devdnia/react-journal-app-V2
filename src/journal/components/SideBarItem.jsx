
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ListItem, ListItemButton, ListItemIcon, ListItemText, Grid } from '@mui/material'
import { TurnedInNot } from '@mui/icons-material'
import { setActiveNote, updateNote } from '../../store/journal';

export const SideBarItem = ({ title = '', body, id, date, imageUrls = []}) => {

    const dispatch = useDispatch();

    const onClickNote = () => {
        dispatch( setActiveNote( { title, body, id, date, imageUrls } ) );
    }

    const newTitle = useMemo(() => {
        return title.length > 17
            ? title.substring(0, 17) + '...'
            : title
    }, [title]);

 
    return (
        <ListItem disablePadding>
            <ListItemButton 
                onClick={onClickNote}
            >
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={newTitle} />
                    <ListItemText secondary={body} />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}
