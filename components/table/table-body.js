import React from 'react'
import PropTypes from 'prop-types'

const TableBody = ({ children, ...props }) => (
  <tbody {...props}>
    {children}
    <style jsx>{`
      tbody :global(tr:not(:last-child) td) {
        border-bottom: 1px solid #eaeaea;
      }

      :global(thead) + tbody :global(tr:last-child td) {
        border-bottom: 1px solid #eaeaea;
      }

      tbody :global(td) {
        color: #444444;
        font-size: var(--font-size-small);
        line-height: var(--line-height-small);
      }
    `}</style>
  </tbody>
)

TableBody.propTypes = {
  children: PropTypes.node
}

export default TableBody
