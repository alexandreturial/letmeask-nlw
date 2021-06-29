import React from 'react';
import { useState } from 'react';

// import { Container } from './styles';

export const  Outlinebutton: React.FC = () => {
    const [count, setCounter] = useState(0);

    function increment(){
        setCounter(count + 1);
    }

    return(
        <button onClick={increment}>{count}</button>
    );
}