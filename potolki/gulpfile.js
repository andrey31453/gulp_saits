//
// настройки проекта
//

// состояние разработки сайта
const production = true

// папка на хостинге
const project_folder = 'simpla_2'
const template_folder = 'public_html/design/template'
const folder = `${project_folder}/${template_folder}`

//
// SRC правила
//

// header
const header_src = [
	'app/menu__left__fixed__list-moving/*.html',
	'app/background-stars/*.html',
	'app/banner__multi/*.html',
]

// index.html
const index_html = [
	// index
	{
		type: 'page',
		id: 1,
		src: [
			'app/catalog/pvh.html',
			'app/catalog/tkan.html',
			'app/catalog/potolki.html',
			'app/catalog/carniz-potoloch.html',
			'app/catalog/carniz-dlya-shtor.html',
			'app/catalog/osveshenie.html',
			'app/between-section/section-1.html',
			'app/text/15-let.html',
			'app/tabs/index.html',
		],
	},
	//
	// categoryes
	//

	// ПВХ потолки cat-pvh
	{
		type: 'category',
		id: 9,
		src: [
			'app/category-heading/cat-pvh.html',
			'app/category-images/cat-pvh.html',
			'app/category-description/cat-pvh.html',
		],
	},
	// Глянцевый glyanec
	{
		type: 'category',
		id: 10,
		src: [
			'app/category-heading/glyanec.html',
			'app/category-images/glyanec.html',
			'app/category-description/glyanec.html',
		],
	},
	// Сатиновый satin
	{
		type: 'category',
		id: 11,
		src: [
			'app/category-heading/satin.html',
			'app/category-images/satin.html',
			'app/category-description/satin.html',
		],
	},
	// Матовый matov
	{
		type: 'category',
		id: 12,
		src: [
			'app/category-heading/matov.html',
			'app/category-images/matov.html',
			'app/category-description/matov.html',
		],
	},
	// Тканевые потолки cat-tkan
	{
		type: 'category',
		id: 13,
		src: [
			'app/category-heading/cat-tkan.html',
			'app/category-images/cat-tkan.html',
			'app/category-description/cat-tkan.html',
		],
	},
	// Descor descor
	{
		type: 'category',
		id: 14,
		src: [
			'app/category-heading/descor.html',
			'app/category-images/descor.html',
			'app/category-description/descor.html',
		],
	},
	// Clipso clipso
	{
		type: 'category',
		id: 15,
		src: [
			'app/category-heading/clipso.html',
			'app/category-images/clipso.html',
			'app/category-description/clipso.html',
		],
	},
	// натяжные потолки natyazhnye-potolki
	{
		type: 'category',
		id: 38,
		src: [
			'app/category-heading/natyazhnye-potolki.html',
			'app/category-images/natyazhnye-potolki.html',
			'app/category-description/natyazhnye-potolki.html',
		],
	},
	// Прозрачная и полупрозрачные prozr
	{
		type: 'category',
		id: 16,
		src: [
			'app/category-heading/prozr.html',
			'app/category-images/prozr.html',
			'app/category-description/prozr.html',
		],
	},
	// Теневой ten
	{
		type: 'category',
		id: 17,
		src: [
			'app/category-heading/ten.html',
			'app/category-images/ten.html',
			'app/category-description/ten.html',
		],
	},
	// Световой light
	{
		type: 'category',
		id: 18,
		src: [
			'app/category-heading/light.html',
			'app/category-images/light.html',
			'app/category-description/light.html',
		],
	},
	// Бесщелевой besshel
	{
		type: 'category',
		id: 19,
		src: [
			'app/category-heading/besshel.html',
			'app/category-images/besshel.html',
			'app/category-description/besshel.html',
		],
	},
	// Парящий paryash
	{
		type: 'category',
		id: 20,
		src: [
			'app/category-heading/paryash.html',
			'app/category-images/paryash.html',
			'app/category-description/paryash.html',
		],
	},
	// Демпферные dempfer
	{
		type: 'category',
		id: 21,
		src: [
			'app/category-heading/dempfer.html',
			'app/category-images/dempfer.html',
			'app/category-description/dempfer.html',
		],
	},
	// Ниши в потолке nishi
	{
		type: 'category',
		id: 22,
		src: [
			'app/category-heading/nishi.html',
			'app/category-images/nishi.html',
			'app/category-description/nishi.html',
		],
	},
	// Двухуровневый dvuhurovn
	{
		type: 'category',
		id: 23,
		src: [
			'app/category-heading/dvuhurovn.html',
			'app/category-images/dvuhurovn.html',
			'app/category-description/dvuhurovn.html',
		],
	},
	// Потолочные ниши potoloch-nishi
	{
		type: 'category',
		id: 24,
		src: [
			'app/category-heading/potoloch-nishi.html',
			'app/category-images/potoloch-nishi.html',
			'app/category-description/potoloch-nishi.html',
		],
	},
	// Карниз carniz
	{
		type: 'category',
		id: 25,
		src: [
			'app/category-heading/carniz.html',
			'app/category-images/carniz.html',
			'app/category-description/carniz.html',
		],
	},
	// Потолочный карниз с блендой на натяжном потолке carniz-blenda
	{
		type: 'category',
		id: 26,
		src: [
			'app/category-heading/carniz-blenda.html',
			'app/category-images/carniz-blenda.html',
			'app/category-description/carniz-blenda.html',
		],
	},
	// Скрытый потолочный карниз carniz-skryt
	{
		type: 'category',
		id: 27,
		src: [
			'app/category-heading/carniz-skryt.html',
			'app/category-images/carniz-skryt.html',
			'app/category-description/carniz-skryt.html',
		],
	},
	// Скрытый потолочный карниз для штор с закрытым брусом carniz-shtor-zakr
	{
		type: 'category',
		id: 28,
		src: [
			'app/category-heading/carniz-shtor-zakr.html',
			'app/category-images/carniz-shtor-zakr.html',
			'app/category-description/carniz-shtor-zakr.html',
		],
	},
	// Универсальный скрытый потолочный карниз для штор carniz-shtor-universal
	{
		type: 'category',
		id: 29,
		src: [
			'app/category-heading/carniz-shtor-universal.html',
			'app/category-images/carniz-shtor-universal.html',
			'app/category-description/carniz-shtor-universal.html',
		],
	},
	// Освещение osveshenie
	{
		type: 'category',
		id: 30,
		src: [
			'app/category-heading/osveshenie.html',
			'app/category-images/osveshenie.html',
			'app/category-description/osveshenie.html',
		],
	},
	// Светильники scetilniki
	{
		type: 'category',
		id: 31,
		src: [
			'app/category-heading/scetilniki.html',
			'app/category-images/scetilniki.html',
			'app/category-description/scetilniki.html',
		],
	},
	// Встраиваемые cat-built-in
	{
		type: 'category',
		id: 32,
		src: [
			'app/category-heading/cat-built-in.html',
			'app/category-images/cat-built-in.html',
			'app/category-description/cat-built-in.html',
		],
	},
	// Накладной cat-waybills
	{
		type: 'category',
		id: 33,
		src: [
			'app/category-heading/cat-waybills.html',
			'app/category-images/cat-waybills.html',
			'app/category-description/cat-waybills.html',
		],
	},
	// Трековые система cat-trek
	{
		type: 'category',
		id: 34,
		src: [
			'app/category-heading/cat-trek.html',
			'app/category-images/cat-trek.html',
			'app/category-description/cat-trek.html',
		],
	},
	// Люстры cat-chandelier
	{
		type: 'category',
		id: 35,
		src: [
			'app/category-heading/cat-chandelier.html',
			'app/category-images/cat-chandelier.html',
			'app/category-description/cat-chandelier.html',
		],
	},
	// Световые линии svet-lin
	{
		type: 'category',
		id: 36,
		src: [
			'app/category-heading/svet-lin.html',
			'app/category-images/svet-lin.html',
			'app/category-description/svet-lin.html',
		],
	},
	// Лайт боксы l-box
	{
		type: 'category',
		id: 37,
		src: [
			'app/category-heading/l-box.html',
			'app/category-images/l-box.html',
			'app/category-description/l-box.html',
		],
	},

	//
	// pages
	//

	// lighting
	{
		type: 'page',
		id: 12,
		src: ['app/gallery__multi-one-page/lighting.html'],
	},
	// portfolio
	{
		type: 'page',
		id: 7,
		src: [
			'app/category-heading/portfolio.html',
			'app/tabs/portfolio.html',
		],
	},
	// calculator
	{
		type: 'page',
		id: 10,
		src: ['app/calculator/*.html'],
	},
]

// footer
const footer_src = [
	'app/form/*.html',
	'app/between-section/section-4.html',
	'app/footer__catalog__pages/*.html',
	'app/footer-line/*.html',
	// source
	'app/go-top__quadr/*.html',
	'app/gallery__multi-one-page/modal.html',
]

// js
const js_src = ['template/*.js', 'app/**/*.js', 'revisions/*.js']

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

const json_src = ['app/**/*.json'] // json
const files_src = ['app/**/*.doc'] // files
// fonts
const fonts_src = [
	'template/fonts/**/*.eot',
	'template/fonts/**/*.svg',
	'template/fonts/**/*.ttf',
	'template/fonts/**/*.woff',
	'template/fonts/**/*.woff2',
]

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
const del_images = async () => {
	await access.rmdir(`${folder}/images`, (err) => {
		return export_images()
	})
	return export_images()
}
const export_images = () => {
	return src(images_src).pipe(access.dest(`${folder}/images`))
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
	// del_images,

	build_header,
	build_footer,
	build_local,
	build_index,
	build_local,
	build_index,
	build_sass,
	build_js,

	// del_images,
	export_images,
	export_json,
	export_files,
	export_fonts,

	toWatch
)
