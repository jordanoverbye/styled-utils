# Styled Utils

An experimental, themeable, small CSS-in-JS library which outputs to utility classes. Each class is generated at run-time and cached to avoid CSS bloat.

## Usage

```
import { cn } from 'styled-utils'

const classes = cn({
  display: "flex",
  color: "primary.500",
  fontSize: "6xl",
})

=> display-flex color-primary-500 font-size-6xl
```

## React

Styled Utils works with any framework but has some extra utilities for React.

### Styled

Styled Components

```
import { styled } from 'styled-utils/react'

const Heading = styled('h1')(props => ({
  color: props.active ? "primary.500" : "black",
  fontSize: "6xl",
})

const App = ({ isActive }) => (
  <Heading active={isActive}>Hello World</Heading>
);
```

### Pragma

```
/** @jsx jsx **/
import { jsx } from 'styled-utils/react'

const App = props => (
  <h1 
    tw={{
      color: "primary.500",
      fontSize: "6xl",
    }}
  >
    Hello World
  </h1>
)

=> <h1 className="color-primary-500 font-size-6xl">Hello World</div>
```

### Theme Provider


```
import { ThemeContext } from "styled-utils/react";

const App = props => (
  <ThemeContext.Provider value={theme}>
    <ExampleComponent />
  </ThemeContext.Provider>
)
```

### Media Queries

Mobile first media queries

```
/** @jsx jsx **/
import { jsx } from 'styled-utils/react'

const App = props => (
  <div 
    tw={{
      display: ['flex', 'flex-inline', 'block', 'none', 'flex']
    }}
  >
    Hello World
  </div>
)

=> <h1 className="display-flex sm:display-flex-inline md:display-block lg:display-none xl:display-flex">Hello World</div>
```
