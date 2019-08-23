import { Component } from 'react'
import Link from 'next/link'

import * as PopOver from '~/components/popover'
import PopOverLink from '~/components/popover/popover-link'
import Badge from './badge'

import { GenericLink } from '~/components/text/link'

export class MenuPopOver extends Component {
  state = { isOpen: false }
  timer = null

  open = () => {
    this.timer = setTimeout(() => this.setState({ isOpen: true }), 100)
  }

  close = () => {
    clearTimeout(this.timer)
    this.setState({ isOpen: false })
  }

  render() {
    const {
      dashboard,
      clickable,
      title,
      section,
      inverse,
      primaryTitle,
      secondaryTitle,
      primaryList,
      secondaryList,
      blogItem,
      offsetArrowLeft
    } = this.props
    const contentWidth = primaryList && secondaryList ? 480 : 160
    return (
      <span
        className={
          (this.state.isOpen ? 'is-active' : '') +
          (inverse ? ' is-inverse' : '')
        }
        onMouseEnter={clickable ? null : this.open}
        onMouseLeave={this.close}
        onClick={this.open}
      >
        {title}
        <PopOverLink
          withArrow={!dashboard}
          inline={true}
          isOpen={this.state.isOpen}
          offsetLeft={dashboard ? -58 : -62}
          offsetTop={0}
          to={
            <PopOver.Menu
              tipOffset={
                offsetArrowLeft ? offsetArrowLeft : dashboard ? 58 : 60
              }
              noPadding
              width={dashboard ? 140 : contentWidth}
            >
              <div className="wrapper">
                {primaryList && (
                  <aside className="left">
                    {primaryTitle && (
                      <div className="header">
                        <h5>{primaryTitle}</h5>
                      </div>
                    )}
                    <div className="content">
                      {primaryList.map((item, index) => {
                        return (
                          <PopOver.Item
                            key={index}
                            noPadding
                            separated={item.separated}
                            fullWidth
                            active={section === item.url}
                          >
                            <GenericLink href={item.url} target={null}>
                              {item.title}
                              {item.isHot && (
                                <>
                                  {'    '}
                                  <Badge
                                    fontColor="#666"
                                    backgroundColor="#eaeaea"
                                    content="HOT"
                                  />
                                </>
                              )}
                            </GenericLink>
                          </PopOver.Item>
                        )
                      })}
                    </div>
                  </aside>
                )}

                {secondaryList && (
                  <aside className="right">
                    {secondaryTitle && (
                      <div className="header">
                        <h5>{secondaryTitle}</h5>
                      </div>
                    )}
                    <div className="content">
                      {secondaryList.map((item, index) => {
                        return (
                          <PopOver.Item
                            key={index}
                            noPadding
                            fullWidth
                            active={section === item.url}
                          >
                            <GenericLink href={item.url} target={null}>
                              {item.title}
                            </GenericLink>
                          </PopOver.Item>
                        )
                      })}
                    </div>
                  </aside>
                )}
                {blogItem && (
                  <Link href={blogItem.url}>
                    <a className="footer" aria-label={blogItem.title}>
                      <div className="icon">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15 16H1a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1zm0-14.5a.5.5 0 0 0-.5-.5h-13a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-13zM13.5 13h-11a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1zm0-2h-11a.5.5 0 1 1 0-1h11a.5.5 0 0 1 0 1zm0-2h-11a.5.5 0 1 1 0-1h11a.5.5 0 0 1 0 1zm0-2h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1zm0-2h-4a.5.5 0 0 1 0-1h4a.5.5 0 1 1 0 1zm0-2h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1zM7 7H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1zm0-3.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-2z"
                            fill="#0076FF"
                          />
                        </svg>
                      </div>
                      <span>{blogItem.title}</span>
                      <div className="label">
                        <svg
                          width="38"
                          height="20"
                          viewBox="0 0 38 20"
                          fill="none"
                        >
                          <rect
                            x="0.5"
                            y="0.5"
                            width="37"
                            height="19"
                            rx="3.5"
                            fill="white"
                            stroke="#EAEAEA"
                          />
                          <path
                            d="M9.025 14c1.503 0 2.407-.757 2.407-1.997 0-.918-.635-1.597-1.587-1.694v-.083c.693-.118 1.235-.777 1.235-1.514 0-1.084-.796-1.758-2.119-1.758H6.13V14h2.896zM7.223 7.882h1.484c.81 0 1.284.38 1.284 1.03 0 .669-.503 1.025-1.47 1.025H7.224V7.883zm0 5.19v-2.27H8.74c1.03 0 1.573.386 1.573 1.123 0 .747-.523 1.147-1.51 1.147H7.224zm10.01-.078h-3.301v-6.04h-1.094V14h4.395v-1.006zm4.125-6.21c-2.02 0-3.29 1.415-3.29 3.69 0 2.271 1.245 3.697 3.29 3.697 2.042 0 3.282-1.43 3.282-3.696 0-2.27-1.25-3.692-3.282-3.692zm0 1.02c1.338 0 2.164 1.035 2.164 2.67 0 1.627-.826 2.676-2.163 2.676-1.353 0-2.173-1.05-2.173-2.675 0-1.636.844-2.671 2.172-2.671zm10.772 3.408v-.879h-2.89v.918h1.816v.151c-.01 1.045-.801 1.748-1.953 1.748-1.324 0-2.154-1.025-2.154-2.685 0-1.631.826-2.661 2.13-2.661.961 0 1.63.464 1.904 1.313h1.098c-.24-1.426-1.401-2.334-3.003-2.334-1.972 0-3.247 1.446-3.247 3.692 0 2.275 1.26 3.696 3.257 3.696 1.846 0 3.042-1.157 3.042-2.96z"
                            fill="#000"
                          />
                        </svg>
                      </div>
                      <div className="arrow">
                        <svg width="6" height="9" viewBox="0 0 6 9" fill="none">
                          <path
                            d="M.915.763l4.263 3.8c.018.011.041.007.058.022.07.069.1.16.097.25a.321.321 0 0 1-.098.246c-.016.016-.039.011-.056.023l-4.263 3.8a.351.351 0 0 1-.483 0 .325.325 0 0 1 0-.47l4.041-3.6L.433 1.231a.322.322 0 0 1 0-.467.346.346 0 0 1 .482-.002z"
                            fill="#666"
                          />
                        </svg>
                      </div>
                    </a>
                  </Link>
                )}
              </div>
            </PopOver.Menu>
          }
        />
        <style jsx>{`
          span {
            display: none;
            visibility: hidden;
            user-select: none;
            border: 0;
            font-size: var(--font-size-small);
            line-height: var(--line-height-small);
            color: #666;
            padding: 0 8px;
            transition: all 200ms ease;
            cursor: pointer;
          }
          span:hover,
          span.is-active :global(.wrap .link .arrow),
          span.is-active {
            color: #000;
            fill: #000;
          }
          span.is-inverse {
            color: #999;
          }
          span.is-inverse:hover,
          span.is-active.is-inverse {
            color: #fff;
          }
          span.is-inverse:hover :global(svg),
          span.is-active.is-inverse :global(.wrap .link .arrow) {
            fill: #fff;
          }
          .highlight {
            color: #ff0080;
          }
          a {
            font-size: var(--font-size-small);
            line-height: var(--line-height-small);
            text-decoration: none;
          }
          .tag {
            display: inline-block;
            height: 16px;
            border-radius: 8px;
            font-size: 10px;
            font-weight: 500;
            width: 32px;
            text-align: center;
            line-height: 16px;
            vertical-align: middle;
            margin: -2px 0 0 4px;
            background: #000;
            color: #fff;
          }
          .wrapper {
            display: grid;
            grid-template-columns: ${primaryList && secondaryList
              ? '1fr 1fr'
              : '1fr'};
            grid-template-areas: 'left right' 'footer footer';
            border-radius: 5px;
            overflow: hidden;
          }
          .header h5 {
            margin: 0;
            color: ${inverse ? '#FFF' : '#000'};
            font-weight: 500;
          }
          .footer:hover .arrow {
            animation: arrowAnimation 1s cubic-bezier(0.42, 0, 0.58, 1) infinite;
          }
          @keyframes arrowAnimation {
            50% {
              transform: translateX(70%);
            }
            80%,
            100% {
              opacity: 0;
            }
          }
          .footer,
          .header + .content {
            border-top: 1px solid ${inverse ? '#333' : '#eaeaea'};
          }
          .header,
          .content,
          .footer {
            padding: 19px;
          }
          .content :global(.badge) {
            margin-left: 8px;
            padding: 0 5px;
          }
          :global(.item.dark .badge) {
            background: #333;
            color: #999;
          }
          .wrapper .left {
            grid-area: left;
          }
          .wrapper .right {
            grid-area: right;
            background-color: ${inverse ? '#111' : '#fafbfc'};
          }
          .footer {
            grid-area: footer;
            display: flex;
            align-items: center;
          }
          .footer span {
            color: ${inverse ? '#666' : '#000'};
            padding: 0;
            vertical-align: middle;
            line-height: 20px;
            transition: color 200ms ease;
          }
          .footer:hover span {
            color: ${inverse ? '#FFF' : '#000'};
          }
          .footer .label,
          .footer .icon,
          .footer .arrow {
            display: flex;
          }
          .footer .icon {
            margin-right: 10px;
          }
          .footer .label,
          .footer .arrow {
            margin-left: 10px;
          }
          @media (min-width: 951px) {
            span {
              display: flex;
              visibility: visible;
              align-items: center;
            }
          }
        `}</style>
      </span>
    )
  }
}

export default MenuPopOver
