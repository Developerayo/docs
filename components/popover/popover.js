import React from 'react'
import cn from 'classnames'

export const Menu = ({
  children,
  width = null,
  marginTop = null,
  minWidth = null,
  noPadding = false,
  tipDirection = 'up',
  tipOffset = null,
  tip = true,
  scrollable,
  innerRef
}) => {
  const classes = ['popover', tipDirection]

  if (scrollable) {
    classes.push('scrollable')
  }

  return (
    <div className={classes.join(' ')} ref={innerRef}>
      {tip && (
        <div
          className="triangle"
          style={
            tipOffset !== null
              ? { left: `${tipOffset}px`, textAlign: 'left' }
              : null
          }
        >
          <Triangle direction={tipDirection} />
        </div>
      )}
      <div className="menu">{children}</div>
      <style jsx>
        {`
          .popover {
            display: inline-block;
            position: relative;
          }

          .triangle {
            display: block;
            line-height: 11px; /* height of triangle (minus 1 :S) */
            z-index: 1;
            text-align: center;
            position: absolute;
          }

          .down .triangle {
            bottom: -11px;
          }

          .menu {
            margin-top: ${marginTop ? marginTop + 'px' : '11px'};
            color: var(--geist-foreground);
            display: inline-block;
            text-align: left;
            background: var(--geist-background);
            width: ${width ? width + 'px' : 'auto'};
            min-width: ${minWidth ? minWidth + 'px' : 'auto'};
            max-width: 100%;
            box-shadow: var(--shadow-medium);
            border-radius: 5px;
            padding: ${noPadding ? '0' : '8px 0'};
          }

          .scrollable .menu {
            overflow-y: auto;
            max-height: calc(100vh - 140px);
          }

          @media (max-width: 768px) {
            .menu {
              width: auto;
            }
          }
        `}
      </style>
    </div>
  )
}

export const Item = ({
  icon,
  disabled = false,
  active = false,
  children,
  fullWidth = false,
  noPadding = false,
  separated = false
}) => (
  <div
    className={cn('item', {
      active,
      disabled,
      separated: separated
    })}
  >
    {children}
    {icon ? <div className="icon">{icon}</div> : null}
    <style jsx>
      {`
        .icon {
          position: absolute;
          top: 0;
          bottom: 0;
          right: 20px;
          pointer-events: none;
          display: flex;
          align-items: center;
        }

        .item {
          position: relative;
          font-size: var(--font-size-small);
          line-height: var(--line-height-small);
          color: var(--accents-3);
          font-family: var(--font-sans);
          line-height: 20px;
          max-width: ${fullWidth ? '100%' : '200px'};
          padding: ${noPadding ? '0' : '8px 20px'};
        }

        .item.disabled {
          cursor: not-allowed;
          background: var(--accents-1);
          user-select: none;
        }

        .item.separated {
          position: relative;
          padding-top: 10px;
          margin-top: 10px;
          padding-bottom: 10px;
          margin-bottom: 10px;
        }

        .item.separated:before,
        .item.separated:after {
          content: '';
          width: 150%;
          height: 1px;
          background-color: var(--accents-2);
          position: absolute;
        }
        .item.separated:before {
          left: -19px; /* size of the padding */
          top: 0;
        }
        .item.separated:after {
          left: -19px; /* size of the padding */
          bottom: 0;
        }

        .item:first-child :global(a) {
          padding-top: 0;
        }

        .item:last-child :global(a) {
          padding-bottom: 0;
        }

        .item:not(.disabled) :global(g),
        .item:not(.disabled) :global(path),
        .item:not(.disabled) :global(circle) {
          transition: stroke 0.2s ease, fill 0.2s ease;
          stroke: var(--accents-3);
          opacity: 1;
        }

        .item :global(svg.label) {
          margin-left: 8px;
        }

        .item :global(svg.label path) {
          stroke: none !important;
        }

        .item :global(path:not(.no-fill):not(.label)) {
          fill: var(--accents-5);
        }
        .item:hover :global(path:not(.no-fill):not(.label)) {
          fill: var(--geist-foreground);
        }

        .item:not(.disabled):hover :global(g),
        .item:not(.disabled):hover :global(path),
        .item:not(.disabled):hover :global(circle) {
          stroke: var(--geist-foreground);
        }

        .item > :global(a),
        .item > :global(span > a) {
          display: flex;
          align-items: center;
          color: #666;
          text-decoration: none;
          transition: color 0.2s ease;
          margin: ${noPadding ? '0' : '-8px -20px'};
          padding: ${noPadding ? '8px 0' : '8px 20px'};
        }

        .item.active > :global(a) {
          color: var(--geist-foreground);
        }

        .item > :global(a:hover),
        .item.active > :global(a) {
          color: var(--geist-foreground);
        }
        .item > :global(.icon + a:hover),
        .item.active > :global(.icon + a) {
          color: var(--geist-foreground);
        }
      `}
    </style>
  </div>
)

export const Divider = () => (
  <div className="line">
    <style jsx>
      {`
        .line {
          border-top: 1px solid var(--accents-2);
          margin: 8px 0;
        }
      `}
    </style>
  </div>
)

const Triangle = ({ direction }) => (
  <svg width="24" height="12" viewBox="0 0 24 12">
    <path
      fill="var(--geist-background)"
      strokeWidth="1px"
      stroke={'var(--dropdown-triangle-stroke)'}
      fillRule="evenodd"
      d={direction === 'down' ? 'M20 0l-8 8-12-12' : 'M20 12l-8-8-12 12'}
    />
  </svg>
)

export default Menu
