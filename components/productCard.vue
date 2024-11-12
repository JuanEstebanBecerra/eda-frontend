<template>
	<div class="p-4 bg-white shadow flex items-center gap-4 rounded-md">
		<div
			class="bg-blue-200 rounded p-2 flex justify-center items-center text-blue-600">
			<UIcon
				class="text-2xl"
				name="i-heroicons-shopping-bag" />
		</div>
		<div class="flex flex-col flex-1">
			<span class="font-medium text-lg">{{ product.name }}</span>
			<span class="text-gray-500 text-sm">{{
				product.supplier_name
			}}</span>
		</div>

		<div class="relative p-2 h-full w-8 text-lg justify-center items-center">
			<transition
				enter-active-class="transition-all absolute opacity-0"
                :enter-from-class="oldStock < props.product.stock ? '-translate-y-10' : 'translate-y-10'"
                enter-to-class="translate-y-0 opacity-100"
                leave-from-class="translate-y-0 opacity-100"
				leave-active-class="transition-all absolute opacity-0"
                :leave-to-class="oldStock < props.product.stock ? 'translate-y-10' : '-translate-y-10'">
				<div
					class="absolute"
					:key="product.stock">
					{{ product.stock }}
				</div>
			</transition>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { Product } from '~/types/ws/product'

interface Props {
	product: Product
}

const props = defineProps<Props>()

const oldStock = ref(0)
watch(
	() => props.product.stock,
	(newValue, oldValue) => {
		oldStock.value = oldValue
	}
)
</script>

<style scoped></style>
