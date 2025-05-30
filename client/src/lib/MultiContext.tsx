import { Context, PropsWithChildren } from 'react';

/**
 * Use with caution!
 */
function MultiContext({
    contexts,
    children,
}: PropsWithChildren<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    contexts: [context: Context<any>, value: any][];
}>) {
    return contexts.reduce(
        (prev, [context, value]) => (
            <context.Provider value={value}>{prev}</context.Provider>
        ),
        children
    );
}

export default MultiContext;
