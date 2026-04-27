type SectionDividerProps = {
    className?: string;
};

function joinClasses(...classNames: Array<string | undefined>) {
    return classNames.filter(Boolean).join(' ');
}

export function SectionDivider({ className }: SectionDividerProps) {
    return (
        <div
            aria-hidden="true"
            className={joinClasses('h-px w-full', className)}
            style={{
                background: 'linear-gradient(90deg, rgba(38,45,98,0) 0%, rgba(38,45,98,0.14) 10%, rgba(38,45,98,0.14) 90%, rgba(38,45,98,0) 100%)'
            }}
        />
    );
}