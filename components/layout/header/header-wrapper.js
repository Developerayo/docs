import Wrapper from '../wrapper'
import { HEADER_HEIGHT } from '~/lib/constants'

const Header = ({
  className,
  hideHeader,
  dynamicSearch,
  hideHeaderSearch = true,
  children,
  isTop,
  detached
}) => (
  <header className={className}>
    <Wrapper className="content">{children}</Wrapper>
    <style jsx>{`
      header {
        position: absolute;
        height: ${HEADER_HEIGHT}px;
        width: 100%;
        z-index: 1000;
        top: 0;
        transition: all 0.2s ease;
      }

      header > :global(.content) {
        align-items: center;
        display: flex;
        height: 100%;
      }

      @media (max-width: 950px) {
        header {
          position: absolute;
        }
      }
    `}</style>
    <style jsx>{`
      header {
        position: ${hideHeaderSearch && dynamicSearch ? 'absolute' : 'fixed'};
        top: ${hideHeader && dynamicSearch ? '-80px' : '0'};
        background: ${hideHeaderSearch && dynamicSearch
          ? 'transparent'
          : '#fff'};
        box-shadow: ${detached ? 'var(--shadow-small)' : 'none'};
      }

      @media (max-width: 640px) {
        header {
          top: ${hideHeader && dynamicSearch ? '-80px' : '0'};
          background: ${isTop && dynamicSearch ? 'transparent' : '#fff'};
        }
      }
    `}</style>
  </header>
)

export default Header
