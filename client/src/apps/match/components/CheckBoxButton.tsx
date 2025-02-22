

function CheckBoxMatch ({
    handleChecked,
    className
}:
{
    handleChecked: boolean;
    className?: string;
}) {
    return(
        <input
                className={` ${className} absolute text-5xl `}
                onClick={() => handleChecked}
                id='one'
                type="checkbox">
        </input>
)}
export default CheckBoxMatch;


//for scouter position, add this within the button's className:
// ${scouterPosition === 'red_right' ? 'rotate-180' : ''}