<template>
    <div class="relative">
        <input :value="displayValue" type="text" readonly @click="showDropdown = !showDropdown"
            class="h-10 text-black w-full pl-2 pr-8 py-2 border border-gray-500 rounded-md focus:outline-none cursor-pointer" />
        <span class="absolute right-3 top-1/2 -translate-y-1/2 text-black z-10 flex gap-1">
            <button
                v-if="modelValue"
                type="button"
                @click.stop="$emit('update:modelValue', '')"
                class="cursor-pointer w-5 h-5 flex items-center justify-center rounded hover:bg-gray-200"
                aria-label="clear"
                title="ล้างค่า"
            >
                ×
            </button>
            <button
                v-else-if="showDropdown && !modelValue"
                type="button"
                @click="showDropdown = false"
                class="cursor-pointer w-5 h-5 flex items-center justify-center rounded hover:bg-gray-200"
                aria-label="collapse"
                title="ยุบเมนู"
            >
                ▲
            </button>
            <button
                v-else
                type="button"
                @click="showDropdown = true"
                class="cursor-pointer w-5 h-5 flex items-center justify-center rounded hover:bg-gray-200"
                aria-label="expand"
                title="ขยายเมนู"
            >
                ▼
            </button>
        </span>
        <div v-if="showDropdown" @mouseleave="showDropdown = false"
            class="absolute z-20 bg-white border mt-1 rounded-md w-full max-h-96 flex flex-col gap-4 shadow-md overflow-hidden">
            <input v-if="complete" placeholder="" type="text" v-model="search"
                class="h-8 m-2 mb-0 p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" />
            <ul class="list-none overflow-y-auto">
                <li v-for="option in autocomplete" :key="option.label" @click="selectOption(option)" :class="[
                    'px-4 py-2 hover:bg-gray-100 cursor-pointer overflow-x-hidden text-ellipsis whitespace-nowrap',
                    option.value === modelValue ? 'bg-[#1e3a8a] text-white hover:bg-[#1e3a8a]!' : ''
                ]">
                    {{ option.label }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'InputAutoComplete',
    props: {
        modelValue: {
            type: String,
            required: true
        },
        items: {
            type: Array,
            required: true
        },
        complete: {
            type: Boolean,
            default: true,
            required: false
        }
    },
    data() {
        return {
            showDropdown: false,
            search: ''
        };
    },
    computed: {
        autocomplete() {
            if (!this.search) {
                return this.parsedItems;
            }
            const keyword = this.search.toLowerCase();
            return this.parsedItems.filter(option =>
                option.label.toLowerCase().includes(keyword)
            );
        },
        parsedItems() {
            return this.items.map((item) =>
                typeof item === 'object'
                    ? item
                    : { label: item, value: item }
            );
        },
        displayValue() {
            if (!this.modelValue) return '';
            return typeof this.items[0] === 'object'
                ? this.items.find(item => item.value === this.modelValue)?.label || ''
                : this.modelValue;
        },
    },
    methods: {
        selectOption(option) {
            this.$emit('update:modelValue', option.value);
            this.showDropdown = false;
            this.search = '';
        },
    }
};
</script>
