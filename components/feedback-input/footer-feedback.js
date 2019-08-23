import React, { Component } from 'react'
import FeedbackInput from './feedback-input'
import ClickOutside from '~/components/click-outside'
import fetchAPI from '~/lib/fetch-api'
import { getToken } from '~/lib/authenticate'
import { API_DOCS_FEEDBACK } from '~/lib/constants'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { H5 } from '~/components/text'

const EMOJIS = new Map([
  ['🤩', 'f929'],
  ['🙂', 'f600'],
  ['😕', 'f615'],
  ['😭', 'f62d']
])
let EMOJI_CODES = null

function getEmoji(code) {
  if (code === null) return code

  if (EMOJI_CODES === null) {
    EMOJI_CODES = new Map([...EMOJIS].map(([k, v]) => [v, k]))
  }
  return EMOJI_CODES.get(code)
}

export default class GuidesFeedback extends Component {
  state = {
    success: false,
    errorMessage: null,
    feedbackOpen: false,
    emotion: null,
    feedbackSent: false,
    value: ''
  }

  setError = error => {
    this.setState({ errorMessage: error })
  }

  onErrorDismiss = () => {
    this.setState({ errorMessage: null })
  }

  setLoading = state => {
    this.setState({ loading: state })
  }

  setSuccessState = state => {
    this.setState({ success: state })
    if (state === true) {
      this.setState({ feedbackSent: true })
    }
  }

  handleValue = event => {
    this.setState({
      value: event.target.value
    })
  }

  onSubmit = () => {
    this.setLoading(true)

    fetchAPI(
      API_DOCS_FEEDBACK +
        (this.props.currentTeamSlug
          ? `?teamId=${encodeURIComponent(this.props.currentTeamSlug)}`
          : ''),
      getToken(),
      {
        method: 'POST',
        body: JSON.stringify({
          url:
            window.location.hostname === 'localhost'
              ? `https://zeit.co/dev-mode${window.location.pathname}`
              : window.location.toString(),
          note: this.state.value,
          emotion: getEmoji(this.state.emotion),
          ua: `${this.props.uaPrefix || ''} + ${
            navigator.userAgent
          } (${navigator.language || 'unknown language'})`
        }),
        throwOnHTTPError: true
      }
    )
      .then(() => {
        this.setLoading(false)
        this.setSuccessState(true)
      })
      .catch(err => {
        this.setError(err.message)
        this.setLoading(false)
      })
  }

  onEmotionClick = emoji => {
    if (!this.state.loading && !this.state.success) {
      this.setState({
        feedbackOpen: true,
        emotion: emoji
      })
    }
  }

  handleOpen = () => {
    this.setState({
      feedbackOpen: true
    })
  }

  handleClose = () => {
    this.setState({
      feedbackOpen: false,
      emotion: null
    })
  }

  render() {
    return (
      <div className="feedback">
        <H5>Was this helpful?</H5>
        <ClickOutside
          active={this.state.feedbackOpen}
          onClick={this.handleClose}
          render={({ innerRef }) => (
            <div className="feedback-content" ref={innerRef}>
              <EmojiSelector
                onSelect={this.onEmotionClick}
                success={this.state.success}
                loading={this.state.loading}
                current={this.state.emotion}
              />
              <FeedbackInput
                focused={this.state.feedbackOpen}
                handleClose={this.handleClose}
                setError={this.setError}
                setSuccessState={this.setSuccessState}
                errorMessage={this.state.errorMessage}
                success={this.state.success}
                onErrorDismiss={this.onErrorDismiss}
                onSubmit={this.onSubmit}
                handleValue={this.handleValue}
                loading={this.state.loading}
                placeholder="Please enter feedback or submit your emotion..."
              />
            </div>
          )}
        />
        <style jsx>{`
          .feedback {
            position: relative;
            text-align: center;
          }

          .feedback-content {
            display: flex;
            width: 100%;
            flex-direction: column;
            align-items: center;
          }

          .feedback :global(h5) {
            margin-top: 0;
            margin-bottom: 16px;
          }

          .feedback :global(.feedback-input) {
            opacity: 0;
            transition: all 0.15s ease;
            max-height: 0;
            position: relative;
            width: 408px;
            margin: 0;
            overflow: hidden;
            padding: 4px;
          }

          .feedback :global(.feedback-input.focused) {
            opacity: 1;
            max-height: 120px;
            margin-top: 16px;
            margin-bottom: 16px;
          }

          .feedback :global(.feedback-input textarea) {
            width: 400px;
            position: relative;
            visibility: ${this.state.success ? 'hidden' : 'visible'};
            transition: all 0.2s ease;
            height: 100%;
          }

          .feedback :global(.feedback-input.focused textarea) {
            box-shadow: 0 0 0 1px #eaeaea;
          }

          .feedback :global(.feedback-input.focused .controls) {
            pointer-events: none;
            background: transparent;
            display: ${this.state.success ? 'none' : 'flex'};
            padding-right: 12px;
          }

          .feedback :global(.feedback-input.focused .buttons) {
            pointer-events: fill;
          }

          .feedback :global(.feedback-input .success-message) {
            width: 100%;
          }
        `}</style>
      </div>
    )
  }
}

class EmojiSelector extends Component {
  static contextTypes = {
    darkBg: PropTypes.bool
  }

  render() {
    const darkBg = this.props.darkBg || this.context.darkBg

    return (
      <main
        className={`geist-emoji-selector shown ${
          this.props.loading || this.props.success ? 'loading' : ''
        } ${darkBg ? 'dark' : ''}`}
      >
        {Array.from(EMOJIS.values()).map(emoji => (
          <button
            type="button"
            className={cn('option', { active: this.props.current === emoji })}
            key={emoji}
            onMouseEnter={this.onMouseEnter}
            onTouchStart={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
            onClick={() => this.props.onSelect(emoji)}
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
              padding: 2px 3px;
              cursor: pointer;
              text-align: center;
              filter: grayscale(100%);
              -webkit-filter: grayscale(100%);
            }

            .geist-emoji-selector.loading > button {
              cursor: default;
              transition: transform 0.2s ease;
            }

            .geist-emoji-selector > button:first-child {
              outline: none;
              pointer-events: all;
            }

            .geist-emoji-selector.loading > button:first-child {
              outline: none;
              pointer-events: none;
            }

            .geist-emoji-selector > button:not(:last-child) {
              margin-right: 12px;
            }

            .geist-emoji-selector > button .inner {
              height: 40px;
              width: 40px;
              justify-content: center;
              align-items: center;
              padding: 3px;
            }

            .geist-emoji-selector > button .inner.icon {
              padding: 3px 2px 2px 2px;
            }

            .geist-emoji-selector.dark {
              background: transparent !important;
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
              transition: all ease 100ms;
              pointer-events: none;
            }

            .geist-emoji-selector > button:hover,
            .geist-emoji-selector > button.active {
              transform: scale(1.3);
              filter: grayscale(0);
              -webkit-filter: grayscale(0);
            }

            .geist-emoji-selector.shown > button.option {
              pointer-events: all;
              opacity: 1;
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
    width={code === 'f600' || code === 'f62d' || code === 'f615' ? 24.5 : 22}
    height={code === 'f600' || code === 'f62d' || code === 'f615' ? 24.5 : 22}
    src={`https://assets.zeit.co/twemoji/1${code}.svg`}
    alt="emoji"
    style={{
      transform:
        code === 'f600' || code === 'f615' ? 'translateY(0.5px)' : 'none'
    }}
  />
))
