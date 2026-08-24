'use client';

import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { ProcessDivider } from '@/components/process-benefits';

export function AiNativeExplainer() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="ai-native-explainer" aria-labelledby="ai-native-heading">
      <div className="ai-native-explainer-shell">
        <ProcessDivider className="ai-native-explainer-divider" />
        <div className="ai-native-explainer-layout">
          <motion.p
            className="ai-native-explainer-label"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.65 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            What AI-native means at Brillarix
          </motion.p>
          <motion.div
            className="ai-native-explainer-content"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ delay: 0.12, duration: 0.92, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 id="ai-native-heading">Human product judgment. AI-accelerated execution.</h2>
            <p>
              At Brillarix, AI-native describes how we work—not a promise to add AI to every product. We use AI across discovery, prototyping, engineering, testing, and documentation to shorten feedback loops. Our strategists, designers, and engineers remain responsible for product decisions, architecture, security, and final quality.
            </p>
            <a href="#process">
              <span>Explore our process</span>
              <ArrowUpRight aria-hidden="true" strokeWidth={1.8} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
