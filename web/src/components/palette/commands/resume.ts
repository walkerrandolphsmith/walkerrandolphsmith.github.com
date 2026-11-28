import { LuDownload } from 'react-icons/lu'

import sitemetadata from '@/data/sitemetadata'

import { downloadFile } from '../download'
import type { PaletteCommand } from '../types'

const RESUME_PDF = sitemetadata.resumePdf

/** Download resume: one action, no results. It saves the resume PDF. */
const resumeCommand: PaletteCommand = {
  id: 'resume',
  title: 'Download resume',
  description: 'Save the resume as a PDF file',
  icon: LuDownload,
  keywords: ['cv', 'pdf', 'resume', 'download', 'save'],
  run: actions => downloadFile(RESUME_PDF, actions),
}

export default resumeCommand
