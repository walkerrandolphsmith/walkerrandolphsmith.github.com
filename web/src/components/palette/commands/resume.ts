import { LuDownload } from 'react-icons/lu'

import type { PaletteCommand } from '../types'

export const RESUME_PDF = '/Walker_Smith_Resume.pdf'

/** Download resume: one action, no results. It saves the resume PDF. */
const resumeCommand: PaletteCommand = {
  id: 'resume',
  title: 'Download resume',
  description: 'Save the resume as a PDF file',
  icon: LuDownload,
  keywords: ['cv', 'pdf', 'resume', 'download', 'save'],
  run: actions => {
    const link = document.createElement('a')
    link.href = RESUME_PDF
    link.download = RESUME_PDF.slice(1)
    link.dataset.test = 'palette-resume-download'
    document.body.appendChild(link)
    link.click()
    link.remove()
    actions.close()
  },
}

export default resumeCommand
