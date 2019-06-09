import dynamicStyles from "./dynamic-styles";
import theme from "./theme";
import _get from "./get";

let cache = {};
let rules = [];
let insert = rule => rules.push(rule);

if (typeof document !== "undefined") {
  let tag = document.getElementById("__csu__");
  if (!tag) {
    tag = document.createElement("style");
    tag.id = "__csu__";
    document.head.appendChild(tag);
  }
  const sheet = tag.sheet;
  insert = rule => {
    rules.push(rule);
    sheet.insertRule(rule, sheet.cssRules.length);
  };
}

const server = () => rules.join("");

const serverReset = () => (rules = []);

const css = (selector, styleString) => {
  const rule = `${selector}{${styleString}}`;
  if (cache[selector] !== undefined) return;
  cache[selector] = "";
  insert(rule);
};

const objectToCss = (obj = {}) => {
  console.log(objectToCss);

  const keys = Object.keys(obj);
  if (keys.length === 0) return "";
  return keys
    .map(key => {
      var val = obj[key];
      return camelCaseToKebabCase(key) + ":" + val + ";";
    })
    .join(" ");
};

const generateClassName = (entry, bp = null) => {
  const key = camelCaseToKebabCase(entry[0]);
  const value = String(entry[1])
    .split(".")
    .join("-");

  if (bp) return "." + bp + "-" + [key, value].join("-");
  return "." + [key, value].join("-");
};

const camelCaseToKebabCase = string => {
  return string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
};

const mq = (key, value) => {
  const { breakpoints } = theme;

  if (!breakpoints) {
    throw new Error("No breakpoints in styled-utils theme file");
  }

  return Object.keys(breakpoints)
    .map((bp, index) => {
      const v = value[index];
      if (!v) return null;
      const className = generateClassName([key, v], bp);

      insert(
        `@media screen and (min-width: ${breakpoints[bp]}) {
          ${className} {
          ${objectToCss({
            [key]: v
          })}})`
      );
      return className.substring(1, className.length);
    })
    .filter(i => i)
    .join(" ");
};

function cn(obj) {
  const entries = Object.entries(obj);
  return entries
    .map(entry => {
      const key = String(entry[0]);
      let value = entry[1];
      if (typeof value === Number) {
        value = String();
      } else if (Array.isArray(value)) {
        return mq(key, value);
      }

      // This value comes from the theme
      if (dynamicStyles[key]) {
        const dynamicStyle = dynamicStyles[key];
        let className = generateClassName(entry);

        if (typeof theme[dynamicStyle.config] === "object") {
          const themeValue = _get(theme[dynamicStyle.config], value);

          if (!themeValue) return null;

          css(
            className,
            objectToCss({
              [key]: themeValue
            })
          );
          return className.substring(1, className.length);
        }
      }

      const className = generateClassName(entry);

      css(
        className,
        objectToCss({
          [key]: value
        })
      );
      return className.substring(1, className.length);
    })
    .filter(i => i)
    .join(" ");
}

export { cn, server, serverReset };

export const hi = () => console.log("hi");
