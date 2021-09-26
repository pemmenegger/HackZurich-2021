import * as React from 'react';
import Slider from '@mui/material/Slider';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#222222',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#222222',
      main: '#222222',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#222222',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});


const CustomizedSlider = (props) => {

  const handleChange = (event, newValue) => {
    if (typeof newValue === 'number') {
      props.onChange(newValue)
    }
  };

  return (
    <Slider
        value={props.value}
        min={props.min}
        step={props.step}
        max={props.max}
        onChange={handleChange}
        aria-labelledby="non-linear-slider"
        color="primary"
        theme={theme}
    />
  );
}

export { CustomizedSlider as Slider };