import React from "react";
import JSONValue from "./JSONValue";
import Moment from "react-moment";

export const TYPE_DATE = 'date';
export const TYPE_JSON = 'JSON';

export const valueConverter = (header, value) => {
    if (header.type === TYPE_DATE) {
        return (<Moment>{value}</Moment>);
    } else if(header.type === TYPE_JSON) {
        return (<JSONValue value={value}/>);
    }
    return value;
};