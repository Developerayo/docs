import React from 'react'
import cn from 'classnames'
import PropTypes from 'prop-types'
import getColor, { colorTypes } from '~/lib/utils/get-color'

// Conditionally wrap a React element with another
const wrap = (needed, children, tag) => {
  if (!needed) return children

  return React.createElement(tag, {}, children)
}

// Wrap the text in modifier elements like bold and italics
const wrapModifiers = (
  component,
  { mark, underline, strike, bold, italic }
) => {
  let result = component

  result = wrap(mark, result, 'mark')
  result = wrap(underline, result, 'u')
  result = wrap(strike, result, 's')
  result = wrap(bold, result, 'b')
  result = wrap(italic, result, 'i')

  return result
}

const presets = {
  h1: `
    font-size: 3rem;
    letter-spacing: -.066875rem;
    font-weight: 700;
  `,
  h2: `
    font-size: 2.25rem;
    letter-spacing: -.049375rem;
    font-weight: 600;
  `,
  h3: `
    font-size: 1.5rem;
    letter-spacing: -.029375rem;
    font-weight: 600;
  `,
  h4: `
    font-size: 1.25rem;
    letter-spacing: -.020625rem;
    font-weight: 600;
  `,
  h5: `
    font-size: 1rem;
    letter-spacing: -.01125rem;
    font-weight: 600;
  `,
  h6: `
    font-size: .875rem;
    letter-spacing: -.005625rem;
    font-weight: 600;
  `,
  p: `
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.6;
  `,
  small: `
    font-size: 14px;
    font-weight: 400;
  `,
  description: `
    text-transform: uppercase;
    font-weight: 500;
    font-size: 12px;
    color: var(--accents-5);
  `,
  span: ``
}

const getComponent = defaultElement => {
  const C = ({
    type,
    noMargin,
    weight,
    code,
    uppercase,
    capitalize,
    Component = defaultElement,
    children,
    className,
    ...props
  }) => {
    return (
      <Component
        className={cn(className, { 'geist-text-no-margin': noMargin })}
        {...props}
      >
        {children}
        <style jsx>
          {`
            ${Component} {
              font-family: ${code ? 'var(--font-mono)' : 'var(--font-sans)'};
              color: ${getColor(type) || 'inherit'};
              line-height: 1.5;
              ${presets[defaultElement]}
              ${noMargin ? 'margin: 0;' : ''}
              ${weight ? `font-weight: ${weight};` : ''}
              ${uppercase ? 'text-transform: uppercase;' : ''}
              ${capitalize ? 'text-transform: capitalize;' : ''};
            }
          `}
        </style>
      </Component>
    )
  }

  C.displayName = 'Text_' + defaultElement

  return C
}

export const H1 = getComponent('h1')
export const H2 = getComponent('h2')
export const H3 = getComponent('h3')
export const H4 = getComponent('h4')
export const H5 = getComponent('h5')
export const H6 = getComponent('h6')
export const P = getComponent('p')
export const Small = getComponent('small')
export const Description = getComponent('description')
export const Span = getComponent('span')

const components = [H1, H2, H3, H4, H5, H6, P, Small, Description, Span]

const Text = ({
  // HTML element
  Component,
  // styling
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  small,
  description,
  span,
  // wrapper
  mark,
  underline,
  strike,
  bold,
  italic,
  // react
  children,
  ...props
}) => {
  const Styler =
    components[
      [h1, h2, h3, h4, h5, h6, p, small, description, span].indexOf(true)
    ] || P

  return (
    <Styler Component={Component} {...props}>
      {wrapModifiers(children, { mark, underline, strike, bold, italic })}
    </Styler>
  )
}

Text.propTypes = {
  type: PropTypes.oneOf(colorTypes),
  Component: PropTypes.string,
  mark: PropTypes.bool,
  underline: PropTypes.bool,
  strike: PropTypes.bool,
  bold: PropTypes.bool,
  italic: PropTypes.bool,
  uppercase: PropTypes.bool,
  capitalize: PropTypes.bool,
  weight: PropTypes.oneOf([100, 200, 300, 400, 500, 600, 700, 800, 900])
}

export default Text
