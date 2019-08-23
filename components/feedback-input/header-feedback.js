// Packages
import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Components
import Button from '~/components/buttons'
import EmojiIcon from '~/components/icons/emoji'
import ClickOutside from '~/components/click-outside'

/* eslint-disable react/no-multi-comp */

const EMOJIS = new Map([
  ['🤩', 'f929'],
  ['🙂', 'f600'],
  ['😕', 'f615'],
  ['😭', 'f62d']
])

// gets the emoji from the code
let EMOJI_CODES = null
function getEmoji(code) {
  if (code === null) return code

  if (EMOJI_CODES === null) {
    EMOJI_CODES = new Map([...EMOJIS].map(([k, v]) => [v, k]))
  }
  return EMOJI_CODES.get(code)
}

const WIDTH = 256

class HeaderFeedback extends Component {
  static contextTypes = {
    darkBg: PropTypes.bool
  }

  static childContextTypes = {
    darkBg: PropTypes.bool
  }

  getChildContext = () => ({
    darkBg: this.props.darkBg || this.context.darkBg
  })

  state = {
    emoji: null,
    loading: false,
    focused: false,
    success: false,
    emojiShown: false,
    errorMessage: null,
    value: null
  }

  clearSuccessTimer = null

  textAreaRef = null

  handleTextAreaRef = node => {
    this.textAreaRef = node
  }

  onFocus = () => {
    this.setState({ focused: true })
  }

  onEmojiShown = () => {
    this.setState({ emojiShown: true })
  }

  onEmojiHidden = () => {
    this.setState({ emojiShown: false })
  }

  onEmojiSelect = emoji => {
    this.setState({ emoji })
    if (this.textAreaRef) {
      this.textAreaRef.focus()
    }
  }

  onErrorDismiss = () => {
    this.setState({ errorMessage: null })
  }

  handleClickOutside = () => {
    this.setState({ focused: false })
    this.textAreaRef.value = ''
  }

  onKeyPress = e => {
    if (e.keyCode === 27) {
      this.setState({ focused: false })
    }
  }

  done = errorMessage => {
    if (!errorMessage) {
      this.setState({ loading: false, success: true })
    } else {
      this.setState({ errorMessage, loading: false })
    }
  }

  onSubmit = () => {
    if (this.textAreaRef && this.textAreaRef.value.trim() === '') {
      this.setState({
        errorMessage: "Your feedback can't be empty"
      })
      return
    }

    if (this.props.onFeedback) {
      this.setState({ loading: true }, () => {
        this.props.onFeedback(
          {
            url:
              window.location.hostname === 'localhost'
                ? this.props.devLocation || null
                : window.location.toString(),
            note: this.textAreaRef ? this.textAreaRef.value : '',
            emotion: getEmoji(this.state.emoji),
            ua: `${this.props.uaPrefix || ''} + ${
              navigator.userAgent
            } (${navigator.language || 'unknown language'})`
          },
          this.done
        )
      })
    }
  }

