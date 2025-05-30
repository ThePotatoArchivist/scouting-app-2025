import {
    DragEventHandler,
    HTMLAttributes,
    useContext,
    useEffect,
    useState,
} from 'react';
import { DragContext } from './workspaceContexts';
import { TabBase } from './workspaceData';

function DropTarget<T extends TabBase>({
    disabled = false,
    onDrop,
    className = '',
    areaClassName,
}: {
    disabled?: boolean;
    onDrop: (value: T) => void;
    className?: string;
    areaClassName?: string;
}) {
    const [[dragging, removeDragged]] = useContext(
        DragContext
    ) as DragContext<T>;
    const [dragTarget, setDragTarget] = useState(false);

    useEffect(() => {
        if (!dragging && dragTarget) setDragTarget(false);
    }, [dragTarget, dragging]);

    const handleDragEnter: DragEventHandler = event => {
        if (disabled || !dragging) return;
        event.preventDefault();
        setDragTarget(true);
    };

    const handleDragLeave: DragEventHandler = () => {
        setDragTarget(false);
    };

    const handleDragOver: DragEventHandler = event => {
        if (disabled || !dragging) return;
        event.preventDefault();
    };

    const handleDrop: DragEventHandler = () => {
        if (dragging) {
            removeDragged!();
            onDrop(dragging);
        }
    };

    const listeners: HTMLAttributes<HTMLDivElement> = {
        onDragEnter: handleDragEnter,
        onDragOver: handleDragOver,
        onDragLeave: handleDragLeave,
        onDrop: handleDrop,
    };

    return areaClassName === undefined ? (
        <div
            {...listeners}
            className={`${dragTarget ? 'bg-neutral-500/50' : ''} ${className}`}
        />
    ) : (
        <>
            <div
                className={`${areaClassName} ${dragTarget ? 'bg-neutral-500/50' : ''}`}
            />
            <div {...listeners} className={`${className} z-10`} />
        </>
    );
}

export default DropTarget;
