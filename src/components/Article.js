import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Spinner from "@material-ui/core/CircularProgress";

import ArticleActions from "./ArticleActions";

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto'
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Article({ article }) {
  const classes = useStyles();
  const [articleImg, setArticleImg] = useState({});

  useEffect(() => {
    for (const media of article.media) {
      if (media['media-metadata'] && Array.isArray(media['media-metadata'])) {
        media['media-metadata'].find(data => {
          if (data.width >= 440) {
            setArticleImg(data);
            return true;
          } else {
            return false;
          }
        })
      }
    }
  }, [])

  return (
    <Card className={classes.root}>
      {(Object.keys(articleImg).length > 0) ? (
        <CardMedia
          className={classes.media}
          image={articleImg.url}
        />
      ) : (
        <Spinner />
      )}

      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {article.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">{article.abstract}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ArticleActions article={article} />
      </CardActions>
    </Card>
  );
}
