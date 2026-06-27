import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { Sprout, Map, Activity, Shield, ArrowRight, Radio } from 'lucide-react';
import { FadeIn } from '@/components/Layout/animations';

const HomePage: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto">
      <section className="relative min-h-[60vh] flex items-center justify-center px-6 py-20">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#4AF626 1px, transparent 1px), linear-gradient(90deg, #4AF626 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-sprout/10 border border-neon-sprout/20 text-neon-sprout text-sm font-mono mb-6">
              <Radio size={14} className="animate-pulse" />
              142 FIELD NODES ACTIVE
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-bleached-flax leading-tight">
              Digital Crop &<br />
              <span className="text-neon-sprout">Loam Intelligence</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-lg text-dormant-husk max-w-2xl mx-auto leading-relaxed">
              Project Harmony is a next-generation farm telemetry platform for the 184 Buncombe Road site.
              Real-time soil monitoring, AI-assisted field management, and A2A/HITL comms integration.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex items-center justify-center gap-4 pt-4">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3 bg-neon-sprout text-deep-loam rounded-lg font-semibold hover:bg-neon-sprout/90 transition-colors"
              >
                <Map size={18} />
                Open Dashboard
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 border border-dormant-husk/30 text-bleached-flax rounded-lg hover:bg-dormant-husk/10 transition-colors"
              >
                Contact Support
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Map,
              title: 'Geospatial Operations',
              description: 'Leaflet-powered map with custom SVG markers showing real-time node status across all field sectors.',
              color: 'text-neon-sprout',
              bg: 'bg-neon-sprout/10',
              border: 'border-neon-sprout/20',
            },
            {
              icon: Activity,
              title: 'Live Telemetry',
              description: 'Soil moisture, temperature, pH, NPK readings streamed every 5 seconds from 142 active field nodes.',
              color: 'text-barley-gold',
              bg: 'bg-barley-gold/10',
              border: 'border-barley-gold/20',
            },
            {
              icon: Shield,
              title: 'AI-Assisted Management',
              description: 'HITL-enabled AI copilot for irrigation scheduling, pest detection, and yield optimization.',
              color: 'text-bleached-flax',
              bg: 'bg-bleached-flax/10',
              border: 'border-bleached-flax/20',
            },
          ].map((feature, i) => (
            <FadeIn key={feature.title} delay={0.1 * i}>
              <motion.div
                whileHover={{ y: -4 }}
                className={`p-6 rounded-xl ${feature.bg} border ${feature.border} backdrop-blur-sm`}
              >
                <feature.icon className={feature.color} size={32} />
                <h3 className="mt-4 text-lg font-semibold text-bleached-flax">{feature.title}</h3>
                <p className="mt-2 text-sm text-dormant-husk leading-relaxed">{feature.description}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="px-6 py-8 border-t border-dormant-husk/10">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Active Nodes', value: '142', unit: '', color: 'text-neon-sprout' },
            { label: 'Avg Soil Moisture', value: '64.2', unit: '%', color: 'text-barley-gold' },
            { label: 'Field Coverage', value: '847', unit: 'ac', color: 'text-bleached-flax' },
            { label: 'Uptime', value: '99.97', unit: '%', color: 'text-neon-sprout' },
          ].map((metric) => (
            <div key={metric.label} className="text-center">
              <div className={`text-3xl font-mono font-bold ${metric.color}`}>
                {metric.value}
                <span className="text-lg ml-1">{metric.unit}</span>
              </div>
              <div className="text-xs text-dormant-husk uppercase tracking-wider mt-1">{metric.label}</div>
            </div>
          ))}
        </div>
      </section>

      <footer className="px-6 py-8 border-t border-dormant-husk/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sprout className="text-neon-sprout" size={18} />
            <span className="text-sm font-semibold text-bleached-flax">
              AggroGeo<span className="text-neon-sprout">Studio</span>
            </span>
          </div>
          <div className="text-xs text-dormant-husk">
            Project Harmony v2.4.1 • 184 Buncombe Road • Middle Tennessee
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
