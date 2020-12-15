import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import Typography from '@material-ui/core/Typography';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import red from '@material-ui/core/colors/red';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  icon_red:{
    color:red[700],
  },
}));

export default function CartItem({ item, onUpdateCartQty, onRemoveFromCart }) {
  const classes = useStyles();


  const handleUpdateCartQty = (lineItemId, newQuantity) => onUpdateCartQty(lineItemId, newQuantity);

  const handleRemoveFromCart = (lineItemId) => onRemoveFromCart(lineItemId);
  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {item.name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {item.line_total.formatted_with_symbol}
          </Typography>
        </CardContent>
        <div className={classes.controls}>
        <IconButton  size="small" onClick={() => handleUpdateCartQty(item.id, item.quantity - 1)}>
           <RemoveCircleIcon className={classes.icon_red} />
        </IconButton>
          <Typography>&nbsp;{item.quantity}&nbsp;</Typography>
        <IconButton  size="small" onClick={() => handleUpdateCartQty(item.id, item.quantity + 1)}>
            <AddCircleIcon color="primary"/>
        </IconButton>
        <IconButton size="small" onClick={() => handleRemoveFromCart(item.id)}>
            <DeleteOutlineIcon color="secondary"/>
        </IconButton>

        </div>
      </div>
      <CardMedia
        className={classes.cover}
        image={item.media.source}
        title={item.name}
      />
    </Card>
  );
}
