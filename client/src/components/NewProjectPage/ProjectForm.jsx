import React, { useState } from "react";
import {
  Button,
  Grid,
  TextField,
  Typography,
  Slider,
  makeStyles,
  CircularProgress,
  Box
} from "@material-ui/core";

const useStyles = makeStyles({
  input: {
    marginBottom: 28
  }
});

const ProjectForm = ({ onSubmit, pending }) => {
  const [title, setTitle] = useState({ value: "" });
  const [goal, setGoal] = useState({ value: 2 });
  const [duration, setDuration] = useState({ value: 10 });
  const [image, setImage] = useState({ value: "" });
  const [description, setDescription] = useState({ value: "" });

  const handleSubmit = e => {
    e.preventDefault();
    //Validate Input
    if (title.value.length < 3) {
      setTitle({
        ...title,
        err: true,
        errMsg: "Title Must be at least 3 characters"
      });
      return;
    } else setTitle({ value: title.value });
    let goalNum = +goal.value;

    if (!goalNum || goalNum <= 0 || goalNum > 10000000) {
      setGoal({
        ...goal,
        err: true,
        errMsg: "Goal must range between 0 & 10000000"
      });
      return;
    } else setGoal({ value: goal.value });

    onSubmit({
      title: title.value,
      goal: goal.value,
      duration: duration.value,
      image: image.value,
      description: description.value
    });
  };

  const handleChange = (old, newValue, setFun) => {
    setFun({ ...old, value: newValue });
  };

  const classes = useStyles();

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Project Title"
        fullWidth
        error={title.err}
        helperText={title.errMsg}
        //required
        className={classes.input}
        autoFocus
        variant="outlined"
        value={title.value}
        onChange={e => handleChange(title, e.target.value, setTitle)}
      />
      <TextField
        label="Campaign Goal (Ether)"
        fullWidth
        //required
        error={goal.err}
        helperText={goal.errMsg}
        className={classes.input}
        variant="outlined"
        value={goal.value}
        onChange={e => handleChange(goal, e.target.value, setGoal)}
      />
      <div className={classes.input}>
        <Typography id="duration-slider" gutterBottom>
          Campaign Duration (Days)
        </Typography>
        <Slider
          value={duration.value}
          onChange={(_, value) => handleChange(duration, value, setDuration)}
          aria-labelledby="duration-slider"
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={20}
        />
      </div>
      <TextField
        label="Project Image Url"
        fullWidth
        //required
        className={classes.input}
        variant="outlined"
        value={image.value}
        onChange={e => handleChange(image, e.target.value, setImage)}
      />
      <TextField
        label="Project Description"
        fullWidth
        //required
        className={classes.input}
        variant="outlined"
        multiline
        rows={12}
        value={description.value}
        onChange={e =>
          handleChange(description, e.target.value, setDescription)
        }
      />
      <Grid container justify="center">
        <Button type="submit" variant="contained" color="primary" size="large">
          Publish Campaign
        </Button>
      </Grid>
      {pending && (
        <Box px={3} py={4}>
          <Grid container justify="center" alignItems="center">
            <Typography
              variant="h6"
              color="textSecondary"
              style={{ marginRight: 20 }}
            >
              Pending
            </Typography>
            <CircularProgress color="primary" />
          </Grid>
        </Box>
      )}
    </form>
  );
};

export default ProjectForm;
