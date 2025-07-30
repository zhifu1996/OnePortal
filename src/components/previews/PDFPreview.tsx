import { useRouter } from 'next/router'
import DownloadButtonGroup from '@/components/DownloadBtnGroup'
import { getBaseUrl } from '@/utils/getBaseUrl'
import { getStoredToken } from '@/utils/protectedRouteHandler'
import siteConfig from '~config/site.config'
import { DownloadBtnContainer } from './Containers'

const PDFEmbedPreview: React.FC<{ file: any }> = ({ file }) => {
  const { asPath } = useRouter()
  const token = getStoredToken(asPath)

  const pdfPath = encodeURIComponent(
    `${getBaseUrl()}/api/raw?path=${asPath}${token ? `&odpt=${encodeURIComponent(token)}` : ''}`,
  )

  const urlPrefix = siteConfig.PDFPreviewUrlPrefix
  const url = `${urlPrefix}${pdfPath}`

  return (
    <div>
      <div className="w-full overflow-hidden rounded" style={{ height: '90vh' }}>
        <iframe src={url} frameBorder="0" width="100%" height="100%"></iframe>
      </div>
      <DownloadBtnContainer>
        <DownloadButtonGroup />
      </DownloadBtnContainer>
    </div>
  )
}

export default PDFEmbedPreview
