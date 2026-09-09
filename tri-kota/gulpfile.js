//
// настройки проекта
//

// состояние разработки сайта
const production = false

// папка локальной сборки
const local_dist = 'dist'
// путь к шаблону локально (совпадает с абсолютными путями /design/template/... в разметке)
const local_template = 'design/template'
// папка, куда складываются css/js/images/fonts/files/json
const folder = `${local_dist}/${local_template}`

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
		name: 'index',
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
		name: 'litsenziya',
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
		name: 'idei',
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
		name: 'franchajzing',
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
		name: 'proizvoditeli',
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
		name: 'optovye-kompanii',
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
		name: 'roznichnye-magaziny',
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
		name: 'reklama',
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
		name: 'mir-detstva-2021',
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
		name: 'fips',
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
	'app/form__modal-callback/*.html',
	'app/gallery/*.html',
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

//
// подключение модулей
//

const { src, dest, series, watch } = require('gulp') // галп
const fs = require('fs')
const { Transform } = require('stream')
const sass = require('gulp-sass')(require('sass'))
const csso = require('gulp-csso')
const html_min = require('gulp-htmlmin')
const auto_prefixer = require('gulp-autoprefixer')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify-es').default
const image_min = require('gulp-imagemin')
const del = require('del')
const set_header = require('gulp-header')
const set_footer = require('gulp-footer')
const gulp_if = require('gulp-if')

// неиспользуемые
const sync = require('browser-sync').create() // создание локал хоста

//
// основное тело галпа
//

//
// html-каркас страницы
//

const html_doctype = `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{{title}}</title>
<link rel="stylesheet" href="/design/template/css/style.min.css">
</head>
<body>
`

const html_close = `
<script src="/design/template/js/script.min.js"></script>
</body>
</html>
`

//
// очистка шаблонных тегов движка ({foreach}, {if}, {$var}) для статического просмотра
//

const clean_smarty = () => {
	return new Transform({
		objectMode: true,
		transform(file, enc, cb) {
			if (file.isBuffer()) {
				let content = file.contents.toString()
				content = content
					.replace(/\{foreach[^}]*\}/g, '')
					.replace(/\{\/foreach\}/g, '')
					.replace(/\{if[^}]*\}/g, '')
					.replace(/\{\/if\}/g, '')
					.replace(/\{\$[^}]*\}/g, '')
				file.contents = Buffer.from(content)
			}
			cb(null, file)
		},
	})
}

//
// сборка статических html-страниц
//

// временная папка для промежуточных файлов
const tmp_folder = 'local/'

// общий минификатор html
const html_minify = () =>
	html_min({
		collapseWhitespace: true,
		removeComments: true,
		removeTagWhitespace: true,
		ignoreCustomFragments: [/<svg.*\/svg>/],
	})

// сборка шапки во временный файл
const build_header_html = () => {
	return src(header_src)
		.pipe(concat('header.html'))
		.pipe(clean_smarty())
		.pipe(html_minify())
		.pipe(dest(tmp_folder))
}

// сборка подвала во временный файл
const build_footer_html = () => {
	return src(footer_src)
		.pipe(concat('footer.html'))
		.pipe(clean_smarty())
		.pipe(html_minify())
		.pipe(dest(tmp_folder))
}

//
// очистка папок сборки
//

// очистка временной папки
const del_local = () => {
	return del(tmp_folder)
}

// очистка папки локальной сборки
const del_dist = () => {
	return del(`${local_dist}/`)
}

// сборка одной страницы
const build_page = (data, header, footer) => {
	const title = data.name === 'index' ? 'Три Кота — trikota24.ru' : `${data.name} — trikota24.ru`
	return src(data.src)
		.pipe(concat('content.html'))
		.pipe(clean_smarty())
		.pipe(html_minify())
		.pipe(set_header(html_doctype.replace('{{title}}', title) + header))
		.pipe(set_footer(footer + html_close))
		.pipe(concat(`${data.name}.html`))
		.pipe(dest(local_dist))
}

// ожидание завершения потока
const stream_done = (stream) =>
	new Promise((resolve, reject) => {
		stream.on('end', resolve)
		stream.on('error', reject)
	})

// сборка всех страниц
const build_pages = async () => {
	const header = fs.readFileSync(`${tmp_folder}header.html`, 'utf8')
	const footer = fs.readFileSync(`${tmp_folder}footer.html`, 'utf8')
	await Promise.all(main_html.map((data) => stream_done(build_page(data, header, footer))))
	return true
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
		.pipe(dest(`${folder}/css`))
}

//
// сбор всех js из папки src и перенос их в папку дист
//
const build_js = () => {
	return src(js_src)
		.pipe(concat('script.min.js'))
		.pipe(gulp_if(!production, uglify()))
		.pipe(dest(`${folder}/js`))
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
		.pipe(dest(`${folder}/images`))
}
const export_json = () => {
	return src(json_src).pipe(dest(`${folder}/json`))
}
const export_files = () => {
	return src(files_src).pipe(dest(`${folder}/files`))
}
const export_fonts = () => {
	return src(fonts_src).pipe(dest(`${folder}/fonts`))
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
		watch(main_html[i].src, series(build_pages, sync_reload))
	}
	watch(header_src, series(build_header_html, build_pages, sync_reload))
	watch(footer_src, series(build_footer_html, build_pages, sync_reload))
	watch(sass_src, series(build_sass, sync_reload))
	watch(js_src, series(build_js, sync_reload))

	watch(images_src, series(export_images, sync_reload))
	watch(json_src, series(export_json, sync_reload))
	watch(files_src, series(export_files, sync_reload))
}

//
// локальный сервер (browser-sync)
//

// запуск локального сервера на папке dist
const sync_init = (done) => {
	sync.init({
		server: {
			baseDir: local_dist,
		},
		port: 3000,
		notify: false,
		open: true,
	})
	done()
}

// перезагрузка браузера после изменений
const sync_reload = (done) => {
	sync.reload()
	done()
}

//
// объявление функции для консоли
//

exports.del = series(del_local, del_dist) // очистка папок сборки
exports.min = series(get_app_min_img, get_src_min_img) // минимизация всех изображений в папке src

// сборка на локальный хост (одноразово, без watcher и сервера)
exports.build = series(
	del_local,
	del_dist,
	build_sass,
	build_js,

	build_header_html,
	build_footer_html,

	export_images,
	export_json,
	export_fonts,
	export_files,

	build_pages
)

// выполнение всех программ, запуск локального сервера и ватчинг
exports.default = series(
	del_local,
	del_dist,
	build_sass,
	build_js,

	build_header_html,
	build_footer_html,

	export_images,
	export_json,
	export_fonts,
	export_files,

	build_pages,
	sync_init,
	toWatch
)
