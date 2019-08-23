import PropTypes from 'prop-types'
import React from 'react'
import { MDXProvider } from '@mdx-js/tag'
import SectionContext from '~/components/api/section-context'
import Heading from '../heading'
import HR from '~/components/text/hr'
import { UL, LI } from '../text/list'
import { H1, H2, H3, H4, P } from '../text'
import { InlineCode, Code } from '../text/code'
import { GenericLink } from '../text/link'

class DocH2 extends React.PureComponent {
  render() {
    const { children, id } = this.props
    return (
      <Heading
        lean={true}
        offsetTop={175}
        id={generateId(this.context.id, { children, id })}
      >
        <H2>{children}</H2>
      </Heading>
    )
  }
}

DocH2.contextTypes = {
  id: PropTypes.string
}

class DocH3 extends React.PureComponent {
  render() {
    const { children } = this.props
    return <H3>{children}</H3>
  }
}

DocH3.contextTypes = {
  id: PropTypes.string
}

class DocH4 extends React.PureComponent {
  render() {
    const { children } = this.props
    return <H4>{children}</H4>
  }
}

DocH4.contextTypes = {
  id: PropTypes.string
}

export const Quote = ({ children }, { darkBg } = {}) => (
  <blockquote className={darkBg ? 'dark' : ''}>
    {children}
    <style jsx>{`
      blockquote {
        padding: 10px 20px;
        border-left: 5px solid #000;
        margin: 32px 0;
        color: #000;
      }

      blockquote.dark {
        border-left-color: #fff;
        color: #888;
      }

      blockquote :global(div) {
        margin: 0;
      }
    `}</style>
  </blockquote>
)

Quote.contextTypes = {
  darkBg: PropTypes.bool
}

export const components = {
  p: P,
  strong: P.B,
  ul: UL,
  li: LI,
  h2: DocH2,
  h3: DocH3,
  h4: DocH4,
  code: Code,
  inlineCode: InlineCode,
  a: GenericLink,
  blockquote: Quote,
  hr: HR
}

class APISection extends React.Component {
  static childContextTypes = {
    id: PropTypes.string
  }

  getChildContext() {
    return { id: this.getId() }
  }

  getId() {
    const hash = this.props.hash || this.context.hash
    return hash ? hash.slice(1) : null
  }

  render() {
    let { hideTitle, hideBottom, title } = this.props.meta || {}
    const classes = ['section']

    if (!title) {
      title = this.props.name
    }

    if (hideTitle) {
      classes.push('hide-title')
    }

    if (hideBottom) {
      classes.push('hide-bottom')
    }

    return (
      <MDXProvider components={components}>
        <div className={classes.join(' ')}>
          <div className="block title">
            <div className="copy">
              <Heading lean={true} offsetTop={95} id={this.getId()}>
                <H1>{title}</H1>
              </Heading>
            </div>
          </div>
          <div className="block">{this.props.children}</div>

          <style jsx>{`
          .section {
            flex: 1;
            position: relative;
            padding-top: 24px;
            padding-bottom: 48px;
          }

          .block > :global(div) {
            position: relative;
            padding-left: 40px;
          }

          .block :global(h1) {
            margin-top: 0;
          }

          .block :global(p + h2, p + h3) {
            margin-top: 48px;
          }

          .block :global(* + h2) {
            margin-top: 64px;
          }

          .block:first-child .copy,
          .block:first-child .example {
            padding-top: 35px;
          }

          .block:last-child .copy,
          .block:last-child .example {
            padding-bottom: 15px;
          }

          .section.hide-bottom .block:last-child .copy,
          .section.hide-bottom .block:last-child .example {
            padding-bottom: 0;
          }

          .section.hide-title .title {
            display: none;
          }

          @media screen and (max-width: 950px) {
            .section {
              width: 100%;
              margin-left: 0;
            }
          }

          @media screen and (min-width: 700px) {
            /* the little line below each section */
            .section::after {
              height: 1px;
              display: block;
              content: '';
              width: 100%;
              background: #eaeaea;
              position: absolute;
              bottom: 0;
            }

            .section.hide-bottom::after {
              display: none;
            }

            }
          }

          @media screen and (max-width: 700px) {
            .block {
              display: block;
            }

            .copy,
            .example {
              padding: 0 20px;
              width: auto;
            }

            .copy {
              background: #fff;
            }

            .example {
              padding-top: 20px;
              padding-bottom: 20px;
            }

            .example.empty {
              display: none;
            }
          }

          @media screen and (max-width: 950px) {
            .block > :global(div) {
              padding-left: 0;
            }
          }
        `}</style>
        </div>
      </MDXProvider>
    )
  }
}

/* eslint-disable react/display-name */
export default ({ ...meta } = {}) => ({ children }) => (
  <SectionContext.Consumer>
    {({ hash, name }) => (
      <APISection meta={meta} hash={hash} name={name}>
        {children}
      </APISection>
    )}
  </SectionContext.Consumer>
)

function generateId(prefix, { id, children }) {
  if (!id) {
    const text = 'string' === typeof children ? children : children.join('')
    id = text
      .toLowerCase()
      .replace(/[\s]/g, '-')
      .replace(/[?!]/g, '')
  }

  return `${prefix}/${id}`
}
