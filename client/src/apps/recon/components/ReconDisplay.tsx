import { useState } from "react";


function CoralReconButton({
    selectClassName,
    unselectClassName
}:
{
    selectClassName: string;
    unselectClassName: string;
}){
    const [selected, setSelected] = useState(false); 

    function handleSelect() {
        if (selected == false) {
            setSelected(true);
        } else {
            setSelected(false);
        }
    }

    return(
        <button
            onClick={handleSelect}
            className={`${selected? selectClassName : unselectClassName}`}
            disabled={true}
        />
    )
}

export default CoralReconButton;