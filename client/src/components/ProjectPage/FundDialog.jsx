import React, { useState } from "react";
import {
  DialogTitle,
  Dialog,
  Button,
  Box,
  Slider,
  Typography,
  Grid
} from "@material-ui/core";

const FundDialog = ({ open, handleClose }) => {
  const [amount, setAmount] = useState(0.1);
  return (
    <Dialog onClose={() => handleClose()} open={open}>
      <DialogTitle id="simple-dialog-title">
        Set the amount that you want to help us with{" "}
      </DialogTitle>
      <Box px={3} py={5}>
        <Typography variant="h5" color="primary" align="center" gutterBottom>
          {amount} Ether
        </Typography>
        <Slider
          value={amount}
          margin="dense"
          onChange={(e, v) => setAmount(v)}
          step={0.01}
          min={0.05}
          max={2}
        />
        <Grid container justify="center">
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleClose(amount)}
          >
            Submit
          </Button>
        </Grid>
      </Box>
    </Dialog>
  );
};

export default FundDialog;
