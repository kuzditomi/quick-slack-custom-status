import React, { useState } from 'react';
import './status-list.scss';

export interface StatusAdderDispatchProps {
    addStatus(text: string, emoji: string): void;
}

export const StatusAdderComponent: React.FC<StatusAdderDispatchProps> = ({ addStatus }) => {
    const [text, setText] = useState('');
    const [emoji, setEmoji] = useState('');

    const callAddStatus = () => {
        addStatus(text, emoji);

        setText('');
        setEmoji('');
    };

    return (
        <div>
            <div>
                <label>
                    status text
                <input type="text" placeholder="Coffee break" value={text} onChange={evt => setText(evt.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    status emoji
                <input type="emoji" placeholder=":coffee:" value={emoji} onChange={evt => setEmoji(evt.target.value)} />
                </label>
            </div>

            <button onClick={() => { callAddStatus(); }}>Add to list!</button>
        </div>
    );
};
