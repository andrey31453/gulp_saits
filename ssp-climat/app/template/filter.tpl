<div id="smartFilter">
	<span class="heading">Фильтр по параметрам</span>
	<form id="smartFilterForm" method="GET" action="{$config->root_url}/catalog/{$category->url}" name="_form">
		<div class="paramsBox">
			<div class="paramsBoxTitle">
				<span>Розничная цена</span>
			</div>
			<ins class="propExpander expanded"></ins>
			<div class="params price_slider">
				<div id="sl_1" class="rangeSlider">
					<label>От</label><input type="text" onkeyup="smartFilter.keyup(this)" size="5"
						value="{if $smarty.get.min_price}{$smarty.get.min_price}{else}{/if}" id="min_price"
						data-min-price="{$max_min_price->min_price|convert:null:false|floor}" name="min_price" class="min-price">
					<label>До</label><input type="text" onkeyup="smartFilter.keyup(this)" size="5" id="max_price"
						data-max-price="{$max_min_price->max_price|convert:null:false|ceil}" name="max_price"
						value="{if $smarty.get.max_price}{$smarty.get.max_price}{else}{/if}" class="max-price">
					<div id="slider_price"
						class="ui-slider ui-slider-horizontal ui-widget ui-widget-content bx_ui_slider_track slider blackout"
						data-slider-min-range="{$slider_max_min_price->min_price|convert:null:false|floor}"
						data-slider-max-range="{$slider_max_min_price->max_price|convert:null:false|ceil}">
						<div class="handler">
							<a class="ui-slider-handle ui-state-default ui-state-left bx_ui_slider_handle  left_handle ui-corner-all"><ins
									class="left"></ins></a>
							<a
								class="ui-slider-handle ui-state-default ui-state-right bx_ui_slider_handle right_handle ui-corner-all"><ins
									class="right"></ins></a>
						</div>
					</div>
				</div>
			</div>
		</div>
		{if $category->brands}
			<div class="paramsBox">
				<div class="paramsBoxTitle">
					<span>Бренды</span>
				</div>
				<ins class="propExpander  expanded"></ins>
				<div class="params">
					<ul class="checkbox">
						{foreach $category->brands as $b}
							<li>
								<input id="brand_{$b->id}" onclick="smartFilter.click(this)" type="checkbox" name="brand_id[]"
									value="{$b->id}" {if $b->checked} checked{elseif $b->disabled} disabled{/if}>
								<label for="brand_{$b->id}"><span>{$b->name|escape}</span> {if !$b->checked}<ins
										class="elCount"><i>({$b->count})</i></ins>{/if}</label>
							</li>
						{/foreach}
					</ul>
				</div>
			</div>
		{/if}
		{* <div class="paramsBox">
         <div class="paramsBoxTitle">
            <span>Выбрать</span>
         </div> 
         <ins class="propExpander  expanded"></ins>
         <div class="params">
            <ul class="checkbox">
               <li {if $discounted->disabled} class="disabled"{/if}>
                  <input id="discounted" type="checkbox" name="discounted" value="1"{if $discounted->checked} checked{elseif $discounted->disabled} disabled{/if}>
                  <label for="discounted"><span>Акционные</span> <i>{if !$discounted->checked}({$discounted->count}){/if}</i></label>
               </li>
               <li {if $featured->disabled} class="disabled"{/if}>
                  <input id="featured" type="checkbox" name="featured" value="1"{if $featured->checked} checked{elseif $featured->disabled} disabled{/if}>
                  <label for="featured"><span>Рекомендуемые</span> <ins class="elCount"><i>{if !$featured->checked}({$featured->count}){/if}</i></ins></label>
               </li>
            </ul>
         </div>
      </div> *}
		{if $features}
			{foreach $features as $f}
				<div class="paramsBox">
					<div class="paramsBoxTitle">
						<span>{$f->name}</span>
					</div>
					<ins class="propExpander  expanded"></ins>
					<div class="params">
						<ul class="checkbox">
							{foreach $f->options as $k=>$o}
								<li>
									<input id="option_{$f->id}_{$k}" type="checkbox" name="{$f->id}[]" value="{$o->value|escape}"
										{if $o->checked} checked{elseif $o->disabled} disabled{/if}>
									<label for="option_{$f->id}_{$k}"><span>{$o->value|escape}</span>
										<i>{if !$o->checked}({$o->count}){/if}</i></label>
								</li>
							{/foreach}
						</ul>
					</div>
				</div>
			{/foreach}
		{/if}
		<ul id="smartFilterControls">
			<li><a href="#" id="set_filter">Показать <span id="set_filter_num"></span></a></li>
			<li><a id="del_filter" href="catalog/{$category->url}">Сбросить</a></li>
		</ul>
	</form>
</div>
<link href="{$config->root_url}/design/{$settings->theme|escape}/css/filter.css" rel="stylesheet" type="text/css"
media="screen" />