export const seedData = {
  vendors: [
    {
      slug: 'northbridge-cloud',
      data: {
        name: 'Northbridge Cloud',
        visibility_policy: 'full',
        website: 'https://example.com/northbridge-cloud',
        links: [
          { label: 'Company profile', url: 'https://example.com/northbridge-cloud' },
          { label: 'Integration docs', url: 'https://docs.example.com/northbridge-cloud' }
        ],
        regions: ['North America', 'EMEA'],
        areas_of_focus: ['Cloud', 'Hybrid Cloud', 'Orchestration & Infrastructure'],
        short_description: 'Private cloud operations software for resilient multi-site virtualization platforms.',
        description: `Northbridge Cloud builds software and services for **private cloud** and **virtualization operations**.

## What they bring
- Operational tooling for multi-site virtualization estates
- Reference practices for resilience, change control, and day-2 operations
- Integration experience with on-prem infrastructure teams

## Typical outcomes
- Faster rollout of standardized operational patterns
- Clearer ownership boundaries between platform and application teams
- Better repeatability for DR and recovery testing`
      },
      media: {
        logo: {
          filePath: 'scripts/assets/logos/vendors/northbridge-cloud.svg',
          fileName: 'northbridge-cloud-logo.svg',
          mimeType: 'image/svg+xml'
        }
      }
    },
    {
      slug: 'altura-systems',
      data: {
        name: 'Altura Systems',
        visibility_policy: 'full',
        website: 'https://example.com/altura-systems',
        links: [
          { label: 'Company profile', url: 'https://example.com/altura-systems' },
          { label: 'Product docs', url: 'https://docs.example.com/altura-systems' }
        ],
        regions: ['North America', 'EMEA'],
        areas_of_focus: ['Analytics & AI', 'Intelligence & Information Management', 'IT Infrastructure'],
        short_description: 'Capacity optimization and FinOps analytics for virtual infrastructure teams.',
        description: `Altura Systems focuses on **optimization, analytics, and FinOps workflows** for virtual infrastructure.

## What they bring
- Capacity analytics and rightsizing recommendations
- Utilization reporting and forecasting for platform teams
- Cost governance patterns that align IT and business owners

## Typical outcomes
- Lower waste from overprovisioning
- More predictable capacity planning cycles
- Shared reporting language across infra, ops, and finance`
      },
      media: {
        logo: {
          filePath: 'scripts/assets/logos/vendors/altura-systems.svg',
          fileName: 'altura-systems-logo.svg',
          mimeType: 'image/svg+xml'
        }
      }
    },
    {
      slug: 'cloudbridge-systems',
      data: {
        name: 'CloudBridge Systems',
        visibility_policy: 'limited',
        website: 'https://example.com/cloudbridge',
        links: [
          { label: 'Company profile', url: 'https://example.com/cloudbridge' },
          { label: 'Solution catalog', url: 'https://docs.example.com/cloudbridge' }
        ],
        regions: ['EMEA', 'North America'],
        areas_of_focus: ['Cloud', 'Hybrid Cloud', 'IT Infrastructure'],
        short_description: 'Migration and modernization services for private cloud platform transformations.',
        description: `CloudBridge Systems is an integration partner specializing in **private cloud modernization programs**.

## What they bring
- Structured migration factories and cutover playbooks
- Operating model alignment for platform teams
- Automation-first delivery, including repeatable landing zones

## Typical outcomes
- Reduced migration risk through staged rollouts
- Accelerated adoption of platform standards
- Cleaner transition from legacy operating practices`
      },
      media: {
        logo: {
          filePath: 'scripts/assets/logos/vendors/cloudbridge-systems.svg',
          fileName: 'cloudbridge-systems-logo.svg',
          mimeType: 'image/svg+xml'
        }
      }
    },
    {
      slug: 'securegrid-labs',
      data: {
        name: 'SecureGrid Labs',
        visibility_policy: 'limited',
        website: 'https://example.com/securegrid',
        links: [
          { label: 'Company profile', url: 'https://example.com/securegrid' },
          { label: 'Security guides', url: 'https://docs.example.com/securegrid' }
        ],
        regions: ['APJ', 'EMEA'],
        areas_of_focus: ['Security, Compliance, & Governance', 'IT Infrastructure', 'Data Protection'],
        short_description: 'Security hardening and compliance automation for virtualization and tenant isolation.',
        description: `SecureGrid Labs delivers **security hardening** and **compliance automation** for virtualization stacks.

## What they bring
- Baseline hardening guidance and audit-ready checklists
- Segmentation patterns for multi-tenant and regulated environments
- Continuous compliance workflows for day-2 operations

## Typical outcomes
- Faster security posture standardization
- Easier audit preparation and evidence collection
- Lower risk of configuration drift over time`
      },
      media: {
        logo: {
          filePath: 'scripts/assets/logos/vendors/securegrid-labs.svg',
          fileName: 'securegrid-labs-logo.svg',
          mimeType: 'image/svg+xml'
        }
      }
    },
    {
      slug: 'dataprism-storage',
      data: {
        name: 'DataPrism Storage',
        visibility_policy: 'limited',
        website: 'https://example.com/dataprism-storage',
        links: [
          { label: 'Company profile', url: 'https://example.com/dataprism-storage' },
          { label: 'Reference docs', url: 'https://docs.example.com/dataprism-storage' }
        ],
        regions: ['North America'],
        areas_of_focus: ['Data Protection', 'Intelligence & Information Management', 'Enterprise Applications'],
        short_description: 'Storage lifecycle tooling for tiering, retention, and archive governance.',
        description: `DataPrism Storage provides storage integration tooling and data lifecycle controls for virtualization environments.`
      },
      media: {
        logo: {
          filePath: 'scripts/assets/logos/vendors/dataprism-storage.svg',
          fileName: 'dataprism-storage-logo.svg',
          mimeType: 'image/svg+xml'
        }
      }
    },
    {
      slug: 'netweave-fabric',
      data: {
        name: 'NetWeave Fabric',
        visibility_policy: 'hidden',
        website: 'https://example.com/netweave-fabric',
        links: [
          { label: 'Company profile', url: 'https://example.com/netweave-fabric' },
          { label: 'Architecture docs', url: 'https://docs.example.com/netweave-fabric' }
        ],
        regions: ['APJ', 'EMEA'],
        areas_of_focus: ['Orchestration & Infrastructure', 'IT Infrastructure', 'Cloud'],
        short_description: 'Network segmentation and traffic engineering components for distributed private clouds.',
        description: `NetWeave Fabric builds network segmentation and traffic engineering components for distributed private cloud operations.`
      },
      media: {
        logo: {
          filePath: 'scripts/assets/logos/vendors/netweave-fabric.svg',
          fileName: 'netweave-fabric-logo.svg',
          mimeType: 'image/svg+xml'
        }
      }
    },
    {
      slug: 'compute-harbor',
      data: {
        name: 'Compute Harbor',
        visibility_policy: 'limited',
        website: 'https://example.com/compute-harbor',
        links: [
          { label: 'Company profile', url: 'https://example.com/compute-harbor' },
          { label: 'Performance guides', url: 'https://docs.example.com/compute-harbor' }
        ],
        regions: ['North America', 'EMEA'],
        areas_of_focus: ['IT Infrastructure', 'Enterprise Applications', 'Orchestration & Infrastructure'],
        short_description: 'Compute profiling and host baseline tuning for high-density virtualization clusters.',
        description: `Compute Harbor delivers compute performance profiling and baseline templates for virtualization clusters.`
      },
      media: {
        logo: {
          filePath: 'scripts/assets/logos/vendors/compute-harbor.svg',
          fileName: 'compute-harbor-logo.svg',
          mimeType: 'image/svg+xml'
        }
      }
    },
    {
      slug: 'aerolith-compute',
      data: {
        name: 'Aerolith Compute',
        visibility_policy: 'full',
        website: 'https://example.com/aerolith-compute',
        links: [
          { label: 'Company profile', url: 'https://example.com/aerolith-compute' },
          { label: 'Platform docs', url: 'https://docs.example.com/aerolith-compute' }
        ],
        regions: ['North America', 'EMEA'],
        areas_of_focus: ['Analytics & AI', 'IT Infrastructure', 'Hybrid Cloud'],
        short_description: 'Workload placement and host optimization patterns for compute-intensive virtual estates.',
        description: `Aerolith Compute designs workload scheduling and host optimization patterns for large virtualization clusters.`
      },
      media: {
        logo: {
          filePath: 'scripts/assets/logos/vendors/aerolith-compute.svg',
          fileName: 'aerolith-compute-logo.svg',
          mimeType: 'image/svg+xml'
        }
      }
    },
    {
      slug: 'storagrid-cloud',
      data: {
        name: 'Storagrid Cloud',
        visibility_policy: 'full',
        website: 'https://example.com/storagrid-cloud',
        links: [
          { label: 'Company profile', url: 'https://example.com/storagrid-cloud' },
          { label: 'Storage guides', url: 'https://docs.example.com/storagrid-cloud' }
        ],
        regions: ['LATAM', 'North America'],
        areas_of_focus: ['Data Protection', 'IT Infrastructure', 'Cloud'],
        short_description: 'Storage performance governance with policy-driven tiering and lifecycle automation.',
        description: `Storagrid Cloud focuses on storage performance governance and multi-tier lifecycle automation.`
      },
      media: {
        logo: {
          filePath: 'scripts/assets/logos/vendors/storagrid-cloud.svg',
          fileName: 'storagrid-cloud-logo.svg',
          mimeType: 'image/svg+xml'
        }
      }
    },
    {
      slug: 'helion-health-systems',
      data: {
        name: 'Helion Health Systems',
        visibility_policy: 'limited',
        website: 'https://example.com/helion-health-systems',
        links: [
          { label: 'Company profile', url: 'https://example.com/helion-health-systems' },
          { label: 'Healthcare solutions', url: 'https://docs.example.com/helion-health-systems' }
        ],
        regions: ['North America', 'EMEA'],
        areas_of_focus: ['Healthcare', 'Data Protection', 'Enterprise Applications'],
        short_description: 'Healthcare-focused infrastructure partner for resilient clinical and imaging workloads.',
        description: `Helion Health Systems delivers platform patterns for healthcare environments with strict availability and compliance needs.`
      },
      media: {
        logo: {
          filePath: 'scripts/assets/logos/vendors/helion-health-systems.svg',
          fileName: 'helion-health-systems-logo.svg',
          mimeType: 'image/svg+xml'
        }
      }
    },
    {
      slug: 'orbit-orchestration',
      data: {
        name: 'Orbit Orchestration',
        visibility_policy: 'limited',
        website: 'https://example.com/orbit-orchestration',
        links: [
          { label: 'Company profile', url: 'https://example.com/orbit-orchestration' },
          { label: 'Automation docs', url: 'https://docs.example.com/orbit-orchestration' }
        ],
        regions: ['EMEA', 'APJ'],
        areas_of_focus: ['Orchestration & Infrastructure', 'Hybrid Cloud', 'IT Infrastructure'],
        short_description: 'Automation and orchestration partner for platform operations at scale.',
        description: `Orbit Orchestration provides deployment automation, policy orchestration, and runbook standardization for private and hybrid cloud teams.`
      },
      media: {
        logo: {
          filePath: 'scripts/assets/logos/vendors/orbit-orchestration.svg',
          fileName: 'orbit-orchestration-logo.svg',
          mimeType: 'image/svg+xml'
        }
      }
    },
    {
      slug: 'insightlake-analytics',
      data: {
        name: 'InsightLake Analytics',
        visibility_policy: 'limited',
        website: 'https://example.com/insightlake-analytics',
        links: [
          { label: 'Company profile', url: 'https://example.com/insightlake-analytics' },
          { label: 'Analytics docs', url: 'https://docs.example.com/insightlake-analytics' }
        ],
        regions: ['LATAM', 'North America'],
        areas_of_focus: ['Analytics & AI', 'Intelligence & Information Management', 'Cloud'],
        short_description: 'Analytics and information management specialist for infrastructure observability and planning.',
        description: `InsightLake Analytics helps infrastructure teams improve visibility, forecasting, and decision support across cloud and virtualization estates.`
      },
      media: {
        logo: {
          filePath: 'scripts/assets/logos/vendors/insightlake-analytics.svg',
          fileName: 'insightlake-analytics-logo.svg',
          mimeType: 'image/svg+xml'
        }
      }
    },
    {
      slug: 'quantaops-cloud',
      data: {
        name: 'QuantaOps Cloud',
        visibility_policy: 'full',
        website: 'https://example.com/quantaops-cloud',
        links: [
          { label: 'Company profile', url: 'https://example.com/quantaops-cloud' },
          { label: 'Operations docs', url: 'https://docs.example.com/quantaops-cloud' }
        ],
        regions: ['North America', 'EMEA'],
        areas_of_focus: ['Cloud', 'IT Infrastructure', 'Orchestration & Infrastructure'],
        short_description: 'Cloud platform operations partner focused on reliability engineering and service standardization.',
        description: `QuantaOps Cloud helps platform teams scale private cloud operations with repeatable reliability practices.`
      },
      media: {
        logo: {
          filePath: 'scripts/assets/logos/vendors/quantaops-cloud.svg',
          fileName: 'quantaops-cloud-logo.svg',
          mimeType: 'image/svg+xml'
        }
      }
    },
    {
      slug: 'prismforge-ai',
      data: {
        name: 'PrismForge AI',
        visibility_policy: 'full',
        website: 'https://example.com/prismforge-ai',
        links: [
          { label: 'Company profile', url: 'https://example.com/prismforge-ai' },
          { label: 'Reference docs', url: 'https://docs.example.com/prismforge-ai' }
        ],
        regions: ['North America', 'APJ'],
        areas_of_focus: ['Analytics & AI', 'Intelligence & Information Management', 'Hybrid Cloud'],
        short_description: 'AI operations specialist for forecasting, anomaly detection, and infrastructure planning.',
        description: `PrismForge AI builds practical analytics workflows that improve operations decisions across hybrid estates.`
      },
      media: {
        logo: {
          filePath: 'scripts/assets/logos/vendors/prismforge-ai.svg',
          fileName: 'prismforge-ai-logo.svg',
          mimeType: 'image/svg+xml'
        }
      }
    },
    {
      slug: 'atlas-governance',
      data: {
        name: 'Atlas Governance',
        visibility_policy: 'limited',
        website: 'https://example.com/atlas-governance',
        links: [
          { label: 'Company profile', url: 'https://example.com/atlas-governance' },
          { label: 'Compliance patterns', url: 'https://docs.example.com/atlas-governance' }
        ],
        regions: ['EMEA', 'LATAM'],
        areas_of_focus: ['Security, Compliance, & Governance', 'Data Protection', 'Enterprise Applications'],
        short_description: 'Policy and compliance partner for regulated environments running virtualized workloads.',
        description: `Atlas Governance delivers governance controls, policy baselines, and continuous compliance guardrails.`
      },
      media: {
        logo: {
          filePath: 'scripts/assets/logos/vendors/atlas-governance.svg',
          fileName: 'atlas-governance-logo.svg',
          mimeType: 'image/svg+xml'
        }
      }
    },
    {
      slug: 'nexora-platforms',
      data: {
        name: 'Nexora Platforms',
        visibility_policy: 'full',
        website: 'https://example.com/nexora-platforms',
        links: [
          { label: 'Company profile', url: 'https://example.com/nexora-platforms' },
          { label: 'Platform engineering docs', url: 'https://docs.example.com/nexora-platforms' }
        ],
        regions: ['North America', 'EMEA'],
        areas_of_focus: ['Orchestration & Infrastructure', 'Hybrid Cloud', 'Enterprise Applications'],
        short_description: 'Platform engineering partner for multi-cluster automation and lifecycle governance.',
        description: `Nexora Platforms helps enterprises standardize platform operations across distributed sites.`
      },
      media: {
        logo: {
          filePath: 'scripts/assets/logos/vendors/nexora-platforms.svg',
          fileName: 'nexora-platforms-logo.svg',
          mimeType: 'image/svg+xml'
        }
      }
    },
    {
      slug: 'cedarbridge-health',
      data: {
        name: 'CedarBridge Health',
        visibility_policy: 'limited',
        website: 'https://example.com/cedarbridge-health',
        links: [
          { label: 'Company profile', url: 'https://example.com/cedarbridge-health' },
          { label: 'Healthcare architecture docs', url: 'https://docs.example.com/cedarbridge-health' }
        ],
        regions: ['North America', 'EMEA'],
        areas_of_focus: ['Healthcare', 'Enterprise Applications', 'Data Protection'],
        short_description: 'Healthcare workload modernization partner for resilient clinical platforms.',
        description: `CedarBridge Health delivers validated modernization approaches for hospital and imaging workloads.`
      },
      media: {
        logo: {
          filePath: 'scripts/assets/logos/vendors/cedarbridge-health.svg',
          fileName: 'cedarbridge-health-logo.svg',
          mimeType: 'image/svg+xml'
        }
      }
    },
    {
      slug: 'ironclad-resilience',
      data: {
        name: 'Ironclad Resilience',
        visibility_policy: 'limited',
        website: 'https://example.com/ironclad-resilience',
        links: [
          { label: 'Company profile', url: 'https://example.com/ironclad-resilience' },
          { label: 'Resilience framework', url: 'https://docs.example.com/ironclad-resilience' }
        ],
        regions: ['EMEA', 'APJ'],
        areas_of_focus: ['Data Protection', 'Cloud', 'Security, Compliance, & Governance'],
        short_description: 'Business resilience partner focused on backup integrity and recovery readiness.',
        description: `Ironclad Resilience focuses on practical resilience engineering and recovery validation programs.`
      },
      media: {
        logo: {
          filePath: 'scripts/assets/logos/vendors/ironclad-resilience.svg',
          fileName: 'ironclad-resilience-logo.svg',
          mimeType: 'image/svg+xml'
        }
      }
    },
    {
      slug: 'skylane-automation',
      data: {
        name: 'Skylane Automation',
        visibility_policy: 'full',
        website: 'https://example.com/skylane-automation',
        links: [
          { label: 'Company profile', url: 'https://example.com/skylane-automation' },
          { label: 'Automation kits', url: 'https://docs.example.com/skylane-automation' }
        ],
        regions: ['North America', 'LATAM'],
        areas_of_focus: ['Orchestration & Infrastructure', 'Cloud', 'IT Infrastructure'],
        short_description: 'Automation partner specializing in day-2 operations and policy orchestration.',
        description: `Skylane Automation provides reusable automation patterns for platform operations at scale.`
      },
      media: {
        logo: {
          filePath: 'scripts/assets/logos/vendors/skylane-automation.svg',
          fileName: 'skylane-automation-logo.svg',
          mimeType: 'image/svg+xml'
        }
      }
    },
    {
      slug: 'terranet-insight',
      data: {
        name: 'TerraNet Insight',
        visibility_policy: 'full',
        website: 'https://example.com/terranet-insight',
        links: [
          { label: 'Company profile', url: 'https://example.com/terranet-insight' },
          { label: 'Insights portal', url: 'https://docs.example.com/terranet-insight' }
        ],
        regions: ['LATAM', 'EMEA'],
        areas_of_focus: ['Intelligence & Information Management', 'Cloud', 'IT Infrastructure'],
        short_description: 'Insights-driven operations partner for telemetry, utilization, and service KPIs.',
        description: `TerraNet Insight combines telemetry and service analytics to guide platform optimization.`
      },
      media: {
        logo: {
          filePath: 'scripts/assets/logos/vendors/terranet-insight.svg',
          fileName: 'terranet-insight-logo.svg',
          mimeType: 'image/svg+xml'
        }
      }
    },
    {
      slug: 'voxelstream-data',
      data: {
        name: 'VoxelStream Data',
        visibility_policy: 'limited',
        website: 'https://example.com/voxelstream-data',
        links: [
          { label: 'Company profile', url: 'https://example.com/voxelstream-data' },
          { label: 'Data lifecycle docs', url: 'https://docs.example.com/voxelstream-data' }
        ],
        regions: ['North America'],
        areas_of_focus: ['Data Protection', 'Cloud', 'Intelligence & Information Management'],
        short_description: 'Data lifecycle and retention specialist for archival and compliance-heavy workloads.',
        description: `VoxelStream Data provides data governance tooling for storage lifecycle and retention policies.`
      },
      media: {
        logo: {
          filePath: 'scripts/assets/logos/vendors/voxelstream-data.svg',
          fileName: 'voxelstream-data-logo.svg',
          mimeType: 'image/svg+xml'
        }
      }
    },
    {
      slug: 'brightmesh-containers',
      data: {
        name: 'BrightMesh Containers',
        visibility_policy: 'limited',
        website: 'https://example.com/brightmesh-containers',
        links: [
          { label: 'Company profile', url: 'https://example.com/brightmesh-containers' },
          { label: 'Containers docs', url: 'https://docs.example.com/brightmesh-containers' }
        ],
        regions: ['APJ', 'North America'],
        areas_of_focus: ['Cloud', 'Orchestration & Infrastructure', 'IT Infrastructure'],
        short_description: 'Container networking and platform integration specialist for hybrid environments.',
        description: `BrightMesh Containers helps teams align container operations with virtualization platform standards.`
      },
      media: {
        logo: {
          filePath: 'scripts/assets/logos/vendors/brightmesh-containers.svg',
          fileName: 'brightmesh-containers-logo.svg',
          mimeType: 'image/svg+xml'
        }
      }
    },
    {
      slug: 'lacuna-secops',
      data: {
        name: 'Lacuna SecOps',
        visibility_policy: 'hidden',
        website: 'https://example.com/lacuna-secops',
        links: [
          { label: 'Company profile', url: 'https://example.com/lacuna-secops' },
          { label: 'Security operations docs', url: 'https://docs.example.com/lacuna-secops' }
        ],
        regions: ['EMEA'],
        areas_of_focus: ['Security, Compliance, & Governance', 'IT Infrastructure', 'Data Protection'],
        short_description: 'Security operations specialist for hardening and incident preparedness in virtualized estates.',
        description: `Lacuna SecOps provides security operations playbooks and controls for platform teams.`
      },
      media: {
        logo: {
          filePath: 'scripts/assets/logos/vendors/lacuna-secops.svg',
          fileName: 'lacuna-secops-logo.svg',
          mimeType: 'image/svg+xml'
        }
      }
    },
    {
      slug: 'pinecore-apps',
      data: {
        name: 'Pinecore Apps',
        visibility_policy: 'limited',
        website: 'https://example.com/pinecore-apps',
        links: [
          { label: 'Company profile', url: 'https://example.com/pinecore-apps' },
          { label: 'Application modernization docs', url: 'https://docs.example.com/pinecore-apps' }
        ],
        regions: ['North America', 'LATAM'],
        areas_of_focus: ['Enterprise Applications', 'Hybrid Cloud', 'Cloud'],
        short_description: 'Application modernization partner for enterprise workloads on private cloud platforms.',
        description: `Pinecore Apps supports application migration and modernization with platform-first operating models.`
      },
      media: {
        logo: {
          filePath: 'scripts/assets/logos/vendors/pinecore-apps.svg',
          fileName: 'pinecore-apps-logo.svg',
          mimeType: 'image/svg+xml'
        }
      }
    },
    {
      slug: 'bluepeak-infra',
      data: {
        name: 'BluePeak Infra',
        visibility_policy: 'full',
        website: 'https://example.com/bluepeak-infra',
        links: [
          { label: 'Company profile', url: 'https://example.com/bluepeak-infra' },
          { label: 'Architecture docs', url: 'https://docs.example.com/bluepeak-infra' }
        ],
        regions: ['North America', 'EMEA'],
        areas_of_focus: ['Cloud', 'Hybrid Cloud', 'IT Infrastructure'],
        short_description: 'Infrastructure partner for resilient private cloud foundations and continuity operations.',
        description: `BluePeak Infra designs operational blueprints for platform reliability and recovery readiness.`
      },
      media: {
        logo: {
          filePath: 'scripts/assets/logos/vendors/bluepeak-infra.svg',
          fileName: 'bluepeak-infra-logo.svg',
          mimeType: 'image/svg+xml'
        }
      }
    },
    {
      slug: 'quantis-analytics',
      data: {
        name: 'Quantis Analytics',
        visibility_policy: 'limited',
        website: 'https://example.com/quantis-analytics',
        links: [
          { label: 'Company profile', url: 'https://example.com/quantis-analytics' },
          { label: 'Analytics docs', url: 'https://docs.example.com/quantis-analytics' }
        ],
        regions: ['LATAM', 'North America'],
        areas_of_focus: ['Analytics & AI', 'Intelligence & Information Management', 'Cloud'],
        short_description: 'Analytics-focused partner for telemetry intelligence and capacity forecasting.',
        description: `Quantis Analytics transforms platform telemetry into forecasting, anomaly, and governance insights.`
      },
      media: {
        logo: {
          filePath: 'scripts/assets/logos/vendors/quantis-analytics.svg',
          fileName: 'quantis-analytics-logo.svg',
          mimeType: 'image/svg+xml'
        }
      }
    },
    {
      slug: 'redoak-governance',
      data: {
        name: 'RedOak Governance',
        visibility_policy: 'limited',
        website: 'https://example.com/redoak-governance',
        links: [
          { label: 'Company profile', url: 'https://example.com/redoak-governance' },
          { label: 'Governance docs', url: 'https://docs.example.com/redoak-governance' }
        ],
        regions: ['EMEA', 'APJ'],
        areas_of_focus: ['Security, Compliance, & Governance', 'Data Protection', 'Enterprise Applications'],
        short_description: 'Governance specialist for control evidence pipelines and compliance automation.',
        description: `RedOak Governance helps platform teams codify control baselines and audit evidence collection.`
      },
      media: {
        logo: {
          filePath: 'scripts/assets/logos/vendors/redoak-governance.svg',
          fileName: 'redoak-governance-logo.svg',
          mimeType: 'image/svg+xml'
        }
      }
    },
    {
      slug: 'horizon-orchestrator',
      data: {
        name: 'Horizon Orchestrator',
        visibility_policy: 'full',
        website: 'https://example.com/horizon-orchestrator',
        links: [
          { label: 'Company profile', url: 'https://example.com/horizon-orchestrator' },
          { label: 'Runbook docs', url: 'https://docs.example.com/horizon-orchestrator' }
        ],
        regions: ['North America', 'LATAM'],
        areas_of_focus: ['Orchestration & Infrastructure', 'Cloud', 'IT Infrastructure'],
        short_description: 'Orchestration partner for multi-cluster operations and staged platform changes.',
        description: `Horizon Orchestrator standardizes orchestration patterns for distributed virtualized environments.`
      },
      media: {
        logo: {
          filePath: 'scripts/assets/logos/vendors/horizon-orchestrator.svg',
          fileName: 'horizon-orchestrator-logo.svg',
          mimeType: 'image/svg+xml'
        }
      }
    },
    {
      slug: 'medisphere-platforms',
      data: {
        name: 'MediSphere Platforms',
        visibility_policy: 'limited',
        website: 'https://example.com/medisphere-platforms',
        links: [
          { label: 'Company profile', url: 'https://example.com/medisphere-platforms' },
          { label: 'Healthcare platform docs', url: 'https://docs.example.com/medisphere-platforms' }
        ],
        regions: ['North America', 'EMEA'],
        areas_of_focus: ['Healthcare', 'Cloud', 'Data Protection'],
        short_description: 'Healthcare platform modernization specialist with strong continuity requirements.',
        description: `MediSphere Platforms delivers operational patterns for healthcare-grade availability and resilience.`
      },
      media: {
        logo: {
          filePath: 'scripts/assets/logos/vendors/medisphere-platforms.svg',
          fileName: 'medisphere-platforms-logo.svg',
          mimeType: 'image/svg+xml'
        }
      }
    },
    {
      slug: 'vertex-automation',
      data: {
        name: 'Vertex Automation',
        visibility_policy: 'full',
        website: 'https://example.com/vertex-automation',
        links: [
          { label: 'Company profile', url: 'https://example.com/vertex-automation' },
          { label: 'Automation docs', url: 'https://docs.example.com/vertex-automation' }
        ],
        regions: ['EMEA', 'North America'],
        areas_of_focus: ['Orchestration & Infrastructure', 'IT Infrastructure', 'Cloud'],
        short_description: 'Automation partner for policy remediation and release governance workflows.',
        description: `Vertex Automation helps teams automate day-2 platform controls and release validation loops.`
      },
      media: {
        logo: {
          filePath: 'scripts/assets/logos/vendors/vertex-automation.svg',
          fileName: 'vertex-automation-logo.svg',
          mimeType: 'image/svg+xml'
        }
      }
    },
    {
      slug: 'amberlane-storage',
      data: {
        name: 'Amberlane Storage',
        visibility_policy: 'limited',
        website: 'https://example.com/amberlane-storage',
        links: [
          { label: 'Company profile', url: 'https://example.com/amberlane-storage' },
          { label: 'Storage docs', url: 'https://docs.example.com/amberlane-storage' }
        ],
        regions: ['EMEA'],
        areas_of_focus: ['Data Protection', 'Cloud', 'IT Infrastructure'],
        short_description: 'Storage lifecycle tooling provider for tiering and retention governance.',
        description: `Amberlane Storage provides lifecycle automation and retention policy tooling for virtual infrastructures.`
      },
      media: {
        logo: {
          filePath: 'scripts/assets/logos/vendors/amberlane-storage.svg',
          fileName: 'amberlane-storage-logo.svg',
          mimeType: 'image/svg+xml'
        }
      }
    },
    {
      slug: 'cobalt-fabric',
      data: {
        name: 'Cobalt Fabric',
        visibility_policy: 'hidden',
        website: 'https://example.com/cobalt-fabric',
        links: [
          { label: 'Company profile', url: 'https://example.com/cobalt-fabric' },
          { label: 'Fabric docs', url: 'https://docs.example.com/cobalt-fabric' }
        ],
        regions: ['APJ'],
        areas_of_focus: ['Orchestration & Infrastructure', 'Cloud', 'IT Infrastructure'],
        short_description: 'Network fabric specialist for segmentation and east-west traffic governance.',
        description: `Cobalt Fabric focuses on segmentation patterns and isolation controls for platform networking.`
      },
      media: {
        logo: {
          filePath: 'scripts/assets/logos/vendors/cobalt-fabric.svg',
          fileName: 'cobalt-fabric-logo.svg',
          mimeType: 'image/svg+xml'
        }
      }
    },
    {
      slug: 'deltaforge-secops',
      data: {
        name: 'DeltaForge SecOps',
        visibility_policy: 'hidden',
        website: 'https://example.com/deltaforge-secops',
        links: [
          { label: 'Company profile', url: 'https://example.com/deltaforge-secops' },
          { label: 'SecOps docs', url: 'https://docs.example.com/deltaforge-secops' }
        ],
        regions: ['North America'],
        areas_of_focus: ['Security, Compliance, & Governance', 'Cloud', 'IT Infrastructure'],
        short_description: 'Security operations provider for triage acceleration and incident flow normalization.',
        description: `DeltaForge SecOps builds practical triage workflows for noisy platform security operations.`
      },
      media: {
        logo: {
          filePath: 'scripts/assets/logos/vendors/deltaforge-secops.svg',
          fileName: 'deltaforge-secops-logo.svg',
          mimeType: 'image/svg+xml'
        }
      }
    },
    {
      slug: 'emberstack-apps',
      data: {
        name: 'EmberStack Apps',
        visibility_policy: 'limited',
        website: 'https://example.com/emberstack-apps',
        links: [
          { label: 'Company profile', url: 'https://example.com/emberstack-apps' },
          { label: 'Migration docs', url: 'https://docs.example.com/emberstack-apps' }
        ],
        regions: ['LATAM'],
        areas_of_focus: ['Enterprise Applications', 'Hybrid Cloud', 'Cloud'],
        short_description: 'Application migration specialist for enterprise platform modernization programs.',
        description: `EmberStack Apps helps enterprise teams migrate and stabilize applications on cloud platforms.`
      },
      media: {
        logo: {
          filePath: 'scripts/assets/logos/vendors/emberstack-apps.svg',
          fileName: 'emberstack-apps-logo.svg',
          mimeType: 'image/svg+xml'
        }
      }
    },
    {
      slug: 'frostbyte-observability',
      data: {
        name: 'Frostbyte Observability',
        visibility_policy: 'limited',
        website: 'https://example.com/frostbyte-observability',
        links: [
          { label: 'Company profile', url: 'https://example.com/frostbyte-observability' },
          { label: 'Observability docs', url: 'https://docs.example.com/frostbyte-observability' }
        ],
        regions: ['EMEA', 'LATAM'],
        areas_of_focus: ['Analytics & AI', 'Intelligence & Information Management', 'IT Infrastructure'],
        short_description: 'Observability tooling provider for telemetry normalization and capacity analytics.',
        description: `Frostbyte Observability supports telemetry quality and analytics for platform operations teams.`
      },
      media: {
        logo: {
          filePath: 'scripts/assets/logos/vendors/frostbyte-observability.svg',
          fileName: 'frostbyte-observability-logo.svg',
          mimeType: 'image/svg+xml'
        }
      }
    },
    {
      slug: 'granitebridge-cloud',
      data: {
        name: 'GraniteBridge Cloud',
        visibility_policy: 'limited',
        website: 'https://example.com/granitebridge-cloud',
        links: [
          { label: 'Company profile', url: 'https://example.com/granitebridge-cloud' },
          { label: 'Cloud migration docs', url: 'https://docs.example.com/granitebridge-cloud' }
        ],
        regions: ['North America', 'APJ'],
        areas_of_focus: ['Cloud', 'Hybrid Cloud', 'Enterprise Applications'],
        short_description: 'Cloud transformation partner for migration readiness and operational transition.',
        description: `GraniteBridge Cloud supports migration programs with readiness criteria and phased rollout guidance.`
      },
      media: {
        logo: {
          filePath: 'scripts/assets/logos/vendors/granitebridge-cloud.svg',
          fileName: 'granitebridge-cloud-logo.svg',
          mimeType: 'image/svg+xml'
        }
      }
    }
  ],

  'VAN-members': [
    {
      data: {
        tier: 'strategic',
        registered_at: '2026-01-05T00:00:00.000Z',
        expires_at: '2027-01-05T00:00:00.000Z'
      },
      relations: {
        vendor: '@vendors:northbridge-cloud'
      }
    },
    {
      data: {
        tier: 'associate',
        registered_at: '2026-01-08T00:00:00.000Z',
        expires_at: '2027-01-08T00:00:00.000Z'
      },
      relations: {
        vendor: '@vendors:altura-systems'
      }
    },
    {
      data: {
        tier: 'alliance',
        registered_at: '2026-01-12T00:00:00.000Z',
        expires_at: '2027-01-12T00:00:00.000Z'
      },
      relations: {
        vendor: '@vendors:cloudbridge-systems'
      }
    },
    {
      data: {
        tier: 'associate',
        registered_at: '2026-01-15T00:00:00.000Z',
        expires_at: '2027-01-15T00:00:00.000Z'
      },
      relations: {
        vendor: '@vendors:securegrid-labs'
      }
    },
    {
      data: {
        tier: 'strategic',
        registered_at: '2026-01-20T00:00:00.000Z',
        expires_at: '2027-01-20T00:00:00.000Z'
      },
      relations: {
        vendor: '@vendors:aerolith-compute'
      }
    },
    {
      data: {
        tier: 'alliance',
        registered_at: '2026-01-25T00:00:00.000Z',
        expires_at: '2027-01-25T00:00:00.000Z'
      },
      relations: {
        vendor: '@vendors:storagrid-cloud'
      }
    },
    {
      data: {
        tier: 'strategic',
        registered_at: '2026-01-28T00:00:00.000Z',
        expires_at: '2027-01-28T00:00:00.000Z'
      },
      relations: {
        vendor: '@vendors:quantaops-cloud'
      }
    },
    {
      data: {
        tier: 'associate',
        registered_at: '2026-01-30T00:00:00.000Z',
        expires_at: '2027-01-30T00:00:00.000Z'
      },
      relations: {
        vendor: '@vendors:prismforge-ai'
      }
    },
    {
      data: {
        tier: 'alliance',
        registered_at: '2026-02-01T00:00:00.000Z',
        expires_at: '2027-02-01T00:00:00.000Z'
      },
      relations: {
        vendor: '@vendors:atlas-governance'
      }
    },
    {
      data: {
        tier: 'strategic',
        registered_at: '2026-02-03T00:00:00.000Z',
        expires_at: '2027-02-03T00:00:00.000Z'
      },
      relations: {
        vendor: '@vendors:nexora-platforms'
      }
    },
    {
      data: {
        tier: 'associate',
        registered_at: '2026-02-05T00:00:00.000Z',
        expires_at: '2027-02-05T00:00:00.000Z'
      },
      relations: {
        vendor: '@vendors:cedarbridge-health'
      }
    },
    {
      data: {
        tier: 'alliance',
        registered_at: '2026-02-07T00:00:00.000Z',
        expires_at: '2027-02-07T00:00:00.000Z'
      },
      relations: {
        vendor: '@vendors:ironclad-resilience'
      }
    },
    {
      data: {
        tier: 'strategic',
        registered_at: '2026-02-09T00:00:00.000Z',
        expires_at: '2027-02-09T00:00:00.000Z'
      },
      relations: {
        vendor: '@vendors:skylane-automation'
      }
    },
    {
      data: {
        tier: 'associate',
        registered_at: '2026-02-11T00:00:00.000Z',
        expires_at: '2027-02-11T00:00:00.000Z'
      },
      relations: {
        vendor: '@vendors:terranet-insight'
      }
    },
    {
      data: {
        tier: 'strategic',
        registered_at: '2026-02-14T00:00:00.000Z',
        expires_at: '2027-02-14T00:00:00.000Z'
      },
      relations: {
        vendor: '@vendors:bluepeak-infra'
      }
    },
    {
      data: {
        tier: 'alliance',
        registered_at: '2026-02-15T00:00:00.000Z',
        expires_at: '2027-02-15T00:00:00.000Z'
      },
      relations: {
        vendor: '@vendors:quantis-analytics'
      }
    },
    {
      data: {
        tier: 'associate',
        registered_at: '2026-02-16T00:00:00.000Z',
        expires_at: '2027-02-16T00:00:00.000Z'
      },
      relations: {
        vendor: '@vendors:redoak-governance'
      }
    },
    {
      data: {
        tier: 'strategic',
        registered_at: '2026-02-17T00:00:00.000Z',
        expires_at: '2027-02-17T00:00:00.000Z'
      },
      relations: {
        vendor: '@vendors:horizon-orchestrator'
      }
    },
    {
      data: {
        tier: 'alliance',
        registered_at: '2026-02-18T00:00:00.000Z',
        expires_at: '2027-02-18T00:00:00.000Z'
      },
      relations: {
        vendor: '@vendors:medisphere-platforms'
      }
    },
    {
      data: {
        tier: 'strategic',
        registered_at: '2026-02-19T00:00:00.000Z',
        expires_at: '2027-02-19T00:00:00.000Z'
      },
      relations: {
        vendor: '@vendors:vertex-automation'
      }
    }
  ],

  products: [
    { slug: 'xen-orchestra', data: { name: 'Xen Orchestra' } },
    { slug: 'xcp-ng', data: { name: 'XCP-ng' } },
    { slug: 'xostore', data: { name: 'XOStore' } },
    { slug: 'xoproxy', data: { name: 'XOProxy' } },
    { slug: 'vates-vms', data: { name: 'Vates VMS' } },
    { slug: 'easyvirt-dc-scope', data: { name: 'EasyVirt DC Scope' } },
    { slug: 'easyvirt-dc-netscope', data: { name: 'EasyVirt DC Netscope' } }
  ],

  solutions: [
    {
      slug: 'hybrid-dr-for-vms',
      data: {
        name: 'Hybrid Disaster Recovery for VMS',
        short_description: `**Cross-site resilience blueprint** for Vates VMS workloads, covering replication, failover, and recovery validation.`,
        solution_type: 'backup',
        integration_patterns: 'agent',
        licensing_model: 'mixed',
        description: `Deliver a repeatable DR capability across multiple Vates VMS sites.

## Scope
- Cross-site replication strategy and target RPO/RTO definition
- Failover and failback workflows with clear ownership boundaries
- Runbook validation cadence and evidence collection

## Integration model
- Agent or appliance-based replication depending on workload class
- Operational hooks for test execution and post-recovery checks

## Best for
- Two-site (or more) deployments needing measurable DR readiness
- Teams that want standardized runbooks and predictable drills`,
        visibility_level: 'promoted',
        workflow: 'draft'
      },
      relations: {
        vendor: '@vendors:northbridge-cloud'
      },
      media: {
        picture: {
          sourceUrl: 'https://img.freepik.com/premium-vector/disaster-recovery-infographic-template-design-with-icons-vector-illustration-technology-concept_549488-656.jpg',
          fileName: 'solution-hybrid-dr-for-vms.jpg',
          mimeType: 'image/jpeg'
        }
      }
    },
    {
      slug: 'capacity-rightsizing-intelligence',
      data: {
        name: 'Capacity Rightsizing Intelligence',
        short_description: `**Rightsizing and forecasting layer** for virtual infrastructure, turning telemetry into actionable capacity and utilization decisions.`,
        solution_type: 'monitoring',
        integration_patterns: 'api',
        licensing_model: 'mixed',
        description: `Turn raw infrastructure metrics into a rightsizing and planning workflow.

## What it does
- Detects chronic over and under allocation patterns
- Produces rightsizing recommendations per VM and per cluster
- Builds rolling capacity forecasts (growth, saturation risk, headroom)

## Operating model
- A baseline phase to stabilize metrics and labels
- Regular review cadence for exceptions, approvals, and follow-through

## Best for
- Platform teams facing growth uncertainty
- Organizations needing consistent governance reporting`,
        visibility_level: 'promoted',
        workflow: 'draft'
      },
      relations: {
        vendor: '@vendors:altura-systems'
      },
      media: {
        picture: {
          sourceUrl: 'https://img.freepik.com/free-vector/business-intelligence-dashboard-abstract-concept-illustration_335657-4882.jpg',
          fileName: 'solution-capacity-rightsizing-intelligence.jpg',
          mimeType: 'image/jpeg'
        }
      }
    },
    {
      slug: 'secure-multi-tenant-hosting',
      data: {
        name: 'Secure Multi-Tenant Hosting Blueprint',
        short_description: `**Security-first architecture** to isolate tenants and enforce policy governance across shared virtualization infrastructure.`,
        solution_type: 'security',
        integration_patterns: 'proxy',
        licensing_model: 'private',
        description: `Reference architecture for hosting multiple tenants on shared infrastructure with strong isolation.

## Core controls
- Network and management plane segmentation by tenant zone
- Centralized identity and policy enforcement
- Baseline hardening, drift detection, and audit checkpoints

## Operational guardrails
- Standard onboarding procedure per tenant
- Change control boundaries for shared components
- Evidence collection for compliance and incident response

## Best for
- Service providers and regulated environments
- Organizations that need predictable isolation at scale`,
        visibility_level: 'listed',
        workflow: 'draft'
      },
      relations: {
        vendor: '@vendors:securegrid-labs'
      },
      media: {
        picture: {
          sourceUrl: 'https://img.freepik.com/free-vector/server-rack-security-shield-realistic-illustration_1284-12131.jpg',
          fileName: 'solution-secure-multi-tenant-hosting.jpg',
          mimeType: 'image/jpeg'
        }
      }
    },
    {
      slug: 'vms-modernization-factory',
      data: {
        name: 'VMS Modernization Factory',
        short_description: `**Structured migration path** to modernize operations while moving workloads to Vates VMS, with staged cutovers and repeatable landing zones.`,
        solution_type: 'compute',
        integration_patterns: 'plugin',
        licensing_model: 'mixed',
        description: `Accelerate workload onboarding to Vates VMS with a factory approach.

## Approach
- Discover and segment workloads by risk and dependency
- Build a landing zone aligned with security and operations standards
- Execute migrations in waves with measurable acceptance criteria

## Deliverables
- Reusable runbooks for migration and rollback
- Standard platform patterns for networking, storage, and access control
- Post-migration stabilization plan (day-2 readiness)

## Best for
- Organizations replacing legacy virtualization at scale
- Teams that need predictable timelines and repeatable outcomes`,
        visibility_level: 'listed',
        workflow: 'draft'
      },
      relations: {
        vendor: '@vendors:cloudbridge-systems'
      },
      media: {
        picture: {
          sourceUrl: 'https://img.freepik.com/free-vector/digital-transformation-digitalization-isometric-composition-with-open-laptop-cloud-computing-symbols-vector-illustration_1284-69839.jpg',
          fileName: 'solution-vms-modernization-factory.jpg',
          mimeType: 'image/jpeg'
        }
      }
    },
    {
      slug: 'observability-and-cost-governance',
      data: {
        name: 'Observability and Cost Governance',
        short_description: `**Unified visibility plus cost-aware governance** for virtualized estates, combining operational KPIs with financial accountability.`,
        solution_type: 'monitoring',
        integration_patterns: 'api',
        licensing_model: 'oss',
        description: `Bring operations telemetry and cost governance into a single, repeatable management loop.

## What it covers
- KPI definition: performance, availability, utilization, saturation signals
- Alerting patterns and escalation logic
- Governance checks: tagging hygiene, anomaly detection, review cadence

## Outputs
- Executive-ready reporting and trend views
- Actionable backlogs for optimization and cleanup
- Continuous improvement rhythm for platform teams

## Best for
- Teams that already collect metrics but lack governance
- Organizations that need consistent reporting across stakeholders`,
        visibility_level: 'listed',
        workflow: 'draft'
      },
      relations: {
        vendor: '@vendors:altura-systems'
      },
      media: {
        picture: {
          sourceUrl: 'https://img.freepik.com/premium-vector/global-security-shield-with-lock-inside-center-colorful-icons-that-represent-global-network-security-privacy-protection-data-security_657438-19813.jpg',
          fileName: 'solution-observability-and-cost-governance.jpg',
          mimeType: 'image/jpeg'
        }
      }
    },
    {
      slug: 'tiering-and-archive-automation',
      data: {
        name: 'Tiering and Archive Automation',
        short_description: `Storage lifecycle automation for tiering, archival, and retention control.`,
        solution_type: 'storage',
        integration_patterns: 'plugin',
        licensing_model: 'private',
        description: `Automates movement of datasets across performance tiers and archival storage, with policy-driven retention and retrieval controls.`,
        visibility_level: 'listed',
        workflow: 'draft'
      },
      relations: {
        vendor: '@vendors:dataprism-storage'
      }
    },
    {
      slug: 'fabric-segmentation-enforcement',
      data: {
        name: 'Fabric Segmentation Enforcement',
        short_description: `Network segmentation enforcement patterns for tenant and workload isolation.`,
        solution_type: 'networking',
        integration_patterns: 'cni',
        licensing_model: 'mixed',
        description: `Applies policy-driven segmentation and east-west control points to reduce lateral movement risk in shared infrastructure.`,
        visibility_level: 'hidden',
        workflow: 'draft'
      },
      relations: {
        vendor: '@vendors:netweave-fabric'
      }
    },
    {
      slug: 'compute-baseline-optimization',
      data: {
        name: 'Compute Baseline Optimization',
        short_description: `Performance baseline tuning for compute-heavy virtualization clusters.`,
        solution_type: 'compute',
        integration_patterns: 'agent',
        licensing_model: 'oss',
        description: `Provides benchmark-driven host baseline tuning recommendations and repeatable validation checkpoints for compute-intensive workloads.`,
        visibility_level: 'listed',
        workflow: 'draft'
      },
      relations: {
        vendor: '@vendors:compute-harbor'
      }
    },
    {
      slug: 'elastic-compute-placement',
      data: {
        name: 'Elastic Compute Placement',
        short_description: `Adaptive placement and balancing strategy for compute-heavy virtual workloads.`,
        solution_type: 'compute',
        integration_patterns: 'api',
        licensing_model: 'mixed',
        description: `Optimizes placement, balancing, and contention management for high-density compute clusters.`,
        visibility_level: 'promoted',
        workflow: 'draft'
      },
      relations: {
        vendor: '@vendors:aerolith-compute'
      }
    },
    {
      slug: 'cross-tier-storage-orchestration',
      data: {
        name: 'Cross-Tier Storage Orchestration',
        short_description: `Policy-driven orchestration across performance, capacity, and archive tiers.`,
        solution_type: 'storage',
        integration_patterns: 'plugin',
        licensing_model: 'private',
        description: `Coordinates data placement and migration across storage tiers to balance performance and cost.`,
        visibility_level: 'promoted',
        workflow: 'draft'
      },
      relations: {
        vendor: '@vendors:storagrid-cloud'
      }
    },
    {
      slug: 'policy-compliant-cloud-operations',
      data: {
        name: 'Policy Compliant Cloud Operations',
        short_description: `Policy-driven operations model for repeatable and auditable private cloud delivery.`,
        solution_type: 'security',
        integration_patterns: 'api',
        licensing_model: 'mixed',
        description: `Defines a policy control plane and operational checkpoints for repeatable cloud service delivery.`,
        visibility_level: 'promoted',
        workflow: 'draft'
      },
      relations: {
        vendor: '@vendors:quantaops-cloud'
      }
    },
    {
      slug: 'sre-runbook-automation',
      data: {
        name: 'SRE Runbook Automation',
        short_description: `Runbook orchestration and recovery drill automation for platform SRE teams.`,
        solution_type: 'monitoring',
        integration_patterns: 'plugin',
        licensing_model: 'private',
        description: `Automates operations runbooks, failover drills, and evidence capture for reliability programs.`,
        visibility_level: 'listed',
        workflow: 'draft'
      },
      relations: {
        vendor: '@vendors:quantaops-cloud'
      }
    },
    {
      slug: 'predictive-resource-advisor',
      data: {
        name: 'Predictive Resource Advisor',
        short_description: `Predictive analytics for rightsizing, budget planning, and anomaly awareness.`,
        solution_type: 'monitoring',
        integration_patterns: 'api',
        licensing_model: 'mixed',
        description: `Builds predictive models for utilization and demand to improve capacity decisions.`,
        visibility_level: 'listed',
        workflow: 'draft'
      },
      relations: {
        vendor: '@vendors:prismforge-ai'
      }
    },
    {
      slug: 'compliance-baseline-orchestrator',
      data: {
        name: 'Compliance Baseline Orchestrator',
        short_description: `Baseline orchestration for compliance controls across virtualization estates.`,
        solution_type: 'security',
        integration_patterns: 'agent',
        licensing_model: 'private',
        description: `Automates control baseline rollout, drift checks, and audit evidence packaging.`,
        visibility_level: 'listed',
        workflow: 'draft'
      },
      relations: {
        vendor: '@vendors:atlas-governance'
      }
    },
    {
      slug: 'multi-site-platform-blueprint',
      data: {
        name: 'Multi-Site Platform Blueprint',
        short_description: `Reference design for scalable multi-site platform operations.`,
        solution_type: 'compute',
        integration_patterns: 'plugin',
        licensing_model: 'mixed',
        description: `Provides a repeatable blueprint for distributed platform topology, standards, and change control.`,
        visibility_level: 'promoted',
        workflow: 'draft'
      },
      relations: {
        vendor: '@vendors:nexora-platforms'
      }
    },
    {
      slug: 'tenant-operations-control-plane',
      data: {
        name: 'Tenant Operations Control Plane',
        short_description: `Control plane for tenant lifecycle, role boundaries, and policy guardrails.`,
        solution_type: 'networking',
        integration_patterns: 'proxy',
        licensing_model: 'mixed',
        description: `Aligns tenant onboarding, segmentation, and operations handoffs in shared platforms.`,
        visibility_level: 'listed',
        workflow: 'draft'
      },
      relations: {
        vendor: '@vendors:nexora-platforms'
      }
    },
    {
      slug: 'clinical-workload-continuity',
      data: {
        name: 'Clinical Workload Continuity',
        short_description: `Continuity model for clinical and imaging workloads with strict uptime requirements.`,
        solution_type: 'backup',
        integration_patterns: 'agent',
        licensing_model: 'mixed',
        description: `Delivers continuity playbooks and DR controls tailored for healthcare infrastructure teams.`,
        visibility_level: 'listed',
        workflow: 'draft'
      },
      relations: {
        vendor: '@vendors:cedarbridge-health'
      }
    },
    {
      slug: 'ransomware-dr-hardening',
      data: {
        name: 'Ransomware DR Hardening',
        short_description: `Ransomware-aware recovery hardening with immutable backup and isolation controls.`,
        solution_type: 'backup',
        integration_patterns: 'agent',
        licensing_model: 'private',
        description: `Hardens backup and recovery operations against ransomware disruption scenarios.`,
        visibility_level: 'promoted',
        workflow: 'draft'
      },
      relations: {
        vendor: '@vendors:ironclad-resilience'
      }
    },
    {
      slug: 'policy-automation-fabric',
      data: {
        name: 'Policy Automation Fabric',
        short_description: `Automation fabric for policy rollout and day-2 remediation workflows.`,
        solution_type: 'networking',
        integration_patterns: 'cni',
        licensing_model: 'mixed',
        description: `Coordinates policy-as-code and automated remediation across distributed platform components.`,
        visibility_level: 'promoted',
        workflow: 'draft'
      },
      relations: {
        vendor: '@vendors:skylane-automation'
      }
    },
    {
      slug: 'multi-cluster-release-orchestrator',
      data: {
        name: 'Multi-Cluster Release Orchestrator',
        short_description: `Release orchestration workflow for staged changes across multiple clusters.`,
        solution_type: 'cloud_integration',
        integration_patterns: 'plugin',
        licensing_model: 'mixed',
        description: `Provides phased rollout orchestration with validation gates for platform release management.`,
        visibility_level: 'listed',
        workflow: 'draft'
      },
      relations: {
        vendor: '@vendors:skylane-automation'
      }
    },
    {
      slug: 'telemetry-service-map',
      data: {
        name: 'Telemetry Service Map',
        short_description: `Service mapping and telemetry correlation for operations decision support.`,
        solution_type: 'monitoring',
        integration_patterns: 'api',
        licensing_model: 'oss',
        description: `Correlates service dependencies and telemetry signals to improve triage and optimization.`,
        visibility_level: 'listed',
        workflow: 'draft'
      },
      relations: {
        vendor: '@vendors:terranet-insight'
      }
    },
    {
      slug: 'retention-policy-simplifier',
      data: {
        name: 'Retention Policy Simplifier',
        short_description: `Retention policy governance assistant for compliance-heavy data estates.`,
        solution_type: 'storage',
        integration_patterns: 'plugin',
        licensing_model: 'private',
        description: `Simplifies retention class design and policy enforcement across mixed storage tiers.`,
        visibility_level: 'listed',
        workflow: 'draft'
      },
      relations: {
        vendor: '@vendors:voxelstream-data'
      }
    },
    {
      slug: 'container-segmentation-bridge',
      data: {
        name: 'Container Segmentation Bridge',
        short_description: `Container network segmentation bridge for hybrid platform teams.`,
        solution_type: 'networking',
        integration_patterns: 'cni',
        licensing_model: 'mixed',
        description: `Bridges container segmentation controls with virtualization networking guardrails.`,
        visibility_level: 'listed',
        workflow: 'draft'
      },
      relations: {
        vendor: '@vendors:brightmesh-containers'
      }
    },
    {
      slug: 'secops-triage-accelerator',
      data: {
        name: 'SecOps Triage Accelerator',
        short_description: `Security operations triage patterns for high-signal incident response.`,
        solution_type: 'security',
        integration_patterns: 'agent',
        licensing_model: 'mixed',
        description: `Provides event prioritization and guided triage for platform security incidents.`,
        visibility_level: 'hidden',
        workflow: 'draft'
      },
      relations: {
        vendor: '@vendors:lacuna-secops'
      }
    },
    {
      slug: 'enterprise-workload-modernizer',
      data: {
        name: 'Enterprise Workload Modernizer',
        short_description: `Modernization pattern for enterprise workloads moving to private cloud.`,
        solution_type: 'compute',
        integration_patterns: 'plugin',
        licensing_model: 'mixed',
        description: `Supports planning and phased migration for enterprise application stacks.`,
        visibility_level: 'listed',
        workflow: 'draft'
      },
      relations: {
        vendor: '@vendors:pinecore-apps'
      }
    },
    {
      slug: 'bluepeak-hybrid-continuity',
      data: {
        name: 'BluePeak Hybrid Continuity',
        short_description: `Continuity blueprint for hybrid cloud estates with strong recovery objectives.`,
        solution_type: 'backup',
        integration_patterns: 'agent',
        licensing_model: 'mixed',
        description: `Defines continuity controls, recovery workflows, and periodic drill validation for hybrid environments.`,
        visibility_level: 'promoted',
        workflow: 'draft'
      },
      relations: {
        vendor: '@vendors:bluepeak-infra'
      }
    },
    {
      slug: 'bluepeak-platform-observability',
      data: {
        name: 'BluePeak Platform Observability',
        short_description: `Operational observability pattern with health indicators and action-oriented reporting.`,
        solution_type: 'monitoring',
        integration_patterns: 'api',
        licensing_model: 'mixed',
        description: `Creates a structured observability layer with clear KPIs and review loops for platform teams.`,
        visibility_level: 'listed',
        workflow: 'draft'
      },
      relations: {
        vendor: '@vendors:bluepeak-infra'
      }
    },
    {
      slug: 'bluepeak-policy-driven-backup-assurance',
      data: {
        name: 'BluePeak Policy-Driven Backup Assurance',
        short_description: `Backup assurance pattern with policy checks and recovery validation loops.`,
        solution_type: 'backup',
        integration_patterns: 'agent',
        licensing_model: 'mixed',
        description: `Implements backup policy compliance checks and scheduled recovery validations for resilient operations.`,
        visibility_level: 'listed',
        workflow: 'draft'
      },
      relations: {
        vendor: '@vendors:bluepeak-infra'
      }
    },
    {
      slug: 'bluepeak-multi-zone-placement-control',
      data: {
        name: 'BluePeak Multi-Zone Placement Control',
        short_description: `Placement control strategy across zones to improve workload resilience and balance.`,
        solution_type: 'compute',
        integration_patterns: 'plugin',
        licensing_model: 'mixed',
        description: `Defines workload placement boundaries and rebalance guardrails across distributed virtualization zones.`,
        visibility_level: 'listed',
        workflow: 'draft'
      },
      relations: {
        vendor: '@vendors:bluepeak-infra'
      }
    },
    {
      slug: 'bluepeak-storage-tier-compliance',
      data: {
        name: 'BluePeak Storage Tier Compliance',
        short_description: `Storage tier compliance controls with lifecycle checks and policy exception tracking.`,
        solution_type: 'storage',
        integration_patterns: 'plugin',
        licensing_model: 'private',
        description: `Applies storage policy governance and tier compliance controls for operational consistency.`,
        visibility_level: 'listed',
        workflow: 'draft'
      },
      relations: {
        vendor: '@vendors:bluepeak-infra'
      }
    },
    {
      slug: 'bluepeak-network-segmentation-ops',
      data: {
        name: 'BluePeak Network Segmentation Ops',
        short_description: `Operational segmentation framework for east-west control and tenancy isolation.`,
        solution_type: 'networking',
        integration_patterns: 'cni',
        licensing_model: 'mixed',
        description: `Introduces segmentation runbooks and validation controls for secure multi-zone networking.`,
        visibility_level: 'listed',
        workflow: 'draft'
      },
      relations: {
        vendor: '@vendors:bluepeak-infra'
      }
    },
    {
      slug: 'bluepeak-release-wave-orchestration',
      data: {
        name: 'BluePeak Release Wave Orchestration',
        short_description: `Release wave orchestration for safer phased platform changes.`,
        solution_type: 'cloud_integration',
        integration_patterns: 'api',
        licensing_model: 'mixed',
        description: `Automates phased rollouts with ring-based checks and rollback guardrails.`,
        visibility_level: 'listed',
        workflow: 'draft'
      },
      relations: {
        vendor: '@vendors:bluepeak-infra'
      }
    },
    {
      slug: 'bluepeak-ransomware-resilience-hardening',
      data: {
        name: 'BluePeak Ransomware Resilience Hardening',
        short_description: `Resilience hardening blueprint for ransomware-aware detection and recovery readiness.`,
        solution_type: 'security',
        integration_patterns: 'proxy',
        licensing_model: 'private',
        description: `Combines hardening controls, rapid containment patterns, and restore validation routines.`,
        visibility_level: 'listed',
        workflow: 'draft'
      },
      relations: {
        vendor: '@vendors:bluepeak-infra'
      }
    },
    {
      slug: 'bluepeak-capacity-drift-management',
      data: {
        name: 'BluePeak Capacity Drift Management',
        short_description: `Capacity drift management with forecast deltas and remediation guidance.`,
        solution_type: 'monitoring',
        integration_patterns: 'api',
        licensing_model: 'mixed',
        description: `Tracks capacity drift against policy baselines and drives corrective planning actions.`,
        visibility_level: 'listed',
        workflow: 'draft'
      },
      relations: {
        vendor: '@vendors:bluepeak-infra'
      }
    },
    {
      slug: 'quantis-capacity-intelligence',
      data: {
        name: 'Quantis Capacity Intelligence',
        short_description: `Capacity modeling and predictive trend analysis for virtualization workloads.`,
        solution_type: 'monitoring',
        integration_patterns: 'api',
        licensing_model: 'oss',
        description: `Builds trend models and confidence metrics for capacity planning decisions.`,
        visibility_level: 'listed',
        workflow: 'draft'
      },
      relations: {
        vendor: '@vendors:quantis-analytics'
      }
    },
    {
      slug: 'redoak-control-evidence-pipeline',
      data: {
        name: 'RedOak Control Evidence Pipeline',
        short_description: `Evidence pipeline for policy controls and audit readiness.`,
        solution_type: 'security',
        integration_patterns: 'plugin',
        licensing_model: 'private',
        description: `Automates evidence gathering and exception tracking for operational controls.`,
        visibility_level: 'listed',
        workflow: 'draft'
      },
      relations: {
        vendor: '@vendors:redoak-governance'
      }
    },
    {
      slug: 'horizon-cluster-orchestration',
      data: {
        name: 'Horizon Cluster Orchestration',
        short_description: `Cluster orchestration workflow for repeatable topology and lifecycle management.`,
        solution_type: 'cloud_integration',
        integration_patterns: 'plugin',
        licensing_model: 'mixed',
        description: `Coordinates cluster bootstrap, policy rollout, and lifecycle updates across multiple sites.`,
        visibility_level: 'promoted',
        workflow: 'draft'
      },
      relations: {
        vendor: '@vendors:horizon-orchestrator'
      }
    },
    {
      slug: 'horizon-change-wave-manager',
      data: {
        name: 'Horizon Change Wave Manager',
        short_description: `Staged change execution model with validation gates for platform rollouts.`,
        solution_type: 'compute',
        integration_patterns: 'api',
        licensing_model: 'mixed',
        description: `Defines ring-based rollout waves and rollback criteria for high-impact platform changes.`,
        visibility_level: 'listed',
        workflow: 'draft'
      },
      relations: {
        vendor: '@vendors:horizon-orchestrator'
      }
    },
    {
      slug: 'medisphere-clinical-platform-resilience',
      data: {
        name: 'MediSphere Clinical Platform Resilience',
        short_description: `Clinical platform resilience model for strict uptime and controlled recovery.`,
        solution_type: 'backup',
        integration_patterns: 'agent',
        licensing_model: 'mixed',
        description: `Provides healthcare-specific recovery playbooks and operational continuity checkpoints.`,
        visibility_level: 'listed',
        workflow: 'draft'
      },
      relations: {
        vendor: '@vendors:medisphere-platforms'
      }
    },
    {
      slug: 'vertex-policy-remediation-automation',
      data: {
        name: 'Vertex Policy Remediation Automation',
        short_description: `Policy drift detection and automated remediation workflow for platform controls.`,
        solution_type: 'security',
        integration_patterns: 'agent',
        licensing_model: 'mixed',
        description: `Automates remediation actions when policy drift is detected in platform environments.`,
        visibility_level: 'promoted',
        workflow: 'draft'
      },
      relations: {
        vendor: '@vendors:vertex-automation'
      }
    },
    {
      slug: 'vertex-release-gates-automation',
      data: {
        name: 'Vertex Release Gates Automation',
        short_description: `Automation for release gates and rollback checkpoints across clusters.`,
        solution_type: 'cloud_integration',
        integration_patterns: 'plugin',
        licensing_model: 'mixed',
        description: `Implements automated release gates for safer multi-cluster platform updates.`,
        visibility_level: 'listed',
        workflow: 'draft'
      },
      relations: {
        vendor: '@vendors:vertex-automation'
      }
    },
    {
      slug: 'amberlane-tiered-retention-ops',
      data: {
        name: 'Amberlane Tiered Retention Ops',
        short_description: `Retention operations pattern across hot, warm, and archive data tiers.`,
        solution_type: 'storage',
        integration_patterns: 'plugin',
        licensing_model: 'private',
        description: `Helps teams define retention classes and enforce lifecycle transitions across storage tiers.`,
        visibility_level: 'listed',
        workflow: 'draft'
      },
      relations: {
        vendor: '@vendors:amberlane-storage'
      }
    },
    {
      slug: 'cobalt-zone-segmentation',
      data: {
        name: 'Cobalt Zone Segmentation',
        short_description: `Zone-based segmentation policy for controlled east-west workload traffic.`,
        solution_type: 'networking',
        integration_patterns: 'cni',
        licensing_model: 'mixed',
        description: `Defines segmentation zone boundaries and policy inheritance models for network governance.`,
        visibility_level: 'hidden',
        workflow: 'draft'
      },
      relations: {
        vendor: '@vendors:cobalt-fabric'
      }
    },
    {
      slug: 'deltaforge-alert-triage',
      data: {
        name: 'DeltaForge Alert Triage',
        short_description: `Alert triage flow design for noisy security and platform telemetry pipelines.`,
        solution_type: 'security',
        integration_patterns: 'api',
        licensing_model: 'mixed',
        description: `Prioritizes alerts and routes triage actions through standardized ownership workflows.`,
        visibility_level: 'hidden',
        workflow: 'draft'
      },
      relations: {
        vendor: '@vendors:deltaforge-secops'
      }
    },
    {
      slug: 'emberstack-enterprise-app-modernization',
      data: {
        name: 'EmberStack Enterprise App Modernization',
        short_description: `Enterprise app modernization workflow for phased migration to cloud platforms.`,
        solution_type: 'compute',
        integration_patterns: 'plugin',
        licensing_model: 'mixed',
        description: `Supports phased migration and stabilization of enterprise apps in private cloud estates.`,
        visibility_level: 'listed',
        workflow: 'draft'
      },
      relations: {
        vendor: '@vendors:emberstack-apps'
      }
    },
    {
      slug: 'frostbyte-telemetry-normalization',
      data: {
        name: 'Frostbyte Telemetry Normalization',
        short_description: `Telemetry normalization pattern for consistent observability and reporting.`,
        solution_type: 'monitoring',
        integration_patterns: 'api',
        licensing_model: 'oss',
        description: `Normalizes telemetry labels and retention patterns to improve reporting reliability.`,
        visibility_level: 'listed',
        workflow: 'draft'
      },
      relations: {
        vendor: '@vendors:frostbyte-observability'
      }
    },
    {
      slug: 'granitebridge-cloud-migration-readiness',
      data: {
        name: 'GraniteBridge Cloud Migration Readiness',
        short_description: `Migration readiness checks and phased cutover guardrails for cloud programs.`,
        solution_type: 'cloud_integration',
        integration_patterns: 'plugin',
        licensing_model: 'mixed',
        description: `Applies readiness scoring and validation criteria to reduce migration execution risk.`,
        visibility_level: 'listed',
        workflow: 'draft'
      },
      relations: {
        vendor: '@vendors:granitebridge-cloud'
      }
    },
    {
      slug: 'northbridge-cross-site-failover-assurance',
      data: {
        name: 'Northbridge Cross-Site Failover Assurance',
        short_description: `Runbook-driven failover assurance with repeatable validation cycles for multi-site VMS estates.`,
        solution_type: 'backup',
        integration_patterns: 'agent',
        licensing_model: 'mixed',
        description: `Standardizes failover preparation, rehearsal, and evidence collection for cross-site continuity programs.`,
        visibility_level: 'listed',
        workflow: 'draft'
      },
      relations: {
        vendor: '@vendors:northbridge-cloud'
      }
    },
    {
      slug: 'altura-finops-anomaly-guardrails',
      data: {
        name: 'Altura FinOps Anomaly Guardrails',
        short_description: `Anomaly-aware spend and utilization guardrails for continuous infrastructure optimization.`,
        solution_type: 'monitoring',
        integration_patterns: 'api',
        licensing_model: 'mixed',
        description: `Applies anomaly scoring and policy thresholds to drive FinOps actions with operational context.`,
        visibility_level: 'listed',
        workflow: 'draft'
      },
      relations: {
        vendor: '@vendors:altura-systems'
      }
    },
    {
      slug: 'cloudbridge-wave-cutover-governance',
      data: {
        name: 'CloudBridge Wave Cutover Governance',
        short_description: `Wave-based cutover governance framework for large platform migration programs.`,
        solution_type: 'cloud_integration',
        integration_patterns: 'plugin',
        licensing_model: 'private',
        description: `Defines phased migration governance, go/no-go checks, and rollback boundaries across modernization waves.`,
        visibility_level: 'listed',
        workflow: 'draft'
      },
      relations: {
        vendor: '@vendors:cloudbridge-systems'
      }
    },
    {
      slug: 'securegrid-tenant-audit-fabric',
      data: {
        name: 'SecureGrid Tenant Audit Fabric',
        short_description: `Tenant-level control evidence and audit trail pipeline for regulated virtual environments.`,
        solution_type: 'security',
        integration_patterns: 'proxy',
        licensing_model: 'private',
        description: `Builds continuous control evidence and tenant audit timelines aligned with compliance reporting needs.`,
        visibility_level: 'listed',
        workflow: 'draft'
      },
      relations: {
        vendor: '@vendors:securegrid-labs'
      }
    },
    {
      slug: 'aerolith-density-capacity-balancer',
      data: {
        name: 'Aerolith Density Capacity Balancer',
        short_description: `Host density balancing model to improve compute utilization without breaching performance SLOs.`,
        solution_type: 'compute',
        integration_patterns: 'agent',
        licensing_model: 'mixed',
        description: `Combines placement heuristics and contention thresholds to sustain high-density operations safely.`,
        visibility_level: 'listed',
        workflow: 'draft'
      },
      relations: {
        vendor: '@vendors:aerolith-compute'
      }
    },
    {
      slug: 'storagrid-hot-warm-cold-governance',
      data: {
        name: 'Storagrid Hot-Warm-Cold Governance',
        short_description: `Tier governance model for hot/warm/cold storage transitions with explicit retention controls.`,
        solution_type: 'storage',
        integration_patterns: 'plugin',
        licensing_model: 'mixed',
        description: `Defines tier migration guardrails, policy ownership, and quality checks for lifecycle automation.`,
        visibility_level: 'listed',
        workflow: 'draft'
      },
      relations: {
        vendor: '@vendors:storagrid-cloud'
      }
    },
    {
      slug: 'horizon-release-ring-automation',
      data: {
        name: 'Horizon Release Ring Automation',
        short_description: `Release ring orchestration pattern for safe progressive rollout across distributed clusters.`,
        solution_type: 'networking',
        integration_patterns: 'api',
        licensing_model: 'mixed',
        description: `Automates release promotion, canary checks, and rollback triggers through ring-based execution flows.`,
        visibility_level: 'listed',
        workflow: 'draft'
      },
      relations: {
        vendor: '@vendors:horizon-orchestrator'
      }
    },
    {
      slug: 'vertex-remediation-slo-controller',
      data: {
        name: 'Vertex Remediation SLO Controller',
        short_description: `Policy drift remediation controller with SLO-aware prioritization and escalation rules.`,
        solution_type: 'security',
        integration_patterns: 'agent',
        licensing_model: 'mixed',
        description: `Prioritizes and orchestrates policy remediation actions based on risk impact and operational SLOs.`,
        visibility_level: 'listed',
        workflow: 'draft'
      },
      relations: {
        vendor: '@vendors:vertex-automation'
      }
    }
  ],

  'solution-guides': [
    {
      slug: 'guide-private-cloud-landing-zone',
      data: {
        title: 'Private Cloud Landing Zone with Vates VMS',
        workflow: 'draft',
        summary: `Deploy a production-ready **private cloud landing zone** with Vates VMS.

This guide provides a practical path from first cluster to day-2 operations, including security and rollout sequencing.`,
        body: `## Intended audience
- Infrastructure and platform teams building or modernizing a private cloud
- Architects defining standards for networking, identity, and operations

## What you will build
- A baseline landing zone for Vates VMS, aligned with operational standards
- A secure-by-default foundation you can replicate across sites

## Architecture outline
1. **Foundation**: sizing, roles, and cluster layout
2. **Connectivity**: network segmentation and management access
3. **Security controls**: identity, policies, and audit readiness
4. **Operations**: backup, DR readiness, monitoring, and change control

## Rollout sequencing
- Start with a pilot cluster and a limited workload set
- Validate security posture and runbooks
- Expand in waves with acceptance criteria per phase

## Day-2 checklist
- Patch and upgrade procedure
- Drift detection and configuration baselines
- Incident response and recovery drills cadence`
      },
      relations: {
        solutions: [
          '@solutions:hybrid-dr-for-vms',
          '@solutions:secure-multi-tenant-hosting',
          '@solutions:vms-modernization-factory'
        ],
        products: ['@products:vates-vms', '@products:xcp-ng', '@products:xen-orchestra']
      }
    },
    {
      slug: 'guide-observability-and-optimization',
      data: {
        title: 'Observability and Optimization Playbook',
        workflow: 'draft',
        summary: `Operations playbook for **performance, utilization, and cost control**.

Defines KPIs, governance checks, and review cadences so optimization becomes a repeatable habit, not an occasional project.`,
        body: `## Intended audience
- Platform and operations teams running virtual infrastructure at scale
- Stakeholders who need consistent reporting (IT management, finance, service owners)

## Operating principles
- **Measure first**: establish a stable telemetry baseline
- **Decide with context**: combine technical signals with workload criticality
- **Govern continuously**: adopt a cadence and track follow-through

## Core building blocks
### 1) Telemetry baseline
- Metric sources, normalization, and retention
- Tagging model and ownership for labels
- Validation checks for completeness and stability

### 2) KPIs and alerting patterns
- Capacity headroom, saturation, and noisy-neighbor indicators
- Exception-based alerting (avoid alert fatigue)
- Escalation paths and runbooks

### 3) Optimization cadence
- Weekly triage for urgent risks
- Monthly rightsizing review with approvals
- Quarterly capacity forecast refresh

### 4) Reporting
- Executive summary: trends and top risks
- Platform detail: actionable backlog and remediation owners
- Audit trail: decisions, exceptions, and outcomes`
      },
      relations: {
        solutions: [
          '@solutions:capacity-rightsizing-intelligence',
          '@solutions:observability-and-cost-governance'
        ],
        products: ['@products:easyvirt-dc-scope', '@products:easyvirt-dc-netscope', '@products:xen-orchestra']
      }
    },
    {
      slug: 'guide-elastic-compute-operations',
      data: {
        title: 'Elastic Compute Operations Guide',
        workflow: 'draft',
        summary: `Operational guide for adaptive placement, balancing, and contention control in compute-focused clusters.`,
        body: `Defines placement policy design, host pressure indicators, rebalance triggers, and validation checkpoints for sustained compute performance.`
      },
      relations: {
        solutions: [
          '@solutions:elastic-compute-placement',
          '@solutions:observability-and-cost-governance'
        ],
        products: ['@products:xcp-ng', '@products:xen-orchestra']
      }
    },
    {
      slug: 'guide-storage-tier-governance',
      data: {
        title: 'Storage Tier Governance Guide',
        workflow: 'draft',
        summary: `Guide for lifecycle policy governance across performance and archive storage tiers.`,
        body: `Covers policy modeling, data movement guardrails, exception handling, and operational review cadences for storage tier automation.`
      },
      relations: {
        solutions: [
          '@solutions:cross-tier-storage-orchestration',
          '@solutions:ransomware-dr-hardening'
        ],
        products: ['@products:xostore', '@products:vates-vms']
      }
    },
    {
      slug: 'guide-cloud-policy-operations',
      data: {
        title: 'Cloud Policy Operations Guide',
        workflow: 'draft',
        summary: `Guide to apply and sustain policy-driven platform operations across multiple cloud sites.`,
        body: `Covers policy model design, staged rollout, rollback criteria, and evidence collection for ongoing governance.`
      },
      relations: {
        solutions: [
          '@solutions:policy-compliant-cloud-operations',
          '@solutions:policy-automation-fabric',
          '@solutions:compliance-baseline-orchestrator'
        ],
        products: ['@products:vates-vms', '@products:xcp-ng', '@products:xen-orchestra']
      }
    },
    {
      slug: 'guide-healthcare-continuity-operations',
      data: {
        title: 'Healthcare Continuity Operations Guide',
        workflow: 'draft',
        summary: `Operations guide for healthcare continuity scenarios with strict uptime and recovery constraints.`,
        body: `Details continuity priorities, escalation pathways, and validation checkpoints for healthcare platform teams.`
      },
      relations: {
        solutions: [
          '@solutions:clinical-workload-continuity',
          '@solutions:ransomware-dr-hardening'
        ],
        products: ['@products:vates-vms', '@products:xoproxy']
      }
    },
    {
      slug: 'guide-platform-release-governance',
      data: {
        title: 'Platform Release Governance Guide',
        workflow: 'draft',
        summary: `Guide for release governance and phased change execution across multi-cluster platform estates.`,
        body: `Defines rollout rings, validation gates, rollback triggers, and communications patterns for platform releases.`
      },
      relations: {
        solutions: [
          '@solutions:multi-cluster-release-orchestrator',
          '@solutions:multi-site-platform-blueprint'
        ],
        products: ['@products:xcp-ng', '@products:xen-orchestra']
      }
    },
    {
      slug: 'guide-bluepeak-continuity-operations',
      data: {
        title: 'BluePeak Continuity Operations Guide',
        workflow: 'draft',
        summary: `Guide for hybrid continuity operations with repeatable drills and service ownership.`,
        body: `Covers continuity priorities, drill execution, handoff patterns, and post-drill improvement loops.`
      },
      relations: {
        solutions: ['@solutions:bluepeak-hybrid-continuity', '@solutions:bluepeak-platform-observability'],
        products: ['@products:vates-vms', '@products:xen-orchestra']
      }
    },
    {
      slug: 'guide-bluepeak-backup-assurance',
      data: {
        title: 'BluePeak Backup Assurance Guide',
        workflow: 'draft',
        summary: `Guide for backup policy governance and recurring restore validation.`,
        body: `Defines backup control baselines, recovery drill cadence, and evidence capture checkpoints.`
      },
      relations: {
        solutions: ['@solutions:bluepeak-policy-driven-backup-assurance', '@solutions:bluepeak-hybrid-continuity'],
        products: ['@products:vates-vms', '@products:xen-orchestra']
      }
    },
    {
      slug: 'guide-bluepeak-placement-control',
      data: {
        title: 'BluePeak Placement Control Guide',
        workflow: 'draft',
        summary: `Guide for zone-aware workload placement and balance operations.`,
        body: `Covers placement constraints, rebalance triggers, and exception handling for distributed clusters.`
      },
      relations: {
        solutions: ['@solutions:bluepeak-multi-zone-placement-control'],
        products: ['@products:xcp-ng', '@products:vates-vms']
      }
    },
    {
      slug: 'guide-bluepeak-tier-compliance',
      data: {
        title: 'BluePeak Tier Compliance Guide',
        workflow: 'draft',
        summary: `Guide for storage tier compliance checks and retention policy governance.`,
        body: `Details tier policy controls, ownership boundaries, and periodic compliance review loops.`
      },
      relations: {
        solutions: ['@solutions:bluepeak-storage-tier-compliance'],
        products: ['@products:xostore', '@products:vates-vms']
      }
    },
    {
      slug: 'guide-bluepeak-segmentation-ops',
      data: {
        title: 'BluePeak Segmentation Operations Guide',
        workflow: 'draft',
        summary: `Guide for network segmentation operations and policy validation.`,
        body: `Explains segmentation policy rollouts, drift checks, and controlled exception workflows.`
      },
      relations: {
        solutions: ['@solutions:bluepeak-network-segmentation-ops'],
        products: ['@products:xoproxy', '@products:xcp-ng']
      }
    },
    {
      slug: 'guide-bluepeak-release-waves',
      data: {
        title: 'BluePeak Release Waves Guide',
        workflow: 'draft',
        summary: `Guide for ring-based release wave orchestration and rollback discipline.`,
        body: `Defines release gates, ring progression criteria, and rollback triggers for safe changes.`
      },
      relations: {
        solutions: ['@solutions:bluepeak-release-wave-orchestration'],
        products: ['@products:xcp-ng', '@products:xen-orchestra']
      }
    },
    {
      slug: 'guide-bluepeak-ransomware-hardening',
      data: {
        title: 'BluePeak Ransomware Hardening Guide',
        workflow: 'draft',
        summary: `Guide for resilience hardening and ransomware-aware recovery preparation.`,
        body: `Covers containment controls, restore priorities, and incident runbook rehearsal patterns.`
      },
      relations: {
        solutions: ['@solutions:bluepeak-ransomware-resilience-hardening'],
        products: ['@products:vates-vms', '@products:xoproxy']
      }
    },
    {
      slug: 'guide-bluepeak-capacity-drift',
      data: {
        title: 'BluePeak Capacity Drift Guide',
        workflow: 'draft',
        summary: `Guide for capacity drift monitoring and governance remediation workflows.`,
        body: `Defines drift thresholds, review cadence, and cross-team action ownership for capacity planning.`
      },
      relations: {
        solutions: ['@solutions:bluepeak-capacity-drift-management', '@solutions:bluepeak-platform-observability'],
        products: ['@products:easyvirt-dc-scope', '@products:easyvirt-dc-netscope']
      }
    },
    {
      slug: 'guide-horizon-cluster-governance',
      data: {
        title: 'Horizon Cluster Governance Guide',
        workflow: 'draft',
        summary: `Guide for cluster lifecycle governance and staged change execution.`,
        body: `Defines multi-cluster lifecycle stages, validation criteria, and rollback boundaries.`
      },
      relations: {
        solutions: ['@solutions:horizon-cluster-orchestration', '@solutions:horizon-change-wave-manager'],
        products: ['@products:xcp-ng', '@products:vates-vms']
      }
    },
    {
      slug: 'guide-vertex-automation-ops',
      data: {
        title: 'Vertex Automation Operations Guide',
        workflow: 'draft',
        summary: `Guide for policy remediation and release gate automation across platform estates.`,
        body: `Covers drift remediation patterns, release gate logic, and operational exception handling.`
      },
      relations: {
        solutions: [
          '@solutions:vertex-policy-remediation-automation',
          '@solutions:vertex-release-gates-automation'
        ],
        products: ['@products:xoproxy', '@products:xen-orchestra']
      }
    },
    {
      slug: 'guide-northbridge-failover-assurance',
      data: {
        title: 'Northbridge Failover Assurance Guide',
        workflow: 'draft',
        summary: `Guide for recurring failover rehearsals, recovery evidence, and continuity ownership alignment.`,
        body: `Defines quarterly rehearsal cadence, evidence artifacts, and recovery accountability patterns.`
      },
      relations: {
        solutions: ['@solutions:northbridge-cross-site-failover-assurance', '@solutions:hybrid-dr-for-vms'],
        products: ['@products:vates-vms', '@products:xcp-ng']
      }
    },
    {
      slug: 'guide-altura-finops-guardrails',
      data: {
        title: 'Altura FinOps Guardrails Guide',
        workflow: 'draft',
        summary: `Guide for anomaly-driven optimization, capacity guardrails, and review cadences.`,
        body: `Covers anomaly triage flows, governance thresholds, and stakeholder review loops.`
      },
      relations: {
        solutions: ['@solutions:altura-finops-anomaly-guardrails', '@solutions:capacity-rightsizing-intelligence'],
        products: ['@products:easyvirt-dc-scope', '@products:easyvirt-dc-netscope']
      }
    },
    {
      slug: 'guide-cloudbridge-cutover-waves',
      data: {
        title: 'CloudBridge Cutover Waves Guide',
        workflow: 'draft',
        summary: `Guide for phased cutover execution and rollback governance across migration waves.`,
        body: `Describes wave qualification, go/no-go criteria, and rollback decision checkpoints.`
      },
      relations: {
        solutions: ['@solutions:cloudbridge-wave-cutover-governance', '@solutions:vms-modernization-factory'],
        products: ['@products:vates-vms', '@products:xen-orchestra']
      }
    },
    {
      slug: 'guide-securegrid-tenant-audit-ops',
      data: {
        title: 'SecureGrid Tenant Audit Operations Guide',
        workflow: 'draft',
        summary: `Guide for control evidence pipelines and tenant audit readiness operations.`,
        body: `Explains evidence lifecycle, control mappings, and remediation feedback loops for regulated workloads.`
      },
      relations: {
        solutions: ['@solutions:securegrid-tenant-audit-fabric', '@solutions:secure-multi-tenant-hosting'],
        products: ['@products:xoproxy', '@products:vates-vms']
      }
    },
    {
      slug: 'guide-aerolith-density-balance',
      data: {
        title: 'Aerolith Density Balance Guide',
        workflow: 'draft',
        summary: `Guide for balancing host density and performance stability in compute-heavy estates.`,
        body: `Defines contention thresholds, rebalance triggers, and sustained performance checkpoints.`
      },
      relations: {
        solutions: ['@solutions:aerolith-density-capacity-balancer', '@solutions:elastic-compute-placement'],
        products: ['@products:xcp-ng', '@products:xen-orchestra']
      }
    },
    {
      slug: 'guide-storagrid-tier-governance-plus',
      data: {
        title: 'Storagrid Tier Governance Plus',
        workflow: 'draft',
        summary: `Guide for advanced tier lifecycle governance and retention exception handling.`,
        body: `Details policy segmentation, exception queues, and recovery SLAs for tiered storage models.`
      },
      relations: {
        solutions: ['@solutions:storagrid-hot-warm-cold-governance', '@solutions:cross-tier-storage-orchestration'],
        products: ['@products:xostore', '@products:vates-vms']
      }
    },
    {
      slug: 'guide-horizon-release-rings',
      data: {
        title: 'Horizon Release Rings Guide',
        workflow: 'draft',
        summary: `Guide for ring-based rollout governance and operational change safety controls.`,
        body: `Covers ring topology design, readiness checks, and rollback behavior under live traffic.`
      },
      relations: {
        solutions: ['@solutions:horizon-release-ring-automation', '@solutions:horizon-change-wave-manager'],
        products: ['@products:xcp-ng', '@products:vates-vms']
      }
    },
    {
      slug: 'guide-vertex-remediation-slo',
      data: {
        title: 'Vertex Remediation SLO Guide',
        workflow: 'draft',
        summary: `Guide for SLO-prioritized remediation queues and policy drift escalation.`,
        body: `Defines remediation service levels, ownership models, and exception controls for policy automation.`
      },
      relations: {
        solutions: ['@solutions:vertex-remediation-slo-controller', '@solutions:vertex-policy-remediation-automation'],
        products: ['@products:xoproxy', '@products:xen-orchestra']
      }
    }
  ],

  'solution-briefs': [
    {
      slug: 'brief-dr-readiness',
      data: {
        title: 'Disaster Recovery Readiness Brief',
        workflow: 'draft',
        short_description: `**Quick reference** for DR architecture choices, target RPO/RTO, and operational readiness checks.`,
        description: `Use this brief to align stakeholders on the minimum DR design and operating model.

## Covers
- DR design priorities (workload segmentation, data protection options)
- Target **RPO/RTO** and what materially influences them
- Roles and responsibilities for drills, approvals, and evidence

## Outputs
- A clear checklist to validate readiness
- A shared language for risk tradeoffs and constraints`,
        integration_type: 'backup_proxy',
        supported_capabilities: 'replication',
        requirements: 'Two sites and network connectivity between clusters.',
        limitations: 'Bandwidth and latency constraints impact RPO/RTO.'
      },
      relations: {
        solution: '@solutions:hybrid-dr-for-vms',
        product: '@products:vates-vms'
      }
    },
    {
      slug: 'brief-optimization-governance',
      data: {
        title: 'Optimization Governance Brief',
        workflow: 'draft',
        short_description: `**Governance starter** for utilization and cost control, defining telemetry rules, review cadence, and reporting expectations.`,
        description: `Operational brief to implement a sustainable optimization loop.

## Covers
- Telemetry governance: baselines, labels, retention, data quality checks
- Optimization cadences and stakeholder touchpoints
- Reporting structure from technical backlog to executive trends

## Outputs
- A repeatable monthly review format
- Clear ownership for action items and exception handling`,
        integration_type: 'api',
        supported_capabilities: 'monitoring',
        requirements: 'Access to host and VM metrics, plus business tagging model.',
        limitations: 'Forecast confidence grows with historical data quality.'
      },
      relations: {
        solution: '@solutions:capacity-rightsizing-intelligence',
        product: '@products:easyvirt-dc-scope'
      }
    },
    {
      slug: 'brief-multi-tenant-security',
      data: {
        title: 'Multi-Tenant Security Brief',
        workflow: 'draft',
        short_description: `**Security brief** focused on segmentation, baseline hardening, and audit checkpoints for multi-tenant hosting.`,
        description: `Security brief to standardize isolation and governance across tenants.

## Covers
- Tenant zone segmentation and policy boundaries
- Baseline hardening and drift detection
- Audit checkpoints and evidence collection practices

## Outputs
- A control checklist you can reuse per tenant
- Guidance for scaling operations without losing security posture`,
        integration_type: 'plugin',
        supported_capabilities: 'hardening',
        requirements: 'Defined tenant zones and centralized identity controls.',
        limitations: 'Operational complexity increases with tenant count.'
      },
      relations: {
        solution: '@solutions:secure-multi-tenant-hosting',
        product: '@products:xoproxy'
      }
    },
    {
      slug: 'brief-elastic-compute-placement',
      data: {
        title: 'Elastic Compute Placement Brief',
        workflow: 'draft',
        short_description: `Brief for compute placement policy, balancing triggers, and performance guardrails.`,
        description: `Outlines practical controls for adaptive placement and ongoing compute balance in virtual clusters.`,
        integration_type: 'api',
        supported_capabilities: 'monitoring',
        requirements: 'Host telemetry, placement policy definitions, and maintenance windows.',
        limitations: 'Rebalance effectiveness depends on workload affinity constraints.'
      },
      relations: {
        solution: '@solutions:elastic-compute-placement',
        product: '@products:xcp-ng'
      }
    },
    {
      slug: 'brief-storage-tier-orchestration',
      data: {
        title: 'Storage Tier Orchestration Brief',
        workflow: 'draft',
        short_description: `Brief for lifecycle policy orchestration across storage tiers.`,
        description: `Defines controls and checkpoints for automated tiering with predictable retrieval and retention behavior.`,
        integration_type: 'plugin',
        supported_capabilities: 'snapshots',
        requirements: 'Tier definitions, policy ownership, and retrieval SLA targets.',
        limitations: 'Cold tier recall latency must be communicated to workload owners.'
      },
      relations: {
        solution: '@solutions:cross-tier-storage-orchestration',
        product: '@products:xostore'
      }
    },
    {
      slug: 'brief-cloud-policy-ops',
      data: {
        title: 'Cloud Policy Operations Brief',
        workflow: 'draft',
        short_description: `Brief for policy rollout and operational governance in private cloud environments.`,
        description: `Summarizes controls and checkpoints required to sustain policy-compliant platform operations.`,
        integration_type: 'api',
        supported_capabilities: 'hardening',
        requirements: 'Defined policy owners and change-control process.',
        limitations: 'Policy drift risk increases without regular review cadence.'
      },
      relations: {
        solution: '@solutions:policy-compliant-cloud-operations',
        product: '@products:vates-vms'
      }
    },
    {
      slug: 'brief-reliability-runbook-automation',
      data: {
        title: 'Reliability Runbook Automation Brief',
        workflow: 'draft',
        short_description: `Brief for automating reliability runbooks and drill validation workflows.`,
        description: `Defines automation scope, evidence capture, and ownership boundaries for runbook execution.`,
        integration_type: 'plugin',
        supported_capabilities: 'alerting',
        requirements: 'Runbook catalog and on-call ownership matrix.',
        limitations: 'Automation quality depends on runbook maturity.'
      },
      relations: {
        solution: '@solutions:sre-runbook-automation',
        product: '@products:xen-orchestra'
      }
    },
    {
      slug: 'brief-governance-baseline',
      data: {
        title: 'Governance Baseline Brief',
        workflow: 'draft',
        short_description: `Brief for baseline governance controls in regulated virtualized environments.`,
        description: `Outlines baseline control domains and practical implementation sequencing.`,
        integration_type: 'agent',
        supported_capabilities: 'hardening',
        requirements: 'Audit control framework and documented platform standards.',
        limitations: 'Control coverage still requires periodic manual validation.'
      },
      relations: {
        solution: '@solutions:compliance-baseline-orchestrator',
        product: '@products:xoproxy'
      }
    },
    {
      slug: 'brief-clinical-workload-continuity',
      data: {
        title: 'Clinical Workload Continuity Brief',
        workflow: 'draft',
        short_description: `Brief for continuity planning and recovery readiness in clinical environments.`,
        description: `Provides continuity priorities and runbook checkpoints for critical clinical services.`,
        integration_type: 'backup_proxy',
        supported_capabilities: 'restore',
        requirements: 'Service criticality matrix and validated failover paths.',
        limitations: 'Coordination with clinical teams is required during drills.'
      },
      relations: {
        solution: '@solutions:clinical-workload-continuity',
        product: '@products:vates-vms'
      }
    },
    {
      slug: 'brief-bluepeak-hybrid-continuity',
      data: {
        title: 'BluePeak Hybrid Continuity Brief',
        workflow: 'draft',
        short_description: `Brief for hybrid continuity guardrails and recovery responsibility mapping.`,
        description: `Summarizes continuity controls, drill cadence, and accountability boundaries for operations teams.`,
        integration_type: 'backup_proxy',
        supported_capabilities: 'replication',
        requirements: 'Defined service tiers and RPO/RTO priorities.',
        limitations: 'Cross-site bandwidth constraints can limit target RPO.'
      },
      relations: {
        solution: '@solutions:bluepeak-hybrid-continuity',
        product: '@products:vates-vms'
      }
    },
    {
      slug: 'brief-bluepeak-backup-assurance',
      data: {
        title: 'BluePeak Backup Assurance Brief',
        workflow: 'draft',
        short_description: `Brief for backup policy assurance and recurring recovery validation.`,
        description: `Summarizes backup governance controls, restore testing expectations, and ownership handoffs.`,
        integration_type: 'backup_proxy',
        supported_capabilities: 'backup',
        requirements: 'Backup policy ownership, retention matrix, and drill windows.',
        limitations: 'Restore validation frequency depends on maintenance windows.'
      },
      relations: {
        solution: '@solutions:bluepeak-policy-driven-backup-assurance',
        product: '@products:vates-vms'
      }
    },
    {
      slug: 'brief-bluepeak-placement-control',
      data: {
        title: 'BluePeak Placement Control Brief',
        workflow: 'draft',
        short_description: `Brief for zone-aware placement policy and rebalance controls.`,
        description: `Defines placement criteria, rebalance safety checks, and exception workflows.`,
        integration_type: 'driver',
        supported_capabilities: 'monitoring',
        requirements: 'Placement policy matrix and host telemetry.',
        limitations: 'Constraint-heavy workloads reduce rebalance flexibility.'
      },
      relations: {
        solution: '@solutions:bluepeak-multi-zone-placement-control',
        product: '@products:xcp-ng'
      }
    },
    {
      slug: 'brief-bluepeak-tier-compliance',
      data: {
        title: 'BluePeak Tier Compliance Brief',
        workflow: 'draft',
        short_description: `Brief for storage tier compliance and lifecycle policy governance.`,
        description: `Outlines policy boundaries, compliance checks, and retrieval exception controls.`,
        integration_type: 'plugin',
        supported_capabilities: 'snapshots',
        requirements: 'Tier lifecycle catalog and retention rules.',
        limitations: 'Recall-heavy workloads may need bespoke policy classes.'
      },
      relations: {
        solution: '@solutions:bluepeak-storage-tier-compliance',
        product: '@products:xostore'
      }
    },
    {
      slug: 'brief-bluepeak-segmentation-ops',
      data: {
        title: 'BluePeak Segmentation Ops Brief',
        workflow: 'draft',
        short_description: `Brief for segmentation operations and east-west policy enforcement.`,
        description: `Summarizes segmentation guardrails, validation cadences, and change windows.`,
        integration_type: 'cni',
        supported_capabilities: 'hardening',
        requirements: 'Segmentation policy definitions and change control process.',
        limitations: 'Legacy network dependencies can require temporary exceptions.'
      },
      relations: {
        solution: '@solutions:bluepeak-network-segmentation-ops',
        product: '@products:xoproxy'
      }
    },
    {
      slug: 'brief-bluepeak-release-waves',
      data: {
        title: 'BluePeak Release Waves Brief',
        workflow: 'draft',
        short_description: `Brief for release wave governance with explicit promotion gates.`,
        description: `Defines release ring gates, rollback criteria, and communication checkpoints.`,
        integration_type: 'api',
        supported_capabilities: 'alerting',
        requirements: 'Release governance model and SLO gate metrics.',
        limitations: 'Gate tuning is needed to avoid unnecessary rollout delays.'
      },
      relations: {
        solution: '@solutions:bluepeak-release-wave-orchestration',
        product: '@products:xen-orchestra'
      }
    },
    {
      slug: 'brief-bluepeak-ransomware-hardening',
      data: {
        title: 'BluePeak Ransomware Hardening Brief',
        workflow: 'draft',
        short_description: `Brief for ransomware resilience hardening and fast recovery preparedness.`,
        description: `Summarizes containment controls, backup isolation, and verified restore practices.`,
        integration_type: 'agent',
        supported_capabilities: 'restore',
        requirements: 'Incident runbook ownership and hardened backup targets.',
        limitations: 'Recovery speed depends on data locality and retention architecture.'
      },
      relations: {
        solution: '@solutions:bluepeak-ransomware-resilience-hardening',
        product: '@products:vates-vms'
      }
    },
    {
      slug: 'brief-bluepeak-capacity-drift',
      data: {
        title: 'BluePeak Capacity Drift Brief',
        workflow: 'draft',
        short_description: `Brief for capacity drift detection and remediation planning controls.`,
        description: `Outlines drift baselines, review cadence, and optimization backlog ownership.`,
        integration_type: 'api',
        supported_capabilities: 'monitoring',
        requirements: 'Capacity baseline model and forecasting inputs.',
        limitations: 'Forecast confidence improves as telemetry history matures.'
      },
      relations: {
        solution: '@solutions:bluepeak-capacity-drift-management',
        product: '@products:easyvirt-dc-scope'
      }
    },
    {
      slug: 'brief-quantis-capacity-intelligence',
      data: {
        title: 'Quantis Capacity Intelligence Brief',
        workflow: 'draft',
        short_description: `Brief for telemetry-backed capacity planning and anomaly-led optimization.`,
        description: `Outlines data quality requirements and review cadence for predictive capacity decisions.`,
        integration_type: 'api',
        supported_capabilities: 'monitoring',
        requirements: 'Telemetry sources and ownership labels across clusters.',
        limitations: 'Forecast confidence depends on data stability over time.'
      },
      relations: {
        solution: '@solutions:quantis-capacity-intelligence',
        product: '@products:easyvirt-dc-scope'
      }
    },
    {
      slug: 'brief-horizon-change-wave-manager',
      data: {
        title: 'Horizon Change Wave Manager Brief',
        workflow: 'draft',
        short_description: `Brief for staged change waves and rollback guardrails in platform releases.`,
        description: `Defines wave criteria, promotion gates, and rollback triggers for controlled platform change.`,
        integration_type: 'plugin',
        supported_capabilities: 'alerting',
        requirements: 'Release calendar and cluster health criteria.',
        limitations: 'Wave progression requires disciplined pre-checks.'
      },
      relations: {
        solution: '@solutions:horizon-change-wave-manager',
        product: '@products:xcp-ng'
      }
    },
    {
      slug: 'brief-vertex-policy-remediation',
      data: {
        title: 'Vertex Policy Remediation Brief',
        workflow: 'draft',
        short_description: `Brief for automated policy drift detection and remediation controls.`,
        description: `Provides implementation guidance for policy drift detection and corrective action workflows.`,
        integration_type: 'agent',
        supported_capabilities: 'hardening',
        requirements: 'Policy baseline inventory and approval workflow.',
        limitations: 'False positives must be tuned during initial rollout.'
      },
      relations: {
        solution: '@solutions:vertex-policy-remediation-automation',
        product: '@products:xoproxy'
      }
    },
    {
      slug: 'brief-northbridge-failover-assurance',
      data: {
        title: 'Northbridge Failover Assurance Brief',
        workflow: 'draft',
        short_description: `Brief for repeatable failover validation and recovery ownership mapping.`,
        description: `Summarizes cross-site failover prerequisites, validation checkpoints, and evidence handoff patterns.`,
        integration_type: 'backup_proxy',
        supported_capabilities: 'restore',
        requirements: 'Cross-site connectivity, runbook owner map, and test windows.',
        limitations: 'Drill execution depends on maintenance coordination.'
      },
      relations: {
        solution: '@solutions:northbridge-cross-site-failover-assurance',
        product: '@products:vates-vms'
      }
    },
    {
      slug: 'brief-altura-finops-guardrails',
      data: {
        title: 'Altura FinOps Guardrails Brief',
        workflow: 'draft',
        short_description: `Brief for anomaly guardrails in cost and utilization governance.`,
        description: `Defines thresholds, escalation logic, and reporting checkpoints for optimization governance.`,
        integration_type: 'api',
        supported_capabilities: 'monitoring',
        requirements: 'Stable telemetry labels and ownership metadata.',
        limitations: 'False positives require baseline calibration.'
      },
      relations: {
        solution: '@solutions:altura-finops-anomaly-guardrails',
        product: '@products:easyvirt-dc-scope'
      }
    },
    {
      slug: 'brief-cloudbridge-cutover-governance',
      data: {
        title: 'CloudBridge Cutover Governance Brief',
        workflow: 'draft',
        short_description: `Brief for migration wave governance with explicit rollback boundaries.`,
        description: `Covers wave entry criteria, validation gates, and rollback orchestration controls.`,
        integration_type: 'plugin',
        supported_capabilities: 'replication',
        requirements: 'Migration wave inventory and readiness criteria.',
        limitations: 'Dependencies across waves increase rollback complexity.'
      },
      relations: {
        solution: '@solutions:cloudbridge-wave-cutover-governance',
        product: '@products:vates-vms'
      }
    },
    {
      slug: 'brief-securegrid-audit-fabric',
      data: {
        title: 'SecureGrid Audit Fabric Brief',
        workflow: 'draft',
        short_description: `Brief for tenant-level audit evidence lifecycle and compliance readiness.`,
        description: `Defines control evidence capture, retention windows, and remediation accountability.`,
        integration_type: 'agent',
        supported_capabilities: 'hardening',
        requirements: 'Control catalog and audit evidence storage policy.',
        limitations: 'Manual attestations still required for select controls.'
      },
      relations: {
        solution: '@solutions:securegrid-tenant-audit-fabric',
        product: '@products:xoproxy'
      }
    },
    {
      slug: 'brief-aerolith-density-balance',
      data: {
        title: 'Aerolith Density Balance Brief',
        workflow: 'draft',
        short_description: `Brief for density balancing and contention-aware compute placement.`,
        description: `Summarizes placement guardrails, host contention thresholds, and review cadence.`,
        integration_type: 'driver',
        supported_capabilities: 'monitoring',
        requirements: 'Host performance metrics and affinity policy definitions.',
        limitations: 'Unexpected burst workloads can still create transient contention.'
      },
      relations: {
        solution: '@solutions:aerolith-density-capacity-balancer',
        product: '@products:xcp-ng'
      }
    },
    {
      slug: 'brief-storagrid-tier-governance',
      data: {
        title: 'Storagrid Tier Governance Brief',
        workflow: 'draft',
        short_description: `Brief for policy governance across hot, warm, and cold storage tiers.`,
        description: `Defines retention policy boundaries, retrieval SLAs, and lifecycle exception handling.`,
        integration_type: 'plugin',
        supported_capabilities: 'snapshots',
        requirements: 'Tier policy taxonomy and retrieval priority classes.',
        limitations: 'Archive workloads may require separate retrieval handling.'
      },
      relations: {
        solution: '@solutions:storagrid-hot-warm-cold-governance',
        product: '@products:xostore'
      }
    },
    {
      slug: 'brief-horizon-release-rings',
      data: {
        title: 'Horizon Release Rings Brief',
        workflow: 'draft',
        short_description: `Brief for release ring automation and staged promotion safety checks.`,
        description: `Provides ring topology guidance, promotion gates, and controlled rollback behavior.`,
        integration_type: 'api',
        supported_capabilities: 'alerting',
        requirements: 'Ring ownership and release health metrics.',
        limitations: 'Ring dependencies can delay promotions during incidents.'
      },
      relations: {
        solution: '@solutions:horizon-release-ring-automation',
        product: '@products:xcp-ng'
      }
    },
    {
      slug: 'brief-vertex-remediation-slo',
      data: {
        title: 'Vertex Remediation SLO Brief',
        workflow: 'draft',
        short_description: `Brief for SLO-based policy remediation prioritization and escalation.`,
        description: `Defines severity scoring, remediation service levels, and escalation guardrails.`,
        integration_type: 'agent',
        supported_capabilities: 'hardening',
        requirements: 'Policy severity matrix and remediation ownership map.',
        limitations: 'SLO tuning requires baseline incident data.'
      },
      relations: {
        solution: '@solutions:vertex-remediation-slo-controller',
        product: '@products:xoproxy'
      }
    }
  ],

  'kb-articles': [
    {
      slug: 'kb-dr-runbook-validation',
      data: {
        title: 'How to Validate DR Runbooks Quarterly',
        type: 'troubleshooting',
        severity: 'medium',
        workflow: 'draft',
        symptoms: 'Recovery drills pass inconsistently and failover checks produce variable outcomes.',
        root_cause: 'Runbook steps are not standardized and environment prerequisites drift over time.'
      },
      relations: {
        solutions: ['@solutions:hybrid-dr-for-vms'],
        products: ['@products:vates-vms']
      }
    },
    {
      slug: 'kb-telemetry-baseline',
      data: {
        title: 'Building a Reliable Telemetry Baseline',
        type: 'howto',
        severity: 'low',
        workflow: 'draft',
        symptoms: 'Optimization recommendations fluctuate and confidence in metrics is low.',
        root_cause: 'Collection intervals, labels, and source normalization are inconsistent.'
      },
      relations: {
        solutions: ['@solutions:capacity-rightsizing-intelligence'],
        products: ['@products:easyvirt-dc-netscope']
      }
    },
    {
      slug: 'kb-retention-policy-validation',
      data: {
        title: 'Validating Retention Policy Enforcement',
        type: 'howto',
        severity: 'low',
        workflow: 'draft',
        symptoms: 'Retention policies appear inconsistent across storage classes.',
        root_cause: 'Policy assignment is fragmented and lifecycle checkpoints are missing.'
      },
      relations: {
        solutions: ['@solutions:retention-policy-simplifier'],
        products: ['@products:xostore']
      }
    },
    {
      slug: 'kb-container-bridge-connectivity',
      data: {
        title: 'Troubleshooting Container Bridge Connectivity',
        type: 'troubleshooting',
        severity: 'medium',
        workflow: 'draft',
        symptoms: 'Inter-zone container traffic fails under specific policy combinations.',
        root_cause: 'Policy precedence and bridge mappings are not consistently applied.'
      },
      relations: {
        solutions: ['@solutions:container-segmentation-bridge'],
        products: ['@products:xoproxy']
      }
    },
    {
      slug: 'kb-secops-triage-playbook',
      data: {
        title: 'SecOps Triage Playbook for Platform Alerts',
        type: 'advisory',
        severity: 'high',
        workflow: 'draft',
        symptoms: 'Alert queues are noisy and critical issues are missed.',
        root_cause: 'No normalized severity model or triage ownership model exists.'
      },
      relations: {
        solutions: ['@solutions:secops-triage-accelerator'],
        products: ['@products:xen-orchestra']
      }
    },
    {
      slug: 'kb-enterprise-workload-cutover-checklist',
      data: {
        title: 'Enterprise Workload Cutover Checklist',
        type: 'faq',
        severity: 'medium',
        workflow: 'draft',
        symptoms: 'Cutover planning misses dependency and rollback checkpoints.',
        root_cause: 'Migration wave criteria are not standardized across application teams.'
      },
      relations: {
        solutions: ['@solutions:enterprise-workload-modernizer'],
        products: ['@products:vates-vms']
      }
    },
    {
      slug: 'kb-fabric-segmentation-drift',
      data: {
        title: 'Detecting Fabric Segmentation Drift',
        type: 'known_issue',
        severity: 'medium',
        workflow: 'draft',
        symptoms: 'Unexpected east-west traffic appears after maintenance windows.',
        root_cause: 'Segmentation policy drift and stale rule exports are not reconciled.'
      },
      relations: {
        solutions: ['@solutions:fabric-segmentation-enforcement'],
        products: ['@products:xcp-ng']
      }
    },
    {
      slug: 'kb-archive-tier-retrieval-latency',
      data: {
        title: 'Archive Tier Retrieval Latency Mitigation',
        type: 'workaround',
        severity: 'low',
        workflow: 'draft',
        symptoms: 'Archive retrieval operations breach expected response targets.',
        root_cause: 'Restore prioritization and cache prewarming policies are not tuned.'
      },
      relations: {
        solutions: ['@solutions:tiering-and-archive-automation'],
        products: ['@products:xostore']
      }
    },
    {
      slug: 'kb-bluepeak-dr-drill-prereqs',
      data: {
        title: 'BluePeak DR Drill Prerequisites',
        type: 'howto',
        severity: 'low',
        workflow: 'draft',
        symptoms: 'Recovery drills fail due to missing environment prerequisites.',
        root_cause: 'Pre-check lists are incomplete and ownership boundaries are unclear.'
      },
      relations: {
        solutions: ['@solutions:bluepeak-hybrid-continuity'],
        products: ['@products:vates-vms']
      }
    },
    {
      slug: 'kb-bluepeak-backup-policy-exceptions',
      data: {
        title: 'BluePeak Backup Policy Exceptions',
        type: 'troubleshooting',
        severity: 'medium',
        workflow: 'draft',
        symptoms: 'Some workloads are skipped by scheduled backup policy runs.',
        root_cause: 'Policy selectors and workload tags are not consistently aligned.'
      },
      relations: {
        solutions: ['@solutions:bluepeak-policy-driven-backup-assurance'],
        products: ['@products:vates-vms']
      }
    },
    {
      slug: 'kb-bluepeak-placement-affinity-conflicts',
      data: {
        title: 'BluePeak Placement Affinity Conflicts',
        type: 'known_issue',
        severity: 'medium',
        workflow: 'draft',
        symptoms: 'Rebalance operations repeatedly fail for specific workloads.',
        root_cause: 'Affinity and anti-affinity constraints conflict with zone balancing goals.'
      },
      relations: {
        solutions: ['@solutions:bluepeak-multi-zone-placement-control'],
        products: ['@products:xcp-ng']
      }
    },
    {
      slug: 'kb-bluepeak-tier-retention-drift',
      data: {
        title: 'BluePeak Tier Retention Drift',
        type: 'workaround',
        severity: 'low',
        workflow: 'draft',
        symptoms: 'Retention behavior differs across storage tiers for similar datasets.',
        root_cause: 'Tier policy inheritance rules are not harmonized after lifecycle changes.'
      },
      relations: {
        solutions: ['@solutions:bluepeak-storage-tier-compliance'],
        products: ['@products:xostore']
      }
    },
    {
      slug: 'kb-bluepeak-segmentation-rule-ordering',
      data: {
        title: 'BluePeak Segmentation Rule Ordering',
        type: 'howto',
        severity: 'low',
        workflow: 'draft',
        symptoms: 'Expected segmentation blocks are bypassed for specific traffic classes.',
        root_cause: 'Rule ordering and precedence are inconsistent across applied policy sets.'
      },
      relations: {
        solutions: ['@solutions:bluepeak-network-segmentation-ops'],
        products: ['@products:xoproxy']
      }
    },
    {
      slug: 'kb-bluepeak-release-wave-gate-failures',
      data: {
        title: 'BluePeak Release Wave Gate Failures',
        type: 'troubleshooting',
        severity: 'high',
        workflow: 'draft',
        symptoms: 'Release waves stop at promotion gates despite green baseline checks.',
        root_cause: 'Gate thresholds are overly strict for transient performance variance.'
      },
      relations: {
        solutions: ['@solutions:bluepeak-release-wave-orchestration'],
        products: ['@products:xen-orchestra']
      }
    },
    {
      slug: 'kb-bluepeak-ransomware-isolation-validation',
      data: {
        title: 'BluePeak Ransomware Isolation Validation',
        type: 'advisory',
        severity: 'high',
        workflow: 'draft',
        symptoms: 'Containment drills do not fully isolate backup targets during incidents.',
        root_cause: 'Isolation boundaries are not validated after infrastructure changes.'
      },
      relations: {
        solutions: ['@solutions:bluepeak-ransomware-resilience-hardening'],
        products: ['@products:vates-vms']
      }
    },
    {
      slug: 'kb-bluepeak-capacity-drift-threshold-tuning',
      data: {
        title: 'BluePeak Capacity Drift Threshold Tuning',
        type: 'howto',
        severity: 'low',
        workflow: 'draft',
        symptoms: 'Capacity drift alerts oscillate between over-sensitive and too-late detection.',
        root_cause: 'Drift thresholds are not tuned for observed workload variability.'
      },
      relations: {
        solutions: ['@solutions:bluepeak-capacity-drift-management'],
        products: ['@products:easyvirt-dc-scope']
      }
    },
    {
      slug: 'kb-quantis-forecast-confidence-tuning',
      data: {
        title: 'Quantis Forecast Confidence Tuning',
        type: 'advisory',
        severity: 'medium',
        workflow: 'draft',
        symptoms: 'Forecast ranges are too wide for planning decisions.',
        root_cause: 'Input metrics and labels are unstable across collection windows.'
      },
      relations: {
        solutions: ['@solutions:quantis-capacity-intelligence'],
        products: ['@products:easyvirt-dc-netscope']
      }
    },
    {
      slug: 'kb-redoak-evidence-gaps',
      data: {
        title: 'RedOak Evidence Pipeline Gaps',
        type: 'troubleshooting',
        severity: 'medium',
        workflow: 'draft',
        symptoms: 'Control evidence reports miss key checkpoints.',
        root_cause: 'Control mappings are incomplete and event routing is inconsistent.'
      },
      relations: {
        solutions: ['@solutions:redoak-control-evidence-pipeline'],
        products: ['@products:xoproxy']
      }
    },
    {
      slug: 'kb-horizon-wave-rollout-blockers',
      data: {
        title: 'Horizon Wave Rollout Blockers',
        type: 'troubleshooting',
        severity: 'high',
        workflow: 'draft',
        symptoms: 'Wave promotions stall despite healthy baseline metrics.',
        root_cause: 'Gate conditions and release prerequisites are not aligned.'
      },
      relations: {
        solutions: ['@solutions:horizon-change-wave-manager'],
        products: ['@products:xcp-ng']
      }
    },
    {
      slug: 'kb-vertex-policy-drift-noise',
      data: {
        title: 'Vertex Policy Drift Noise Reduction',
        type: 'workaround',
        severity: 'low',
        workflow: 'draft',
        symptoms: 'Policy drift alerts generate excessive low-value notifications.',
        root_cause: 'Drift thresholds are too sensitive for normal operational variance.'
      },
      relations: {
        solutions: ['@solutions:vertex-policy-remediation-automation'],
        products: ['@products:xoproxy']
      }
    },
    {
      slug: 'kb-amberlane-retention-mapping',
      data: {
        title: 'Amberlane Retention Class Mapping',
        type: 'howto',
        severity: 'low',
        workflow: 'draft',
        symptoms: 'Retention classes overlap and policy intent is unclear.',
        root_cause: 'Lifecycle classes are defined without operational ownership boundaries.'
      },
      relations: {
        solutions: ['@solutions:amberlane-tiered-retention-ops'],
        products: ['@products:xostore']
      }
    },
    {
      slug: 'kb-cobalt-zone-boundary-exceptions',
      data: {
        title: 'Cobalt Zone Boundary Exceptions',
        type: 'known_issue',
        severity: 'medium',
        workflow: 'draft',
        symptoms: 'Unexpected traffic paths bypass intended segmentation zones.',
        root_cause: 'Exception routes were applied without synchronized policy updates.'
      },
      relations: {
        solutions: ['@solutions:cobalt-zone-segmentation'],
        products: ['@products:xcp-ng']
      }
    },
    {
      slug: 'kb-deltaforge-alert-ownership',
      data: {
        title: 'DeltaForge Alert Ownership Model',
        type: 'faq',
        severity: 'low',
        workflow: 'draft',
        symptoms: 'Alerts remain unassigned during escalation periods.',
        root_cause: 'Ownership mapping is incomplete for specific alert classes.'
      },
      relations: {
        solutions: ['@solutions:deltaforge-alert-triage'],
        products: ['@products:xen-orchestra']
      }
    },
    {
      slug: 'kb-emberstack-cutover-wave-readiness',
      data: {
        title: 'EmberStack Cutover Wave Readiness',
        type: 'advisory',
        severity: 'medium',
        workflow: 'draft',
        symptoms: 'Cutover waves fail readiness checks late in execution.',
        root_cause: 'Dependency inventories are incomplete before migration windows.'
      },
      relations: {
        solutions: ['@solutions:emberstack-enterprise-app-modernization'],
        products: ['@products:vates-vms']
      }
    },
    {
      slug: 'kb-frostbyte-metric-label-normalization',
      data: {
        title: 'Frostbyte Metric Label Normalization',
        type: 'howto',
        severity: 'low',
        workflow: 'draft',
        symptoms: 'Dashboards show conflicting values for equivalent services.',
        root_cause: 'Label dictionaries differ across metric collectors.'
      },
      relations: {
        solutions: ['@solutions:frostbyte-telemetry-normalization'],
        products: ['@products:easyvirt-dc-scope']
      }
    },
    {
      slug: 'kb-granitebridge-readiness-scorecard',
      data: {
        title: 'GraniteBridge Readiness Scorecard Setup',
        type: 'howto',
        severity: 'low',
        workflow: 'draft',
        symptoms: 'Migration readiness status is subjective and hard to compare.',
        root_cause: 'No standardized scorecard exists for workload readiness criteria.'
      },
      relations: {
        solutions: ['@solutions:granitebridge-cloud-migration-readiness'],
        products: ['@products:vates-vms']
      }
    },
    {
      slug: 'kb-northbridge-failover-evidence-checks',
      data: {
        title: 'Northbridge Failover Evidence Checks',
        type: 'howto',
        severity: 'low',
        workflow: 'draft',
        symptoms: 'Failover drills complete without auditable recovery evidence.',
        root_cause: 'Evidence capture steps are not standardized across teams.'
      },
      relations: {
        solutions: ['@solutions:northbridge-cross-site-failover-assurance'],
        products: ['@products:vates-vms']
      }
    },
    {
      slug: 'kb-altura-anomaly-threshold-calibration',
      data: {
        title: 'Altura Anomaly Threshold Calibration',
        type: 'troubleshooting',
        severity: 'medium',
        workflow: 'draft',
        symptoms: 'Optimization anomaly alerts are too frequent and noisy.',
        root_cause: 'Thresholds are not calibrated for workload seasonality.'
      },
      relations: {
        solutions: ['@solutions:altura-finops-anomaly-guardrails'],
        products: ['@products:easyvirt-dc-scope']
      }
    },
    {
      slug: 'kb-cloudbridge-wave-exit-criteria',
      data: {
        title: 'CloudBridge Wave Exit Criteria',
        type: 'advisory',
        severity: 'medium',
        workflow: 'draft',
        symptoms: 'Migration waves close with unresolved dependencies.',
        root_cause: 'Exit criteria and ownership signoff are inconsistently applied.'
      },
      relations: {
        solutions: ['@solutions:cloudbridge-wave-cutover-governance'],
        products: ['@products:vates-vms']
      }
    },
    {
      slug: 'kb-securegrid-control-evidence-retention',
      data: {
        title: 'SecureGrid Control Evidence Retention',
        type: 'known_issue',
        severity: 'low',
        workflow: 'draft',
        symptoms: 'Older control evidence is missing during audits.',
        root_cause: 'Retention windows are shorter than required audit lookback.'
      },
      relations: {
        solutions: ['@solutions:securegrid-tenant-audit-fabric'],
        products: ['@products:xoproxy']
      }
    },
    {
      slug: 'kb-aerolith-contention-hotspots',
      data: {
        title: 'Aerolith Contention Hotspots',
        type: 'troubleshooting',
        severity: 'medium',
        workflow: 'draft',
        symptoms: 'Host contention spikes despite balanced average utilization.',
        root_cause: 'Burst workload affinity patterns are not reflected in balancing rules.'
      },
      relations: {
        solutions: ['@solutions:aerolith-density-capacity-balancer'],
        products: ['@products:xcp-ng']
      }
    },
    {
      slug: 'kb-storagrid-tier-policy-overlap',
      data: {
        title: 'Storagrid Tier Policy Overlap',
        type: 'workaround',
        severity: 'low',
        workflow: 'draft',
        symptoms: 'Objects can match multiple tier policies unexpectedly.',
        root_cause: 'Policy precedence rules are ambiguous for overlapping conditions.'
      },
      relations: {
        solutions: ['@solutions:storagrid-hot-warm-cold-governance'],
        products: ['@products:xostore']
      }
    },
    {
      slug: 'kb-horizon-ring-promotion-timeouts',
      data: {
        title: 'Horizon Ring Promotion Timeouts',
        type: 'troubleshooting',
        severity: 'high',
        workflow: 'draft',
        symptoms: 'Release promotions stall between canary and broad rollout rings.',
        root_cause: 'Ring health checks and timeout policies are not aligned with workload behavior.'
      },
      relations: {
        solutions: ['@solutions:horizon-release-ring-automation'],
        products: ['@products:xcp-ng']
      }
    },
    {
      slug: 'kb-vertex-remediation-priority-drift',
      data: {
        title: 'Vertex Remediation Priority Drift',
        type: 'advisory',
        severity: 'medium',
        workflow: 'draft',
        symptoms: 'High-impact policy violations stay queued behind low-impact fixes.',
        root_cause: 'Priority scoring rules are outdated relative to current risk profiles.'
      },
      relations: {
        solutions: ['@solutions:vertex-remediation-slo-controller'],
        products: ['@products:xoproxy']
      }
    }
  ],

  'compatibility-records': [
    {
      slug: 'compat-vms-xcpng-xo',
      data: {
        title: 'Compatibility: Vates VMS / XCP-ng / Xen Orchestra',
        workflow: 'validated',
        product_version: '2026.1',
        solution_version: '2.4.0',
        date_tested: '2026-02-20',
        constraints: 'Requires synchronized NTP and minimum 10GbE between cluster nodes.',
        environment_profile: [],
        evidence_links: []
      },
      relations: {
        solution: '@solutions:vms-modernization-factory',
        product: '@products:vates-vms'
      }
    },
    {
      slug: 'compat-optimization-stack',
      data: {
        title: 'Compatibility: EasyVirt Optimization Stack',
        workflow: 'limited',
        product_version: '2026.1',
        solution_version: '1.8.3',
        date_tested: '2026-02-20',
        constraints: 'Large environments should increase telemetry retention storage.',
        environment_profile: [],
        evidence_links: []
      },
      relations: {
        solution: '@solutions:observability-and-cost-governance',
        product: '@products:easyvirt-dc-scope'
      }
    }
  ]
};
