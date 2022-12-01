// banner-index
{
	const bi = document.getElementsByClassName('__bi')[0]
	if (bi) {
		const bi_update = () => {
			const heading = bi.getElementsByClassName('__heading')[0]

			// index
			if (window.location.pathname == '/') {
				bi.classList.add('--index')
				if (window.location.hostname !== 'sait-pushka.ru') {
					heading.innerHTML = `
					<span>Быстрые</span> сайты
					<br><span>Легкий</span> дизайн
					<br><span>Эффективная</span> реклама
				`
				} else {
					heading.innerHTML = `
					Самые<span> быстрые</span> 
					<br>Сайты<span> на</span> 
					<br>Диком<span> западе</span> 
				`
				}
			}
			// saiting-creating
			else if (
				window.location.pathname == '/catalog/saiting-creating'
			) {
				bi.classList.add('--saiting-creating')
				heading.innerHTML = `
					<span>Разработка</span> любой сложности
					<br><span>Доработка</span> с любого этапа
					<br><span>Креатив </span>так и прёт
				`
			}
			// promotion
			else if (window.location.pathname == '/catalog/promotion') {
				bi.classList.add('--promotion')
				heading.innerHTML = `
					<span>Точечная</span> настройка
					<br><span>Высокая</span> конверсия
					<br><span>Стабильное</span> продвижение
				`
			}
			// maintenance
			else if (
				window.location.pathname == '/catalog/maintenance-of-sites'
			) {
				bi.classList.add('--maintenance')
				heading.innerHTML = `
					<span>Позаботимся</span>
					<br>О вашем сайте
					<br><span>Как о своём</span>
				`
			}
			// our-work
			else if (window.location.pathname == '/catalog/our-work') {
				bi.classList.add('--our-work')
				heading.innerHTML = `
					<span>Большой опыт</span>
					<br>Долгая история
					<br><span>Надежная компания</span>
				`
			}
		}

		window.addEventListener('DOMContentLoaded', bi_update)
	}
}
