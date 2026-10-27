import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DraggableAttributes,
  type DraggableSyntheticListeners,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { createContext, useContext, useState, type ReactNode } from 'react'
import { useI18n } from '../i18n'

type HandleCtx = {
  attributes: DraggableAttributes
  listeners: DraggableSyntheticListeners
  setActivatorNodeRef: (el: HTMLElement | null) => void
}

const Handle = createContext<HandleCtx | null>(null)

type ListProps<T extends string> = {
  ids: T[]
  onReorder: (ids: T[]) => void
  layout?: 'list' | 'grid'
  renderOverlay?: (id: T) => ReactNode
  children: ReactNode
}

export function SortableList<T extends string>({ ids, onReorder, layout = 'grid', renderOverlay, children }: ListProps<T>) {
  const [active, setActive] = useState<T | null>(null)
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={(e) => setActive(e.active.id as T)}
      onDragCancel={() => setActive(null)}
      onDragEnd={({ active: a, over }) => {
        setActive(null)
        if (!over || a.id === over.id) return
        onReorder(arrayMove(ids, ids.indexOf(a.id as T), ids.indexOf(over.id as T)))
      }}
    >
      <SortableContext items={ids} strategy={layout === 'list' ? verticalListSortingStrategy : rectSortingStrategy}>
        {children}
      </SortableContext>
      {renderOverlay && <DragOverlay>{active ? renderOverlay(active) : null}</DragOverlay>}
    </DndContext>
  )
}

export function SortableItem({ id, children, className = '' }: { id: string; children: ReactNode; className?: string }) {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = useSortable({ id })

  return (
    <div
      ref={setNodeRef}
      className={`sortable ${isDragging ? 'dragging' : ''} ${className}`}
      style={{ transform: CSS.Translate.toString(transform), transition }}
    >
      <Handle.Provider value={{ attributes, listeners, setActivatorNodeRef }}>{children}</Handle.Provider>
    </div>
  )
}

/** Grip button that drags the nearest SortableItem; renders nothing outside one. */
export function DragHandle({ className = '' }: { className?: string }) {
  const ctx = useContext(Handle)
  const { t } = useI18n()
  if (!ctx) return null

  return (
    <button
      type="button"
      ref={ctx.setActivatorNodeRef}
      className={`drag-handle ${className}`}
      title={t.layout.drag}
      {...ctx.attributes}
      {...ctx.listeners}
      aria-label={t.layout.drag}
    >
      <GripIcon />
    </button>
  )
}

export function GripIcon({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden className="grip-icon">
      {[6, 12, 18].map((y) => (
        <g key={y} fill="currentColor">
          <circle cx="9" cy={y} r="1.7" />
          <circle cx="15" cy={y} r="1.7" />
        </g>
      ))}
    </svg>
  )
}
