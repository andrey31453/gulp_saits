//
// настройки проекта
//

// версия сайта
let location = 'kor'
// 'myt' // 'balnyishop'
// 'kor'
// 'pushka'
// 'shelk'
// 'him'
// 'dol'

// footer-line__contacts
// forma
// top-menu__fixed

// состояние разработки сайта
const production = false

// папка локальной сборки (корень, который отдаёт browser-sync)
const local_dist = 'dist'
// путь к шаблону локально (совпадает с абсолютными путями /design/template/... в разметке)
const local_template = 'design/template'
// папка, куда складываются css/js/images/files/json
const folder = `${local_dist}/${local_template}`

//
// SRC правила
//

// хедер
const header_src = [
	`app/top-menu__fixed/${location}.html`,
	'app/banner-index/*.html',
]

// index.html
const index_html = [
	// index
	{
		type: 'page',
		id: 1,
		src: ['app/catalog__tab/*.html', 'app/faq/*.html'],
	},
	// разработка
	{
		type: 'category',
		id: 54,
		src: [
			'app/catalog__tab__calculate/*.html',
			'app/click-block/*.html',
			'app/gallery__pages/*.html',
		],
	},
	// продвижение
	{
		type: 'category',
		id: 67,
		src: ['app/pages/promotion.html'],
	},
	// сопровождение
	{
		type: 'category',
		id: 58,
		src: ['app/pages/soprovojdenie.html'],
	},
	// наши работы
	{
		type: 'category',
		id: 68,
		src: ['app/gallery-catalog/*.html'],
	},
]

// метаданные страниц для локальной статической сборки
// (имя файла и <title> для каждой страницы/категории из index_html)
const page_meta = {
	page_1: { name: 'index', title: 'Быстрые и легкие сайты' },
	category_54: { name: 'catalog/saiting-creating', title: 'Разработка сайтов' },
	category_67: { name: 'catalog/promotion', title: 'Продвижение сайтов' },
	category_58: { name: 'catalog/maintenance-of-sites', title: 'Сопровождение сайтов' },
	category_68: { name: 'catalog/our-work', title: 'Наши работы' },
}

const get_page_meta = (data) =>
	page_meta[`${data.type}_${data.id}`] || {
		name: `${data.type}_${data.id}`,
		title: `Страница ${data.id}`,
	}

//
// статические данные для локального превью
// (на боевом сайте их отдаёт движок: пункты меню из БД, а баннер и его
//  заголовок подставляет template.js по текущему URL)
//

// пункты меню шапки (категории в порядке вывода)
const static_categories = [
	{ id: 54, url: 'saiting-creating', name: 'Разработка' },
	{ id: 67, url: 'promotion', name: 'Продвижение' },
	{ id: 58, url: 'maintenance-of-sites', name: 'Сопровождение' },
	{ id: 68, url: 'our-work', name: 'Наши работы' },
]

// баннер (класс фона + заголовок) для каждой страницы
const banner_data = {
	page_1: {
		cls: '--index',
		heading:
			'<span>Быстрые</span> сайты<br><span>Легкий</span> дизайн<br><span>Эффективная</span> реклама',
	},
	category_54: {
		cls: '--saiting-creating',
		heading:
			'<span>Разработка</span> любой сложности<br><span>Доработка</span> с любого этапа<br><span>Креатив</span> так и прёт',
	},
	category_67: {
		cls: '--promotion',
		heading:
			'<span>Точечная</span> настройка<br><span>Высокая</span> конверсия<br><span>Стабильное</span> продвижение',
	},
	category_58: {
		cls: '--maintenance',
		heading: '<span>Позаботимся</span><br>О вашем сайте<br><span>Как о своём</span>',
	},
	category_68: {
		cls: '--our-work',
		heading:
			'<span>Большой опыт</span><br>Долгая история<br><span>Надежная компания</span>',
	},
}

// футер
const footer_src = [
	'app/forma/index.html',
	`app/forma/${location}.php`,
	'app/footer__pages-list/*.html',
	`app/footer-line__contacts/${location}.html`,
	// общие элементы
	'app/progress-bar/*.html',
	'app/go-top__quadr/*.html',
]

