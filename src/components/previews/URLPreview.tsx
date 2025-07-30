import { useRouter } from 'next/router'
import { DownloadButton } from '@/components/DownloadBtnGroup'
import FourOhFour from '@/components/FourOhFour'
import Loading from '@/components/Loading'
import useFileContent from '@/utils/fetchOnMount'
import { DownloadBtnContainer, PreviewContainer } from './Containers'

const parseDotUrl = (content: string): string | undefined => {
  return content
    .split('\n')
    .find(line => line.startsWith('URL='))
    ?.split('=')[1]
}

const TextPreview = () => {
  const { asPath } = useRouter()

  const { response: content, error, validating } = useFileContent(`/api/raw?path=${asPath}`, asPath)
  if (error) {
    return (
      <PreviewContainer>
        <FourOhFour errorMsg={error} />
      </PreviewContainer>
    )
  }

  if (validating) {
    return (
      <PreviewContainer>
        <Loading loadingText={'Loading file content...'} />
      </PreviewContainer>
    )
  }

  if (!content) {
    return (
      <PreviewContainer>
        <FourOhFour errorMsg={'File is empty.'} />
      </PreviewContainer>
    )
  }

  return (
    <div>
      <PreviewContainer>
        <pre className="overflow-x-scroll p-0 text-sm md:p-3">{content}</pre>
      </PreviewContainer>
      <DownloadBtnContainer>
        <div className="flex justify-center">
          <DownloadButton
            onClickCallback={() => window.open(parseDotUrl(content) ?? '')}
            btnColor="blue"
            btnText={'Open URL'}
            btnIcon="external-link-alt"
            btnTitle={`Open URL ${' ' + (parseDotUrl(content) ?? '')}`}
          />
        </div>
      </DownloadBtnContainer>
    </div>
  )
}

export default TextPreview
