import cns from 'classnames'
import Link from 'next/link'
import { Component, Fragment } from 'react'
import EntryIndex from './entry-index'
import * as metrics from '~/lib/metrics'

class SectionIndex extends Component {
  componentDidMount() {
    const { category, getHref, section } = this.props
    const { href, as } = getHref({
      category: category.slug,
      section: section.slug
    })

    this.props.setInitiallyActive({
      href: as || href,
      category: category.slug,
      section: section.slug
    })
  }

  componentDidUpdate(prevProps) {
    if (isSectionActive(this.props) && !isSectionActive(prevProps)) {
      this.props.onSectionActive(this.rootNode)
    }
  }

  handleRef = node => {
    this.rootNode = node
  }

  renderEntry = entry => (
    <EntryIndex
      key={entry.slug}
      activeItem={this.props.activeItem}
      category={this.props.category}
      entry={entry}
      getHref={this.props.getHref}
      isSectionActive={isSectionActive(this.props)}
      onActive={this.props.onEntryActive}
      onClickLink={this.props.onClickLink}
      section={this.props.section}
      updateActive={this.props.updateActive}
      setInitiallyActive={this.props.setInitiallyActive}
    />
  )

  handleClick = () => {
    const { category, section } = this.props

    metrics.event({
      action: 'sidebar_section_clicked',
      category: 'engagement',
      label: section.title
    })

    this.props.updateActive({
      category: category.slug,
      section: section.slug
    })
    this.props.onClickLink()
  }

  render() {
    const { category, getHref, section, onClickLink } = this.props
    const active = isSectionActive(this.props)
    const { href, as } = getHref({
      category: category.slug,
      section: section.slug
    })

    return (
      <li className="section-wrapper" key={section.slug}>
        {href ? (
          <Fragment>
            {href.startsWith('#') ? (
              <a
                className={cns('title', { active })}
                onClick={this.handleClick}
                ref={this.handleRef}
                href={as || href}
              >
                {section.title}
              </a>
            ) : (
              <Link href={href} as={as} prefetch>
                <a
                  className={cns('title', { active })}
                  onClick={this.handleClick}
                  ref={this.handleRef}
                >
                  {section.title}
                </a>
              </Link>
            )}
          </Fragment>
        ) : (
          <span
            className={cns('title sub-category-title', { active })}
            onClick={onClickLink}
            ref={this.handleRef}
          >
            {section.title}
          </span>
        )}

        <ul className={cns({ active: active || !href })}>
          {section.entries.map(this.renderEntry)}
        </ul>
        <style jsx>{`
          ul {
            display: none;
            list-style: none;
            margin: 0;
            padding: 0;
          }

          ul.active {
            display: block;
          }

          .title {
            color: #000;
            display: block;
            font-size: var(--font-size-primary);
            line-height: var(--line-height-primary);
            padding: 10px 0;
            text-decoration: none;
          }

          .sub-category-title {
            color: #888;
          }

          .title:visited {
            color: #000;
          }

          .title.active {
            font-weight: 600;
          }

          @media screen and (max-width: 950px) {
            li:not(:last-child) > a {
              border-bottom: 1px solid #eee;
              padding: 20px 0;
            }
          }
        `}</style>
      </li>
    )
  }
}

function isSectionActive({ category, section, activeItem }) {
  return (
    activeItem.category === category.slug && activeItem.section === section.slug
  )
}

export default SectionIndex
