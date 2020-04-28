import React, { useState } from 'react';
import { Steps } from 'intro.js-react';

export const IntroComponent: React.FC = () => {
    const [stepsEnabled, setStepsEnabled] = useState(true);
    const steps = [
        {
            element: '.welcome',
            intro: 'Welcome, you are ready to use the application! Let me show you around...',
        },
        {
            element: '.status-text-input',
            intro: 'You can record you own custom status by providing a text (you can leave it empty)...',
        },
        {
            element: '.status-emoji-input',
            intro: 'And an emoji (you can leave it empty too). Don\'t forget to use colons to surround the emoji.',
        },
        {
            element: '.add-status-button',
            intro: 'Now just click here to add your own status to use for updates.',
        },
        {
            element: '.intro-status-listitem',
            intro: 'Okay, let\'s try to update your status!',
        },
        {
            element: '.intro-status-update-button',
            intro: 'Click the sync icon to update your status.',
        },
        {
            element: 'nonexistingelement',
            intro: 'Thats it, enjoy!',
        },
    ];

    return (
        <>
            <Steps
                enabled={stepsEnabled}
                steps={steps}
                initialStep={0}
                onExit={() => { setStepsEnabled(false); }}
                options={{
                    exitOnEsc: false,
                    exitOnOverlayClick: false
                }}
            />
        </>
    );
};
