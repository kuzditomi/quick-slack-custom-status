declare module 'intro.js-react' {
    interface Step {
        element: string;
        intro: string;
    }

    declare const Steps: React.Element<{
        enabled: boolean;
        steps: Step[],
        initialStep: Step,
        onExit: () => void;
    }>;
}