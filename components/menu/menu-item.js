import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

class MenuItem extends Component {
  static propTypes = {
    children: PropTypes.node,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    value: PropTypes.any
  }

  handleClick = event => {
    if (this.props.onClick) {
      this.props.onClick(this.props.value, event)
    }
  }

  render() {
    const { children, disabled } = this.props
    return (
      <li className={cn({ disabled })} onClick={this.handleClick}>
        {children}
        <style jsx>{`
          li {
            align-items: center;
            color: #999;
            display: flex;
            font-size: var(--font-size-primary);
            line-height: var(--line-height-primary);
            padding: 8px 20px;
            position: relative;
            white-space: nowrap;
            width: 100%;
          }

          li > :global(a) {
            transition: all 0.2s ease;
          }
          li:not(.disabled) > :global(a:hover) {
            color: #000;
            background: #fafafa;
            cursor: pointer;
          }

          li.disabled {
            color: #eaeaea;
            pointer-events: none;
          }

          li :global(svg) {
            margin-left: auto;
          }

          li > :global(a) {
            color: inherit;
            display: flex;
            margin: -8px -20px;
            padding: 8px 20px;
            text-decoration: none;
            width: calc(100% + 40px);
          }
        `}</style>
      </li>
    )
  }
}

export default MenuItem
