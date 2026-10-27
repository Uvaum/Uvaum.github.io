import { MotionConfig } from 'framer-motion'
import type { ComponentType } from 'react'
import { About } from './components/About'
import { Background } from './components/Background'
import { Cases } from './components/Cases'
import { Contact } from './components/Contact'
import { DevicePreview, isEmbedded } from './components/DevicePreview'
import { Experience } from './components/Experience'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Repos } from './components/Repos'
import { GripIcon, SortableItem, SortableList } from './components/Sortable'
import { Stack } from './components/Stack'
import { I18nProvider, useI18n } from './i18n'
import { LayoutProvider, useLayout, type SectionId } from './layout'

const sectionComponents: Record<SectionId, ComponentType> = {
  about: About,
  stack: Stack,
  experience: Experience,
  cases: Cases,
  repos: Repos,
}

function Sections() {
  const { t } = useI18n()
  const { sections, setSections } = useLayout()

  return (
    <SortableList
      ids={sections}
      onReorder={setSections}
      layout="list"
      renderOverlay={(id) => (
        <div className="drag-pill">
          <GripIcon /> {t.nav[id]}
        </div>
      )}
    >
      {sections.map((id) => {
        const Section = sectionComponents[id]
        return (
          <SortableItem key={id} id={id} className="sortable-section">
            <Section />
          </SortableItem>
        )
      })}
    </SortableList>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <I18nProvider>
        <LayoutProvider>
          <Background />
          <Navbar />
          <main>
            <Hero />
            <Sections />
            <Contact />
          </main>
          {!isEmbedded && <DevicePreview />}
        </LayoutProvider>
      </I18nProvider>
    </MotionConfig>
  )
}
