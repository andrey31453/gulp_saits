{
  const distributions = document.getElementsByClassName('js__distributions')[0]
  const distributions_links = document.getElementsByClassName(
    'js__distributions-link'
  )

  if (distributions && distributions_links[0]) {
    // DOMs
    const items = document.getElementsByClassName('js__items')

    const citys = document.getElementsByClassName('js__city')
    const phones = document.getElementsByClassName('js__phone')
    const phone_hrefs = document.getElementsByClassName('js__phone-href')
    const adresses = document.getElementsByClassName('js__adress')
    const mails = document.getElementsByClassName('js__mail')
    const mail_hrefs = document.getElementsByClassName('js__mail-href')

    // vars
    const city_data = [
      {
        country: 'Россия',
        citys: [
          {
            name: 'Москва',
            adress:
              'г.&nbsp;Москва, 3-я&nbsp;Хорошёвская&nbsp;ул, <br/>д.&nbsp;2, стр&nbsp;1, ком&nbsp;34',
            mail: 'hs-h2@mail.ru',
            phone: '+7 925 416 44 44',
            phone_code: '+79254164444',
            insta: 'Rhs_h2',
            sait: false,
          },
          { type: !1 },
          {
            name: 'Астрахань',
            adress: 'г.&nbsp;Астрахань, Ул. Бэра 28а, офис 2',
            mail: 'hydrogen-30@mail.ru',
            phone: '+7 906 459 99 88',
            phone_code: '+79064599988',
            insta: 'hydrogen.rus',
            sait: false,
          },
          {
            name: 'Волгоград',
            adress:
              'г.&nbsp;Волгоград, Светлоярский район, п. Кирова, ул.&nbsp;Тепличная&nbsp;1В',
            mail: 'ivan_2007_78@mail.ru',
            phone: '+7 937 727 53 54',
            phone_code: '+79377275354',
            sait: false,
          },
          {
            name: 'Дагестан',
            adress: 'г.&nbsp;Даг Огни. ул.&nbsp;Революции&nbsp;52Б',
            mail: 'hs_dagestan@mail.ru',
            phone: '+7 926 888 78 77',
            phone_code: '+79268887877',
            insta: 'vs_dagestan',
            sait: false,
          },
          {
            name: 'Кемерово',
            adress: 'г.&nbsp;Кемерово, Сосновый&nbsp;бульвар&nbsp;3В',
            mail: 'hs-kemerovo@mail.ru',
            phone: '+7 995 163 32 21',
            phone_code: '+79951633221',
            insta: 'hs_kemerovo',
            sait: false,
          },
          {
            name: 'Краснодар',
            adress: 'г.&nbsp;Краснодар, ул.Думенко&nbsp;15 гск 2 бокс 28',
            mail: 'hs-h2krd@yandex.ru',
            phone: '+7 928 844 66 62',
            phone_code: '+79288446662',
            sait: false,
          },
          {
            name: 'Омск',
            adress: 'г.&nbsp;Омск, ул.&nbsp;Сто&nbsp;Дорожная&nbsp;5/1',
            mail: 'hs_omsk@mail.ru',
            phone: '+7 913 612 44 68',
            phone_code: '+79136124468',
            insta: 'hs_omsk',
            sait: false,
          },
          {
            name: 'Сургут',
            adress: 'ул. Рационализаторов 23/2',
            mail: 'hs_surgut1@mail.ru',
            phone: '+7 993 572 74 76',
            phone_code: '+79935727476',
            insta: 'hs_hmao',
            sait: false,
          },
          {
            name: 'Сургут (GBR Авто)',
            adress: 'GBR Авто, Солнечная промзона, 1а, пос. Солнечный',
            mail: 'Tal.82@mail.ru',
            phone: '+7 922 779 88 05',
            phone_code: '+79227798805',
            insta: 'svp_surgut',
            sait: false,
          },
          {
            name: 'Томск',
            adress: 'ул Енисейская, д 33, стр 2',
            mail: 'ee800ae1@gmail.com',
            phone: '+7 913 820 01 35',
            phone_code: '+79138200135',
            insta: 'hs_tomsk',
            sait: false,
          },
          {
            name: 'Уфа',
            adress:
              'г.&nbsp;Уфа, Молодежный&nbsp;бульвар&nbsp;10, офис&nbsp;800',
            mail: 'hs-ufa@mail.ru',
            phone: '+7 927 331 05 55',
            phone_code: '+79273310555',
            insta: 'hs_ufa02',
            sait: false,
          },
          {
            name: 'ХМАО и ЯНАО',
            adress: 'г.&nbsp;Сургут, ул.&nbsp;Энергостроителей&nbsp;4',
            mail: 'hs_surgut@mail.ru',
            phone: '+7 995 678 86 86 ',
            phone_code: '+79956788686 ',
            insta: 'hs_surgut',
            sait: 'hs86.ru',
          },
          {
            name: 'Сахалин',
            adress:
              'г.&nbsp;Южно-Сахалинск, Автосервис, Проспект Мира&nbsp;2В/1',
            mail: 'hs_sakhalin@mail.ru',
            phone: '+7 926 112 63 33',
            phone_code: '+79261126333',
            insta: false,
            sait: 'vk.com/hs_sakhalin',
          },
        ],
      },
      {
        country: 'Финляндия',
        citys: [
          {
            name: 'Турку',
            adress: 'г.&nbsp;Турку,&nbsp;<br/>ул.&nbsp;Коккокату, д.&nbsp;41',
            mail: 'info@hs-h2.fi',
            phone: '+3 586 234-57-89',
            phone_code: '+35862345789',
            insta: !1,
            sait: false,
          },
        ],
      },
      {
        country: 'Литва',
        citys: [
          {
            name: 'Вильнюс',
            adress: 'г.&nbsp;Вильнюс,&nbsp;<br/>ул.&nbsp;Шермукшню, д.&nbsp;26',
            mail: 'info@hs-h2.lt',
            phone: '+3 746 124-94-76',
            phone_code: '+37461249476',
            insta: !1,
            sait: false,
          },
        ],
      },
      {
        country: 'Бельгия',
        citys: [
          {
            name: 'Антверпен',
            adress:
              'г.&nbsp;Антверпен,&nbsp;<br/>ул.&nbsp;Fortsteenweg, д.&nbsp;71',
            mail: 'info@hs-h2.be',
            phone: '+3 255 175-25-07',
            phone_code: '+32551752507',
            insta: !1,
            sait: false,
          },
        ],
      },
    ]

    //
    // functions
    //

    // change_location
    const change_location = (country_num, city_num) => {
      // get data
      const data = city_data[country_num].citys[city_num]

      // change city
      if (citys[0]) {
        ;[...citys].forEach((city) => {
          city.innerHTML = `${data.name}`
        })
      }

      // change phone
      if (phones[0]) {
        ;[...phones].forEach((phone) => {
          phone.innerHTML = `${data.phone}`
          phone.setAttribute('href', `tel:${data.phone_code}`)
        })
      }

      // change phone
      if (phone_hrefs[0]) {
        ;[...phone_hrefs].forEach((phone_href) => {
          phone_href.setAttribute('href', `tel:${data.phone_code}`)
        })
      }

      // change adress
      if (adresses[0]) {
        ;[...adresses].forEach((adress) => {
          adress.innerHTML = `${data.adress}`
        })
      }

      // change adress
      if (mails[0]) {
        ;[...mails].forEach((mail) => {
          mail.innerHTML = `${data.mail}`
          mail.setAttribute('href', `mailto:${data.mail}`)
        })
      }

      // change adress
      if (mail_hrefs[0]) {
        ;[...mail_hrefs].forEach((mail_href) => {
          mail_href.setAttribute('href', `mailto:${data.mail}`)
        })
      }

      // close distributions modal window
      close_distributions()
    }

    // check_click
    const check_click = (event) => {
      if (event.target.dataset.close) close_distributions()

      if (event.target.dataset.city)
        change_location(
          event.target.dataset.countryNum,
          event.target.dataset.cityNum
        )
    }

    // add_listeners
    const add_listeners = () => {
      window.addEventListener('click', check_click)
    }

    // remove_listeners
    const remove_listeners = () => {
      window.removeEventListener('click', check_click)
    }

    // close_distributions
    const close_distributions = () => {
      distributions.classList.remove('--active')
      enable_scroll()
      remove_listeners()
    }

    // open_distributions
    const open_distributions = () => {
      distributions.classList.add('--active')

      disable_scroll()
      add_listeners()
    }

    // init_modal
    const init_modal = () => {
      // country_num
      let country_num = 0
      let temporary

        // countrys cycle
      ;[...city_data].forEach((data) => {
        const country = document.createElement('div')
        country.classList.add('distributions__modal__item')
        country.classList.add('__fcolc')

        temporary = `
						<span class="distributions__modal__item-country">${data.country}</span>
					`

        // city_num
        let city_num = 0
        temporary += `
						<div class="distributions__modal__item-citys __fcolc __fs">
					`

        // citys cycle
        data.citys.forEach((city) => {
          if (city.type == false) {
            temporary += `
						<div class="distributions__modal__item-city-cont __fcolc __fais" data-locations-show="false"></div>
						`
          } else {
            // add head
            temporary += `
						<div class="distributions__modal__item-city-cont __fcolc __fais">`

            // add name
            temporary += `
							<span
								class="distributions__modal__item-city"
								data-city="true"
								data-country-num="${country_num}"
								data-city-num="${city_num}"
								>${city.name}</span>`

            // add adress
            temporary += `
							<span
								class="distributions__modal__item-city-data"
								><span>Адрес:</span> ${city.adress}</span>`

            // add phone
            temporary += `
							<a
								class="distributions__modal__item-city-data"
								href="tel:${city.phone_code}"
								><span>Телефон:</span> ${city.phone}</a>`

            // add mail
            temporary += `
							<a
								class="distributions__modal__item-city-data"
								href="mailto:${city.mail}"
								><span>E-mail:</span> ${city.mail}</a>`

            // add insta
            if (city.insta)
              temporary += `
							<a
								class="distributions__modal__item-city-data"
								href="https://www.instagram.com/${city.insta}/"
								target="_blank"
								><span>instagramm:</span> @${city.insta}</a>`

            // add sait
            if (city.sait)
              temporary += `
							<a
								class="distributions__modal__item-city-data"
								href="https://${city.sait}/"
								target="_blank"
								><span>Сайт:</span> ${city.sait}</a>`

            // add bot
            temporary += `</div>`
          }

          // change city counter
          city_num++
        })
        temporary += `</div>`

        country.innerHTML = temporary

        // append child
        ;[...items].forEach((item) => {
          const clone = country.cloneNode(true)
          item.appendChild(clone)
        })
        country_num++
      })

      // add diler motivation
      ;[...items].forEach((item) => {
        item.insertAdjacentHTML(
          'afterend',
          `
						<p>Расширяем дилерскую сеть. Спешите получить специальные выгодные условия</p>
						<div class="js__btn-call-form __btn inner flex text-white border border-transparent transition duration-300 rounded-md items-center px-1 py-0.5 default-orange w-auto" data-close="true">
							<span data-close="true">Заказать звонок</span>
						</div>
				`
        )
      })

      change_location(0, 0)
    }

    //
    // listeners
    //

    init_modal()
    ;[...distributions_links].forEach((link) =>
      link.addEventListener('click', open_distributions)
    )
  }
}
