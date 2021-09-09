import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import Grid from '@material-ui/core/Grid';
import Spinner from "@material-ui/core/CircularProgress"

import AppBar from './AppBar';
import Article from './Article'

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    padding: theme.spacing(1)
  },
  articles: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
}));

export default function FullWidthGrid() {
  const [articles, setArticles] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const baseUrl = process.env.REACT_APP_NYTIMES_BASE_URL;
    const apiKey = process.env.REACT_APP_NYTIMES_KEY;

    fetch(`${baseUrl}viewed/1.json?api-key=${apiKey}`).then(res => res.json())
      .then(data => {
        setArticles(data.results)
      })
      .catch(err => {
        // TODO: Use a toster to show an error.
      })
  }, [])
  const feature = articles[Math.floor(Math.random() * articles.length)];
  articles.pop(feature);
  // const briefing = articles.filter(art => art.nytdsection === 'briefing');
  const arts = articles.filter(art => art.nytdsection === 'arts');
  const mag = articles.filter(art => art.nytdsection === 'magazine');

  return (
    <div className={classes.root}>
      <AppBar />

      <Grid container spacing={1} className={classes.articles}>
        {/* Feature Article */}
        <Grid item xs={12} sm={8}>
          {(feature && Object.keys(feature).length > 0) ? (<Article article={feature} />) : <Spinner />}
        </Grid>
        {/* Magazines Articles */}
        <Grid container item xs={12} sm={4} spacing={1}>
          {mag.map((art) => (
            <Grid key={art.id} item xs={6}>
              <Article article={art} />
            </Grid>
          )
          )}
        </Grid>
      </Grid>

      <Grid container spacing={1} className={classes.articles}>
        {/* Arts Articles */}
        <Grid container item xs={12} sm={12} spacing={1}>
          {arts.map((art) => (
            <Grid key={art.id} item xs={6}>
              <Article article={art} />
            </Grid>
          )
          )}
        </Grid>
      </Grid>

      <Pagination count={10} disabled />
    </div >
  );
}
