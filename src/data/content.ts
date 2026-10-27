export type Lang = 'pt' | 'en'

export const profile = {
  name: 'Rhuan Oliveira',
  github: 'Uvaum',
  linkedin: 'https://www.linkedin.com/in/rhuan-oliveirau',
  email: 'rhuancesar03@gmail.com',
  // Start of the apprentice contract — the tenure counter on the page counts from here.
  careerStart: { year: 2025, month: 3, day: 1 },
}

export const stack = [
  { group: 'Backend', items: ['Python', 'Django', 'Django REST', 'Microsserviços', 'APIs REST', 'BFF'] },
  { group: 'Frontend', items: ['React', 'TypeScript', 'JavaScript', 'HTML/CSS'] },
  { group: 'Dados', items: ['PostgreSQL', 'SQL Server', 'Apache Airflow', 'Migração de dados', 'Relatórios'] },
  { group: 'Cloud & DevOps', items: ['AWS ECS Fargate', 'RDS', 'S3', 'CloudWatch', 'Azure DevOps', 'New Relic', 'Git'] },
]

const pt = {
  nav: { about: 'Sobre', stack: 'Stack', experience: 'Experiência', cases: 'Cases', repos: 'Projetos', contact: 'Contato' },
  hero: {
    hello: 'Olá, eu sou',
    roles: ['Desenvolvedor Full Stack', 'Python & Django', 'React', 'AWS & Microsserviços'],
    summary:
      'Construo APIs, integrações e interfaces para operações reais de logística e transporte rodoviário — do banco de dados até a produção na nuvem.',
    ctaPrimary: 'Ver meu trabalho',
    ctaSecondary: 'Fale comigo',
    available: 'Aberto a oportunidades',
  },
  about: {
    title: 'Sobre mim',
    paragraphs: [
      'Sou Desenvolvedor Full Stack no setor de logística e transporte rodoviário e estou no 6º período de Sistemas de Informação.',
      'Comecei na empresa como aprendiz e fui efetivado como desenvolvedor. Antes da tecnologia, trabalhei na área da saúde, no Hospital Vera Cruz e na Unimed-BH — experiência que me deu visão de processos e foco em quem usa o sistema.',
      'Hoje busco evoluir continuamente em desenvolvimento web, banco de dados e cloud.',
    ],
    available: 'Disponível',
    facts: [
      { icon: 'pin', label: 'Localização', value: 'Santa Luzia, MG' },
      { icon: 'grad', label: 'Formação', value: 'Sistemas de Informação, 6º período' },
      { icon: 'work', label: 'Atuação', value: 'Full Stack em logística e transporte' },
      { icon: 'target', label: 'Foco', value: 'Backend, cloud e dados' },
      { icon: 'globe', label: 'Modelo', value: 'Presencial, híbrido ou remoto' },
    ],
    tenure: {
      label: 'meses em tecnologia',
      hint: 'passe o mouse',
      title: 'como esse número é calculado',
      start: 'início',
      startNote: 'Primeiro contrato',
      today: 'hoje',
      diff: 'diferença',
      months: 'meses',
      total: 'total',
      units: { year: ['ano', 'anos'], month: ['mês', 'meses'], day: ['dia', 'dias'] },
      and: 'e',
      live: 'atualiza sozinho todo dia',
    },
    stats: [
      { value: '12', label: 'serviços em produção' },
      { value: '4', label: 'bancos relacionais' },
    ],
  },
  stackTitle: 'Stack',
  stackSubtitle: 'Ferramentas que uso no dia a dia',
  experience: {
    title: 'Trajetória',
    items: [
      {
        role: 'Desenvolvedor Full Stack',
        org: "D'Granel Transportes",
        period: 'mai 2026 — atual',
        points: [
          'APIs em Python/Django em arquitetura de microsserviços com PostgreSQL e SQL Server',
          'Camada BFF (Backend for Frontend) que conecta os microsserviços às interfaces',
          'Integrações entre sistemas internos e ERP via APIs',
          'Frontend em React',
          'Deploy e operação na AWS (ECS Fargate, RDS, S3, CloudWatch) com CI/CD no Azure DevOps',
          'Diagnóstico de incidentes em produção com New Relic e CloudWatch',
          'Apoio na gestão de DAGs e rotinas no Apache Airflow',
        ],
      },
      {
        role: 'Aprendiz de Desenvolvimento',
        org: "D'Granel Transportes",
        period: 'mar 2025 — mai 2026',
        points: [
          'Manutenção e evolução de sistemas internos em Python/Django e React',
          'Consultas e ajustes em PostgreSQL e SQL Server',
          'Primeiro contato com integrações entre sistemas, Git e pipelines no Azure DevOps',
        ],
      },
      {
        role: 'Bacharelado em Sistemas de Informação',
        org: '6º período',
        period: '2024 — 2028',
        points: ['Algoritmos, estruturas de dados, POO, banco de dados e engenharia de software'],
      },
      {
        role: 'Área da saúde',
        org: 'Unimed-BH e Hospital Vera Cruz',
        period: '2021 — 2024',
        points: ['Assistente de OPME e assistente de farmácia em centro cirúrgico: processos, rigor e foco no usuário'],
      },
    ],
  },
  cases: {
    title: 'Cases',
    subtitle: 'Entregas reais em produção. O código é privado, então conto o problema e a solução.',
    problem: 'Problema',
    solution: 'Solução',
    items: [
      {
        title: 'Integração com ERP',
        problem: 'Processos dependiam de conferências manuais e retrabalho entre sistemas internos e o ERP.',
        solution: 'Integração via APIs Django entre os sistemas, automatizando o fluxo e reduzindo erros manuais.',
        tags: ['Python', 'Django', 'SQL Server', 'APIs REST'],
      },
      {
        title: 'Relatórios operacionais',
        problem: 'As áreas operacionais precisavam de dados consolidados que estavam espalhados entre sistemas.',
        solution: 'Relatórios construídos sobre PostgreSQL e SQL Server, expostos por APIs e consumidos no frontend React.',
        tags: ['PostgreSQL', 'SQL Server', 'React', 'BFF'],
      },
      {
        title: 'Migração de dados',
        problem: 'Dados precisavam ser movidos entre sistemas sem perder consistência nem parar a operação.',
        solution: 'Scripts de migração e validação em Python, com conferência entre origem e destino.',
        tags: ['Python', 'PostgreSQL', 'SQL Server'],
      },
      {
        title: 'Incidentes em produção',
        problem: 'Falhas em microsserviços na AWS afetavam a operação e precisavam ser encontradas rápido.',
        solution: 'Investigação com New Relic e CloudWatch para achar a causa raiz e corrigir via pipeline no Azure DevOps.',
        tags: ['AWS', 'New Relic', 'CloudWatch', 'Azure DevOps'],
      },
    ],
  },
  repos: {
    title: 'Projetos no GitHub',
    subtitle: 'Carregados ao vivo da API do GitHub',
    updated: 'Atualizado em',
    all: 'Ver todos no GitHub',
    error: 'Não foi possível carregar os repositórios agora.',
  },
  contact: {
    title: 'Vamos conversar?',
    text: 'Estou aberto a oportunidades como desenvolvedor. Me chama no LinkedIn ou por e-mail.',
    copy: 'Copiar e-mail',
    copied: 'Copiado!',
  },
  footer: 'Feito com React, TypeScript e Framer Motion.',
  layout: {
    drag: 'Arrastar para reordenar',
    hint: 'Esta página é personalizável: arraste seções e cards pelo ⠿ para reorganizar.',
    reset: 'Redefinir layout',
    done: 'Layout redefinido!',
  },
  preview: {
    button: 'Testar responsividade',
    title: 'Veja este site em outros dispositivos',
    hint: 'É o site de verdade rodando dentro da moldura — role, clique e navegue.',
    rotate: 'Girar',
    close: 'Fechar',
    devices: { phone: 'Celular', tablet: 'Tablet', laptop: 'Notebook', desktop: 'Desktop' },
  },
}

