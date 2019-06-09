

## Usage

```
import { cn } from 'styled-utils'

const classes = cn({
  display: "flex",
  color: "primary.500",
  fontSize: "6xl",
})

// display-flex color-primary-500 font-size-6xl
```

## Server side

TODO

## React

### Styled

```
import { styled } from 'styled-utils/react'

const Heading = styled('h1')(props => ({
  color: props.active ? "primary.500" : "black",
  fontSize: "6xl",
})



render() {
  return <Heading active={isActive}>Hello World</Heading>
}
```

### Pragma

```
/** @jsx jsx **/
import { jsx } from 'styled-utils/react'

const App = () => (
  <h1 tw={{
    color: "primary.500",
    fontSize: "6xl",
  }}>Hello World</h1>
)
```

### Theme Provider

TODO
