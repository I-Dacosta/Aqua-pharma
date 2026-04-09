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
                background: 'linear-gradient(90deg, rgba(192,192,192,0) 0%, rgba(192,192,192,0.42) 10%, rgba(192,192,192,0.42) 90%, rgba(192,192,192,0) 100%)'
            }}
        />
    );
}