//images
const images_src = [
	'app/**/*.jpg',
	'app/__template/**/*.jpg',

	'app/**/*.svg',
	'app/__template/**/*.svg',

	'app/**/*.png',
	'app/__template/**/*.png',

	'app/**/*.webp',
	'app/__template/**/*.webp',

	'app/**/*.ico',
	'app/__template/**/*.ico',
]

// js
const js_src = ['app/__template/*.js', 'app/**/*.js']

// sass
const sass_src = [
	'app/__template/display-preset.sass',
	'app/__template/display-preset--day.sass',
	'app/__template/display-preset--night.sass',
	'app/**/display-preset.sass',
	'app/__template/*.sass',
	'app/**/*.sass',
]

const json_src = ['app/**/*.json'] // json
const files_src = ['app/**/*.doc'] // files

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
// очистка php/smarty-вставок для статического просмотра на локалхосте
//

const clean_tags = () => {
	return new Transform({
		objectMode: true,
		transform(file, enc, cb) {
			if (file.isBuffer()) {
				let content = file.contents.toString()
				content = content
					// php-блоки и короткие вставки
					.replace(/<\?php[\s\S]*?\?>/g, '')
					.replace(/<\?=[\s\S]*?\?>/g, '')
					.replace(/<\?[\s\S]*?\?>/g, '')
					// smarty-теги
					.replace(/\{php\}[\s\S]*?\{\/php\}/g, '')
					.replace(/\{\*[\s\S]*?\*\}/g, '')
					.replace(/\{foreach[^}]*\}/g, '')
					.replace(/\{\/foreach\}/g, '')
					.replace(/\{if[^}]*\}/g, '')
					.replace(/\{\/if\}/g, '')
					.replace(/\{elseif[^}]*\}/g, '')
					.replace(/\{else\}/g, '')
					.replace(/\{\$[^}]*\}/g, '')
					.replace(/\{literal\}/g, '')
					.replace(/\{\/literal\}/g, '')
				file.contents = Buffer.from(content)
			}
			cb(null, file)
		},
	})
}

//
// исправление постоянных ссылок на статические .html (для локального просмотра)
//

const fix_links = () => {
	return new Transform({
		objectMode: true,
		transform(file, enc, cb) {
			if (file.isBuffer()) {
				let content = file.contents.toString()
				// категории /catalog/{slug} -> /catalog/{slug}.html (с учётом якорей #...)
				for (let i = 0; i < index_html.length; i++) {
					const { name } = get_page_meta(index_html[i])
					if (name.indexOf('catalog/') === 0) {
						const slug = name.replace('catalog/', '')
						content = content.replace(
							new RegExp(`href="/catalog/${slug}(#[^"]*)?"`, 'g'),
							`href="/catalog/${slug}.html$1"`
						)
					}
				}
				// главная страница
				content = content.replace(/href="\/"/g, 'href="/index.html"')
				file.contents = Buffer.from(content)
			}
			cb(null, file)
		},
	})
}

//
// замена динамического smarty-меню шапки на статические пункты
//

