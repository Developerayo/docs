import React from 'react'
import cn from 'classnames'
import PropTypes from 'prop-types'

import Text from '~/components/text'
import getColor from '~/lib/utils/get-color'

const Note = ({ children, className, type, fill, label, small, ...props }) => {
  // The default filled variant should be inverted colors
  if (fill && !type) {
    type = 'default'
  }

  return (
    <div className={cn('note', className, { small })} {...props}>
      {label !== false && (
        <Text bold span uppercase>
          {(label && `${label}: `) ||
            (type === 'success' && `Success: `) ||
            (type === 'error' && `Error: `) ||
            (type === 'warning' && `Warning: `) ||
            `Note: `}
        </Text>
      )}

      {children}

      <style jsx>{`
        .note {
          padding: ${small
            ? 'var(--geist-gap-quarter) var(--geist-gap-half)'
            : 'var(--geist-gap-half) var(--geist-gap)'};
          border-radius: var(--geist-radius);
          background: ${fill ? getColor(type) : 'var(--geist-background)'};
          border: 1px solid ${getColor(type) || 'var(--accents-2)'};
          font-size: var(--font-size-primary);
          line-height: var(--line-height-primary);
          color: ${fill
            ? type === 'default'
              ? 'var(--geist-background)'
              : '#FFF'
            : getColor(type) || 'var(--geist-foreground)'};
          margin-bottom: 24px;
        }

        .note__type {
          text-transform: uppercase;
          font-weight: 500;
        }
        .note.small {
          padding: 5px var(--geist-gap-half);
        }
      `}</style>
    </div>
  )
}

Note.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  hideLabel: PropTypes.bool,
  type: PropTypes.oneOf([
    'secondary',
    'success',
    'error',
    'warning',
    'default'
  ]),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
}

export default Note
