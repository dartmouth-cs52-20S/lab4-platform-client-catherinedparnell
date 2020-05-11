import React from 'react';
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

export default function ChipArray({ tags }) {
  const classes = useStyles();
  if (!tags) return null;
  console.log(tags);
  // const tagset = [...new Set(tags)];
  return (
    <ul className={classes.root}>
      {tags.map((data) => {
        return (
          <li>
            <Chip
              label={data}
              className={classes.chip}
              id="chip"
              color="primary"
            />
          </li>
        );
      })}
    </ul>
  );
}
