//
// настройки проекта
//

// состояние разработки сайта
const production = true
// папка на хостинге
const project_folder = 'hs-h2'
const template_folder = 'public_html'
const folder = `${project_folder}/${template_folder}`

//
// SRC правила
//

// titles
let title_src = {} // var-s
const title_src_for_watch = ['app/title/data.json']

// header
const header_top_src = ['app/__template/header-top.html']

const header_bottom_src = [
  'app/__template/header-bottom.html',
  'app/menu/*.html',
]

// main
const main_top_src = ['app/__template/main-top.html']
// header-bottom
const main_bottom_src = ['app/__template/main-bottom.html']

// footer
const footer_src = [
  'app/footer/*.html',
  'app/callback--fixed-btn/*.html',
  // source
  'app/distributions/*.html',
  'app/__template/svg-style.html',
  'app/go-top/*.html',
  'app/form__modal-callback/*.html',
  `app/gallery/modal.html`,
  // php
  'app/**/*.php',
  // template
  'app/__template/footer-bottom.html',
]

const get_file_names = async () => {
  return await JSON.parse(fs.readFileSync(`./data.json`)).data
}

const file_names = {
  pages: [
    'index', // главная [0]
    'svp', // статьи [1]
    'franshiza', // документы [2]
    'documents', // документы [3]
    'contacts', // контакты [4]
    'o-nas', // о нас [5]
    'oferta', // oferta [6]
  ],
  products: [
    'svp1000', // svp 1000 [1]
    'svp3000', // svp 3000 [2]
    'svp5000', // svp 3000 [3]
  ],
}

const file_folders = {
  pages: `${folder}/html/`,
  products: `${folder}/html/product/`,
}

// main
const main_src = [
  //
  // pages
  //

  // index
  {
    file_name: file_names.pages[0],
    file_folder: file_folders.pages,
    src: [
      `app/banner/*.html`,
      'app/nasha-produktciya/*.html',
      'app/text/index.html',
      'app/vygodno-umno-dalnovidno/*.html',
      'app/video/*.html',
      'app/okupaemost/*.html',
    ],
  },

  // stati
  {
    file_name: file_names.pages[1],
    file_folder: file_folders.pages,
    src: [
      'app/text/kak_rabotaet_svp.html',
      'app/text/chto_daet_ustanovka_svp.html',
      'app/text/economiya.html',
      'app/text/moshnost.html',
      'app/text/nadejnost.html',
      'app/text/ekologichnost.html',
      'app/text/svp_ili_gbo.html',
      'app/text/ustanovka_svp.html',
      'app/okupaemost/*.html',
      'app/text/transport.html',
    ],
  },

  // franshiza
  {
    file_name: file_names.pages[2],
    file_folder: file_folders.pages,
    src: [`app/franshiza/*.html`],
  },

  // documents
  {
    file_name: file_names.pages[3],
    file_folder: file_folders.pages,
    src: [`app/documents/*.html`],
  },

  // contacts
  {
    file_name: file_names.pages[4],
    file_folder: file_folders.pages,
    src: [`app/contacts/*.html`],
  },

  // o-nas
  {
    file_name: file_names.pages[5],
    file_folder: file_folders.pages,
    src: [`app/o-nas/*.html`],
  },

  // oferta
  {
    file_name: file_names.pages[6],
    file_folder: file_folders.pages,
    src: [`app/oferta/*.html`],
  },

  //
  // products
  //

  // svp1000
  {
    file_name: file_names.products[0],
    file_folder: file_folders.products,
    src: [`app/product/${file_names.products[0]}.html`],
  },

  // svp3000
  {
    file_name: file_names.products[1],
    file_folder: file_folders.products,
    src: [`app/product/${file_names.products[1]}.html`],
  },

  // svp5000
  {
    file_name: file_names.products[2],
    file_folder: file_folders.products,
    src: [`app/product/${file_names.products[2]}.html`],
  },
]

// js
const js_src = [
  'app/assets/js/swiper.js',
  'app/assets/js/app.js',
  'app/__template/*.js',
  'app/**/_preset.js',
  'app/**/*.js',
]

// css
const css_src = [
  'app/assets/css/fonts.css',
  'app/assets/css/swiper.css',
  'app/assets/css/tailwind.css',
  'app/assets/css/style.css',
]

// sass
const sass_src = [
  'app/__template/_preset.sass',
  'app/**/_preset.sass',
  'app/__template/**/*.sass',
  'app/**/*.sass',
]

// htaccess_src
const htaccess_src = ['app/__template/.htaccess']

//images
const images_src = [
  'app/**/*.jpg',
  'app/**/*.svg',
  'app/**/*.png',
  'app/**/*.webp',
  'app/**/*.gif',
  'app/**/*.ico',
]

const json_src = ['app/**/*.json'] // json
const files_src = ['app/**/*.doc', 'app/**/*.pdf'] // files
const video_src = ['app/**/*.mp4'] // video
const fontes_src = [
  'app/**/*.eot',
  'app/**/*.ttf',
  'app/**/*.woff',
  'app/**/*.woff2',
] // fontes

// доступы к хостингу
const odinpromptt = {
  host: '188.225.21.131',
  login: 'odinpromptt',
  pass: 'RRram73689977368997',
}
const balnyishop = {
  host: '92.53.96.71',
  login: 'balnyishop',
  pass: 'Rram73689977368997',
}
const base_ftp = balnyishop

//
// подключение модулей
//

const { src, dest, series, watch } = require('gulp') // галп
const sass = require('gulp-sass')(require('sass'))
const csso = require('gulp-csso')
const html_min = require('gulp-htmlmin')
const auto_prefixer = require('gulp-autoprefixer')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify-es').default
const image_min = require('gulp-imagemin')
const ftp = require('vinyl-ftp')
const del = require('del')
const set_header = require('gulp-header')
const set_footer = require('gulp-footer')
const gulp_if = require('gulp-if')
const fs = require('fs') // чтение файлов

