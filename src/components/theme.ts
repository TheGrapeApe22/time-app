import { createTheme } from "@mui/material/styles";

export const appTheme = createTheme({
  palette: {
    mode: "dark",
    text: {
      primary: "#fff",
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        size: "small",
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          width: 140,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#fff",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          color: "#fff",
          padding: "6px 8px",
        },
        notchedOutline: {
          borderColor: "#fff",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "#fff",
        },
      },
    },
  },
});
