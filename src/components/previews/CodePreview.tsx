import { useRouter } from 'next/router'
import type { FC } from 'react'
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow, tomorrowNightEighties } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import useSystemTheme from 'react-use-system-theme'
import DownloadButtonGroup from '@/components/DownloadBtnGroup'
import FourOhFour from '@/components/FourOhFour'
import Loading from '@/components/Loading'
import useFileContent from '@/utils/fetchOnMount'
import { getLanguageByFileName } from '@/utils/getPreviewType'
import { DownloadBtnContainer, PreviewContainer } from './Containers'

const CodePreview: FC<{ file: any }> = ({ file }) => {
  const { asPath } = useRouter()
  const { response: content, error, validating } = useFileContent(`/api/raw?path=${asPath}`, asPath)

  const theme = useSystemTheme('dark')

  if (error) {
    return (
      <PreviewContainer>
        <FourOhFour errorMsg={error} />
      </PreviewContainer>
    )
  }
  if (validating) {
    return (
      <>
        <PreviewContainer>
          <Loading loadingText={'Loading file content...'} />
        </PreviewContainer>
        <DownloadBtnContainer>
          <DownloadButtonGroup />
        </DownloadBtnContainer>
      </>
    )
  }

  return (
    <>
      <PreviewContainer>
        <SyntaxHighlighter
          language={getLanguageByFileName(file.name)}
          style={theme === 'dark' ? tomorrowNightEighties : tomorrow}
        >
          {content}
        </SyntaxHighlighter>
      </PreviewContainer>
      <DownloadBtnContainer>
        <DownloadButtonGroup />
      </DownloadBtnContainer>
    </>
  )
}

export default CodePreview
