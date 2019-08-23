import { H5 } from '~/components/text'
import { LinkWithHoverPrefetch as Link } from '~/components/text/link'

export default function Topic({ topic, icons, href }) {
  return (
    <div className="topic">
      <Link href={href}>
        <span className="topic-icons">
          {Array.isArray(icons) ? (
            icons.map(icon =>
              typeof icon === 'object' ? (
                <span key={icon.src} style={{ backgroundColor: icon.color }}>
                  <img alt={`Icon for ${topic}`} src={icon.src} />
                </span>
              ) : (
                <img alt={`Icon for ${topic}`} key={icon} src={icon} />
              )
            )
          ) : typeof icons === 'object' ? (
            <span style={{ backgroundColor: icons.color }}>
              <img alt={`Icon for ${topic}`} src={icons.src} />
            </span>
          ) : (
            <img alt={`Icon for ${topic}`} src={icons} />
          )}
        </span>
        <H5>{topic}</H5>
        <span className="note">Read the guide</span>
      </Link>
      <style jsx>{`
        .topic :global(a) {
          border-radius: 4px;
          border: 1px solid var(--accents-2);
          padding: 24px;
          display: flex;
          flex-direction: column;
          transition: box-shadow 0.1s ease, border 0.1s ease;
          text-decoration: none;
        }

        .topic :global(a:hover) {
          box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.12);
          border-color: transparent;
        }

        .topic-icons {
          display: flex;
          width: 100%;
        }

        .topic :global(a:hover h5) {
          color: var(--geist-link-color);
        }

        .topic :global(h5) {
          margin-bottom: 8px;
          margin-top: 24px;
          transition: color 0.1s ease;
        }

        .topic-icons span {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-clip: padding-box;
          flex: 0 0 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px;
        }

        .topic-icons > span:not(:last-child),
        .topic-icons > img:not(:last-child) {
          margin-right: 8px;
        }

        .topic-icons > span img {
          width: 100%;
          max-height: 100%;
        }

        .topic-icons > img {
          width: 48px;
          height: 48px;
        }

        .note {
          color: var(--accents-5);
          font-size: var(--font-size-primary);
          line-height: var(--line-height-primary);
        }
      `}</style>
    </div>
  )
}
