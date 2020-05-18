import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
// import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));


export default function ChipArray({ tags, selected }) {
  const classes = useStyles();
  if (!tags) return null;
  return (
    <ul className={classes.root}>
      {tags.map((data) => {
        if (data === selected) {
          return (
            <li>
              <Chip
                label={data}
                className={classes.chip}
                id="chip"
                color="primary"
                component={NavLink}
                to={`/filter/${data}`}
              />
            </li>
          );
        } else {
          return (
            <li>
              <Chip
                label={data}
                className={classes.chip}
                id="chip"
                color="primary"
                variant="outlined"
                component={NavLink}
                to={`/filter/${data}`}
              />
            </li>
          );
        }
      })}
    </ul>
  );
}
