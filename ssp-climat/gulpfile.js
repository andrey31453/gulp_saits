//
// настройки проекта
//

// состояние разработки сайта
const production = true

// папка на хостинге
const project_folder = 'ssp-climat'
const template_folder = 'public_html/design/template'
const folder = `${project_folder}/${template_folder}`

//
// SRC правила
//

// header
const header_src = [
	'app/menu-top/*.html',
	'app/contacts/*.html',
	'app/svg-links/*.html',
]

// index.html
const index_html = [
	// index
	{
		type: 'page',
		id: 1,
		src: [
			'app/slider/*.html',
			'app/advantages/*.html',
			'app/callback/*.html',
			'app/catalog/*.html',
			'app/about/*.html',
			'app/form/in-body.html',
			'app/partners/*.html',
		],
	},
]

// footer
const footer_src = [
	'app/footer--pages/*.html',
	'app/footer--catalog/*.html',
	'app/footer--contacts/*.html',
	// source
	'app/form/modal.html',
	'app/form/fixed-btn.html',
	'app/go-top__quadr/*.html',
]

// templates
const templates_src = [
	// index
	'app/template/index.tpl',

	// catalog
	'app/template/line.tpl',
	'app/template/filter.tpl',
	'app/template/products.tpl',

	// products
	'app/template/index_product.tpl',
]

// js
const js_src = ['template/*.js', 'app/**/*.js', 'revisions/*.js']

// css
const css_src = [
	'app/template/template.css',
	'app/template/page_product.css',
	'app/template/page_products.css',
]

// sass
const sass_src = [
	'template/_preset.sass',
	'revisions/_preset.sass',
	'template/*.sass',
	'app/**/_preset.sass',
	'app/**/*.sass',
	'revisions/*.sass',
]

//images
const images_src = [
	'./**/*.jpg',
	'./**/*.jpeg',
	'./**/*.svg',
	'./**/*.png',
	'./**/*.webp',
	'./**/*.ico',
]

const json_src = ['app/**/*.json'] // json
const files_src = ['app/**/*.doc'] // files

// доступы к хостингу
const odinpromptt = {
	host: '188.225.21.131',
	login: 'odinpromptt',
	pass: 'RRram73689977368997',
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
	for (let i = 0; i < index_html.length; i++) {
		await build_local_file(index_html[i])
	}
	return true
}

// экспорт папки local
const build_index = () => {
	return src('local/*.html')
		.pipe(concat('index_content.tpl'))
		.pipe(access.dest(`${folder}/html`))
}

//
// сбор всех tpl и перенос их в template на ftp
//
const build_template = async (file_link) => {
	return await src(file_link).pipe(access.dest(`${folder}/html`))
}
const build_templates = async () => {
	for (let i = 0; i < templates_src.length; i++) {
		await build_template(templates_src[i])
	}
}

//
// сбор всех css из папки src и перенос на ftp
//
const export_css_fail = (fail_link) => {
	return src(fail_link)
		.pipe(gulp_if(!production, csso()))
		.pipe(access.dest(`${folder}/css`))
}

const build_css = async () => {
	for (let i = 0; i < css_src.length; i++) {
		await export_css_fail(css_src[i])
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

//
// минимизация всех изображений в папке src/app и записывание их на то же место
//
const get_min_img = () => {
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
		.pipe(dest('./'))
}

//
// to watch
//
const toWatch = () => {
	for (let i = 0; i < index_html.length; i++) {
		watch(
			index_html[i].src,
			series(build_local, build_index, build_local, build_index)
		)
	}
	watch(templates_src, series(build_templates))
	watch(header_src, series(build_header))
	watch(footer_src, series(build_footer))
	watch(sass_src, series(build_sass))
	watch(js_src, series(build_js))
	watch(css_src, series(build_css))

	watch(images_src, series(export_images))
	watch(json_src, series(export_json))
	watch(files_src, series(export_files))
}

//
// объявление функции для консоли
//
exports.del = series(del_local) // очистка папки локал
exports.min = series(get_min_img) // минимизация всех изображений в папке проекта

// выполнение всех программ и ватчинг
exports.default = series(
	del_local,
	build_sass,

	build_header,
	build_footer,
	build_local,
	build_index,
	build_local,
	build_index,
	build_templates,
	build_css,

	build_js,

	export_images,
	export_json,
	export_files,

	toWatch
)
