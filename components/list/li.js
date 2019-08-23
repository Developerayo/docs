const LI = ({ children }) => (
  <li>
    {children}
    <style jsx>{`
      li {
        font-size: var(--font-size-primary);
        line-height: var(--line-height-primary);
        margin-bottom: 10px;
      }

      li > :global(p:last-child) {
        margin-bottom: 0;
        margin-top: 0;
      }
    `}</style>
  </li>
)

export default LI
