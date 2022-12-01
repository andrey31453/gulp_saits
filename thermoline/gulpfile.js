//
// настройки проекта
//

// состояние разработки сайта
const production = true
// папка на хостинге
const project_folder = 'wp-1'
const template_folder =
	'public_html/wp-content/themes/twentytwentyone'
const folder = `${project_folder}/${template_folder}`

//
// SRC правила
//

// header
const header_src = [
	'app/_wordpress-parts/build/header-top.php',
	'app/menu/index.html',
	'app/_wordpress-parts/build/header-bottom.php',
]

// footer
const footer_src = [
	'app/_wordpress-parts/build/footer-top.php',

	// source
	'app/form__modal-callback/*.html',
	'app/go-top--quadr/*.html',
	'app/svg-style/*.html',

	'app/_wordpress-parts/build/footer-bottom.php',
]

// mains
const mains_data = require('./app/_template/data.json')

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

//
// export
//

//images
const images_src = [
	'app/**/*.jpg',
	'app/**/*.svg',
	'app/**/*.png',
	'app/**/*.webp',
	'app/**/*.gif',
	'app/**/*.ico',
]

// parts
const parts_src = ['app/_wordpress-parts/export/**/*.php']

// json
const json_src = ['app/**/*.json']

// files
const files_src = ['app/**/*.doc']

// fonts
const fonts_src = [
	'app/_template/fonts/**/*.eot',
	'app/_template/fonts/**/*.svg',
	'app/_template/fonts/**/*.ttf',
	'app/_template/fonts/**/*.woff',
	'app/_template/fonts/**/*.woff2',
]

//
// доступы к хостингу
//
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
const { src, dest, series, watch } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const csso = require('gulp-csso')
const html_min = require('gulp-htmlmin')
const auto_prefixer = require('gulp-autoprefixer')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify-es').default
const image_min = require('gulp-imagemin')
const ftp = require('vinyl-ftp')
const del = require('del')
const gulp_if = require('gulp-if')
const mysql = require('mysql2')

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

// build form.php
const build_form = () => {
	return src(php_src)
		.pipe(concat('form.php'))
		.pipe(access.dest(`${folder}`))
}

//
// build mains
//
const build_main = async (source, name) => {
	return await src(source)
		.pipe(concat(`${name}.html`))
		.pipe(
			html_min({
				collapseWhitespace: true,
				removeComments: true,
				removeTagWhitespace: true,
				ignoreCustomFragments: [/<svg.*\/svg>/, /<\?php.*\?>/],
			})
		)
		.pipe(access.dest(`${folder}/mains`))
}
const build_mains = async () => {
	for (const key in mains_data) {
		await build_main(mains_data[key].src, key)
	}
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
const export_parts = () => {
	return src(parts_src).pipe(access.dest(`${folder}`))
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
	watch(footer_src, series(build_footer))

	for (const key in mains_data) {
		watch(
			mains_data[key].src,
			series(async () => {
				await build_main(mains_data[key].src, key)
			})
		)
	}

	// css, js
	watch(sass_src, series(build_sass))
	watch(js_src, series(build_js))

	// other
	watch(php_src, series(build_form))
	watch(images_src, series(export_images))
	watch(json_src, series(export_json))
	watch(files_src, series(export_files))
	watch(parts_src, series(export_parts))
}

//
// объявление функции для консоли
//

exports.min = series(get_min_img) // минимизация всех изображений в папке src

// выполнение всех программ и ватчинг
exports.default = series(
	// build
	build_sass,
	build_js,

	build_header,
	build_footer,
	build_form,
	build_mains,

	// export
	export_images,
	export_json,
	export_fonts,
	export_files,
	export_parts,

	toWatch
)
