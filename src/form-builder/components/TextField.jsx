import {TextField as Input} from "@mui/material";
import {useEffect, useState} from "react";

const TextField = ({_value, _onChange, ...props})=>{
    const [value,setValue] = useState('')

    useEffect(()=>{
        setValue(_value)
    },[_value])

    return(
        <Input
            {...props}
            value={value}
            onChange={(e)=>{
                setValue(e.target.value)
                _onChange(e.target.value)
            }}
        />
    )
}
export default TextField
