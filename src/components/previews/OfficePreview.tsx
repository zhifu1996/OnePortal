import { useRouter } from 'next/router'
import Preview from 'preview-office-docs'
import { type FC, useEffect, useRef, useState } from 'react'
import DownloadButtonGroup from '@/components/DownloadBtnGroup'
import type { OdFileObject } from '@/types'
import { getBaseUrl } from '@/utils/getBaseUrl'
import { getStoredToken } from '@/utils/protectedRouteHandler'
import { DownloadBtnContainer } from './Containers'

const OfficePreview: FC<{ file: OdFileObject }> = ({ file }) => {
  const { asPath } = useRouter()
  const token = getStoredToken(asPath)

  const docContainer = useRef<HTMLDivElement>(null)
  const [docContainerWidth, setDocContainerWidth] = useState(600)

  const docUrl = encodeURIComponent(
    `${getBaseUrl()}/api/raw?path=${asPath}${token ? `&odpt=${encodeURIComponent(token)}` : ''}`,
  )

  useEffect(() => {
    setDocContainerWidth(docContainer.current ? docContainer.current.offsetWidth : 600)
  }, [])

  return (
    <div>
      <div className="overflow-scroll" ref={docContainer} style={{ maxHeight: '90vh' }}>
        <Preview url={docUrl} width={docContainerWidth.toString()} height="600" />
      </div>
      <DownloadBtnContainer>
        <DownloadButtonGroup />
      </DownloadBtnContainer>
    </div>
  )
}

export default OfficePreview
