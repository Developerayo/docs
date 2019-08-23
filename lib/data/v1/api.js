const { parse } = require('url')

const data = [
  {
    id: 'apiBasics',
    name: 'API Basics',
    posts: [
      {
        id: 'contentType',
        name: 'Content Type',
        href: '/api/v1#api-basics/content-type'
      },
      {
        id: 'authentication',
        name: 'Authentication',
        href: '/api/v1#api-basics/authentication'
      },
      {
        id: 'errors',
        name: 'Errors',
        href: '/api/v1#api-basics/errors'
      },
      {
        id: 'rateLimits',
        name: 'Rate Limits',
        href: '/api/v1#api-basics/rate-limits'
      },
      {
        id: 'versioning',
        name: 'Versioning',
        href: '/api/v1#api-basics/versioning'
      },
      {
        id: 'types',
        name: 'Types',
        href: '/api/v1#api-basics/types'
      }
    ]
  },
  {
    id: 'endpoints',
    name: 'Endpoints',
    posts: [
      {
        id: 'deployments',
        name: 'Deployments',
        href: '/api/v1#endpoints/deployments',
        posts: [
          {
            id: 'deploymentsCreate',
            name: 'Create a new deployment',
            href: '/api/v1#endpoints/deployments/create-a-new-deployment'
          },
          {
            id: 'deploymentsFileUpload',
            name: 'Upload deployment files',
            href: '/api/v1#endpoints/deployments/upload-deployment-files'
          },
          {
            id: 'deploymentsGetAll',
            name: 'List all the deployments',
            href: '/api/v1#endpoints/deployments/list-all-the-deployments'
          },
          {
            id: 'deploymentsGetSingle',
            name: 'Get a single deployment',
            href: '/api/v1#endpoints/deployments/get-a-single-deployment'
          },
          {
            id: 'deploymentsDelete',
            name: 'Delete a deployment',
            href: '/api/v1#endpoints/deployments/delete-a-deployment'
          },
          {
            id: 'deploymentsFileGetAll',
            name: 'List deployment files',
            href: '/api/v1#endpoints/deployments/list-deployment-files'
          },
          {
            id: 'deploymentsFilesGetSingle',
            name: 'Get single file content',
            href: '/api/v1#endpoints/deployments/get-a-single-file-content'
          },
          {
            id: 'deploymentsInstances',
            name: 'Get deployment instances',
            href: '/api/v1#endpoints/deployments/get-deployment-instances'
          },
          {
            id: 'deploymentsScale',
            name: 'Set scale configuration',
            href: '/api/v1#endpoints/deployments/set-scale-configuration'
          }
        ]
      },
      {
        id: 'logs',
        name: 'Logs',
        href: '/api/v1#endpoints/logs',
        posts: [
          {
            id: 'logsGetByDeployment',
            name: 'Get deployment logs',
            href: '/api/v1#endpoints/logs/get-deployment-logs'
          }
        ]
      },
      {
        id: 'domains',
        name: 'Domains',
        href: '/api/v1#endpoints/domains',
        posts: [
          {
            id: 'domainsListAll',
            name: 'List all the domains',
            href: '/api/v1#endpoints/domains/list-all-the-domains'
          },
          {
            id: 'domainsAddNew',
            name: 'Add a new domain',
            href: '/api/v1#endpoints/domains/add-a-new-domain'
          },
          {
            id: 'domainsRemoveByName',
            name: 'Remove domain',
            href: '/api/v1#endpoints/domains/remove-a-domain-by-name'
          },
          {
            id: 'domainsCheckAvailability',
            name: 'Check domain availability',
            href: '/api/v1#endpoints/domains/check-a-domain-availability'
          },
          {
            id: 'domainsCheckPrice',
            name: 'Check domain price',
            href: '/api/v1#endpoints/domains/check-the-price-of-a-domain'
          },
          {
            id: 'domainsPurchase',
            name: 'Purchase a domain',
            href: '/api/v1#endpoints/domains/purchase-a-domain'
          }
        ]
      },
      {
        id: 'dns',
        name: 'DNS',
        href: '/api/v1#endpoints/dns',
        posts: [
          {
            id: 'dnsListDNSRecords',
            name: 'DNS records by domain',
            href: '/api/v1#endpoints/dns/list-all-the-dns-records-of-a-domain'
          },
          {
            id: 'dnsSetDNSRecord',
            name: 'Create a new DNS record',
            href: '/api/v1#endpoints/dns/create-a-new-dns-record'
          },
          {
            id: 'dnsRemoveDNSRecord',
            name: 'Remove a DNS record',
            href: '/api/v1#endpoints/dns/remove-a-dns-record'
          }
        ]
      },
      {
        id: 'certificates',
        name: 'Certificates',
        href: '/api/v1#endpoints/certificates',
        posts: [
          {
            id: 'certificatesListAll',
            name: 'List all the certificates',
            href: '/api/v1#endpoints/certificates/list-all-the-certificates'
          },
          {
            id: 'certificatesGetSingle',
            name: 'Get a single certificate',
            href: '/api/v1#endpoints/certificates/get-a-single-certificate'
          },
          {
            id: 'certificatesCreateNew',
            name: 'Create a new certificate',
            href: '/api/v1#endpoints/certificates/create-a-new-certificate'
          },
          {
            id: 'certificatesSubmit',
            name: 'Submit a certificate',
            href: '/api/v1#endpoints/certificates/submit-a-certificate'
          },
          {
            id: 'certificatesDelete',
            name: 'Delete a certificate',
            href: '/api/v1#endpoints/certificates/delete-a-certificate'
          }
        ]
      },
      {
        id: 'aliases',
        name: 'Aliases',
        href: '/api/v1#endpoints/aliases',
        posts: [
          {
            id: 'aliasesListAll',
            name: 'List all the aliases',
            href: '/api/v1#endpoints/aliases/list-all-the-aliases'
          },
          {
            id: 'aliasesRemove',
            name: 'Remove an alias',
            href: '/api/v1#endpoints/aliases/remove-an-alias'
          },
          {
            id: 'aliasesListByDeployment',
            name: 'List aliases by deployment',
            href: '/api/v1#endpoints/aliases/list-aliases-by-deployment'
          },
          {
            id: 'aliasesAssign',
            name: 'Alias a deployment',
            href: '/api/v1#endpoints/aliases/assign-an-alias-to-a-deployment'
          }
        ]
      },
      {
        id: 'secrets',
        name: 'Secrets',
        href: '/api/v1#endpoints/secrets',
        posts: [
          {
            id: 'secrets',
            name: 'List all the secrets',
            href: '/api/v1#endpoints/secrets/list-all-the-secrets'
          },
          {
            id: 'secrets',
            name: 'Create a new secret',
            href: '/api/v1#endpoints/secrets/create-a-new-secret'
          },
          {
            id: 'secrets',
            name: 'Change secret name',
            href: '/api/v1#endpoints/secrets/change-secret-name'
          },
          {
            id: 'secrets',
            name: 'Delete a secret',
            href: '/api/v1#endpoints/secrets/delete-a-secret'
          }
        ]
      },
      {
        id: 'teams',
        name: 'Teams',
        href: '/api/v1#endpoints/teams',
        posts: [
          {
            id: 'teamsCreate',
            name: 'Create team',
            href: '/api/v1#endpoints/teams/create-a-team'
          },
          {
            id: 'teamsList',
            name: 'List all your teams',
            href: '/api/v1#endpoints/teams/list-all-your-teams'
          },
          {
            id: 'teamsGetSingle',
            name: 'Get single team information',
            href: '/api/v1#endpoints/teams/get-single-team-information'
          },
          {
            id: 'teamsUpdate',
            name: 'Update team information',
            href: '/api/v1#endpoints/teams/update-team-information'
          },
          {
            id: 'teamsTeamMembers',
            name: 'Get list of team members',
            href: '/api/v1#endpoints/teams/get-list-of-team-members'
          },
          {
            id: 'teamsInvite',
            name: 'Invite user to team',
            href: '/api/v1#endpoints/teams/invite-user-to-team'
          },
          {
            id: 'teamsChangeRole',
            name: 'Change user role',
            href: '/api/v1#endpoints/teams/change-user-role'
          },
          {
            id: 'teamsRemove',
            name: 'Remove user from team',
            href: '/api/v1#endpoints/teams/remove-user-from-team'
          }
        ]
      },
      {
        id: 'authentication',
        name: 'Authentication',
        href: '/api/v1#endpoints/authentication',
        posts: [
          {
            id: 'authenticationRequest',
            name: 'Request a login',
            href: '/api/v1#endpoints/authentication/request-a-login'
          },
          {
            id: 'authenticationVerify',
            name: 'Verify login',
            href: '/api/v1#endpoints/authentication/verify-login'
          }
        ]
      },
      {
        id: 'oauth2',
        name: 'OAuth2',
        href: '/api/v1#endpoints/oauth2',
        posts: [
          {
            id: 'oauth2Authorization',
            name: 'Authorization',
            href: '/api/v1#endpoints/oauth2/authorization'
          },
          {
            id: 'oauth2ExchangingCodeForToken',
            name: 'Exchange code for token',
            href: '/api/v1#endpoints/oauth2/exchanging-code-for-an-access-token'
          },
          {
            id: 'oauth2UsingAccessToken',
            name: 'Using access token',
            href: '/api/v1#endpoints/oauth2/using-access-token'
          }
        ]
      }
    ]
  },
  {
    id: 'errors',
    name: 'Errors',
    posts: [
      {
        id: 'generic',
        name: 'Generic Errors',
        href: '/api/v1#errors/generic'
      },
      {
        id: 'deploymentErrors',
        name: 'Deployment Errors',
        href: '/api/v1#errors/deployment-errors'
      },
      {
        id: 'domainErrors',
        name: 'Domain Errors',
        href: '/api/v1#errors/domain-errors'
      },
      {
        id: 'dnsErrors',
        name: 'DNS Errors',
        href: '/api/v1#errors/dns-errors'
      },
      {
        id: 'oauth2Errors',
        name: 'OAuth2 Errors',
        href: '/api/v1#errors/oauth2-errors'
      }
    ]
  }
]

export default data.map(({ posts, ...rest }) => {
  return {
    ...rest,
    posts: posts.map(p => {
      const { hash } = parse(p.href)
      return { ...p, hash }
    })
  }
})
