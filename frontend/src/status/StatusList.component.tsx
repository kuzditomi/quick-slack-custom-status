import React from 'react';
import { Status } from './status.models';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Theme, createStyles, withStyles, WithStyles } from '@material-ui/core';
import SyncIcon from '@material-ui/icons/Sync';
import DeleteIcon from '@material-ui/icons/Delete';
import { grey, red, green } from '@material-ui/core/colors';

const styles = (theme: Theme) =>
    createStyles({
        listitem: {
            '&:hover': {
                backgroundColor: grey[200]
            }
        },
        updateIcon: {
            '&:hover': {
                color: green[700]
            }
        },
        deleteIcon: {
            '&:hover': {
                color: red[700]
            }
        }
    });

export interface StatusListStateProps {
    linkId?: string;
    statuses: Status[];
}

export interface StatusListDispatchProps {
    removeStatus(status: Status): void;
    updateStatus(linkId: string, status: Status): void;
}

const StatusList: React.FC<StatusListStateProps & StatusListDispatchProps & WithStyles<typeof styles>> = ({ linkId, statuses, removeStatus, updateStatus, classes }) => {
    return (
        <List component="nav">
            {
                statuses.map((status, index) => (
                    <ListItem key={index} className={`${classes.listitem} ${index === statuses.length - 1 ? 'intro-status-listitem' : ''}`}>
                        <ListItemText primary={`${status.text} (${status.emoji})`} />
                        <ListItemSecondaryAction>
                            <IconButton className={`${classes.updateIcon} ${index === statuses.length - 1 ? 'intro-status-update-button' : ''}`} title="Update status!" onClick={() => updateStatus(linkId || '', status)}>
                                <SyncIcon />
                            </IconButton>
                            <IconButton title="Remove from list" onClick={() => removeStatus(status)} className={classes.deleteIcon}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))
            }
        </List>
    );
};


export const StatusListComponent = withStyles(styles)(StatusList);