{* Список товаров *}

{* Канонический адрес страницы *}
{if $category && $brand}
	{$canonical="/catalog/{$category->url}/{$brand->url}" scope=parent}
{elseif $category}
	{$canonical="/catalog/{$category->url}" scope=parent}
{elseif $brand}
	{$canonical="/brands/{$brand->url}" scope=parent}
{elseif $keyword}
	{$canonical="/products?keyword={$keyword|escape}" scope=parent}
{else}
	{$canonical="/products" scope=parent}
{/if}

{if $wishlist}
	<div class="limiter">
		<div id="breadcrumbs">
			<ul>
				<li><a title="Главная страница" href="/">Главная страница</a></li>
				<li><span class="arrow"> • </span></li>
				<li><span class="changeName">Избранное</span></li>
			</ul>
		</div>

		<h1>Избранное</h1>

		<div id="wishlist">
			<div id="catalogLine">
				<div class="column">
					{if !$wishlist}
						<div class="label">Сортировать по:</div>
						<select onchange="location = this.value;">
							<option value="{url sort=position page=null}" {if $sort=='position'}selected{/if}>Умолчанию</option>
							<option value="{url sort=price page=null}" {if $sort=='price'}selected{/if}>Цене</option>
							<option value="{url sort=name page=null}" {if $sort=='name'}selected{/if}>Названию</option>
							<option value="{url sort=rating page=null}" {if $sort=='rating'} selected{/if}>Рейтингу</option>
						</select>
					{/if}
				</div>
				<div class="column"></div>
				<div class="column">
				</div>
			</div>
		</div>
		{include file='line.tpl'}
	</div>
	</div>
{elseif $category->brands || $features}
	<div class="limiter">
		<div id="breadcrumbs">
			<ul>
				<li><a href="/" title="Главная страница">Главная страница</a></li>
				{if $category}
					{foreach $category->path as $cat}
						<li><span class="arrow"> &bull; </span></li>
						<li><a href="catalog/{$cat->url}" title="Каталог товаров">{$cat->name|escape}</a></li>
					{/foreach}
					{if $brand}
						<li><span class="arrow"> &bull; </span></li>
						<li><a href="catalog/{$cat->url}/{$brand->url}" title="Каталог товаров">{$brand->name|escape}</a></li>
					{/if}
				{elseif $brand}
					<li><span class="arrow"> &bull; </span></li>
					<li><a href="brands/{$brand->url}" title="Каталог товаров">{$brand->name|escape}</a></li>
				{elseif $keyword}
					→ Поиск
				{/if}
			</ul>
		</div>

		{* Заголовок страницы *}
		{if $keyword}
			<h1>Поиск {$keyword|escape}</h1>
		{elseif $page}
			<h1>{$page->name|escape}</h1>
		{else}
			<h1>{$category->name|escape} {$brand->name|escape}</h1>
		{/if}

		<div id="catalogColumn">
			<div class="leftColumn">
				{if $category->subcategories}
					<div id="nextSection">
						<div class="title">Уточнить раздел</div>
						<ul>
							{foreach $category->subcategories as $c}
								{if $c->visible}
									<li>
										<span class="sectionLine">
											<span class="sectionColumn"><a {if $category->id == $c->id}class="selected" {/if}
													href="catalog/{$c->url}">{$c->name}</a></span>
										</span>
									</li>
								{/if}
							{/foreach}
						</ul>
					</div>
				{/if}
				{if $category->brands || $features}
					<div id="filter">
						{include file='filter.tpl'}
					</div>
				{/if}
			</div>

			<div class="rightColumn">
				<div id="catalog">
					<div id="catalogLine">
						<div class="column">
							<div class="label">Сортировать по:</div>
							<select onchange="location = this.value;">
								<option value="{url sort=position page=null}" {if $sort=='position'}selected{/if}>Умолчанию</option>
								<option value="{url sort=price page=null}" {if $sort=='price'}selected{/if}>Цене</option>
								<option value="{url sort=name page=null}" {if $sort=='name'}selected{/if}>Названию</option>
								<option value="{url sort=rating page=null}" {if $sort=='rating'} selected{/if}>Рейтингу</option>
							</select>
						</div>
						<div class="column"></div>
						<div class="column">
						</div>
					</div>
				</div>

				{include file='line.tpl'}
				{include file='pagination.tpl'}

				<div>
					{* Описание страницы (если задана) *}
					{$page->body}

					{if $current_page_num==1}
						{* Описание категории *}
						{$category->description}
					{/if}

					{if $current_page_num==1}
						{* Описание бренда *}
						{$brand->description}
					{/if}
				</div>
				<br>
			</div>
		</div>
	</div>
	</div>
{else}
	<div class="limiter">
		<div id="breadcrumbs">
			<ul>
				<li><a href="/" title="Главная страница">Главная страница</a></li>
				{if $category}
					{foreach $category->path as $cat}
						<li><span class="arrow"> &bull; </span></li>
						<li><a href="catalog/{$cat->url}" title="Каталог товаров">{$cat->name|escape}</a></li>
					{/foreach}
					{if $brand}
						<li><span class="arrow"> &bull; </span></li>
						<li><a href="catalog/{$cat->url}/{$brand->url}" title="Каталог товаров">{$brand->name|escape}</a></li>
					{/if}
				{elseif $brand}
					<li><span class="arrow"> &bull; </span></li>
					<li><a href="brands/{$brand->url}" title="Каталог товаров">{$brand->name|escape}</a></li>
				{elseif $keyword}
					→ Поиск
				{/if}
			</ul>
		</div>

		{* Заголовок страницы *}
		{if $keyword}
			<h1>Поиск {$keyword|escape}</h1>
		{elseif $page}
			<h1>{$page->name|escape}</h1>
		{else}
			<h1>{$category->name|escape} {$brand->name|escape}</h1>
		{/if}
		{if $category->subcategories}
			<div id="catalogColumn">
				<div class="leftColumn">
				{/if}
				{if $category->subcategories}
					<div id="nextSection">
						<div class="title">Уточнить раздел</div>
						<ul>
							{foreach $category->subcategories as $c}
								{if $c->visible}
									<li>
										<span class="sectionLine">
											<span class="sectionColumn"><a {if $category->id == $c->id}class="selected" {/if}
													href="catalog/{$c->url}">{$c->name}</a></span>
										</span>
									</li>
								{/if}
							{/foreach}
						</ul>
					</div>
				{/if}
				{if $category->brands || $features}
					<div id="filter">
						{include file='filter.tpl'}
					</div>
				{/if}
				{if $category->subcategories}
				</div>
				<div class="rightColumn">
					<div id="catalog">
					{/if}
					{if $products}
						<div id="wishlist">
							<div id="catalogLine">
								<div class="column">
									<div class="label">Сортировать по:</div>
									<select onchange="location = this.value;">
										<option value="{url sort=position page=null}" {if $sort=='position'}selected{/if}>Умолчанию</option>
										<option value="{url sort=price page=null}" {if $sort=='price'}selected{/if}>Цене</option>
										<option value="{url sort=name page=null}" {if $sort=='name'}selected{/if}>Названию</option>
										<option value="{url sort=rating page=null}" {if $sort=='rating'} selected{/if}>Рейтингу</option>
									</select>
								</div>
								<div class="column"></div>
								<div class="column">
									<div class="label">Вид каталога:</div>
									<div class="viewList">
										<div class="element"><a class="squares {if $smarty.cookies.view == 'squares'}selected{/if}"
												onclick="document.cookie='view=squares;path=/';document.location.reload();" href="javascript:;"
												rel="nofollow"></a></div>
										<div class="element"><a class="line {if $smarty.cookies.view == 'line'}selected{/if}"
												onclick="document.cookie='view=line;path=/';document.location.reload();" href="javascript:;"
												rel="nofollow"></a></div>
										<div class="element"><a class="table {if $smarty.cookies.view == 'table'}selected{/if}"
												onclick="document.cookie='view=table;path=/';document.location.reload();" href="javascript:;"
												rel="nofollow"></a></div>
									</div>
								</div>
							</div>
							{include file='line.tpl'}
						</div>
					{/if}
					{if $products|count < 1}
						<div id="empty">
							<div class="emptyWrapper">
								<div class="pictureContainer">
									<img class="emptyImg" alt="В данном разделе пока пусто"
										src="design/{$settings->theme|escape}/images/emptyFolder.png">
								</div>
								<div class="info">
									<h3>В данном разделе пока пусто</h3>
									<p>Вы можете вернуться на <a href="/products/">страницу каталога</a> или воспользоваться навигацией или
										поиском по сайту.</p>
									<a class="back" href="/">Главная страница</a>
								</div>
							</div>
							<div class="emptyTitle">Или выберите нужный товар в каталоге.</div>
							<ul class="emptyMenu">
								{foreach $categories as $c}
									<li><a {if $category->id == $c->id}class="selected" {/if} href="catalog/{$c->url}"
											data-category="{$c->id}">{$c->name|escape}</a></li>
								{/foreach}
							</ul>
						</div>
					{/if}
					{if $category->subcategories}
					</div>
				</div>
			</div>
		{/if}
	</div>
	<link href="design/{$settings->theme|escape}/css/fullwidth_products.css" type="text/css" rel="stylesheet">
{/if}