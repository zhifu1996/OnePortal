import { useRouter } from 'next/router'

import type { FC } from 'react'
import DownloadButtonGroup from '@/components/DownloadBtnGroup'
import type { OdFileObject } from '@/types'
import { getStoredToken } from '@/utils/protectedRouteHandler'
import { DownloadBtnContainer, PreviewContainer } from './Containers'

const ImagePreview: FC<{ file: OdFileObject }> = ({ file }) => {
  const { asPath } = useRouter()
  const token = getStoredToken(asPath)

  return (
    <>
      <PreviewContainer>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="mx-auto"
          src={`/api/raw?path=${asPath}${token ? `&odpt=${encodeURIComponent(token)}` : ''}`}
          alt={file.name}
          width={file.image?.width}
          height={file.image?.height}
        />
      </PreviewContainer>
      <DownloadBtnContainer>
        <DownloadButtonGroup />
      </DownloadBtnContainer>
    </>
  )
}

export default ImagePreview
