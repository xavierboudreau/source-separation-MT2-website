import Typography from "typography"
import fairyGateTheme from "typography-theme-fairy-gates"

fairyGateTheme.overrideThemeStyles = () => ({
    a: {
      textDecoration: "none",
      backgroundImage: "none",
      textShadow: "none",
    },
  })

const typography = new Typography(fairyGateTheme)

export const { scale, rhythm, options } = typography
export default typography