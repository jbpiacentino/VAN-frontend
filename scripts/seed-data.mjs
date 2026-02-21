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
          filePath: 'scripts/assets/logos/northbridge-cloud.svg',
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
          filePath: 'scripts/assets/logos/altura-systems.svg',
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
          filePath: 'scripts/assets/logos/cloudbridge-systems.svg',
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
          filePath: 'scripts/assets/logos/securegrid-labs.svg',
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
          filePath: 'scripts/assets/logos/dataprism-storage.svg',
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
          filePath: 'scripts/assets/logos/netweave-fabric.svg',
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
          filePath: 'scripts/assets/logos/compute-harbor.svg',
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
          filePath: 'scripts/assets/logos/aerolith-compute.svg',
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
          filePath: 'scripts/assets/logos/storagrid-cloud.svg',
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
          filePath: 'scripts/assets/logos/helion-health-systems.svg',
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
          filePath: 'scripts/assets/logos/orbit-orchestration.svg',
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
          filePath: 'scripts/assets/logos/insightlake-analytics.svg',
          fileName: 'insightlake-analytics-logo.svg',
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
        tier: 'regular',
        registered_at: '2026-01-08T00:00:00.000Z',
        expires_at: '2027-01-08T00:00:00.000Z'
      },
      relations: {
        vendor: '@vendors:altura-systems'
      }
    },
    {
      data: {
        tier: 'regular',
        registered_at: '2026-01-12T00:00:00.000Z',
        expires_at: '2027-01-12T00:00:00.000Z'
      },
      relations: {
        vendor: '@vendors:cloudbridge-systems'
      }
    },
    {
      data: {
        tier: 'regular',
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
        tier: 'regular',
        registered_at: '2026-01-25T00:00:00.000Z',
        expires_at: '2027-01-25T00:00:00.000Z'
      },
      relations: {
        vendor: '@vendors:storagrid-cloud'
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
          '@solutions:tiering-and-archive-automation'
        ],
        products: ['@products:xostore', '@products:vates-vms']
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
