//
// настройки проекта
//

// состояние разработки сайта
const production = false

// папка на хостинге
const project_folder = 'trikota24'
const template_folder = 'public_html/design/template'
const folder = `${project_folder}/${template_folder}`

//
// SRC правила
//

// header
const header_src = ['app/contacts/*.html', 'app/menu/*.html']

// main
const main_html = [
	// index
	{
		type: 'page',
		id: 1,
		src: [
			'app/logo/*.html',
			'app/side-wrapper/*.html',
			'app/articles/row-1.html',
			'app/articles/row-2.html',
			'app/articles/row-3.html',
			'app/about/*.html',
			'app/form__feedback/*.html',
			'app/contacts-2/*.html',
		],
	},
	// litsenziya
	{
		type: 'category',
		id: 103,
		src: [
			'app/side-wrapper/*.html',
			'app/litsenziya/*.html',
			'app/contacts-2/*.html',
		],
	},
	// idei
	{
		type: 'category',
		id: 104,
		src: [
			'app/side-wrapper/*.html',
			'app/idea/*.html',
			'app/articles/row-1.html',
			'app/articles/row-2.html',
			'app/contacts-2/*.html',
		],
	},
	// franchajzing
	{
		type: 'category',
		id: 106,
		src: [
			'app/side-wrapper/*.html',
			'app/franchajzing/*.html',
			'app/contacts-2/*.html',
		],
	},
	// proizvoditeli
	{
		type: 'page',
		id: 34,
		src: [
			'app/side-wrapper/*.html',
			'app/proizvoditeli/*.html',
			'app/mktu/28.html',
			'app/mktu/25.html',
			'app/mktu/35.html',
			'app/contacts-2/*.html',
		],
	},
	// optovye-kompanii
	{
		type: 'page',
		id: 35,
		src: [
			'app/side-wrapper/*.html',
			'app/optovye-kompanii/*.html',
			'app/mktu/28.html',
			'app/mktu/25.html',
			'app/mktu/35.html',
			'app/contacts-2/*.html',
		],
	},
	// roznichnye-magaziny
	{
		type: 'page',
		id: 36,
		src: [
			'app/side-wrapper/*.html',
			'app/roznichnye-magaziny/*.html',
			'app/mktu/28.html',
			'app/mktu/25.html',
			'app/mktu/35.html',
			'app/contacts-2/*.html',
		],
	},
	// reklama
	{
		type: 'page',
		id: 37,
		src: [
			'app/side-wrapper/*.html',
			'app/reklama/*.html',
			'app/mktu/35.html',
			'app/mktu/28.html',
			'app/mktu/25.html',
			'app/contacts-2/*.html',
		],
	},
	// mir-detstva-2021
	{
		type: 'page',
		id: 38,
		src: [
			'app/side-wrapper/*.html',
			'app/mir-detstva-2021/*.html',
			'app/contacts-2/*.html',
		],
	},
	// fips
	{
		type: 'page',
		id: 39,
		src: [
			'app/side-wrapper/*.html',
			'app/fips/*.html',
			'app/contacts-2/*.html',
		],
	},
]

// footer
const footer_src = [
	'app/menu/*.html',
	'app/privat_policy/*.html',
	// source
	'app/form__modal-callback/*.html',
	'app/gallery/*.html',
	'app/**/*.php',
]

// js
const js_src = ['app/_template/*.js', 'app/**/*.js']

// sass
const sass_src = [
	'app/_template/_preset.sass',
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
const sync = require('browser-sync').create() // создание локал хоста

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

// создание header.tpl
const build_header = () => {
	return src(header_src)
		.pipe(concat('header.tpl'))
		.pipe(
			html_min({
				collapseWhitespace: true,
				removeComments: true,
				removeTagWhitespace: true,
				ignoreCustomFragments: [/<svg.*\/svg>/],
			})
		)
		.pipe(access.dest(`${folder}/html`))
}

// создание footer.tpl
const build_footer = () => {
	return src(footer_src)
		.pipe(concat('footer.tpl'))
		.pipe(
			html_min({
				collapseWhitespace: true,
				removeComments: true,
				removeTagWhitespace: true,
				ignoreCustomFragments: [/<svg.*\/svg>/],
			})
		)
		.pipe(access.dest(`${folder}/html`))
}

//
// создание index_content.tpl
//

// очистка папки local
const del_local = () => {
	return del('local/')
}

// создание локальных индексов
const build_local_file = (data) => {
	return src(data.src)
		.pipe(concat(`${data.type}_${data.id}.html`))
		.pipe(
			html_min({
				collapseWhitespace: true,
				removeComments: true,
				removeTagWhitespace: true,
				ignoreCustomFragments: [/<svg.*\/svg>/],
			})
		)
		.pipe(set_header(`{if $${data.type}->id == ${data.id}}`))
		.pipe(set_footer(`{/if}`))
		.pipe(dest('local/'))
}

// создание папки local
const build_local = async () => {
	for (let i = 0; i < main_html.length; i++) {
		await build_local_file(main_html[i])
	}
	return true
}

// экспорт папки local
const build_main = () => {
	return src('local/*.html')
		.pipe(concat('index_content.tpl'))
		.pipe(access.dest(`${folder}/html`))
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

const get_src_min_img = () => {
	return src('src/**/*')
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
		.pipe(dest('src/'))
}
const get_app_min_img = () => {
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
	for (let i = 0; i < main_html.length; i++) {
		watch(
			main_html[i].src,
			series(build_local, build_main, build_local, build_main)
		)
	}
	watch(header_src, series(build_header))
	watch(footer_src, series(build_footer))
	watch(sass_src, series(build_sass))
	watch(js_src, series(build_js))

	watch(images_src, series(export_images))
	watch(json_src, series(export_json))
	watch(files_src, series(export_files))
}

//
// объявление функции для консоли
//

exports.del = series(del_local) // очистка папки локал
exports.min = series(get_app_min_img, get_src_min_img) // минимизация всех изображений в папке src

// выполнение всех программ и ватчинг
exports.default = series(
	del_local,
	build_local,
	build_sass,
	build_js,

	build_header,
	build_footer,

	export_images,
	export_json,
	export_fonts,
	export_files,

	build_main,
	toWatch
)
