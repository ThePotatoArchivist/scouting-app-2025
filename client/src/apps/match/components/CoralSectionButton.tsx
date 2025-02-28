

function CoralSectionButton({
    selectClassName,
    unselectClassName,
    onChange,
    value,
}: {
    selectClassName: string;
    unselectClassName: string;
    onChange: (newValue: boolean) => void;
    value: boolean
}) {

    function handleSelect() {
        const newValue = !value;
        onChange(newValue);
    }
// :3
    return(
        <button
            onClick={handleSelect}
            className={`${value? selectClassName : unselectClassName}`}
        />
    );
}

export default CoralSectionButton;