// gallery__pages
{
	const gp = document.getElementsByClassName('__gp')[0]
	if (gp) {
		const galleryContainer = gp.getElementsByClassName(
			'gp__gallery-container'
		)
		// выводимые в галлерее img
		const urlBanners = [
			'/design/template/images/gallery__pages/logos/svoya-komp.svg',
			'/design/template/images/gallery__pages/logos/ulitka.png',
			'/design/template/images/gallery__pages/logos/sveterra.svg',
			'/design/template/images/gallery__pages/logos/zabava.svg',
			'/design/template/images/gallery__pages/logos/loftblog.png',
			'/design/template/images/gallery__pages/logos/fitodacha.png',
			'/design/template/images/gallery__pages/logos/diana.png',
			'/design/template/images/gallery__pages/logos/beauty.png',
			'/design/template/images/gallery__pages/logos/sherwood.svg',
			'/design/template/images/gallery__pages/logos/buhmyt.svg',
			'/design/template/images/gallery__pages/logos/sinara.svg',
			'/design/template/images/gallery__pages/logos/altay.png',
			'/design/template/images/gallery__pages/logos/jubilee.svg',
			'/design/template/images/gallery__pages/logos/soika.png',
		]
		const textBanners = [
			'Ресторан Своя компания',
			'Кафе Веселая улитка',
			'Территория света Sveterra',
			'Салон красоты Забава',
			'Канал LoftBlog',
			'Fito-Dacha',
			'Салон красоты Diana',
			'Салон красоты',
			'Отель Sherwood',
			'Бухгалтерия Мытищи',
			'Синара Девелопмент',
			'Отель Алтай',
			'Кафе Jubilee',
			'Кафе Голубая сойка',
		]

		// кол-во картинок на 1 листе
		let imgQuantityInRow = 2
		let marginValue = 10
		if (window.innerWidth > 600) {
			imgQuantityInRow = 4
			marginValue = 20
		}
		if (window.innerWidth > 900) {
			imgQuantityInRow = 6
			marginValue = 30
		}
		// кол-во листов
		const listQuantity = Math.ceil(
			urlBanners.length / imgQuantityInRow
		)

		// генерация содержимого галлереи
		for (let i = 0; i < listQuantity; i++) {
			const page = document.createElement('div')
			page.classList.add('gp__page')
			page.classList.add('gp__btn-anim')
			for (let e = 0; e < imgQuantityInRow; e++) {
				const imgContent = document.createElement('div')
				imgContent.classList.add('gp__page__item')
				if (urlBanners[e + i * imgQuantityInRow] !== undefined) {
					imgContent.innerHTML = `
						<img class='gp__page__img' src='${
							urlBanners[e + i * imgQuantityInRow]
						}'>
						<div class='gp__page__text'>${
							textBanners[e + i * imgQuantityInRow]
						}</div>
					`
				}
				page.appendChild(imgContent)
			}
			galleryContainer[0].appendChild(page)
		}

		// генерация блока с нумерацией
		const galleryNumberling = gp.getElementsByClassName(
			'gp__gallery-numberling'
		)
		const galleryNumberlingInner = document.createElement('div')
		galleryNumberlingInner.classList.add(
			'gp__gallery-numberling-inner'
		)
		galleryNumberlingInner.innerHTML = `
			<div class='gp__gallery-numberling__btn __prev'>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21000 20500"><path d="M12070.31 19114.06l-1040.63 1040.63c-440.63 440.63-1153.13 440.63-1589.06 0l-9112.5-9107.81c-440.63-440.63-440.63-1153.13 0-1589.06l9112.5-9112.51c440.63-440.63 1153.13-440.63 1589.06 0l1040.63 1040.63c445.31 445.31 435.94 1171.88-18.75 1607.81L6403.12 8375H19875c623.44 0 1125 501.56 1125 1125v1500c0 623.44-501.56 1125-1125 1125H6403.12l5648.44 5381.25c459.38 435.94 468.75 1162.5 18.75 1607.81z"/></svg>
			</div>
			<div class='gp__gallery-numberling__number __active-number'>1</div>
			<div class='gp__gallery-numberling__number __pages-quantity'>/${listQuantity}</div>
			<div class='gp__gallery-numberling__btn __next'>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21000 20500"><path d="M8929.69 1385.94L9970.32 345.31c440.63-440.63 1153.13-440.63 1589.06 0l9112.5 9107.81c440.63 440.63 440.63 1153.13 0 1589.06l-9112.5 9112.51c-440.63 440.63-1153.13 440.63-1589.06 0l-1040.63-1040.63c-445.31-445.31-435.94-1171.88 18.75-1607.81L14596.88 12125H1125c-623.44 0-1125-501.56-1125-1125V9500c0-623.44 501.56-1125 1125-1125h13471.88L8948.44 2993.75c-459.38-435.94-468.75-1162.5-18.75-1607.81z"/></svg>
			</div>
		`
		galleryNumberling[0].appendChild(galleryNumberlingInner)

		// задание параметров
		let numberActive = 0
		const page = gp.getElementsByClassName('gp__page')

		// задание параметров для gallery numberling
		galleryNumberling[0].style.marginRight = `${
			page.length * marginValue
		}px`

		// задание параметров для page
		const pageAddOptions = (numberActive) => {
			let e = 0
			let num = page.length - numberActive
			for (let i = numberActive; i < page.length; i++) {
				page[i].style.inset = `
				${e * marginValue}px
				${(num + numberActive - 1) * marginValue}px
				${e * marginValue}px
				${e * marginValue * 3}px`
				page[i].style.opacity = `${1 - e / 10}`
				page[i].style.zIndex = num
				page[i].classList.remove('__outing')
				e++
				num--
			}
		}
		pageAddOptions(numberActive)

		// Очистка параметров для блоков с __outing
		const pageClearOptions = (numberActive) => {
			for (let i = 0; i < numberActive; i++) {
				page[i].style.opacity = ``
				page[i].style.zIndex = `${page.length + 1}`
				page[i].classList.add('__outing')
			}
		}
		pageClearOptions()

		// смена номера в блоке с нумерацией
		const divActiveNumber =
			gp.getElementsByClassName('__active-number')
		const changeActiveNumber = (numberActive) => {
			divActiveNumber[0].innerHTML = `${numberActive + 1}`
		}

		// смена активного page
		const changePage = () => {
			pageAddOptions(numberActive)
			pageClearOptions(numberActive)
			changeActiveNumber(numberActive)
			checkAction(numberActive)
		}

		// эвент на кнопки листания
		const galleryBtn = document.getElementsByClassName(
			'gp__gallery-numberling__btn'
		)
		galleryBtn[0].addEventListener('click', () => {
			if (numberActive != 0) {
				numberActive--
				changePage()
			}
		})
		galleryBtn[1].addEventListener('click', () => {
			if (numberActive != page.length - 1) {
				numberActive++
				changePage()
			}
		})

		// добавление __dont-action для стрелок в блоке с нумерацией
		const checkAction = () => {
			for (let i = 0; i < galleryBtn.length; i++) {
				if (numberActive == page.length - 1) {
					galleryBtn[0].classList.remove('__dont-action')
					galleryBtn[1].classList.add('__dont-action')
				} else if (numberActive == 0) {
					galleryBtn[0].classList.add('__dont-action')
					galleryBtn[1].classList.remove('__dont-action')
				} else {
					galleryBtn[0].classList.remove('__dont-action')
					galleryBtn[1].classList.remove('__dont-action')
				}
			}
		}
		checkAction()
	}
}
