import React, { useState, useEffect } from 'react';
import { db } from '../fbConfig';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/AddCircle';
import RemoveIcon from '@material-ui/icons/RemoveCircle';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const useStyle = makeStyles(theme =>
  createStyles({
    counterPage: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      justifyContent: 'space-around'
    },
    counterSelector: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center'
    },

    counterValue: {
      fontSize: '4rem',
      textAlign: 'center'
    },
    changeButton: { fontSize: '5rem' },
    totalPeopleSection: {
      display: 'flex',
      alignContent: 'center',
      justifyContent: 'center'
    },
    totalPeople: {
      margin: '0 20px',
      maxWidth: 100
    }
  })
);

const counterRef = db.collection('general_info').doc('people');
const CounterPage = () => {
  const classes = useStyle();
  const [peoplePresent, setPeoplePresent] = useState(undefined);
  const [peopleTotal, setPeopleTotal] = useState(undefined);
  useEffect(() => {
    counterRef.onSnapshot(
      snap => {
        const peopleData = snap.data();
        setPeoplePresent(peopleData.present);
        setPeopleTotal(peopleData.total);
      },
      err => {
        setPeoplePresent(undefined);
        setPeopleTotal(undefined);
        console.error(err.message, err.stack);
      }
    );
    return () => {};
  }, []);

  const counterUp = () => {
    counterRef.set({ present: peoplePresent + 1 }, { merge: true });
  };

  const counterDown = () => {
    counterRef.set({ present: peoplePresent - 1 }, { merge: true });
  };

  return (
    <div className={classes.counterPage}>
      <Typography align="center" variant="h4" color="primary">
        Al momento all'evento sono presenti:
      </Typography>
      <div className={classes.counterValue}>{peoplePresent}</div>
      <div className={classes.counterSelector}>
        <IconButton
          disabled={peoplePresent === undefined || peoplePresent === 0}
          onClick={counterDown}
          color="secondary"
        >
          <RemoveIcon fontSize="large" className={classes.changeButton} />
        </IconButton>
        <IconButton onClick={counterUp} color="primary">
          <AddIcon fontSize="large" className={classes.changeButton} />
        </IconButton>
      </div>
      <div className={classes.totalPeopleSection}>
        <Typography align="center" variant="h5" color="primary">
          Totale:
        </Typography>

        <TextField
          type="number"
          value={peopleTotal || ''}
          variant="outlined"
          className={classes.totalPeople}
          margin="dense"
          inputProps={{ min: 0, style: { textAlign: 'center' } }}
          onChange={e => {
            const newTotalPeople = Number(e.target.value) || undefined;
            setPeopleTotal(e.currentTarget.value);
            if (newTotalPeople)
              counterRef.set(
                { total: Number(e.currentTarget.value) },
                { merge: true }
              );
          }}
        />
      </div>
    </div>
  );
};

export default CounterPage;
