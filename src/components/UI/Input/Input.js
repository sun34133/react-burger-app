import React from 'react';

import classes from './Input.css';

const input = (props) => {
    let inputElem = null;
    let validationError = null;
    const inputClasses = [classes.InputElem];

    if (props.inValid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
        validationError = <p className={classes.ValidationError}>Please enter a valid {props.elementName}</p>
    }

    switch(props.elementType) {
        case ('input'):
            inputElem = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('textarea'):
            inputElem = <textarea 
                className={inputClasses.join(' ')} 
                {...props.elementConfig}
                onChange={props.changed}>{props.value}</textarea>;
            break;
        case ('select'):
            inputElem = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElem = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed} />;
            break;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElem}
            {validationError}
        </div>
    );
};

export default input;