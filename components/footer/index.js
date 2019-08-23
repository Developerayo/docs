import { memo } from 'react'
import Link from 'next/link'

// Components
import FullLogo from '../logos/full'
import GitHub from '../icons/github'
import Twitter from '../icons/twitter'

const Footer = ({ className }) => {
  const footerProps = {}

  return (
    <footer className={className}>
      <div className="links">
        <ul className="navigation">
          <li className="links-title">Company</li>
          <li className="home">
            <Link prefetch href="/" as="/home">
              <a>Home</a>
            </Link>
          </li>
          <li className="about">
            <Link prefetch href="/about">
              <a>About</a>
            </Link>
          </li>
          <li className="careers">
            <Link prefetch href="/careers">
              <a>Careers</a>
            </Link>
          </li>
          <li className="blog">
            <Link prefetch href="/blog">
              <a>Blog</a>
            </Link>
          </li>
          <li className="day">
            <Link prefetch href="/day">
              <a>ZEIT Day</a>
            </Link>
          </li>
        </ul>
        <ul className="navigation">
          <li className="links-title">Product</li>
          <li className="download">
            <a href="/download">Download</a>
          </li>
          <li className="pricing">
            <Link prefetch href="/pricing">
              <a>Pricing</a>
            </Link>
            <span>{'/'}</span>
            <Link prefetch href="/pricing/calculator">
              <a>Calculator</a>
            </Link>
          </li>
          <li className="now-for-github">
            <Link prefetch href="/github">
              <a>Now for GitHub</a>
            </Link>
          </li>
          <li className="now-for-gitlab">
            <Link prefetch href="/gitlab">
              <a>Now for GitLab</a>
            </Link>
          </li>
          <li>
            <Link prefetch href="/smart-cdn">
              <a>Smart CDN</a>
            </Link>
          </li>
          <li>
            <Link prefetch href="/integrations">
              <a>Integrations Marketplace</a>
            </Link>
          </li>
        </ul>
        <ul className="navigation">
          <li className="links-title">Education</li>
          <li className="docs">
            <a href="/docs">Documentation</a>
          </li>
          <li className="guides">
            <a href="/guides">Guides</a>
          </li>
          <li className="api">
            <a href="/api">API Reference</a>
          </li>
          <li className="examples">
            <a href="/examples">Examples</a>
          </li>
          <li className="tv">
            <Link prefetch href="/tv">
              <a>TV</a>
            </Link>
          </li>
        </ul>
        <ul className="navigation">
          <li className="links-title">More</li>
          <li className="oss">
            <Link prefetch href="/oss">
              <a>Open Source Software</a>
            </Link>
          </li>
          <li className="design">
            <Link prefetch href="/design">
              <a>Design Assets</a>
            </Link>
          </li>

          <li className="security">
            <Link prefetch href="/security">
              <a>Security</a>
            </Link>
          </li>
          <li className="support">
            <Link prefetch href="/support">
              <a>Support</a>
            </Link>
          </li>
        </ul>

        <ul className="navigation">
          <li className="links-title" />

          <li className="privacy">
            <Link prefetch href="/privacy">
              <a>Privacy Policy</a>
            </Link>
          </li>
          <li className="terms">
            <Link prefetch href="/terms">
              <a>Terms of Service</a>
            </Link>
          </li>
        </ul>
      </div>
      <div className="wrapper">
        <div className="left">
          <div className="logotype">
            <FullLogo {...footerProps} />
          </div>
        </div>
        <div className="right">
          <span className="contact">
            <ul className="social">
              <li>
                <a
                  className="github"
                  href="https://github.com/zeit/"
                  rel="noopener noreferrer"
                  target="_blank"
                  aria-label="GitHub"
                >
                  <GitHub
                    fill="var(--geist-foreground)"
                    height="18"
                    width="18"
                  />
                </a>
              </li>
              <li>
                <a
                  className="bird"
                  href="https://twitter.com/zeithq"
                  rel="noopener noreferrer"
                  target="_blank"
                  aria-label="Twitter"
                >
                  <Twitter fill="var(--geist-foreground)" />
                </a>
              </li>
            </ul>
          </span>
          <span className="copyright">
            <span className="text">
              <a href="mailto:support@zeit.co">support@zeit.co</a> —{' '}
            </span>
            <span className="text">Copyright</span> © {new Date().getFullYear()}{' '}
            ZEIT, Inc. All rights reserved.
          </span>
        </div>
      </div>

      <style jsx>
        {`
          footer {
            background: var(--accents-1);
            left: 0;
            right: 0;
            position: absolute;
            border-top: 1px solid var(--accents-2);
          }
          .wrapper {
            display: flex;
            justify-content: center;
            padding: 50px 30px;
            width: 1060px;
            max-width: 100%;
            margin: auto;
          }
          .logotype {
            text-align: center;
            margin-right: 40px;
          }
          .navigation {
            margin: 0 95px 0 0;
            padding: 0;
            list-style: none;
          }
          .navigation:last-child {
            margin: 0;
          }
          .navigation li {
            height: 20px;
            line-height: 20px;
            margin-bottom: 10px;
            vertical-align: middle;
          }
          .navigation li a,
          .navigation li span {
            margin-right: 15px;
            height: 20px;
            display: inline-block;
            overflow: auto;
          }
          .navigation li:last-child {
            border-right: 0;
            margin-right: 0;
          }
          .navigation li:last-child a {
            margin-right: 0;
          }
          .navigation a,
          .navigation span {
            color: var(--accents-3);
            text-decoration: none;
            font-size: var(--font-size-primary);
            line-height: var(--line-height-primary);
            transition: all 0.2s ease;
          }
          .links {
            display: flex;
            justify-content: left;
            padding: 50px 30px 0;
            width: 1060px;
            max-width: 100%;
            margin: auto;
          }
          .links-title {
            color: var(--geist-foreground);
            font-size: var(--font-size-primary);
            line-height: var(--line-height-primary);
          }
          .left {
            display: flex;
            align-self: flex-end;
          }
          .navigation a:hover,
          .right a:hover {
            color: var(--geist-foreground);
          }
          .right {
            text-align: right;
            color: var(--accents-3);
            font-size: 12px;
            flex-grow: 2;
          }
          .right a {
            color: var(--accents-3);
            text-decoration: none;
            font-size: 12px;
            transition: all 0.2s ease;
          }
          .right .contact {
            vertical-align: middle;
            margin: 0 0 20px 0;
          }
          .social {
            margin: 0;
            padding: 0;
            list-style: none;
            display: inline-flex;
            vertical-align: middle;
          }
          .social li {
            margin-right: 15px;
            border-right: 1px solid var(--accents-2);
            height: 20px;
            line-height: 21px;
            padding-right: 15px;
          }
          .social .github {
            display: inline-block;
            width: 18px;
            height: 18px;
          }
          .social .bird {
            display: inline-block;
            width: 18px;
            height: 100%;
            padding-top: 1px;
          }
          .social a {
            opacity: 0.4;
            transition: opacity 300ms;
          }
          .social a:hover {
            opacity: 1;
          }
          @media screen and (max-width: 768px) {
            .wrapper {
              display: block;
            }
            .logotype {
              margin-bottom: 30px;
              margin-right: 0;
            }
            .social {
              display: block;
              margin-bottom: 20px;
            }
            .social li {
              display: inline;
            }
            .social li:last-child {
              border-right: none;
              margin-right: 0;
              padding-right: 0;
            }
            .right {
              text-align: center;
              line-height: 22px;
            }
          }
          @media screen and (max-width: 1092px) {
            .navigation {
              margin: 0 70px 0 0;
            }
          }
          @media screen and (max-width: 992px) {
            .wrapper {
              width: 100%;
              padding-right: 30px;
              padding-left: 30px;
            }
            .links {
              display: block;
              padding: 30px;
            }
            .navigation {
              margin: 0 0 20px 0;
              padding-bottom: 20px;
              border-bottom: 1px solid var(--accents-2);
            }
            .left {
              justify-content: center;
            }
            .wrapper {
              padding: 20px 30px 40px 30px;
            }
          }
        `}
      </style>
    </footer>
  )
}

export default memo(Footer)
