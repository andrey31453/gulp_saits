<!DOCTYPE html>
<html lang="ru" class="bx-core bx-no-touch bx-no-retina bx-firefox">

<head>
	<base href="{$config->root_url}/" />
	<meta charset="windows-1251">
	<meta content="width=device-width, initial-scale=1.0" name="viewport">
	<meta name="description" content="{$meta_description|escape}" />
	<meta name="keywords" content="{$meta_keywords|escape}" />
	<link href="design/{$settings->theme|escape}/images/favicon.ico" type="image/x-icon" rel="shortcut icon">

	<link rel="stylesheet" type="text/css" href="design/{$settings->theme|escape}/css/page_product.css">
	<link rel="stylesheet" data-template-style="true" type="text/css"
		href="design/{$settings->theme|escape}/css/template.css">

	{* JQuery *}
	<script src="js/jquery/jquery.js" type="text/javascript"></script>

	{* Увеличитель картинок *}
	<script type="text/javascript" src="js/fancybox/jquery.fancybox.js"></script>
	<link rel="stylesheet" href="js/fancybox/jquery.fancybox.css" type="text/css" media="screen" />

	<link href="design/template/css/style.min.css" type="text/css" data-template-style="true" rel="stylesheet">
	<script defer type="text/javascript" src="design/template/js/script.min.js"></script>

	{* Канонический адрес страницы *}
	{if isset($canonical)}
	<link rel="canonical" href="{$config->root_url}{$canonical}" />{/if}

	<title>{$meta_title|escape}</title>
</head>

<body>
	<div class="b1c-good">
		<div id="foundation">
			{include file='header.tpl'}
			<div id="main" class="main product-main">
				<div class="__container">
					{$content}
					{include file='product_content.tpl'}
				</div>
			</div>
		</div>
	</div>
	<div>
		{include file='footer.tpl'}
	</div>

	<div id="upButton" class="enb">
		<a href="#"></a>
	</div>

	{* Цветовая схема 
      {include file='colors.tpl'}*}

	{* Всплывающие подсказки для администратора *}
	{if $smarty.session.admin == 'admin'}
		<script src="js/admintooltip/admintooltip.js" type="text/javascript"></script>
		<link href="js/admintooltip/css/admintooltip.css" rel="stylesheet" type="text/css" />
	{/if}

	{* js-проверка форм *}
	<script src="js/baloon/js/baloon.js" type="text/javascript"></script>
	<link href="js/baloon/css/baloon.css" rel="stylesheet" type="text/css" />

	{* Купить в 1 клик *}
	<script type="text/javascript" src="/buyme/js/buyme.js"></script>

	{* Аяксовая корзина *}
	<script src="design/{$settings->theme}/js/jquery-ui.min.js"></script>
	<script src="design/{$settings->theme}/js/ajax_cart.js"></script>

	{* Template *}
	<script src="design/{$settings->theme}/js/template.js" type="text/javascript"></script>

	<script type="text/javascript" src="design/{$settings->theme}/js/jquery-migrate-1.2.1.min.js"></script>
	<script src="design/{$settings->theme}/js/page_product.js" type="text/javascript"></script>

	{* Рейтинг *}
	<script src="js/jquery.rater.js" type="text/javascript"></script>

	{* Автозаполнитель поиска *}
	{literal}
		<script src="js/autocomplete/jquery.autocomplete-min.js" type="text/javascript"></script>
		<style>
			.autocomplete-suggestions {
				background-color: #ffffff;
				overflow: hidden;
				border: 1px solid #e0e0e0;
				overflow-y: auto;
			}

			.autocomplete-suggestions .autocomplete-suggestion{cursor: default;}
			.autocomplete-suggestions .selected {
				background: #F0F0F0;
			}

			.autocomplete-suggestions div {
				padding: 2px 5px;
				white-space: nowrap;
			}

			.autocomplete-suggestions strong {
				font-weight: normal;
				color: #3399FF;
			}
		</style>
		<script>
			$(function() {
				//  Автозаполнитель поиска
				$(".input_search").autocomplete({
					serviceUrl: 'ajax/search_products.php',
					minChars: 1,
					noCache: false,
					onSelect: function(suggestion) {
						$(".input_search").closest('form').submit();
					},
					formatResult: function(suggestion, currentValue) {
						var reEscape = new RegExp('(\\' + ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'].join('|\\') + ')', 'g');
						var pattern = '(' + currentValue.replace(reEscape, '\\$1') + ')';
						return (suggestion.data.image ? "<img align=absmiddle src='" + suggestion.data.image + "'> " : '') +
							suggestion.value.replace(new RegExp(pattern, 'gi'), '<strong>$1<\/strong>');
					}
				});
			});
		</script>
	{/literal}

	{literal}
		<script>
			$(function() {
				// Раскраска строк характеристик
				$(".stats tr:even").addClass('gray');
			});
		</script>
	{/literal}

	{literal}
		<script>
			$("#topProduct").dwCarousel({
				leftButton: ".topBtnLeft",
				rightButton: ".topBtnRight",
				countElement: 6,
				resizeElement: true,
				resizeAutoParams: {
					1920: 5,
					1500: 4,
					1200: 3,
					850: 2,
					480: 1
				}
			});
		</script>
		<script>
			$("#viewedProduct").dwCarousel({
				leftButton: ".viewedBtnLeft",
				rightButton: ".viewedBtnRight",
				countElement: 6,
				resizeElement: true,
				resizeAutoParams: {
					1920: 5,
					1500: 4,
					1200: 3,
					850: 2
				}
			});
		</script>
	{/literal}
</body>

</html>