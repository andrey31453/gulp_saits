//
// настройки проекта
//

// папка на хостинге
const project_folder = 'no-admin'
const template_folder = 'public_html'
const folder = `${project_folder}/${template_folder}`

const is_production = true
//
// SRC
//

// index
const pug_src = ['app/gallery--explosion/index.pug']

// index
const html_src = [
	// header
	'app/__template/header.php',
	// body
	'app/gallery--explosion/index.php',
	'app/gallery--vertical-slider/index.php',
	'app/gallery--cards/index.php',
	'app/drag-n-drop/index.php',
	'app/aim-game/index.php',
	'app/board/index.php',

	// footer
	'app/__template/footer.php',
]

// sass
const sass_src = [
	'app/__template/_preset.sass',
	'app/__template/_reset.sass',
	'app/**/_preset.sass',
	'app/__template/*.sass',
	'app/**/*.sass',
]

// js
const js_src = [
	'app/**/libs/*.js',
	'app/__template/*.js',
	'app/**/*.js',
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
	'app/__template/fonts/**/*.eot',
	'app/__template/fonts/**/*.svg',
	'app/__template/fonts/**/*.ttf',
	'app/__template/fonts/**/*.woff',
	'app/__template/fonts/**/*.woff2',
]
// htaccess_src
const htaccess_src = ['app/__template/.htaccess']

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

// новые
const сonnect = require('gulp-connect')
const pug = require('gulp-pug')
const data = require('gulp-data')
const clean_css = require('gulp-clean-css')
const plumber = require('gulp-plumber')
const svg_sprite = require('gulp-svg-sprite')

//
// основное тело галпа
//

// clear all folders in ftp
const clear_ftp = async () => {
	return await access.rmdir(`${folder}`, function (err) {
		console.log(err, 'clear folders')
	})
}

// функция подключения к ФТП
const get_ftp_access = () => {
	return ftp.create({
		host: `${base_ftp.host}`,
		user: `${base_ftp.login}`,
		pass: `${base_ftp.pass}`,
	})
}
const access = get_ftp_access()

// build html from pug
const build_html_from_pug = () => {
	return src(pug_src)
		.pipe(
			data(() => {
				return {
					__dirname: __dirname,
					require: require,
				}
			})
		)
		.pipe(pug())
		.pipe(concat('index.php'))
		.pipe(dest(`./app/gallery--explosion/`))
}

// build index.html
const build_html = () => {
	return src(html_src)
		.pipe(concat('index.php'))
		.pipe(
			html_min({
				collapseWhitespace: true,
				removeComments: true,
				removeTagWhitespace: true,
				ignoreCustomFragments: [/<svg.*\/svg>/, /<\?php.*\?>/],
			})
		)
		.pipe(access.dest(`${folder}/html`))
}

// build style.css
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
		.pipe(csso())
		.pipe(access.dest(`${folder}/css`))
}

//
// сбор всех js из папки src и перенос их в папку дист
//
const build_js = () => {
	return src(js_src)
		.pipe(concat('script.min.js'))
		.pipe(gulp_if(!is_production, uglify()))
		.pipe(access.dest(`${folder}/js`))
}

//
// сбор всех фаилов и перенос их в папку дист
//
const export_images = () => {
	return src(images_src)
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
const export_htaccess = () => {
	return src(htaccess_src).pipe(access.dest(`${folder}`))
}

//
// to watch
//

const to_watch = () => {
	// html
	watch(pug_src, series(build_html_from_pug))
	watch(html_src, series(build_html))

	// css, js
	watch(sass_src, series(build_sass))
	watch(js_src, series(build_js))

	// other
	watch(images_src, series(export_images))
	watch(json_src, series(export_json))
	watch(files_src, series(export_files))
	watch(fonts_src, series(export_fonts))
	watch(htaccess_src, series(export_htaccess))
}

//
// объявление функции для консоли
//
exports.clear = series(clear_ftp)

exports.default = series(
	// build
	build_html_from_pug,
	build_html,
	build_sass,
	build_js,

	// export
	export_images,
	export_json,
	export_fonts,
	export_files,
	export_htaccess,

	// watch
	to_watch
)
