import { memo } from 'react'
import { AnchorLink } from '~/components/text/link'
import { P } from '~/components/text'

function CaseStudyCard({ icon, description }) {
  const Icon = icon
  return (
    <div className="case-study-card-container">
      <Icon />
      <P>{description}</P>
      <AnchorLink>Read case study</AnchorLink>
      <style jsx>{`
        .case-study-card-container {
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          padding: 25px;
          width: 530px;
          height: 335px;
          border-radius: 4px;
          box-shadow: 0px 16px 48px rgba(0, 0, 0, 0.12);
          transform: translate(-50%);
          position: relative;
          margin: 0 20px;
        }
        .case-study-card-container :global(a) {
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}

export default memo(CaseStudyCard)
