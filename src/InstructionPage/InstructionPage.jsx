import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function InstructionPage() {
    const classes = useStyles();

    return (

        <div>
            <p>1.registrition</p>
            <p>2.login and do subscriotion</p>
            <p>3.sms will be sent out while setting price hit</p>
        </div>

    );
}