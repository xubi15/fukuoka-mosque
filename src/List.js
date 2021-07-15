import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import MUIDataTable from 'mui-datatables'
import CustomToolbarSelect from './CustomToolbarSelect'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: 'teal',
        '&:hover': {
            backgroundColor: 'darkcyan'
        }
    },
    title: {
        color: '#fff',
        ['@media (max-width: 768px)']: { // for desktop or larger screen width
            fontSize: '1em'
        },
    },
    bodyText: {
        fontFamily: 'roboto',
        marginTop: '30px',
        fontSize: '1.5em',
        ['@media (max-width: 768px)']: { // for desktop or larger screen width
            fontSize: '1.1em'
        },
    },
    bodyDiv: {
        maxWidth: '50%',
        margin: 'auto',
        marginTop: '20px',
        ['@media (max-width: 768px)']: { // for desktop or larger screen width
            maxWidth: '90%'
        },
    },
    formLabel: {
        marginTop: '20px',
        marginBottom: '15px'
    },
    appbar: {
        backgroundColor: 'teal',
    },
    table: {
        minWidth: 650,
    },
}));

export default function List() {
    const [stp, setStp] = useState("replace");
    const columns = ["Name", "Country", "Prayer Time", "Phone", "Email"];
    const data = [
        ["Zobair Alam", "Bangladesh", "7:00", "07083694797", "zubi@gmail.com"],
        ["Fahim Chowdhury", "India", "8:00", "09083698767", "fahim@gmail.com"],
        ["Rafiqul Islam Maruf", "Pakistan", "7:00", "01083698767", "maruf@gmail.com"],
        ["Md Zulfiqur Hyder", "Turkey", "9:00", "02083698767", "hyder@gmail.com"],
    ];
    const classes = useStyles();
    const options = {
        filter: true,
        selectableRows: 'multiple',
        filterType: "dropdown",
        responsive: "vertical",
        rowsPerPage: 10,
        selectToolbarPlacement: stp,
        customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
            <CustomToolbarSelect selectedRows={selectedRows} displayData={displayData} setSelectedRows={setSelectedRows} />
        ),
    };

    return (
        <div>
            <AppBar position="static" className={classes.appbar}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Fukuoka Masjid Eid-Al-Adha 2021 Prayer Scheduler
                    </Typography>
                </Toolbar>
            </AppBar>
            <MUIDataTable
                title={"Employee List"}
                data={data}
                columns={columns}
                options={options}
            />
        </div>
    );
}
