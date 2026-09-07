import { notFound } from "next/navigation";
import Link from "next/link";
import { featuredProjects } from "@/data/projects";
import ProjectAccordion from "@/components/ProjectAccordion";
import TextReveal from "@/components/motion/TextReveal";
import FadeIn from "@/components/motion/FadeIn";
import ParallaxImage from "@/components/motion/ParallaxImage";
import MagneticLink from "@/components/motion/MagneticLink";

export function generateStaticParams() {
  return featuredProjects.map((p) => ({
    slug: p.id,
  }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const projectIndex = featuredProjects.findIndex((p) => p.id === slug);
  const project = featuredProjects[projectIndex];

  if (!project) {
    notFound();
  }

  const prevProject = projectIndex > 0 ? featuredProjects[projectIndex - 1] : null;
  const nextProject = projectIndex < featuredProjects.length - 1 ? featuredProjects[projectIndex + 1] : null;

  return (
    <main className="w-full min-h-screen bg-[#0a0a0a] text-[#FAFAFA] pt-32 md:pt-48 pb-32 px-6 md:px-10">
      <article className="max-w-7xl mx-auto">
        
        {/* HERO SECTION */}
        <header className="flex flex-col gap-12 md:gap-20">
          <FadeIn className="font-mono text-xs md:text-sm tracking-widest text-zinc-500 uppercase">
            [ PROJECT / 0{projectIndex + 1} ]
          </FadeIn>
          
          <h1 className="font-display text-[clamp(3rem,8vw,8rem)] leading-[0.85] font-black uppercase tracking-tighter text-white">
            <TextReveal>
              {project.title.split(' ').map((word, i) => <span key={i} className="block">{word}</span>)}
            </TextReveal>
          </h1>

          <FadeIn delay={0.3}>
            <p className="font-sans text-xl md:text-3xl text-zinc-400 max-w-4xl leading-relaxed italic">
              &quot;{project.shortDescription}&quot;
            </p>
          </FadeIn>

          {/* METADATA GRID */}
          <FadeIn delay={0.4} className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 py-12 border-y border-white/10">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10px] tracking-widest text-zinc-600 uppercase">YEAR</span>
              <span className="font-mono text-sm tracking-widest text-white uppercase">{project.year}</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10px] tracking-widest text-zinc-600 uppercase">TYPE</span>
              <span className="font-mono text-sm tracking-widest text-white uppercase">{project.type}</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10px] tracking-widest text-zinc-600 uppercase">DOMAIN</span>
              <span className="font-mono text-sm tracking-widest text-white uppercase">{project.domain}</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10px] tracking-widest text-zinc-600 uppercase">STATUS</span>
              <span className="font-mono text-sm tracking-widest text-emerald-400 flex items-center gap-2 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {project.status}
              </span>
            </div>
          </FadeIn>
        </header>

        {/* HERO IMAGE */}
        <FadeIn delay={0.5} className="mt-16 md:mt-24 w-full h-[50vh] md:h-[80vh] bg-black border border-white/10 relative overflow-hidden group">
           {project.image ? (
             <ParallaxImage 
               src={project.image}
               alt={project.title}
               speed={0.05}
               className={project.mobileImage ? "hidden md:block w-full h-full" : "w-full h-full"}
               imageClassName="object-cover w-full h-full group-hover:scale-[1.02] transition-transform duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)]"
             />
           ) : null}
           {project.mobileImage && (
             <ParallaxImage 
               src={project.mobileImage}
               alt={project.title}
               speed={0.05}
               className="block md:hidden w-full h-full"
               imageClassName="object-cover w-full h-full group-hover:scale-[1.02] transition-transform duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)]"
             />
           )}
           {!project.image && !project.mobileImage && (
             <div className="absolute inset-0 bg-[#0a0a0a] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 to-transparent flex flex-col items-center justify-center gap-4">
               <div className="font-mono text-sm text-zinc-600 tracking-widest uppercase">SYS_IMG_PENDING</div>
               <div className="w-16 h-[1px] bg-zinc-800" />
               <div className="font-mono text-[10px] text-zinc-700 tracking-widest uppercase">PROJECT VISUAL / 0{projectIndex + 1}</div>
             </div>
           )}
        </FadeIn>

        {/* ACCORDION SECTIONS */}
        <ProjectAccordion sections={project.sections} />

        {/* BOTTOM NAVIGATION */}
        <footer className="mt-32 pt-16 border-t border-white/10 flex flex-col gap-16">
          
          <div>
            <MagneticLink>
              <Link href="/work" className="font-mono text-xs tracking-widest text-zinc-500 hover:text-[var(--accent)] transition-colors uppercase interactive" data-cursor-text="BACK">
                &larr; BACK TO BUILDS
              </Link>
            </MagneticLink>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
            {prevProject ? (
              <Link href={`/work/${prevProject.id}`} className="group flex flex-col gap-2 interactive" data-cursor-text="PREV">
                <span className="font-mono text-[10px] tracking-widest text-zinc-600 uppercase group-hover:text-white transition-colors">PREVIOUS PROJECT</span>
                <span className="font-display text-2xl md:text-4xl text-zinc-400 group-hover:text-white transition-colors">{prevProject.title}</span>
              </Link>
            ) : (
              <div />
            )}

            {nextProject && (
              <Link href={`/work/${nextProject.id}`} className="group flex flex-col gap-2 md:text-right interactive md:ml-auto" data-cursor-text="NEXT">
                <span className="font-mono text-[10px] tracking-widest text-zinc-600 uppercase group-hover:text-[var(--accent)] transition-colors">NEXT PROJECT &rarr;</span>
                <span className="font-display text-2xl md:text-4xl text-zinc-400 group-hover:text-[var(--accent)] transition-colors">{nextProject.title}</span>
              </Link>
            )}
          </div>

        </footer>
      </article>
    </main>
  );
}
