<script setup>
import { ref } from 'vue';
defineProps({
    selectOption: Array
})

const emit = defineEmits(['onKeySelect'])

const key = ref("");

const onSelect = () => {
    console.log(key.value + '선택!!');
    emit('onKeySelect', key.value);
}
</script>

<template>
    <div>
        <select v-model="key" @change="onSelect" class="form-select form-select-sm ms-5 me-1 w-50" aria-label="검색조건">
            <option v-for="opt in selectOption" :key="opt.value" :value="opt.value" :disabled="opt.value === ''">{{ opt.text
            }}</option>
        </select>
    </div>
</template>

<style scoped></style>