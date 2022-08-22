export const typo = {
  mr: 2,
  display: { xs: "none", md: "flex" },
  fontFamily: "monospace",
  fontWeight: 700,
  letterSpacing: ".3rem",
  color: "inherit",
  textDecoration: "none",
  "&:hover": {
    color: "#64b5f6",
  },
};

export const typo2 = {
  mr: 2,
  display: { xs: "flex", md: "none" },
  flexGrow: 1,
  fontSize: 18,
  fontFamily: "monospace",
  fontWeight: 700,
  letterSpacing: ".3rem",
  color: "inherit",
  textDecoration: "none",
};

export const logout = {
  mr: {
    xs: -4,
    display: { xs: "flex", md: "none" },
  },
  color: "white",
  boxShadow: "none",
  "&:hover": {
    background: "white",
    color: "#1877f2",
    boxShadow: "none",
  },
};
export const button1 = {
  color: "white",
  borderColor: "white",
  my: 2,
  display: "block",
  fontStyle: "italic",
  "&:hover": {
    background: "#fff",
  },
  width: "85px",
};

export const button2 = {
  color: "white",
  borderColor: "white",
  my: 2,
  ml: 1,
  display: "block",
  fontStyle: "italic",
  "&:hover": {
    background: "#fff",
  },
  width: "85px",
  justifyContent: "space-between",
};

export const logout2 = {
  color: "white",
  boxShadow: "none",
  "&:hover": {
    background: "white",
    color: "#1877f2",
    boxShadow: "none",
  },
};
