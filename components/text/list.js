export const UL = ({ children }) => (
  <ul>
    {children}
    <style jsx>
      {`
        ul {
          padding: 0;
          list-style-type: none;
          margin-left: 15px;
        }
        ul > :global(li::before) {
          content: '-';
          display: inline-block;
          color: #999;
          position: absolute;
          margin-left: -15px;
        }
      `}
    </style>
  </ul>
)

export const OL = ({ children }) => (
  <ol>
    {children}
    <style jsx>
      {`
        ol {
          padding: 0;
          margin-left: 15px;
        }
      `}
    </style>
  </ol>
)

export const LI = ({ children }) => (
  <li>
    {children}
    <style jsx>
      {`
        li {
          font-size: var(--font-size-primary);
          line-height: var(--line-height-primary);
          margin-bottom: 10px;
        }

        li > :global(p:last-child) {
          margin-bottom: 0;
          margin-top: 0;
        }
      `}
    </style>
  </li>
)
