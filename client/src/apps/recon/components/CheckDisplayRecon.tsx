
function CheckBoxRecon ({
    className,
    ischecked,
    label,
}:
{
    className?: string;
    ischecked?: boolean;
    label?: string;
}) {
    return(
        <label>
            <input
                className={` ${className} text-5xl `}
                id='one'
                type="checkbox"
                checked={ischecked}
                disabled
                />
                    {label}
        </label>
                
)}
export default CheckBoxRecon;
