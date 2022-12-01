<div id="catalogLineList">
	{foreach $products as $product}
		<div class="itemRow item sku b1c-good">
			<div class="column">
				<a data-product="{$product->id}" class="name b1c-name item-name--d"
					href="products/{$product->url}">{$product->name|escape}</a>
				<a class="removeFromWishlist" href="wishlist/remove/{$product->url}"></a>
				<div class="markerContainer">
					{if $product->featured}<div style="background-color: #29bc48" class="marker">Рекомендуем</div>{/if}
					{if $product->variant->compare_price > 0}<div style="background-color: #e42c5c" class="marker">Распродажа</div>
					{/if}
				</div>
				{if $product->image}
					<a href="products/{$product->url}" class="picture"><img src="/files/products/{$product->image->filename}"
							alt="{$product->name|escape}"></a>
				{else}
					<a href="products/{$product->url}" class="picture"><img src="design/{$settings->theme|escape}/images/empty.png"
							alt="{$product->name|escape}"></a>
				{/if}
			</div>
			<div class="column item-name--m">
				<a data-product="{$product->id}" class="name b1c-name" href="products/{$product->url}">{$product->name|escape}</a>

				<div class="annotation">{$product->annotation|strip_tags|truncate:300}</div>
			</div>
			<div class="column">
				<div class="resizeColumn">
					{if $product->variants|count > 0}
						<a class="price line">
							<span class="price-value">{$product->variant->price|convert}</span>
							<span class="currency">{$currency->sign|escape}</span>

							{if $product->variant->compare_price > 0}
								<s class="discount"><span class="price-value">{$product->variant->compare_price|convert}</span> <span
										class="currency">{$currency->sign|escape}</span></s>
							{/if}
						</a>
					{else}
						<a class="price">Нет в наличии</a>
					{/if}
				</div>
				<div class="resizeColumn">

				</div>
				<div class="resizeColumn last">
					<div class="optional">
						<div class="row buy-btn-wrapper">
							{* {if $product->variants|count > 0} *}
								<a href="cart?variant={$product->variant->id}" onclick="basketblock{$product->variant->id}(); return false;"
									id="buy{$product->variant->id}" class="addCart js__cart-btn"><img
										src="design/{$settings->theme|escape}/images/incart.png" alt="В корзину" class="icon">В корзину</a>
								<a class="addCart added js__cart-btn" style="display:none" id="buyed{$product->variant->id}"
									href="/cart/"><img class="icon " alt="В корзине" src="design/{$settings->theme|escape}/images/added.png">В
									корзине</a>
							{* {else}
														<a 333 class="addCart disabled js__addCart-added" href="#">
															<img class="icon" src="design/{$settings->theme|escape}/images/incart.png">
															В корзину
														</a>



							{/if} *}
							<a href="#" class="label b1c buy_one_click">
								{* <img src="design/{$settings->theme|escape}/images/fastBack.png"
									alt="Купить в 1 клик" class="icon "> *}
								Купить в 1 клик</a>
							{* {if $wishlist_products && in_array($product->url, $wishlist_products)}
								<a class="addWishlist label added" href="/wishlist/"><img class="icon" alt=""
										src="design/{$settings->theme|escape}/images/wishlist.png">Добавлен</a>
							{else}
								<a href="wishlist/{$product->url}" class="addWishlist label wishlists"><img
										src="design/{$settings->theme|escape}/images/wishlist.png" alt="В избранное" class="icon">В
									избранное</a>
							{/if} *}
						</div>
						{* <div class="row"> *}
						{* {if $smarty.session.compared_products && in_array($product->url, $smarty.session.compared_products)} *}
						{* <a class="addCompare label" href="compare/"><img class="icon" alt="Добавлен"
										src="design/{$settings->theme|escape}/images/compare.png">Добавлен</a>
							{else}
								<a href="compare/{$product->url}" class="addCompare label compares"><img
										src="design/{$settings->theme|escape}/images/compare.png" alt="К сравнению" class="icon">К сравнению</a> *}
						{* {/if} *}

						{* </div> *}
					</div>
				</div>
				<div class="other_pars">
					<div class="rating">
						<i class="m" style="width:{$product->rating*80/5|string_format:"%.0f"}px"></i>
						<i class="h"></i>
					</div>
					{if $product->variants|count > 0}
						<a class="inStock label changeAvailable"><img src="design/{$settings->theme|escape}/images/inStock.png"
								alt="В наличии" class="icon">В наличии</a>
					{else}
						<a class="onOrder label changeAvailable"><img src="design/{$settings->theme|escape}/images/onOrder.png"
								alt="Нет в наличии" class="icon">Нет в наличии</a>
					{/if}
					{if $product->variant->sku}<div class="article">Артикул: {$product->variant->sku}</div>{/if}
				</div>
			</div>
		</div>
		<script>
			function basketblock{$product->variant->id}()
			{
				if ($("#buyed{$product->variant->id}").css("display")=="block")
				{
					$("#buyed{$product->variant->id}").css("display", "none");
					$("#buy{$product->variant->id}").css("display", "block");
				} else {
					$("#buyed{$product->variant->id}").css("display", "block");
					$("#buy{$product->variant->id}").css("display", "none");
				}
			}
		</script>
	{/foreach}
</div>