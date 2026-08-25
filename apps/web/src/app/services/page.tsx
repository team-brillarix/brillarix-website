import { ServicesSolutionList } from '@/components/services-solution-list';
import { SiteHeader } from '@/components/site-header';

export default function ServicesPage() {
  return (
    <main id="main-content" tabIndex={-1} className="services-page">
      <SiteHeader />
      <section id="top" className="services-intro">
        <p>AI &amp; custom software development</p>
        <h1>Build the right product. Scale it with confidence.</h1>
        <div className="services-art" aria-hidden="true"><span /><span /><span /></div>
      </section>
      <ServicesSolutionList />
    </main>
  );
}