  handleChange = e => {
    if (this.state.focused) {
      this.setState({
        value: e.target.value
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.focused) {
      // textarea was hidden if we were showing an error message and
      // now we hide it
      if (
        prevState.errorMessage != null &&
        this.state.errorMessage == null &&
        this.textAreaRef
      ) {
        this.textAreaRef.focus()
      }

      if (!prevState.focused) {
        window.addEventListener('keypress', this.onKeyPress)
      }

      // If a value exists, add it back to the textarea when focused
      this.textAreaRef.value = this.state.value

      if (this.props.hideHeader) {
        this.textAreaRef.blur()

        if (prevState.errorMessage && this.textAreaRef) {
          this.setState({ errorMessage: null }) // eslint-disable-line react/no-did-update-set-state
        }

        // if we had a success message
        // clear it
        if (prevState.success) {
          this.setState({ success: false }) // eslint-disable-line react/no-did-update-set-state
        }

        this.setState({ focused: false }) // eslint-disable-line react/no-did-update-set-state

        window.removeEventListener('keypress', this.onKeyPress)
      }
    } else if (prevState.focused && this.textAreaRef) {
      // needed for when we e.g.: unfocus based on pressing escape
      this.textAreaRef.blur()

      // Remove value visibly from textarea while it's unfocused
      this.textAreaRef.value = ''

      // if we unfocused and there was an error before,
      // clear it
      if (prevState.errorMessage && this.textAreaRef) {
        this.setState({ errorMessage: null }) // eslint-disable-line react/no-did-update-set-state
      }

      // if we had a success message
      // clear it
      if (prevState.success) {
        this.setState({ success: false }) // eslint-disable-line react/no-did-update-set-state
      }

      window.removeEventListener('keypress', this.onKeyPress)
    }

    if (this.state.success && this.textAreaRef) {
      // forget about input state
      this.textAreaRef.value = ''

      // collapse in 5s
      this.clearSuccessTimer = window.setTimeout(() => {
        if (!document.hidden) {
          this.setState({ success: false })
        }
      }, 5000)
    } else {
      if (prevState.success) {
        window.clearTimeout(this.clearSuccessTimer)
        this.clearSuccessTimer = null
      }

      if (prevState.success && this.state.focused) {
        this.setState({ focused: false }) // eslint-disable-line react/no-did-update-set-state
      }
    }
  }

  componentWillUnmount() {
    if (this.clearSuccessTimer !== null) {
      clearTimeout(this.clearSuccessTimer)
      this.clearSuccessTimer = null
    }

    window.removeEventListener('keypress', this.onKeyPress)
  }

  render() {
    const { darkBg, className, textAreaStyle, ...props } = this.props
    const { focused } = this.state
    delete props.onFeedback
    delete props.textAreaStyle

    return (
      <ClickOutside
        active={focused}
        onClick={this.handleClickOutside}
        render={({ innerRef }) => (
          <div
            ref={innerRef}
            title="Share any feedback about our products and services"
            className={`geist-feedback-input ${focused ? 'focused' : ''}
              ${this.state.errorMessage != null ? 'error' : ''}
              ${this.state.loading ? 'loading' : ''}
              ${this.state.success ? 'success' : ''}
              ${this.context.darkBg || darkBg ? 'dark' : ''}
              ${className}
              `}
            {...props}
          >
            <div className="textarea-wrapper">
              <textarea
                style={textAreaStyle}
                ref={this.handleTextAreaRef}
                placeholder={focused ? '' : 'Feedback...'}
                onFocus={this.onFocus}
                onKeyDown={e => {
                  if (e.key === 'Enter' && e.metaKey) {
                    this.onSubmit()
                  }
                }}
                onChange={this.handleChange}
                aria-label="Feedback input"
                disabled={
                  this.state.loading === true || this.state.errorMessage != null
                }
              />

              {this.state.errorMessage != null && (
                <div className="error-message">
                  <span>{this.state.errorMessage}</span>
                  <Button
                    small
                    onClick={e => {
                      e.preventDefault()
                      this.onErrorDismiss()
                    }}
                  >
                    GO BACK
                  </Button>
                </div>
              )}

              {this.state.success && (
                <div className="success-message">
                  <p>Your feedback has been received!</p>
                  <p>Thank you for your help.</p>
                </div>
              )}

              {this.state.errorMessage == null && !this.state.success && (
                <div className="controls">
                  <span className="emojis">
                    {focused ? (
                      <EmojiSelector
                        onShow={this.onEmojiShown}
                        onHide={this.onEmojiHidden}
                        onSelect={this.onEmojiSelect}
                        loading={this.state.loading}
                      />
                    ) : null}
                  </span>
                  {
                    <span
                      className={`buttons ${
                        this.state.emojiShown ? 'hidden' : ''
                      }`}
                    >
                      <Button
                        small
                        loading={this.state.loading}
                        onClick={this.onSubmit}
                        width={60}
                      >
                        Send
                      </Button>
                    </span>
                  }
                </div>
              )}
            </div>

            <style jsx>
              {`
                .geist-feedback-input {
                  padding: 0;
                  margin-right: 9px;
                  position: relative;
                  height: 24px;
                  width: 84px;
                  display: inline-block;
                  transition: all 150ms ease-out;
                  font-family: var(--font-sans);
                  text-rendering: optimizeLegibility;
                  -webkit-font-smoothing: antialiased;
                }

                .geist-feedback-input textarea {
                  appearance: none;
                  border-width: 0;
                  background: #f9f9f9;
                  padding: 0 8px;
                  line-height: 26px;
                  font-size: 12px;
                  border-radius: 4px;
                  font-family: var(--font-sans);
                  width: 84px;
                  resize: none;
                  vertical-align: top;
                  height: 100%;
                  transition: all 150ms ease-out;
                  /* fixes a bug in ff where the animation of the chat
                * counter appears on top of our input during its transition */
                  z-index: 100;
                  outline: 0;
                  color: #000;
                  overflow-y: hidden;
                  text-rendering: optimizeLegibility;
                  -webkit-font-smoothing: antialiased;
                }

                .geist-feedback-input.error textarea,
                .geist-feedback-input.loading textarea,
                .geist-feedback-input.success textarea {
                  pointer-events: none;
                }

                .geist-feedback-input.error textarea,
                .geist-feedback-input.success textarea {
                  color: transparent;
                  user-select: none;
                }

                .geist-feedback-input.loading textarea {
                  color: #ccc;
                }

                .geist-feedback-input.dark textarea {
                  background: #282828;
                  box-shadow: none;
                  color: #fff;
                }

                .geist-feedback-input textarea::placeholder {
                  color: #666;
                }

                .geist-feedback-input.dark textarea::placeholder {
                  color: #999;
                }

                div.focused {
                  transform: translate3d(-60%, -20%);
                }

                .geist-feedback-input .textarea-wrapper {
                  height: 100%;
                }

                .geist-feedback-input.focused .textarea-wrapper {
                  display: block;
                  width: ${WIDTH}px;
                  height: 150px;
                  background: #fff;
                  padding-bottom: 40px;
                  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12);
                  border-radius: 4px;
                  overflow: hidden;
                  position: relative;
                  transition: all 150ms ease-out;
                  z-index: 1000;
                }

                .geist-feedback-input.focused .textarea-wrapper textarea {
                  width: 256px;
                  background: #fff;
                  overflow-y: visible;
                }

                .geist-feedback-input.dark.focused textarea {
                  background: #282828;
                  box-shadow: none;
                }

                .geist-feedback-input .error-message,
                .geist-feedback-input .success-message {
                  position: absolute;
                  left: 0;
                  top: 0;
                  z-index: 1001;
                  width: ${WIDTH}px;
                  font-size: 12px;
                  height: 100%;
                  line-height: 20px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  text-align: center;
                  padding: 20px;
                  flex-direction: column;
                }

                .geist-feedback-input .error-message span {
                  color: #eb5757;
                  margin-bottom: 20px;
                }

                .geist-feedback-input .success-message p {
                  opacity: 0;
                }

                .geist-feedback-input .success-message p:first-child {
                  animation: appear 500ms ease;
                  animation-delay: 100ms;
                  animation-fill-mode: forwards;
                }

                .geist-feedback-input .success-message p:last-child {
                  animation: appear 500ms ease;
                  animation-delay: 1s;
                  animation-fill-mode: forwards;
                }

                .geist-feedback-input.dark .error-message span {
                  color: #999;
                }

                .geist-feedback-input .error-message a {
                  color: #000;
                  text-decoration: none;
                }

                .geist-feedback-input.dark .error-message a {
                  color: #fff;
                }

                .geist-feedback-input.focused .controls,
                .geist-feedback-input.dark.focused .controls {
                  display: flex;
                }

                .geist-feedback-input .controls {
                  pointer-events: none;
                  position: absolute;
                  visibility: hidden;
                  top: -2000px;
                  opacity: 0;
                  width: ${WIDTH}px;
                  background-color: white;
                  display: flex;
                  align-items: center;
                  border-bottom-left-radius: 5px;
                  border-bottom-right-radius: 5px;
                }

                .geist-feedback-input .controls .emojis {
                  width: 160px;
                  z-index: 1002;
                }

                .geist-feedback-input .controls .buttons {
                  flex: 1;
                  text-align: right;
                  transition: opacity 200ms ease;
                }

                .geist-feedback-input .controls .buttons.hidden {
                  opacity: 0;
                }

                .geist-feedback-input.focused .controls {
                  animation-name: appear;
                  animation-delay: 250ms;
                  animation-duration: 150ms;
                  animation-timing-function: ease-out;
                  animation-fill-mode: forwards;
                  pointer-events: inherit;
                  z-index: 1001;
                  padding: 8px;
                  visibility: visible;
                  bottom: 0;
                  top: auto;
                }

                .geist-feedback-input.dark .controls {
                  background-color: #282828;
                }

                @keyframes appear {
                  from {
                    opacity: 0;
                  }
                  to {
                    opacity: 1;
                  }
                }
              `}
            </style>
          </div>
        )}
      />
    )
  }
}

class EmojiSelector extends Component {
  static contextTypes = {
    darkBg: PropTypes.bool
  }

  state = {
    shown: false,
    current: null,
    currentSetAt: null // eslint-disable-line react/no-unused-state
  }

  onMouseEnter = () => {
    // eslint-disable-next-line no-console
    this.setState(prevState => {
      if (
        !prevState.shown &&
        Date.now() - (prevState.currentSetAt || 0) > 100
      ) {
        return { shown: true }
      }
      return prevState
    })
  }

  onMouseLeave = () => {
    // eslint-disable-next-line no-console
    this.setState(prevState => {
      if (prevState.shown) {
        return { shown: false }
      }

      return prevState
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.onShow && !prevState.shown && this.state.shown) {
      this.props.onShow()
    }

    if (this.props.onHide && prevState.shown && !this.state.shown) {
      this.props.onHide()
    }

    if (this.props.onSelect && prevState.current !== this.state.current) {
      this.props.onSelect(this.state.current)
    }
  }

  onSelect = current => {
    this.setState({
      current,
      currentSetAt: Date.now(), // eslint-disable-line react/no-unused-state
      shown: false
    })
  }

  render() {
    const darkBg = this.props.darkBg || this.context.darkBg

    return (
      <main
        className={`geist-emoji-selector ${this.state.shown ? 'shown' : ''} ${
          this.props.loading ? 'loading' : ''
        } ${darkBg ? 'dark' : ''}`}
      >
        <button
          className={this.state.current !== null ? 'active' : ''}
          onMouseEnter={this.onMouseEnter}
          onTouchStart={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          type="button"
          onClick={
            this.state.current !== null && this.state.shown
              ? () => this.onSelect(null)
              : this.state.shown
              ? this.onMouseLeave
              : this.onMouseEnter
          }
        >
          <span className="inner icon">
            {this.state.current === null ? (
              <EmojiIcon
                width="16px"
                height="16px"
                darkBg={this.context.darkBg}
              />
            ) : this.state.shown ? (
              <X />
            ) : (
              <Emoji code={this.state.current} />
            )}
          </span>
        </button>

        {Array.from(EMOJIS.values()).map(emoji => (
          <button
            type="button"
            className="option"
            key={emoji}
            onMouseEnter={this.onMouseEnter}
            onTouchStart={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
            onClick={this.onSelect.bind(this, emoji)}
          >
            <span className="inner">
              <Emoji code={emoji} />
            </span>
          </button>
        ))}

        <style jsx>
          {`
            .geist-emoji-selector {
              display: flex;
              width: 210px;
              pointer-events: none;
            }

            .geist-emoji-selector.loading {
              filter: grayscale(100%);
              -webkit-filter: grayscale(100%);
              cursor: default;
              pointer-events: none;
            }

            .geist-emoji-selector > button {
              background: transparent;
              border: 0;
              padding: 0;
              margin: 0;
            }

            .geist-emoji-selector > button,
            .geist-emoji-selector > button .inner {
              display: inline-flex;
            }

            .geist-emoji-selector > button {
              cursor: pointer;
              text-align: center;
            }

            .geist-emoji-selector > button:not(:last-child) {
              padding-right: 2px;
            }

            .geist-emoji-selector > button:not(:first-child) {
              padding-left: 2px;
            }

            .geist-emoji-selector.loading > button {
              cursor: default;
            }

            .geist-emoji-selector > button:first-child {
              outline: none;
              pointer-events: all;
            }

            .geist-emoji-selector.loading > button:first-child {
              outline: none;
              pointer-events: none;
            }

            .geist-emoji-selector > button .inner {
              height: 24px;
              width: 24px;
              border-radius: 4px;
              border: 1px solid #eaeaea;
              justify-content: center;
              align-items: center;
              padding: 3px;
            }

            .geist-emoji-selector > button .inner.icon {
              padding: 3px 2px 2px 2px;
            }

            .geist-emoji-selector.dark {
              background: transparent;
            }

            .geist-emoji-selector.dark > button .inner {
              border-color: #000000;
              background-color: #000000;
            }

            .geist-emoji-selector.dark.loading > button .inner {
              border-color: #666666;
              background-color: #666666;
            }

            .geist-emoji-selector > button.active .inner,
            .geist-emoji-selector > button:hover .inner {
              border-color: #f8e71c;
            }

            .geist-emoji-selector > button.option {
              opacity: 0;
              transform: translate3d(-10px, 0px, 0px);
              transition: all ease 100ms;
              pointer-events: none;
            }

            .geist-emoji-selector.shown > button.option {
              pointer-events: all;
            }

            .geist-emoji-selector.shown > button.option {
              opacity: 1;
              transform: translate3d(0, 0px, 0px);
            }
          `}
        </style>
      </main>
    )
  }
}

const Emoji = React.memo(({ code }) => (
  <img
    decoding="async"
    width={code === 'f600' || code === 'f62d' || code === 'f615' ? 18.5 : 16}
    height={code === 'f600' || code === 'f62d' || code === 'f615' ? 18.5 : 16}
    src={`https://assets.zeit.co/twemoji/1${code}.svg`}
    alt="emoji"
    style={{
      transform:
        code === 'f600' || code === 'f615' ? 'translateY(0.5px)' : 'none'
    }}
  />
))

const X = () => (
  <svg
    width="8px"
    height="8px"
    viewBox="0 0 8 8"
    version="1.1"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <g
      transform="translate(-704.000000, -190.000000) translate(704.000000, 190.000000)"
      stroke="#979797"
      strokeWidth={1}
      fill="none"
      fillRule="evenodd"
      strokeLinecap="square"
    >
      <path d="M.5.5l7 7" />
      <path d="M7.5.5l-7 7" />
    </g>
  </svg>
)

export default HeaderFeedback
