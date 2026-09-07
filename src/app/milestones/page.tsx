"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import FadeIn from "@/components/motion/FadeIn";
import TextReveal from "@/components/motion/TextReveal";
import MagneticLink from "@/components/motion/MagneticLink";
import CertificateModal from "@/components/CertificateModal";
import { type Certification, type Innovation } from "@/data/milestones";
import { getCertifications, getInnovations } from "@/lib/store";

export default function MilestonesPage() {
  const [certs, setCerts] = useState<Certification[]>([]);
  const [invs, setInvs] = useState<Innovation[]>([]);
  const [modalState, setModalState] = useState<{isOpen: boolean; image: string; title: string}>({
    isOpen: false, image: "", title: "",
  });

  useEffect(() => {
    setCerts(getCertifications()); // eslint-disable-line react-hooks/set-state-in-effect
    setInvs(getInnovations());
  }, []);

  const openModal = (image: string, title: string) => {
    setModalState({ isOpen: true, image, title });
  };

  const closeModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <main className="min-h-screen w-full bg-[#0a0a0a] text-[#FAFAFA] pt-32 pb-32">
      
      {/* Hero Section */}
      <section className="px-6 md:px-10 max-w-7xl mx-auto mb-32">
        <FadeIn className="font-mono text-xs tracking-widest text-zinc-500 mb-10 uppercase">
          [ ARCHIVE ]
        </FadeIn>
        <h1 className="font-display text-[clamp(3rem,8vw,8rem)] leading-[0.85] font-black uppercase tracking-tighter text-white mb-10">
          <TextReveal>MILESTONES</TextReveal>
        </h1>
        <FadeIn delay={0.2} className="font-sans text-xl md:text-3xl text-zinc-400 max-w-3xl leading-relaxed italic">
          &quot;A record of the technical knowledge, recognition, and original ideas that have shaped the way I build.&quot;
        </FadeIn>
      </section>

      {/* Certifications Section */}
      <section className="px-6 md:px-10 max-w-7xl mx-auto mb-32">
        <FadeIn className="font-mono text-xs tracking-widest text-[var(--accent)] mb-12 uppercase">
          01 / CERTIFICATIONS
        </FadeIn>

        <div className="flex flex-col border-t border-white/10">
          {certs.map((cert, i) => (
            <FadeIn key={cert.id} delay={0.1 * i} className="group flex flex-col md:flex-row justify-between items-start md:items-center py-10 md:py-12 border-b border-white/10 gap-6 md:gap-10">
              
              <div className="flex flex-col md:flex-row gap-6 md:gap-12 md:items-center w-full md:w-auto">
                <div className="font-display text-4xl md:text-5xl font-black text-white/10 group-hover:text-white/30 transition-colors">
                  0{i + 1}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight text-white group-hover:text-[var(--accent)] transition-colors">
                    {cert.title}
                  </h3>
                  <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest flex flex-wrap gap-4">
                    <span>{cert.issuer}</span>
                    <span className="text-zinc-700">&bull;</span>
                    <span>{cert.year}</span>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-auto flex justify-start md:justify-end shrink-0">
                <button 
                  onClick={() => openModal(cert.image, cert.title)}
                  className="font-mono text-[10px] md:text-xs text-zinc-400 uppercase tracking-widest border border-zinc-800 px-6 py-3 hover:bg-white hover:text-black transition-all interactive flex items-center gap-2"
                  data-cursor-text="VIEW"
                >
                  VIEW CERTIFICATE <span className="text-lg leading-none">&rarr;</span>
                </button>
              </div>

            </FadeIn>
          ))}
        </div>
      </section>

      {/* Innovations Section */}
      <section className="px-6 md:px-10 max-w-7xl mx-auto">
        <FadeIn className="font-mono text-xs tracking-widest text-[var(--accent)] mb-12 uppercase">
          02 / INNOVATIONS
        </FadeIn>

        <div className="flex flex-col border-t border-white/10">
          {invs.map((inv, i) => (
            <FadeIn key={inv.id} delay={0.1 * i} className="group flex flex-col md:flex-row justify-between items-start md:items-center py-10 md:py-12 border-b border-white/10 gap-6 md:gap-10">
              
              <div className="flex flex-col md:flex-row gap-6 md:gap-12 md:items-center w-full md:w-auto">
                <div className="font-display text-4xl md:text-5xl font-black text-white/10 group-hover:text-white/30 transition-colors">
                  0{i + 1}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight text-white group-hover:text-[var(--accent)] transition-colors">
                    {inv.title}
                  </h3>
                  <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest flex flex-wrap gap-4">
                    <span>{inv.domain}</span>
                    <span className="text-zinc-700">&bull;</span>
                    <span className="text-emerald-400">{inv.status}</span>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-auto flex justify-start md:justify-end shrink-0">
                <MagneticLink>
                  <Link 
                    href={`/work/${inv.projectSlug}`}
                    className="font-mono text-[10px] md:text-xs text-zinc-400 uppercase tracking-widest border border-zinc-800 px-6 py-3 hover:bg-white hover:text-black transition-all interactive flex items-center gap-2"
                    data-cursor-text="VIEW"
                  >
                    EXPLORE PROJECT <span className="text-lg leading-none">&rarr;</span>
                  </Link>
                </MagneticLink>
              </div>

            </FadeIn>
          ))}
        </div>
      </section>

      {/* Modal Overlay */}
      <CertificateModal 
        isOpen={modalState.isOpen}
        onClose={closeModal}
        imageSrc={modalState.image}
        title={modalState.title}
      />

    </main>
  );
}
