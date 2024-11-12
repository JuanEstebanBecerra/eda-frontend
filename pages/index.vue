<template>
	<div class="flex flex-col gap-4 bg-zinc-100 h-screen w-screen p-4">
		<ProductCard
			v-for="product in products"
			:product="product" />
	</div>
</template>

<script setup lang="ts">
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import type { Product } from '~/types/ws/product'

onMounted(() => {
	getProducts()
	createWebsocketConnection()
})

const createWebsocketConnection = () => {
	// const socket = new WebSocket('wss://tu-servidor-websocket.com');

	window.Pusher = Pusher

	window.Echo = new Echo({
		broadcaster: 'reverb',
		key: 'ed5zsi5ebpdmawcqbwva',
		wsHost: '127.0.0.1',
		wsPort: 9090,
		// wssPort: 443,
		forceTLS: false,
		enabledTransports: ['ws'],
	})

	window.Echo.channel('delivery').listen('ProductUpdated', (event) => {
		event?.updatedProducts.forEach((it) => {
			updateProducStock(it.productId, it.stock)
		})
	})
}

const products = ref<Product[]>([])

const getProducts = () => {
	$fetch(
		useRuntimeConfig().public.productsApi +
			'/api/product_management/get_all'
	).then((response) => (products.value = response?.data as Product[]))
}

const updateProducStock = (id: number, stock: number) => {
	const product = products.value.find((it) => it.id === id)
	if (!product) getProducts()
	else product.stock = stock
}
</script>

<style scoped></style>