//
// основное тело галпа
//

// функция подключения к ФТП
const get_ftp_access = () => {
  return ftp.create({
    host: `${base_ftp.host}`,
    user: `${base_ftp.login}`,
    pass: `${base_ftp.pass}`,
  })
}
const access = get_ftp_access()

//
// clear all folders in ftp
//
const clear_ftp = async () => {
  return await access.rmdir(`${folder}`, function (err) {
    console.log(err, 'clear folders')
  })
}

//
// создание titles
//
const build_titles = async () => {
  const titles = await JSON.parse(fs.readFileSync(`./app/title/data.json`))

  for (const key in titles) {
    const data = `<title>${titles[key]}</title>`

    await fs.writeFile(`app/title/pages/${key}.html`, data, (err) => {
      if (err) console.log(err)
    })
  }

  for (const key in titles) {
    title_src[key] = `app/title/pages/${key}.html`
  }
  for (let i = 0; i < main_src.length; i++) {
    if (!title_src[main_src[i].file_name])
      title_src[main_src[i].file_name] = 'app/title/pages/empty.html'
  }
}

//
// создание html
//
const build_page = async (i) => {
  return src(
    [
      ...header_top_src,
      title_src[main_src[i].file_name],
      ...header_bottom_src,
      ...main_top_src,
      ...main_src[i].src,
      ...main_bottom_src,
      ...footer_src,
    ],
    { allowEmpty: true }
  )
    .pipe(concat(`${main_src[i].file_name}.php`))
    .pipe(access.dest(`${main_src[i].file_folder}`))
}
const build_pages = async () => {
  for (let i = 0; i < main_src.length; i++) {
    await build_page(i)
  }
  return true
}

//
// сбор всех sass из папки src и перенос css в папку дист
//
const build_css = () => {
  return src(css_src)
    .pipe(concat('assets.min.css'))
    .pipe(
      auto_prefixer({
        overrideBrowserslist: 'last 2 versions',
      })
    )
    .pipe(concat('assets.min.css'))
    .pipe(csso())
    .pipe(access.dest(`${folder}/css`))
}
//
// сбор всех sass из папки src и перенос css в папку дист
//
const build_sass = () => {
  return src(sass_src)
    .pipe(concat('style.sass'))
    .pipe(
      sass({
        indentedSyntax: false,
      })
    )
    .pipe(
      auto_prefixer({
        overrideBrowserslist: 'last 2 versions',
      })
    )
    .pipe(concat('style.min.css'))
    .pipe(gulp_if(!production, csso()))
    .pipe(access.dest(`${folder}/css`))
}

//
// сбор всех js из папки src и перенос их в папку дист
//
const build_js = () => {
  return src(js_src)
    .pipe(concat('script.min.js'))
    .pipe(gulp_if(!production, uglify()))
    .pipe(access.dest(`${folder}/js`))
}

//
// сбор всех фаилов и перенос их в папку дист
//
const export_images = () => {
  return src(images_src)
    .pipe(
      gulp_if(
        !production,
        image_min([
          image_min.gifsicle({ interlaced: true }),
          image_min.mozjpeg({
            quality: 75,
            progressive: true,
          }),
          image_min.optipng({
            optimizationLevel: 5,
          }),
          image_min.svgo({
            plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
          }),
        ])
      )
    )
    .pipe(access.dest(`${folder}/images`))
}
const export_json = () => {
  return src(json_src).pipe(access.dest(`${folder}/json`))
}
const export_fontes = () => {
  return src(fontes_src).pipe(access.dest(`${folder}/font`))
}
const export_files = () => {
  return src(files_src).pipe(access.dest(`${folder}/files`))
}
const export_video = () => {
  return src(video_src).pipe(access.dest(`${folder}/video`))
}
const export_htaccess = () => {
  return src(htaccess_src).pipe(access.dest(`${folder}`))
}

//
// минимизация всех изображений в папке src/app и записывание их на то же место
//
const get_min_img = () => {
  return src('app/**/*')
    .pipe(
      image_min([
        image_min.gifsicle({ interlaced: true }),
        image_min.mozjpeg({
          quality: 75,
          progressive: true,
        }),
        image_min.optipng({
          optimizationLevel: 5,
        }),
        image_min.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(dest('app/'))
}

//
// to watch
//

const toWatch = () => {
  for (let i = 0; i < main_src.length; i++) {
    watch(
      main_src[i].src,
      series(async () => await build_pages(main_src[i]))
    )
  }
  watch(footer_src, series(build_pages))
  watch(header_top_src, series(build_pages))
  watch(header_bottom_src, series(build_pages))

  watch(title_src_for_watch, series(build_titles, build_pages))

  watch(css_src, series(build_css))
  watch(sass_src, series(build_sass))
  watch(js_src, series(build_js))

  watch(images_src, series(export_images))
  watch(json_src, series(export_json))
  watch(files_src, series(export_files))
  watch(fontes_src, series(export_fontes))
  watch(video_src, series(export_video))

  watch(htaccess_src, series(export_htaccess))
}

//
// объявление функции для консоли
//

exports.min = series(get_min_img) // минимизация всех изображений в папке src
exports.clear = series(clear_ftp) // минимизация всех изображений в папке src

// выполнение всех программ и ватчинг
exports.default = series(
  build_titles,
  build_pages,

  build_css,
  build_sass,
  build_js,

  // export_images,
  export_json,
  // export_fontes,
  // export_video,

  export_htaccess,
  export_files,

  toWatch
)
