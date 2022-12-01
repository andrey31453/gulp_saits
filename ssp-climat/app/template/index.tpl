<!DOCTYPE html>
<html lang="ru">

<head>
	<base href="{$config->root_url}/" />
	<meta charset="windows-1251">
	<meta name="description" content="{$meta_description|escape}" />
	<meta name="keywords" content="{$meta_keywords|escape}" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	{* <meta name="viewport" content="width=520"/> *}
	<link rel="shortcut icon" type="image/x-icon" href="design/{$settings->theme|escape}/images/favicon.ico" />

	{if $module=='MainView'}
		<link href="design/{$settings->theme|escape}/css/page_main.css" type="text/css" rel="stylesheet">
	{/if}

	{if $module == 'ProductsView' || $module == 'WishlistView'}
		<link href="design/{$settings->theme|escape}/css/page_products.css" type="text/css" rel="stylesheet">
	{/if}

	{if $module == 'CompareView'}
		<link href="design/{$settings->theme|escape}/css/page_compare.css" type="text/css" rel="stylesheet">
	{/if}

	{if $module == 'WishlistView'}
		<link href="design/{$settings->theme|escape}/css/page_wishlist.css" type="text/css" rel="stylesheet">
	{/if}

	{if $module == 'PageView'}
		<link href="design/{$settings->theme|escape}/css/page.css" type="text/css" rel="stylesheet">
	{/if}

	{if $module == 'BlogView'}
		<link href="design/{$settings->theme|escape}/css/page_blog.css" type="text/css" rel="stylesheet">
		<link href="design/{$settings->theme|escape}/css/page_post.css" type="text/css" rel="stylesheet">
	{/if}

	{if $module == 'PostView'}
		<link href="design/{$settings->theme|escape}/css/page_post.css" type="text/css" rel="stylesheet">
	{/if}

	{if $module == 'FeedbackView'}
		<link href="design/{$settings->theme|escape}/css/page_feedback.css" type="text/css" rel="stylesheet">
	{/if}

	{if $module == 'CartView' || $module == 'OrderView' }
		<link href="design/{$settings->theme|escape}/css/page_cart.css" type="text/css" rel="stylesheet">
	{/if}

	{if $module == 'OrderView' }
		<link href="design/{$settings->theme|escape}/css/page_order.css" type="text/css" rel="stylesheet">
	{/if}

	<link href="design/template/css/style.min.css" type="text/css" data-template-style="true" rel="stylesheet">
	<script defer type="text/javascript" src="design/template/js/script.min.js"></script>

	{if $page->id != 1}
		<link href="design/{$settings->theme|escape}/css/template.css" type="text/css" data-template-style="true"
			rel="stylesheet">
	{/if}

	<title>{$meta_title|escape}</title>

	{* Канонический адрес страницы *}
	{if isset($canonical)}
	<link rel="canonical" href="{$config->root_url}{$canonical}" />{/if}
</head>

<body {if $module=='MainView'}class="index" {/if}>
	<div id="foundation">
		{include file='header.tpl'}
		<div id="main" class="main {if $page->id == 1}--index{/if}">
			{if $page->id != 1}
				<div class="category-main">
					<div class="__container">
						{$content}
					</div>
				</div>
			{/if}
			{$page->body}
			{* {if $categories}
				{if $category->description}
					{$category->description}
				{/if}
			{/if} *}
			{* {include file='fail.tpl'} *}
			{include file='index_content.tpl'}
			{include file='footer.tpl'}
		</div>
	</div>

	<!-- scripts -->
	{* JQuery *}
	<script src="js/jquery/jquery.js" type="text/javascript"></script>

	{* Аяксовая корзина *}
	<script src="design/{$settings->theme}/js/jquery-ui.min.js"></script>
	<script src="design/{$settings->theme}/js/ajax_cart.js"></script>

	{if $module == 'ProductsView' || $module == 'WishlistView'}
		<script type="text/javascript" src="design/{$settings->theme|escape}/js/page_products.js"></script>
		<script src="design/{$settings->theme}/js/jquery-ui-1.9.0.custom.min.js" type="text/javascript"></script>
		<script src="design/{$settings->theme}/js/filter.min.js" type="text/javascript"></script>
	{/if}

	{* Купить в 1 клик *}
	<script type="text/javascript" src="/buyme/js/buyme.js"></script>
	<!-- /scripts -->
</body>

</html>