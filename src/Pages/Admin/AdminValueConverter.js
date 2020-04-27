import React from "react";
import JSONValue from "./JSONValue";
import Moment from "react-moment";
import Link from "@material-ui/core/Link";
import config from "../../config/NetworkConfig";

export const TYPE_DATE = 'date';
export const TYPE_JSON = 'JSON';
export const TYPE_BOOLEAN = 'boolean';
export const TYPE_FMMQ_MUSIC = 'FMMQMusic';

export const valueConverter = (header, value) => {
    if (header.type === TYPE_DATE) {
        return value ? (<Moment format='DD/MM/YYYY à H:mm'>{value}</Moment>) : (<span>&nbsp;</span>);
    } else if (header.type === TYPE_JSON) {
        return (<JSONValue value={value} headerLabel={header.label}/>);
    } else if (header.type === TYPE_FMMQ_MUSIC) {
        return (<Link href={config.MusicServerBaseUrl + value} target='_blank'>{value}</Link>);
    } else if (header.type === TYPE_BOOLEAN) {
        return value === "true" || value ? 'oui' : 'non';
    }
    return value;
};