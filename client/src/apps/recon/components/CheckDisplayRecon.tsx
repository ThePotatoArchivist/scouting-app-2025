function CheckBoxRecon ({
    handleChecked,
    className
}:
{
    handleChecked?: boolean;
    className?: string;
}) {
    return(
        <input
                className={` ${className} absolute text-5xl `}
                id='one'
                type="checkbox"
                disabled
                checked>
        </input>
)}
export default CheckBoxRecon;
