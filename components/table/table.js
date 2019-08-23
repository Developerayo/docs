import React from 'react'
import cn from 'classnames'
import PropTypes from 'prop-types'

const Table = ({ children, className, ...other }) => {
  return (
    <div className="table-container">
      <table {...other} className={cn('table', className)}>
        {children}
      </table>
      <style jsx>{`
        .table-container {
          margin: 0 -24px;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        table {
          min-width: 640px;
          padding: 0 24px;
          border-collapse: separate;
          border-spacing: 0;
          width: 100%;
          margin-bottom: 24px;
        }

        table :global(td:nth-child(1)) {
          border-left: 1px solid transparent;
        }

        table :global(td:last-child) {
          border-right: 1px solid transparent;
        }

        table :global(thead th:nth-child(1)) {
          border-bottom: 1px solid #eaeaea;
          border-left: 1px solid #eaeaea;
          border-radius: 4px 0px 0px 4px;
          border-top: 1px solid #eaeaea;
        }

        table :global(thead th:last-child) {
          border-bottom: 1px solid #eaeaea;
          border-radius: 0 4px 4px 0;
          border-right: 1px solid #eaeaea;
          border-top: 1px solid #eaeaea;
        }

        table :global(thead th) {
          background: #fafafa;
          border-bottom: 1px solid #eaeaea;
          border-top: 1px solid #eaeaea;
        }

        table :global(th),
        table :global(td) {
          padding: 0 10px;
          text-align: left;
          vertical-align: top;
        }

        table :global(th > div) {
          display: flex;
          align-items: center;
          padding: 10px 0;
          line-height: var(--line-height-small);
          font-size: var(--font-size-small);
        }

        table :global(td > div) {
          min-height: 50px;
          padding: 12px 0;
          line-height: 24px;
        }

        table :global(td.multi-line > div) {
          min-height: none;
          padding: 14px 0;
        }

        table :global(th) {
          color: #666;
          font-size: var(--font-size-small);
          line-height: var(--line-height-small);
          font-weight: 400;
          letter-spacing: 0;
        }

        table :global(th.right > div),
        table :global(td.right > div) {
          justify-content: flex-end;
        }

        table :global(th.center > div),
        table :global(td.center > div) {
          justify-content: center;
        }

        table :global(tr.disabled) {
          pointer-events: none;
          opacity: 0.6;
        }

        table :global(tr.selectable) {
          cursor: pointer;
        }

        table :global(tr.selectable:hover) {
          background-color: #fcfcfc;
        }
      `}</style>
    </div>
  )
}

Table.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}

Table.defaultProps = {
  className: ''
}

export default Table