const en: typeof pt = {
  nav: { about: 'About', stack: 'Stack', experience: 'Experience', cases: 'Cases', repos: 'Projects', contact: 'Contact' },
  hero: {
    hello: "Hi, I'm",
    roles: ['Full Stack Developer', 'Python & Django', 'React', 'AWS & Microservices'],
    summary:
      'I build APIs, integrations and interfaces for real road-freight logistics operations — from the database all the way to production in the cloud.',
    ctaPrimary: 'See my work',
    ctaSecondary: 'Get in touch',
    available: 'Open to opportunities',
  },
  about: {
    title: 'About me',
    paragraphs: [
      "I'm a Full Stack Developer in the logistics and road freight industry, currently in the 6th semester of Information Systems.",
      'I joined the company as an apprentice and was promoted to developer. Before tech, I worked in healthcare at Hospital Vera Cruz and Unimed-BH — which taught me to think in processes and focus on the people using the system.',
      "I'm always looking to grow in web development, databases and cloud.",
    ],
    available: 'Available',
    facts: [
      { icon: 'pin', label: 'Location', value: 'Santa Luzia, MG, Brazil' },
      { icon: 'grad', label: 'Education', value: 'Information Systems, 6th semester' },
      { icon: 'work', label: 'Role', value: 'Full Stack in logistics and transport' },
      { icon: 'target', label: 'Focus', value: 'Backend, cloud and data' },
      { icon: 'globe', label: 'Work model', value: 'On-site, hybrid or remote' },
    ],
    tenure: {
      label: 'months in tech',
      hint: 'hover me',
      title: 'how this number is calculated',
      start: 'start',
      startNote: 'apprentice contract',
      today: 'today',
      diff: 'diff',
      months: 'months',
      total: 'total',
      units: { year: ['year', 'years'], month: ['month', 'months'], day: ['day', 'days'] },
      and: 'and',
      live: 'updates itself every day',
    },
    stats: [
      { value: '12', label: 'services in production' },
      { value: '4', label: 'relational databases' },
    ],
  },
  stackTitle: 'Stack',
  stackSubtitle: 'Tools I use every day',
  experience: {
    title: 'Journey',
    items: [
      {
        role: 'Full Stack Developer',
        org: "D'Granel Transportes",
        period: 'May 2026 — present',
        points: [
          'Python/Django APIs in a microservices architecture with PostgreSQL and SQL Server',
          'BFF (Backend for Frontend) layer connecting the microservices to the interfaces',
          'Integrations between internal systems and the ERP through APIs',
          'React frontend',
          'Deployment and operations on AWS (ECS Fargate, RDS, S3, CloudWatch) with Azure DevOps CI/CD',
          'Production incident troubleshooting with New Relic and CloudWatch',
          'Helping manage DAGs and scheduled jobs on Apache Airflow',
        ],
      },
      {
        role: 'Software Development Apprentice',
        org: "D'Granel Transportes",
        period: 'Mar 2025 — May 2026',
        points: [
          'Maintained and evolved internal systems in Python/Django and React',
          'Queries and adjustments in PostgreSQL and SQL Server',
          'First exposure to system integrations, Git and Azure DevOps pipelines',
        ],
      },
      {
        role: "Bachelor's in Information Systems",
        org: '6th semester',
        period: '2024 — 2028',
        points: ['Algorithms, data structures, OOP, databases and software engineering'],
      },
      {
        role: 'Healthcare',
        org: 'Unimed-BH and Hospital Vera Cruz',
        period: '2021 — 2024',
        points: ['OPME assistant and surgical-center pharmacy assistant: processes, rigor and user focus'],
      },
    ],
  },
  cases: {
    title: 'Cases',
    subtitle: 'Real work running in production. The code is private, so here is the problem and the solution.',
    problem: 'Problem',
    solution: 'Solution',
    items: [
      {
        title: 'ERP integration',
        problem: 'Processes relied on manual checks and rework between internal systems and the ERP.',
        solution: 'Integrated the systems through Django APIs, automating the flow and reducing manual errors.',
        tags: ['Python', 'Django', 'SQL Server', 'REST APIs'],
      },
      {
        title: 'Operational reports',
        problem: 'Operations teams needed consolidated data that was spread across systems.',
        solution: 'Reports built on PostgreSQL and SQL Server, exposed through APIs and consumed by the React frontend.',
        tags: ['PostgreSQL', 'SQL Server', 'React', 'BFF'],
      },
      {
        title: 'Data migration',
        problem: 'Data had to move between systems without losing consistency or stopping operations.',
        solution: 'Python migration and validation scripts, reconciling source and target.',
        tags: ['Python', 'PostgreSQL', 'SQL Server'],
      },
      {
        title: 'Production incidents',
        problem: 'Failures in AWS microservices impacted operations and had to be found fast.',
        solution: 'Investigation with New Relic and CloudWatch to find the root cause and ship the fix through Azure DevOps.',
        tags: ['AWS', 'New Relic', 'CloudWatch', 'Azure DevOps'],
      },
    ],
  },
  repos: {
    title: 'GitHub projects',
    subtitle: 'Loaded live from the GitHub API',
    updated: 'Updated',
    all: 'See all on GitHub',
    error: "Couldn't load repositories right now.",
  },
  contact: {
    title: "Let's talk?",
    text: "I'm open to developer opportunities. Reach me on LinkedIn or by email.",
    copy: 'Copy email',
    copied: 'Copied!',
  },
  footer: 'Built with React, TypeScript and Framer Motion.',
  layout: {
    drag: 'Drag to reorder',
    hint: 'This page is customizable: drag sections and cards by the ⠿ to rearrange them.',
    reset: 'Reset layout',
    done: 'Layout reset!',
  },
  preview: {
    button: 'Test responsiveness',
    title: 'See this site on other devices',
    hint: "It's the real site running inside the frame — scroll, click and explore.",
    rotate: 'Rotate',
    close: 'Close',
    devices: { phone: 'Phone', tablet: 'Tablet', laptop: 'Laptop', desktop: 'Desktop' },
  },
}

export const content = { pt, en }
export type Content = typeof pt
