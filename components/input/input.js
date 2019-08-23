import { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

class Input extends Component {
  static propTypes = {
    autoFocus: PropTypes.bool,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    errored: PropTypes.bool,
    icon: PropTypes.node,
    innerRef: PropTypes.func,
    maxLength: PropTypes.number,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onPaste: PropTypes.func,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string
  }

  static contextTypes = {
    disabled: PropTypes.bool
  }

  state = {
    focused: this.props.autoFocus
  }

  handleChange = event => {
    this.props.onChange(event.target.value)
  }

  handleRef = node => {
    this.innerRef = node
    if (this.props.innerRef) {
      this.props.innerRef(node)
    }
  }

  handleFocus = event => {
    this.setState({ focused: true })
    if (this.props.onFocus) {
      this.props.onFocus(event)
    }
  }

  handleBlur = event => {
    this.setState({ focused: false })
    if (this.props.onBlur) {
      this.props.onBlur(event)
    }
  }

  render() {
    const {
      autoFocus,
      children,
      disabled,
      errored,
      icon,
      rightIcon,
      maxLength,
      placeholder,
      type,
      value
    } = this.props
    const { focused } = this.state
    const { disabled: disabledContext } = this.context
    const className = cn(
      'wrapper',
      { errored, focused, disabled },
      this.props.className
    )

    return (
      <div className={className}>
        {icon && <span className="icon">{icon}</span>}
        <div className="input-wrapper">
          <input
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            autoFocus={autoFocus}
            disabled={disabled || disabledContext}
            maxLength={maxLength}
            onBlur={this.handleBlur}
            onChange={this.props.onChange ? this.handleChange : null}
            onFocus={this.handleFocus}
            onPaste={this.props.onPaste}
            placeholder={placeholder}
            ref={this.handleRef}
            type={type || 'text'}
            value={value}
          />
          {children}
        </div>
        {rightIcon && <span className="icon">{rightIcon}</span>}
        <style jsx>{`
          .wrapper {
            align-items: center;
            border-radius: 5px;
            border: 1px solid #e1e1e1;
            display: inline-flex;
            height: 37px;
            position: relative;
            transition: border 0.2s ease, color 0.2s ease;
            vertical-align: middle;
          }

          .wrapper.disabled {
            background: #fafafa;
          }

          .wrapper.focused {
            border: 1px solid #888;
          }

          .wrapper.errored {
            border: 1px solid red;
          }

          .wrapper.errored.focused {
            border: 1px solid red;
            color: red;
          }

          .wrapper.errored input {
            color: red;
          }

          .icon {
            align-items: center;
            display: flex;
            height: 100%;
            padding: 0 14px;
            vertical-align: middle;
          }

          .icon ~ .input-wrapper {
            margin-left: 0;
          }

          .input-wrapper {
            display: block;
            margin: 4px 10px;
            position: relative;
            width: 100%;
          }

          input {
            background-color: transparent;
            border-radius: 0;
            border: none;
            box-shadow: none;
            box-sizing: border-box;
            display: block;
            font-family: var(--font-sans);
            font-size: var(--font-size-primary);
            line-height: var(--line-height-primary);
            outline: 0;
            width: 100%;
          }

          .wrapper input:disabled {
            background: #fafafa;
            color: #999;
            border-radius: 5px;
          }

          .wrapper input:disabled::placeholder {
            color: #999;
          }
        `}</style>
      </div>
    )
  }
}

export default Input
