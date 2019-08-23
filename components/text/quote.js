import cns from 'classnames'

const Quote = ({ children }, { darkBg } = {}) => (
  <blockquote className={cns({ dark: darkBg })}>
    {children}
    <style jsx>{`
      blockquote {
        padding: 10px 20px;
        border-left: 5px solid var(--geist-foreground);
        margin: 32px 0;
        color: var(--accents-4);
      }

      blockquote :global(div) {
        margin: 0;
      }
    `}</style>
  </blockquote>
)

export default Quote
