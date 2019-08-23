import PropTypes from 'prop-types'

const MenuToggle = ({ expanded }) => {
  return (
    <div
      className={`wrap ${expanded ? 'expanded' : ''}`}
      aria-label={`${expanded ? 'close menu' : 'open menu'}`}
    >
      <div className="line top" />
      <div className="line bottom" />
      <style jsx>
        {`
          .wrap {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            pointer-events: none;
          }

          .line {
            height: 1px;
            width: 22px;
            background-color: var(--geist-foreground);
            transition: transform 0.15s ease;
          }

          .line:last-child {
            transform: translateY(4px) rotate(0deg);
          }

          .line:first-child {
            transform: translateY(-4px) rotate(0deg);
          }

          .wrap.expanded .line:first-child {
            transform: translateY(1px) rotate(45deg);
          }

          .wrap.expanded .line:last-child {
            transform: translateY(0px) rotate(-45deg);
          }
        `}
      </style>
    </div>
  )
}

MenuToggle.propTypes = {
  expanded: PropTypes.bool
}

export default MenuToggle
