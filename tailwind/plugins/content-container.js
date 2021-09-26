const plugin = require("tailwindcss/plugin");

const contentBox = plugin(({ addComponents, theme }) => {
  const screens = theme("screens", {});

  const screensContentBoxMap = {
    md: {
      maxWidth: "768px",
      padding: "0",
      position: "center",
    },
    lg: {
      maxWidth: "992px",
      padding: "0",
      position: "center",
    },
    xl: {
      maxWidth: "1224px",
      padding: "0",
      position: "center",
    },
  };

  const positionMarginMap = {
    center: ["auto", "auto"],
  };

  const mediaQueries = Object.entries(screens)
    .filter(([screen]) => screensContentBoxMap[screen])
    .map(([screen, width]) => ({
      [`@media (min-width: ${width})`]: {
        ".content-container": {
          maxWidth: screensContentBoxMap[screen].maxWidth,
          marginLeft:
            positionMarginMap[screensContentBoxMap[screen].position][0],
          marginRight:
            positionMarginMap[screensContentBoxMap[screen].position][1],
          paddingRight: theme(
            `spacing.${screensContentBoxMap[screen].padding}`
          ),
          paddingLeft: theme(`spacing.${screensContentBoxMap[screen].padding}`),
        },
      },
    }));

  addComponents(
    [
      {
        ".content-container": {
          width: "100%",
          paddingRight: theme("spacing.7"),
          paddingLeft: theme("spacing.7"),
        },
      },
      {
        ".content-container-none": {
          maxWidth: "unset",
          marginLeft: "unset",
          marginRight: "unset",
          paddingRight: "unset",
          paddingLeft: "unset",
        },
      },
      ...mediaQueries,
    ],
    { variants: ["responsive"] }
  );
});

module.exports = contentBox;
