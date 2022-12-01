//
// настройки проекта
//

// состояние разработки сайта
const production = true
// папка на хостинге
const project_folder = 'astafevayu'
const template_folder =
	'public_html/wp-content/themes/twentytwentyone'
const folder = `${project_folder}/${template_folder}`

//
// SRC правила
//

// index
const index_src = ['app/_template/index.php']

// header
const header_src = [
	'app/_template/header-top.php',
	'app/menu/*.html',
	'app/_template/header-bottom.php',
]

// main
const main_src = [
	'app/banner/*.html',
	'app/about/*.html',
	'app/products/videouroki.html',
	'app/products/client.html',
	'app/products/vody.html',
	'app/products/treningi.html',
	'app/products/indi.html',
	'app/products/sopr.html',
]
// footer
const footer_src = [
	'app/_template/footer-top.php',

	'app/contacts/*.html',
	'app/ur-contacts/*.html',
	// source
	'app/_template/*.html',
	'app/form__modal-callback/*.html',
	'app/progress-bar/*.html',
	'app/go-top--quadr/*.html',

	'app/_template/footer-bottom.php',
]

// articles
const articles_src_info = ['app/_info-page/info.html']
const articles_src_polz = ['app/_info-page/polz.html']
const articles_src_conf = ['app/_info-page/conf.html']
const articles_src_dest = ['app/_info-page/']

// php
const php_src = ['app/form__modal-callback/index.php']

// js
const js_src = ['app/_template/*.js', 'app/**/*.js']

// sass
const sass_src = [
	'app/_template/_preset.sass',
	'app/**/_preset.sass',
	'app/_template/*.sass',
	'app/**/*.sass',
]

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
const files_src = ['app/**/*.doc'] // files
// fonts
const fonts_src = [
	'app/_template/fonts/**/*.eot',
	'app/_template/fonts/**/*.svg',
	'app/_template/fonts/**/*.ttf',
	'app/_template/fonts/**/*.woff',
	'app/_template/fonts/**/*.woff2',
]

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
const co_08858 = {
	host: '188.225.40.227',
	login: 'co08858',
	pass: 'co63466346',
}
const base_ftp = odinpromptt

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

// неиспользуемые
const sync = require('browser-sync').create() // build локал хоста

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

// build index.php
const build_index = () => {
	return src(index_src)
		.pipe(concat('index.php'))
		.pipe(
			html_min({
				collapseWhitespace: true,
				removeComments: true,
				removeTagWhitespace: true,
				ignoreCustomFragments: [/<svg.*\/svg>/, /<\?php.*\?>/],
			})
		)
		.pipe(access.dest(`${folder}`))
}

// build header.php
const build_header = () => {
	return src(header_src)
		.pipe(concat('header.php'))
		.pipe(
			html_min({
				collapseWhitespace: true,
				removeComments: true,
				removeTagWhitespace: true,
				ignoreCustomFragments: [/<svg.*\/svg>/, /<\?php.*\?>/],
			})
		)
		.pipe(access.dest(`${folder}`))
}

// build footer.php
const build_footer = () => {
	return src(footer_src)
		.pipe(concat('footer.php'))
		.pipe(
			html_min({
				collapseWhitespace: true,
				removeComments: true,
				removeTagWhitespace: true,
				ignoreCustomFragments: [/<svg.*\/svg>/, /<\?php.*\?>/],
			})
		)
		.pipe(access.dest(`${folder}`))
}

// build articles html
const build_articles_info = () => {
	return src(articles_src_info)
		.pipe(concat('min_info.html'))
		.pipe(
			html_min({
				collapseWhitespace: true,
				removeComments: true,
				removeTagWhitespace: true,
				ignoreCustomFragments: [/<svg.*\/svg>/, /<\?php.*\?>/],
			})
		)
		.pipe(dest(articles_src_dest))
}
const build_articles_polz = () => {
	return src(articles_src_polz)
		.pipe(concat('min_polz.html'))
		.pipe(
			html_min({
				collapseWhitespace: true,
				removeComments: true,
				removeTagWhitespace: true,
				ignoreCustomFragments: [/<svg.*\/svg>/, /<\?php.*\?>/],
			})
		)
		.pipe(dest(articles_src_dest))
}
const build_articles_conf = () => {
	return src(articles_src_conf)
		.pipe(concat('min_conf.html'))
		.pipe(
			html_min({
				collapseWhitespace: true,
				removeComments: true,
				removeTagWhitespace: true,
				ignoreCustomFragments: [/<svg.*\/svg>/, /<\?php.*\?>/],
			})
		)
		.pipe(dest(articles_src_dest))
}

// build form.php
const build_form = () => {
	return src(php_src)
		.pipe(concat('form.php'))
		.pipe(access.dest(`${folder}`))
}

// build main.php
const build_main = async () => {
	return src(main_src)
		.pipe(concat('main.php'))
		.pipe(
			html_min({
				collapseWhitespace: true,
				removeComments: true,
				removeTagWhitespace: true,
				ignoreCustomFragments: [/<svg.*\/svg>/, /<\?php.*\?>/],
			})
		)
		.pipe(access.dest(`${folder}`))
}

//
// сбор всех scss из папки src и перенос css в папку дист
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
const export_files = () => {
	return src(files_src).pipe(access.dest(`${folder}/files`))
}
const export_fonts = () => {
	return src(fonts_src).pipe(access.dest(`${folder}/fonts`))
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
	// html
	watch(header_src, series(build_header))
	watch(index_src, series(build_index))
	watch(main_src, series(build_main))
	watch(footer_src, series(build_footer))

	watch(articles_src_info, series(build_articles_info))
	watch(articles_src_polz, series(build_articles_polz))
	watch(articles_src_conf, series(build_articles_conf))

	// css, js
	watch(sass_src, series(build_sass))
	watch(js_src, series(build_js))

	// other
	watch(php_src, series(build_form))
	watch(images_src, series(export_images))
	watch(json_src, series(export_json))
	watch(files_src, series(export_files))
}

//
// объявление функции для консоли
//

exports.min = series(get_min_img) // минимизация всех изображений в папке src

// выполнение всех программ и ватчинг
exports.default = series(
	build_sass,
	build_js,

	build_index,
	build_header,
	build_main,
	build_footer,
	build_form,

	// переделать
	build_articles_info,
	build_articles_polz,
	build_articles_conf,

	export_images,
	export_json,
	export_fonts,
	export_files,

	toWatch
)
