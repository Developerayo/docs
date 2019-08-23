import cn from 'classnames'
import { Component } from 'react'
import { GenericLink } from '~/components/text/link'
import { H4 } from '~/components/text'

export default class Card extends Component {
  render() {
    const { href = '#', as, children, className, title, ...props } = this.props

    return (
      <div className={cn('card', className)} {...props}>
        <GenericLink href={href} as={as}>
          {title && <H4>{title}</H4>}
          <p>{children}</p>
        </GenericLink>

        <style jsx>{`
          .card {
            background: white;
            border-radius: 5px;
            border: 1px solid #eaeaea;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
            min-height: 48px;
            margin: 24px 0;
            transition: border 0.2s ease, box-shadow 0.2s ease;
          }

          .card :global(p) {
            margin: 0;
          }

          .card :global(a) {
            display: flex;
            padding: 24px;
            width: 100%;
            height: 100%;
            flex-direction: column;
            font-size: var(--font-size-small);
            line-height: var(--line-height-small);
            color: var(--accents-5);
            text-decoration: none;
            transition: color 0.12s ease;
          }

          .card :global(h4) {
            margin-top: 0;
            margin-bottom: 4px;
            color: var(--geist-foreground);
            font-weight: 500;
            font-size: var(--font-size-primary);
            line-height: var(--line-height-primary);
          }

          .card:hover :global(a) {
            text-decoration: none;
            color: var(--geist-foreground);
          }

          .card:hover {
            text-decoration: none;
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
            border-color: var(--accents-2);
          }
        `}</style>
      </div>
    )
  }
}
