'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ElasticDivider } from './elastic-divider';

const services = [
  {
    category: 'Custom software development',
    title: 'Custom Web & SaaS Development',
    description:
      'Build secure, scalable web applications and SaaS platforms with one accountable team. We design the experience, engineer the frontend and backend, connect APIs and data, and prepare the product for reliable growth.',
    cta: 'Discuss your platform',
  },
  {
    category: 'MVP development & validation',
    title: 'AI-Assisted MVP Development',
    description:
      'Move from idea to usable product in weeks. We combine product strategy, AI-assisted research, rapid prototyping, and focused engineering to test demand, reduce early risk, and create a clear path to the next release.',
    cta: 'Plan your MVP',
  },
  {
    category: 'Mobile product development',
    title: 'Cross-Platform Mobile App Development',
    description:
      'Launch a consistent experience across iOS and Android without maintaining two separate products. We handle product design, shared-code engineering, integrations, testing, deployment, and the foundations needed for future releases.',
    cta: 'Discuss your app',
  },
];

export function ServicesSolutionList() {
  return (
    <section className="solutions-section" aria-labelledby="solutions-heading">
      <div className="solutions-shell">
        <h2 id="solutions-heading">Our solutions</h2>
        <div className="solutions-list">
          {services.map((service, index) => (
            <motion.article
              className="solution-row"
              key={`${service.title}-${index}`}
              initial={{ opacity: 0, y: 62 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.28 }}
              transition={{ duration: 1.05, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <ElasticDivider />
              <div className="solution-row-content">
                <p className="solution-category">{service.category}</p>
                <div className="solution-details">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <Link href="/#contact">{service.cta}</Link>
                </div>
              </div>
            </motion.article>
          ))}
          <ElasticDivider />
        </div>
      </div>
    </section>
  );
}
