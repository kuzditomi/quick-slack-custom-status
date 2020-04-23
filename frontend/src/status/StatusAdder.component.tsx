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
        <div className="status-adder">
            <div>
                <label>
                    status text
                </label>
                <input type="text" placeholder="Coffee break" value={text} onChange={evt => setText(evt.target.value)} />
            </div>
            <div>
                <label>
                    status emoji
                </label>
                <input type="emoji" placeholder=":coffee:" value={emoji} onChange={evt => setEmoji(evt.target.value)} />
            </div>

            <button onClick={() => { callAddStatus(); }}>Add to list!</button>
        </div>
    );
};
