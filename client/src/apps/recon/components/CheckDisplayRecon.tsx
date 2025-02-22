function CheckBoxRecon ({
    className,
    ischecked,
}:
{
    className?: string;
    ischecked?: boolean;
}) {
    return(
        <input
                className={` ${className} absolute text-5xl `}
                id='one'
                type="checkbox"
                checked={ischecked}
                disabled
                >
        </input>
)}
export default CheckBoxRecon;
