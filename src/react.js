import React from "react";
import PropTypes from "prop-types";
import { cn } from "./";

const h = React.createElement;

function styled(C) {
  return (...args) => {
    const Comp = (props, context = {}) => {
      const stylePropKeys = [...Object.keys(Comp.propTypes || {}), "css"];
      const styleProps = Object.assign({ theme: context.theme || {} }, props);

      const next = {};

      for (let key in props) {
        if (stylePropKeys.includes(key)) continue;
        next[key] = props[key];
      }

      next.className = [
        next.className,
        ...args
          .map(a => (typeof a === "function" ? a(styleProps) : a))
          .filter(s => !!s)
          .map(s => cn(s))
      ]
        .join(" ")
        .trim();

      return h(C, next);
    };

    Comp.contextTypes = {
      theme: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
    };

    return Comp;
  };
}

function jsx(type, props) {
  let args = arguments;

  if (!props || !props.tw) {
    return h.apply(undefined, args);
  }

  const tw = props.tw;

  args[1].className = cn(tw);
  args[1].tw = null;

  return h.apply(undefined, args);
}

export { styled, jsx };
