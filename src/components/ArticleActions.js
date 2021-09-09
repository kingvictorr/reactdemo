import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

export default function ArticleActions({ article }) {
  const [open, setOpen] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    window.open(article.url, '_blank')
    setOpen(false);
  }

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  return (
    <div>
      {/* <Tooltip title="Like Article"> */}
        <IconButton
          aria-label="Like"
          onClick={handleLikeClick}
        >
          <FavoriteIcon color={liked ? 'secondary' : 'action'} />
        </IconButton>
      {/* </Tooltip>
      <Tooltip title="See Full Article..."> */}
        <IconButton
          onClick={handleClickOpen}
          aria-label="show more"
        >
          <ArrowForwardIosIcon />
        </IconButton>
      {/* </Tooltip> */}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure you want to leave?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            By clicking Agree, you will be leaving this awesome website. Are you sure thats what you want?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleAgree} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
