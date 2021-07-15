import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import "./Custom.css"
import {FormLabel, RadioGroup} from "@material-ui/core";
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert'
import axios from "axios";

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
    }
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SignIn() {

    const classes = useStyles();
    const [value, setValue] = React.useState("")
    const [name, setName] = React.useState("")
    const [country, setCountry] = React.useState("")
    const [phone, setPhone] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [open, setOpen] = React.useState(false)
    const [snackBar, setSnackBar] = React.useState({
        "msg":"Please input required fields.",
        "severity":"warning"
    })

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const showSnackBar = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleTextChange = (event) => {
        if (event.target.name === 'name') {
            setName(event.target.value)
        } else if (event.target.name === 'country') {
            setCountry(event.target.value)
        } else if (event.target.name === 'phone') {
            setPhone(event.target.value)
        } else if (event.target.name === 'email') {
            setEmail(event.target.value)
        }
    };

    const onClickSubmit = () => {
        if (name !== '' && country !== '' && value !== '') {
            //console.log("api calling")
            // api call
            axios.post('https://salty-escarpment-01197.herokuapp.com/registrar', {
                name:name,
                country_of_origin:country,
                phone_number:phone,
                email_address:email,
                prayer_time_slot:value
            }).then(result=>{
                //console.log(result.data)
                if (result.data.code === 200) {
                    // success
                    setValue('')
                    setName('')
                    setCountry('')
                    setEmail('')
                    setPhone('')
                    setSnackBar({"msg":result.data.msg,"severity":"success"})
                    showSnackBar()
                } else if (result.data.code === 201) {
                    setSnackBar({"msg":result.data.msg,"severity":"warning"})
                    // already registered
                    showSnackBar()
                } else if (result.data.code === 202) {
                    // slot not available
                    setSnackBar({"msg":result.data.msg,"severity":"error"})
                    showSnackBar()
                }
            })

        } else {
            setSnackBar({"msg":"Please input required fields.","severity":"warning"})
            showSnackBar()
        }
    }

    return (
        <div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}>
                <Alert onClose={handleClose} severity={snackBar.severity}>
                    {snackBar.msg}
                </Alert>
            </Snackbar>
            <AppBar position="static" className={classes.appbar}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Fukuoka Masjid Eid-Al-Adha 2021 Prayer Scheduler
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className={classes.bodyDiv}>
                <Typography className={classes.bodyText}>
                    This time Eid-Al-Adha will be held on July 20 (Tue), 2021 in Japan. Due to COVID-19 pandemic, we
                    will
                    have several Jamaats. Each Jamaat can accommodate 150 persons. Please register for your convenient
                    time
                    slot and do not register in more than one slot for same person.
                    Eid Mubarak in advance!
                </Typography>
            </div>
            <Container component="main" maxWidth="md">
                <CssBaseline/>
                <div className={classes.paper}>
                    <div className={classes.form}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoFocus
                            onChange={handleTextChange}
                            value={name}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="country"
                            label="Country of Origin"
                            name="country"
                            onChange={handleTextChange}
                            value={country}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            type='email'
                            onChange={handleTextChange}
                            value={email}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="phone"
                            label="Phone Number"
                            id="phone"
                            onChange={handleTextChange}
                            value={phone}
                        />
                        <FormLabel className={classes.formLabel} component="legend">Prayer Time</FormLabel>
                        <RadioGroup aria-label="prayerTime" name="prayerTime" value={value} onChange={handleChange}>
                            <FormControlLabel value="7" control={<Radio/>} label="7:00 AM"/>
                            <FormControlLabel value="8" control={<Radio/>} label="8:00 AM"/>
                            <FormControlLabel value="9" control={<Radio/>} label="9:00 AM"/>
                        </RadioGroup>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={onClickSubmit}
                        >
                            Submit
                        </Button>

                    </div>
                </div>
            </Container>
        </div>
    );
}