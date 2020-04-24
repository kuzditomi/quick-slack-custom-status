import React, { useState } from 'react';
import { TextField, Button, WithStyles, withStyles, createStyles, Theme } from '@material-ui/core';

const styles = (theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexDirection: 'column'
        },
        inputs: {
            display: 'flex',
            flexDirection: 'row'
        },
    });


export interface StatusAdderDispatchProps {
    addStatus(text: string, emoji: string): void;
}

const StatusAdder: React.FC<StatusAdderDispatchProps & WithStyles<typeof styles>> = ({ addStatus, classes }) => {
    const [text, setText] = useState('');
    const [emoji, setEmoji] = useState('');

    const callAddStatus = () => {
        addStatus(text, emoji);

        setText('');
        setEmoji('');
    };

    return (
        <div className={classes.container}>
            <div className={classes.inputs}>
                <TextField
                    label="Status text"
                    value={text}
                    onChange={evt => setText(evt.target.value)}
                    placeholder="Coffee break"
                    margin="normal"
                />
                <TextField
                    label="Status emoji"
                    value={emoji}
                    onChange={evt => setEmoji(evt.target.value)}
                    placeholder=":coffee:"
                    margin="normal"
                />
            </div>
            <Button color="primary" variant="contained" onClick={() => { callAddStatus(); }}>Add to list!</Button>
        </div>
    );
};

export const StatusAdderComponent = withStyles(styles)(StatusAdder);