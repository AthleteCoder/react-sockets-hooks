import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import EnhancedEncryptionOutlinedIcon from "@material-ui/icons/EnhancedEncryptionOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import useForm from "../../utils/useForm";
import { Link, Redirect } from "react-router-dom";
import { RegisterUser } from "../../api/services/UserService";
import { connect, useStore } from "react-redux";
import { showError, showSuccess } from "../../state/notify/notifyTypes";

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
    </Typography>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Signup = ({ showSuccess }) => {
  const classes = useStyles();
  const [email, setEmail] = useForm("");
  const [password, setPassword] = useForm("");
  const [rePassword, setRePassword] = useForm("");
  const { userReducer } = useStore().getState();

  const submitForm = (e) => {
    e.preventDefault();
    if (password && email && password === rePassword) {
      RegisterUser(email, password)
        .then((res) => {
          showSuccess("User Created Succdessfully");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  if (userReducer.isAuthenticated) return <Redirect to="/" />;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <EnhancedEncryptionOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form} onSubmit={submitForm}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            type="email"
            onChange={setEmail}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={setPassword}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="rePassword"
            label="retype password"
            type="password"
            id="repassword"
            value={rePassword}
            onChange={setRePassword}
            error={password !== rePassword}
            helperText={password !== rePassword && "Passwords do no match!"}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/login" variant="body2">
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    showError: (err) => dispatch(showError(err)),
    showSuccess: (succ) => dispatch(showSuccess(succ)),
  };
};

export default connect(null, mapDispatchToProps)(Signup);