const fix_menu = (active_id) => {
	return new Transform({
		objectMode: true,
		transform(file, enc, cb) {
			if (file.isBuffer()) {
				let content = file.contents.toString()
				const items = static_categories
					.map((c) => {
						const selected =
							active_id === c.id ? ' tmf__link--selected' : ''
						return `<li class='tmf__item tmf__catalog-item'><a class='tmf__link${selected}' href='/catalog/${c.url}.html'>${c.name}</a><span class='tmf__target-for-inner-menu'></span></li>`
					})
					.join('')
				// вырезаем всё от начала цикла категорий до блока "Контакты"
				content = content.replace(
					/\{foreach\s+\$categories[\s\S]*?(?=<li class='tmf__item tmf__item-contacts')/,
					items
				)
				file.contents = Buffer.from(content)
			}
			cb(null, file)
		},
	})
}

//
// подстановка статического баннера (класс фона + заголовок) для каждой страницы
//

const fix_banner = (key) => {
	const banner = banner_data[key]
	return new Transform({
		objectMode: true,
		transform(file, enc, cb) {
			if (file.isBuffer()) {
				let content = file.contents.toString()
				if (banner) {
					content = content.replace(
						'<section class="banner-index __bi">',
						`<section class="banner-index __bi ${banner.cls}">`
					)
					content = content.replace(
						/<h1 class="bi__heading __heading">[\s\S]*?<\/h1>/,
						`<h1 class="bi__heading __heading">${banner.heading}</h1>`
					)
				}
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
const build_header = () => {
	return src(header_src)
		.pipe(concat('header.html'))
		.pipe(dest(tmp_folder))
}

// сборка подвала во временный файл
const build_footer = () => {
	return src(footer_src)
		.pipe(concat('footer.html'))
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

// сборка контента одной страницы во временный файл
const build_local_file = (data) => {
	return src(data.src)
		.pipe(concat(`${data.type}_${data.id}.html`))
		.pipe(clean_tags())
		.pipe(dest(tmp_folder))
}

// ожидание завершения потока
const stream_done = (stream) =>
	new Promise((resolve, reject) => {
		stream.on('end', resolve)
		stream.on('error', reject)
	})

// сборка контента всех страниц во временные файлы
const build_local = async () => {
	for (let i = 0; i < index_html.length; i++) {
		await stream_done(build_local_file(index_html[i]))
	}
	return true
}

//
// сборка статических html-страниц (скелет + шапка + контент + подвал)
//

const page_skeleton = (title, header, content, footer) => `<!doctype html>
<html lang="ru">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>${title}</title>
	<link rel="shortcut icon" href="/design/template/images/__template/template-icon/favicon--day.ico">
	<link rel="stylesheet" href="/design/template/css/style.min.css">
</head>
<body>
	${header}
	${content}
	${footer}
	<script src="/design/template/js/script.min.js"></script>
</body>
</html>`

// сборка одной страницы
const build_page = (data, header, footer) => {
	const { name, title } = get_page_meta(data)
	const key = `${data.type}_${data.id}`
	// активный пункт меню выделяется на страницах категорий
	const active_id = data.type === 'category' ? data.id : null
	return src(`${tmp_folder}${data.type}_${data.id}.html`)
		.pipe(
			new Transform({
				objectMode: true,
				transform(file, enc, cb) {
					if (file.isBuffer()) {
						const html = page_skeleton(title, header, file.contents.toString(), footer)
						file.contents = Buffer.from(html)
					}
					cb(null, file)
				},
			})
		)
		.pipe(fix_menu(active_id))
		.pipe(fix_banner(key))
		.pipe(clean_tags())
		.pipe(html_minify())
		.pipe(fix_links())
		.pipe(concat(`${name}.html`))
		.pipe(dest(local_dist))
}

// сборка всех страниц
const build_pages = async () => {
	const header = fs.readFileSync(`${tmp_folder}header.html`, 'utf8')
	const footer = fs.readFileSync(`${tmp_folder}footer.html`, 'utf8')
	for (let i = 0; i < index_html.length; i++) {
		await stream_done(build_page(index_html[i], header, footer))
	}
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
	return src(images_src).pipe(dest(`${folder}/images`))
}
const export_json = () => {
	return src(json_src).pipe(dest(`${folder}/json`))
}
const export_files = () => {
	return src(files_src).pipe(dest(`${folder}/files`))
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
		watch(index_html[i].src, series(build_local, build_pages, sync_reload))
	}
	watch(header_src, series(build_header, build_pages, sync_reload))
	watch(footer_src, series(build_footer, build_pages, sync_reload))
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

	build_header,
	build_footer,
	build_local,

	export_images,
	export_json,
	export_files,

	build_pages
)

// выполнение всех программ, запуск локального сервера и ватчинг
exports.default = series(
	del_local,
	del_dist,
	build_sass,
	build_js,

	build_header,
	build_footer,
	build_local,

	export_images,
	export_json,
	export_files,

	build_pages,
	sync_init,
	toWatch
)
