<div align="center">
  <img src="./public/header.png" alt="OnePortal" />
  <h2>OnePortal</h2>
  <p><em>OneDrive public directory listing forked from <a href="https://github.com/lyc8503/onedrive-cf-index-ng">onedrive-cf-index-ng</a>, powered by Cloudflare and Next.js</em></p>

  <img src="https://img.shields.io/badge/OneDrive-2C68C3?style=flat&logo=microsoft-onedrive&logoColor=white" alt="OneDrive" />
  <img src="https://img.shields.io/badge/Cloudflare-f38020?style=flat&logo=Cloudflare&logoColor=white" alt="Cloudflare" />
  <img src="https://img.shields.io/badge/Next.js-black?style=flat&logo=next.js&logoColor=white" alt="Next.js" />
  <a href="https://github.com/lyc8503/onedrive-cf-index-ng/wiki"><img src="https://img.shields.io/badge/Documentation-black?style=flat&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABeUlEQVRIie2VwUrDQBCGZ5ZubNmS0Ba9tF6CUqTHpg+g+AhCn8R30DfpM3jRezdHoZJroaBJQ2qgsIEdD7YSsCtJVBTxP87u/t/u7M4swDcLTQNSSseyLFbERCmlPc9LCgF83z/jnE9s294vvk+AJEmesiwbe553awQEQbCXZVnY7/ebjBXa/Ju01jCbzVIA6AwGA7WN1/KT4jg+6vV6TcYYpGlKq9UKiQgAAOr1OnU6HWNKGWPQarWa8/n8GADudwIQ0UJ89QjDEKMoOiEitRm7tm37gnNuPAUiAiJa+VjNNJmIYDgcPiAiAQD4vh9tT1NG5RJdQT8PkFKak/5ZgJTyUgjxPJ1Ob4josArAeMmWZYHrulftdhvX6/X5YrEwPtFKgG63C7ApxEajga7rVvH/BZf8D/hjACJSVRpabj1su+9OgBAiiOM41VqXNtdaw3K5TIUQQT7+rjqllKec84njOAdlAEmSPCqlxqPR6O5DQA70JZ/+t+sFAb2R22dSZ7wAAAAASUVORK5CYII=" alt="Documentation" /></a>
</div>

## What's different
- More environment variables
- Improve security by:
  - allowing to use TOTP instead of Password
  - set custom AES secret key and client secret in environment variables
- Better user interface
- Edge function caching for faster load times
- Updated dependencies

