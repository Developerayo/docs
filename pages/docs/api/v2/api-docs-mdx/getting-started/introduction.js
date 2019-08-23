import fetch from 'isomorphic-unfetch'
import React from 'react'

import Editor from './editor'
import Preview from './preview'
import TabSwitcher from '~/components/layout/tab-switcher'
import Example from '~/components/example'
import Button from '~/components/buttons'
import Context from '~/lib/api/slugs-context'

const example = {
  name: 'simple-api-deployment',
  files: {
    'pages/index.js':
      'export default () => (\n  <section>\n    <h1>Welcome to Now!</h1>\n    <p>To test the API, <a href="/api/date">check todays date</a>.</p>\n  </section> \n);',
    'api/date.js':
      'module.exports = (req, res) => {\n  res.send(new Date());\n};',
    'package.json':
      '{\n  "scripts": {\n    "build": "next build"\n  },\n  "dependencies": {\n    "next": "^9.0.1",\n    "react": "^16.8.6",\n    "react-dom": "^16.8.6"\n  }\n}'
  }
}

class Introduction extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      files: example.files,
      name: example.name,
      content: filesToAPIBody(example.name, example.files),
      deploying: false,
      errorMessage: null,
      activeTab: 'command'
    }

    this.onTabChange = this.onTabChange.bind(this)
  }

  onChange = files => {
    this.setState(prevState => {
      let errorMessage

      const content = errorMessage
        ? prevState.content
        : filesToAPIBody(prevState.name, files)
      return { files, content, errorMessage }
    })
  }

  setError = errorMessage => {
    this.setState({ errorMessage })
  }

  deploy = async () => {
    try {
      this.setState({ errorMessage: null, deploying: true })

      const response = await fetch('https://api.zeit.co/v6/now/deployments', {
        method: 'POST',
        body: this.state.content
      })

      if (!response.ok) {
        // eslint-disable-next-line no-console
        console.error('Failed to deploy:', response.status)
        this.setError('Rate limit exceeded')
        return
      }

      // Ensure we're redirecting to the deployment
      const { url } = await response.json()
      const suffix = url.includes('?redirect=1') ? '' : '?redirect=1'

      window.location = `https://${url + suffix}`
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to deploy', error)
      this.setError('Rate limit exceeded')
    } finally {
      this.setState({ deploying: false })
    }
  }

  onTabChange = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }

  render() {
    return (
      <Example>
        <div className="centered">
          <TabSwitcher>
            <a
              onClick={() => this.onTabChange('command')}
              className={this.state.activeTab === 'command' ? 'active' : null}
            >
              Command
            </a>
            <a
              onClick={() => this.onTabChange('editor')}
              className={this.state.activeTab === 'editor' ? 'active' : null}
            >
              Editor
            </a>
          </TabSwitcher>
        </div>

        {this.state.activeTab === 'editor' && (
          <Editor
            name={this.state.name}
            files={this.state.files}
            onChange={this.onChange}
            key="1"
          />
        )}

        {this.state.activeTab === 'command' && (
          <Context.Consumer>
            {() => (
              <Preview
                content={this.state.content}
                deploy={this.deploy}
                errorMessage={this.state.errorMessage}
                deploying={this.state.deploying}
                key="2"
                // testingToken={ctx.testingToken}
              />
            )}
          </Context.Consumer>
        )}

        <div className="centered deploy">
          <Button onClick={this.deploy} disabled={!!this.deploying}>
            DEPLOY TO NOW
          </Button>
        </div>

        {this.state.errorMessage ? (
          <div className="error-message" key="2">
            <span /> {this.state.errorMessage}.
          </div>
        ) : null}

        <style jsx>{`
          .centered {
            width: 100%;
            display: flex;
            justify-content: center;
          }

          .deploy {
            margin-bottom: 32px;
          }

          .error-message {
            color: red;
            font-size: 12px;
            width: 100%;
            text-align: center;
            margin-bottom: 32px;
          }

          .error-message span {
            position: relative;
            padding-left: 20px;
          }

          .error-message span::before {
            display: block;
            content: '';
            width: 11px;
            background: red;
            height: 11px;
            position: absolute;
            left: 0;
            top: 1px;
          }

          p {
            font-size: var(--font-size-primary);
            line-height: var(--line-height-primary);
            text-align: center;
            margin: 24px 0;
          }
        `}</style>
      </Example>
    )
  }
}

export default Introduction

function filesToAPIBody(name, files) {
  let json = JSON.stringify(
    {
      name,
      public: true,
      version: 2,
      files: []
    },
    null,
    2
  )

  const fileNames = Object.keys(files)
  const filesIndex = json.lastIndexOf('[]')

  // Render the `files` as one-per-line otherwise the API call ends up
  // being rendered very large when the deployment has a few files
  json =
    json.substring(0, filesIndex + 1) +
    '\n' +
    fileNames
      .map((file, i) => {
        return `    { "file": ${JSON.stringify(file)}, "data": ${JSON.stringify(
          files[file]
        )} }${i < fileNames.length - 1 ? ',' : ''}`
      })
      .join('\n') +
    '\n  ' +
    json.substring(filesIndex + 1, json.lastIndexOf('}') - 1) +
    json.substring(filesIndex + 2)

  return json
}
