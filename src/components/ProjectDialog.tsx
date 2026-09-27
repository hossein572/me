import { useEffect, useRef, useState } from 'react'
import { ArrowUpLeft, Check, X } from 'lucide-react'
import type { Project } from '../data'

type Props = { project: Project; onClose: () => void }

export default function ProjectDialog({ project, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    const dialog = dialogRef.current
    const previousFocus = document.activeElement as HTMLElement | null
    const oldOverflow = document.body.style.overflow
    dialog?.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog?.close()
      document.body.style.overflow = oldOverflow
      previousFocus?.focus({ preventScroll: true })
    }
  }, [])

  return (
    <dialog
      ref={dialogRef}
      className="project-dialog"
      aria-labelledby="project-dialog-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          const rect = event.currentTarget.getBoundingClientRect()
          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          )
            onClose()
        }
      }}
    >
      <div className="dialog-topbar">
        <span>نگاهی نزدیک‌تر به پروژه</span>
        <button className="icon-button" onClick={onClose} aria-label="بستن جزئیات پروژه">
          <X size={21} />
        </button>
      </div>
      <div
        className={`dialog-image ${imageLoaded ? 'is-loaded' : ''}`}
        style={{ background: project.color }}
      >
        <img
          src={project.image}
          alt={project.imageAlt}
          width="900"
          height="640"
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      <div className="dialog-content">
        <div className="eyebrow">
          {project.label} <span> / </span> {project.year}
        </div>
        <h2 id="project-dialog-title">{project.title}</h2>
        <p className="dialog-role">نقش من: {project.role}</p>
        <div className="tags" dir="ltr">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <h3>چالش پروژه</h3>
        <p>{project.challenge}</p>
        <h3>راه‌حل طراحی</h3>
        <p>{project.solution}</p>
        <ul className="feature-list">
          {project.features.map((feature) => (
            <li key={feature}>
              <Check size={18} />
              {feature}
            </li>
          ))}
        </ul>
        <p className="sample-notice">
          این پروژه یک نمونهٔ نمایشی برای معرفی سبک طراحی است؛ محصول تجاری یا دموی آنلاین ندارد.
        </p>
        <a className="button button-primary" href="#contact" onClick={onClose}>
          پروژهٔ مشابهی در ذهن دارید؟
          <ArrowUpLeft size={20} />
        </a>
      </div>
    </dialog>
  )
}
