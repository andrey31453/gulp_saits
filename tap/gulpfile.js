//
// настройки проекта
//

// состояние разработки сайта
const production = false

// папка на хостинге
const project_folder = 'src0'
const template_folder = 'public_html/design/template'
const folder = `${project_folder}/${template_folder}`

//
// SRC правила
//

// хедер
const header_src = ['app/menu__top/*.html']

// index.html
const index_html = [
	// index
	{
		type: 'page',
		id: 1,
		src: [
			'app/banner__slider/*.html',
			'app/catalog-list/*.html',
			'app/background-image-text/*.html',
		],
	},
	// контакты
	{
		type: 'page',
		id: 36,
		src: ['app/page-contacts/index.html'],
	},
	// Консольный кран на колонне
	{
		type: 'category',
		id: 3,
		src: ['app/category-pages/category-3.html'],
	},
	// Консольный кран настенный
	{
		type: 'category',
		id: 4,
		src: ['app/category-pages/category-4.html'],
	},
	// Однобалочные подвесные краны
	{
		type: 'category',
		id: 5,
		src: ['app/category-pages/category-5.html'],
	},
	// Двухбалочные подвесные краны
	{
		type: 'category',
		id: 6,
		src: ['app/category-pages/category-6.html'],
	},
	// Однобалочные крановые пути КВК
	{
		type: 'category',
		id: 7,
		src: ['app/category-pages/category-7.html'],
	},
	// Двухбалочные крановые пути КВК
	{
		type: 'category',
		id: 8,
		src: ['app/category-pages/category-8.html'],
	},
	// Однобалочные системы на опорной раме
	{
		type: 'category',
		id: 9,
		src: ['app/category-pages/category-9.html'],
	},
	// Двухбалочные системы на опорной раме
	{
		type: 'category',
		id: 10,
		src: ['app/category-pages/category-10.html'],
	},
]

// футер
const footer_src = [
	'app/form__cntrl/*.html',
	'app/page-contacts/map-for-footer.html',
	'app/footer__catalog__pages/*.html',
	'app/footerline__contacts/*.html',
	'app/go-top__quadr/*.html',
	'app/progress-bar/*.html',
]

//images
const images_src = [
	'app/**/*.jpg',
	'template/**/*.jpg',
	'revisions/**/*.jpg',

	'app/**/*.svg',
	'template/**/*.svg',
	'revisions/**/*.svg',

	'app/**/*.png',
	'template/**/*.png',
	'revisions/**/*.png',

	'app/**/*.webp',
	'template/**/*.webp',
	'revisions/**/*.webp',

	'app/**/*.ico',
	'template/**/*.ico',
	'revisions/**/*.ico',
]

// js
const js_src = ['template/*.js', 'app/**/*.js', 'revisions/*.js']

// sass
const sass_src = [
	'template/settings.sass',
	'revisions/settings.sass',
	'template/*.sass',
	'revisions/*.sass',
	'app/*/*.sass',
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
	return src(images_src).pipe(access.dest(`${folder}/images`))
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
	for (let i = 0; i < index_html.length; i++) {
		watch(
			index_html[i].src,
			series(build_local, build_index, build_local, build_index)
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
	build_header,
	build_footer,
	build_local,
	build_index,
	build_sass,
	build_js,

	export_images,
	export_json,
	export_files,

	toWatch
)
