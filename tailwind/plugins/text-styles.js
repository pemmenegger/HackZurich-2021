const plugin = require("tailwindcss/plugin");

const textStyles = plugin(({ addComponents, config }) => {
  const FONT_FAMILIES = {
    lora: '"Lora", serif',
    rasa: '"Rasa", serif',
  };

  const TEXT_STYLES = {
    h1: {
      desktop: {
        fontSize: "3rem",
        lineHeight: "1em",
        fontWeight: "900",
        fontFamily: "rasa",
        uppercase: false,
      },
      mobile: {
        fontSize: "3rem",
        lineHeight: "1em",
        fontWeight: "900",
        fontFamily: "rasa",
        uppercase: false,
      },
    },
    h2: {
      desktop: {
        fontSize: "2rem",
        lineHeight: "1em",
        fontWeight: "900",
        fontFamily: "rasa",
        uppercase: false,
      },
      mobile: {
        fontSize: "2rem",
        lineHeight: "1em",
        fontWeight: "900",
        fontFamily: "rasa",
        uppercase: false,
      },
    },
    h3: {
      desktop: {
        fontSize: "2rem",
        lineHeight: "1em",
        fontWeight: "900",
        fontFamily: "rasa",
        uppercase: false,
      },
      mobile: {
        fontSize: "2rem",
        lineHeight: "1em",
        fontWeight: "900",
        fontFamily: "rasa",
        uppercase: false,
      },
    },
    h4: {
      desktop: {
        fontSize: "1rem",
        lineHeight: "1em",
        fontWeight: "900",
        fontFamily: "rasa",
        uppercase: false,
      },
      mobile: {
        fontSize: "1rem",
        lineHeight: "1em",
        fontWeight: "900",
        fontFamily: "rasa",
        uppercase: false,
      },
    },
    lead: {
      desktop: {
        fontSize: "1rem",
        lineHeight: "1.5em",
        fontWeight: "400",
        fontFamily: "lora",
        uppercase: false,
      },
      mobile: {
        fontSize: "1rem",
        lineHeight: "1.5em",
        fontWeight: "400",
        fontFamily: "lora",
        uppercase: false,
      },
    },
    body: {
      desktop: {
        fontSize: "1rem",
        lineHeight: "1.5em",
        fontWeight: "400",
        fontFamily: "lora",
        uppercase: false,
      },
      mobile: {
        fontSize: "1rem",
        lineHeight: "1.5em",
        fontWeight: "400",
        fontFamily: "lora",
        uppercase: false,
      },
    },
    tinyText: {
      desktop: {
        fontSize: "1rem",
        lineHeight: "1.5em",
        fontWeight: "400",
        fontFamily: "lora",
        uppercase: false,
      },
      mobile: {
        fontSize: "1rem",
        lineHeight: "1.5em",
        fontWeight: "400",
        fontFamily: "lora",
        uppercase: false,
      },
    },
  };

  const mobileBreakpointRule = `@media (min-width: ${config(
    "theme.screens.lg"
  )})`;

  const components = Object.fromEntries(
    Object.entries(TEXT_STYLES).map(([name, styles]) => [
      `.text-${name}`,
      {
        fontSize: styles.mobile.fontSize,
        lineHeight: styles.mobile.lineHeight,
        fontWeight: styles.mobile.fontWeight,
        fontFamily: FONT_FAMILIES[styles.mobile.fontFamily || "lora"],
        textTransform: styles.mobile.uppercase ? "uppercase" : "none",
        opacity: styles.mobile.opacity,
        letterSpacing: styles.mobile.letterSpacing,
        margin: 0,
        [mobileBreakpointRule]: {
          fontSize: styles.desktop.fontSize,
          lineHeight: styles.desktop.lineHeight,
          fontWeight: styles.desktop.fontWeight,
          fontFamily: FONT_FAMILIES[styles.mobile.fontFamily || "lora"],
          textTransform: styles.desktop.uppercase ? "uppercase" : "none",
          opacity: styles.desktop.opacity,
          letterSpacing: styles.desktop.letterSpacing,
          margin: 0,
        },
      },
    ])
  );
  addComponents(components, ["responsive"]);
});

module.exports = textStyles;