*Special thanks to the original author of od-cf-index-ng [@lyc8503](https://github.com/lyc8503) and author of onedrive-vercel-index [@spencerwooo](https://github.com/spencerwooo) and all contributors.*


## TL;DR

Showcase, share, preview, and download files inside *your* OneDrive with OnePortal

- Completely free to host 💸
- Superfast ⚡ and responsive 💦
- Takes less than 15 minutes to set up ⏱️
- Highly customisable ⚒️

🍌 More importantly, we are pretty (●'◡'●)

## 🚀 Quick start
### Fork Repository and Set Up Pages
1. **Fork the Repository**: Click [here](https://github.com/EFLKumo/OnePortal/fork) to fork the repository.
2. **Cloudflare Setup**: Navigate to [dash.cloudflare.com](https://dash.cloudflare.com/) -> `Compute (Workers)` -> `Workers and Pages`.
3. **Create a Project**: Click `Create`, select `Pages`, then choose `Connect to Git`. Follow the instructions to connect your forked `OnePortal` repository.
4. **Deployment Configuration**: Click `Begin Setup`, set the `Framework Preset` to `Next.js`, then click `Save and Deploy`.

### Configure the Project
The initial deployment may fail—this is expected. Follow these steps to configure the project:

1. **Add Variables and Secrets**:
   Go to your Pages project's settings -> `Variables and Secrets`, then add the following variables:
   - `USER_PRINCIPLE_NAME`: The OneDrive account email (case-sensitive).
   - `NEXT_PUBLIC_ICON` (optional): Custom icon path (use `.png` format).
   - `NEXT_PUBLIC_TITLE` (optional): Custom site title (useful for SEO).
   - `BASE_DIRECTORY`: The folder to be shared publicly, default is `/`.
   - `MAX_ITEMS` (optional): Maximum number of items displayed per directory.
   - `PDF_PREVIEW_URL_PREFIX` (optional): See `site.config.js` for details.
   - `NEXT_PUBLIC_FOOTER` (optional): Custom footer text.
   - `NEXT_PUBLIC_ROUTES` (optional): Define protected directories using passwords or TOTP. List directories separated by commas, excluding the `BASE_DIRECTORY`. For example, if `BASE_DIRECTORY` is `/Abc` and you want to protect `/Abc/Def`, use `/Def` here.
   - `NEXT_PUBLIC_EMAIL`: Your email in the format `mailto:i@example.com`. Leave empty if unused.
   - `NEXT_PUBLIC_LINKS` (optional): Links to show in the navigation bar (in JSON format). Refer to `site.config.js` for examples.

2. **Set Up KV Storage**:
   - Go to the Cloudflare Dashboard -> `Storage & Databases` -> `KV`, and create a KV namespace. Take note of its name.
   - Return to the Pages project's settings -> `Bindings`, and add a new binding:
     - `Variable name`: `OPT_KV`
     - `Namespace`: Select the KV namespace you just created.

3. **Adjust Runtime Settings**:
   - Go to the Pages project's settings -> `Runtime`.
   - Edit `Compatibility Flags` and add `nodejs_compat`.

4. **Retry Deployment**:
   - Navigate to the `Deployments` tab.
   - Click the three-dot menu on the failed deployment and select `Retry Deployment`.


*If you happen to like this project, please give it a star!* :3

## Demo

Live demo at [here](https://opt-demo.eflx.top).

![demo](./public/demo.png)

## Features

<table>
  <tbody>
    <tr>
      <td>
        <a
          href="https://pan.lyc8503.net/Demo/%F0%9F%93%84Documents"
          >👀 File preview</a
        >
      </td>
      <td>
        <a
          href="https://pan.lyc8503.net/Demo/%F0%9F%96%BC%EF%B8%8FPictures"
          >💠  List / Grid layouts</a
        >
      </td>
      <td>
        <a
          href="https://pan.lyc8503.net/Demo/%F0%9F%98%8EAnother%20Private%20Folder%20Password%20123"
          >🎥 Video and audio</a
        >
      </td>
    </tr>
    <tr>
      <td>PDF, EPUB, markdown, code, plain text</td>
      <td>For previewing images and documents with thumbnails</td>
      <td>mp4, mp3, ..., play online or with IINA, PotPlayer ... with subtitles!</td>
    </tr>
    <tr>
      <td>
        <a
          href="https://pan.lyc8503.net/Demo/%F0%9F%93%84Documents"
          >📄 Office preview</a
        >
      </td>
      <td><a href="https://pan.lyc8503.net/Demo/%F0%9F%93%84Documents">📝 README.md preview</a></td>
      <td><a href="https://pan.lyc8503.net/Demo/%F0%9F%96%BC%EF%B8%8FPictures">📑 Pagination</a></td>
    </tr>
    <tr>
      <td>docx, pptx, xlsx, ...</td>
      <td>Also renders code blocks, images with relative links, ...</td>
      <td>For folders with 200 or more items</td>
    </tr>
    <tr>
      <td><a href="https://pan.lyc8503.net/Demo/%F0%9F%98%8EAnother%20Private%20Folder%20Password%20123">🔒 Protected folders</a></td>
      <td><a href="https://pan.lyc8503.net/Demo">⏬ Multi-file download</a></td>
      <td>🔎 Native Search</td>
    </tr>
    <tr>
      <td>Password protected routes and files. <a href="https://ovi.swo.moe/docs/features/protected-folders">Details here</a></td>
      <td>
        Compress and download multiple files or folders.
        <a href="https://ovi.swo.moe/docs/features/multi-file-folder-download">Details here</a>
      </td>
      <td>
        Searching through your shared OneDrive files (with some caveats 🥺).
        <a href="https://ovi.swo.moe/docs/features/search-for-files-and-folders">Details here</a>
      </td>
    </tr>
  </tbody>
</table>

... and more:

- Streamlined deployment, without having to get your tokens manually anymore!
- Direct raw-file serving and hosting ...
- Full dark mode support, style and website customisations ...

> **Note**: This project is focused on showcasing and providing a way for others to download files from your OneDrive. Emphasis on **free** and **serverless**. If you have your own server / need WebDAV / use cloud providers other than OneDrive, checkout [alist](https://github.com/alist-org/alist).

## Documentation

Documentation is hosted at [GitHub Wiki](https://github.com/lyc8503/onedrive-cf-index-ng/wiki).

- [How can I get started and deploy?](https://github.com/lyc8503/onedrive-cf-index-ng/wiki/Getting-Started)
- [How can I configure ... ?](https://github.com/lyc8503/onedrive-cf-index-ng/wiki/Configurations)
- Where is feature ... ?
  - [Docs - Password-protected folders](https://ovi.swo.moe/docs/features/protected-folders)
  - [Docs - Multi-file and folder download](https://ovi.swo.moe/docs/features/multi-file-folder-download)
  - [Docs - Hosting files (images) directly](https://ovi.swo.moe/docs/features/hosting-images-directly)
  - [Docs - Search for files and folders](https://ovi.swo.moe/docs/features/search-for-files-and-folders)
  - [Docs - Load video subtitles](https://ovi.swo.moe/docs/features/load-video-subtitles)
- [I deployed this before, how can I upgrade to the latest version?](https://ovi.swo.moe/docs/migration/updating-to-latest-version)
- I didn't find a solution / My problem is unique?

  **Please open an issue for help, before that make sure that you have searched for existing/solved issues.**

## Server-*less* (free)?

Yes! Completely free with no backend server what-so-ever.

## License

[MIT](LICENSE)

## Some TODOs
- [x] More environment variable settings
- [x] Support TOTP
- [x] Hide API clientId and secret
- [x] Better UI
- [x] Update dependencies and migrate codes
- [x] Support Cloudflare-proxied downloading / raw / direct downloading
- [x] TODOs in files

<div align="center">
  <img src="./public/footer.png"  alt="footer"/>
  <em>made with ❤️ by <a href="https://eflx.top">EFL</a> & <a href="https://lyc8503.net">lyc8503</a> & <a href="https://spencerwoo.com">spencer woo</a> and contributors</em>
</div>


