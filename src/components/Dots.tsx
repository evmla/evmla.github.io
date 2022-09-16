import { createStyles } from "@mantine/core";
import { Dot } from "./Dot";

const Dots = () => {
  const useStyles = createStyles((theme) => ({
    dots: {
      position: "absolute",
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[2],

      "@media (max-width: 755px)": {
        display: "none",
      },
    },
  }));
  const { classes } = useStyles();
  return (
    <>
      <Dot className={classes.dots} style={{ left: 0, top: 0 }} />
      <Dot className={classes.dots} style={{ left: 60, top: 0 }} />
      <Dot className={classes.dots} style={{ left: 0, top: 140 }} />
      <Dot className={classes.dots} style={{ right: 60, top: 140 }} />
      <Dot className={classes.dots} style={{ right: 0, top: 60 }} />
    </>
  );
};

export default Dots;
