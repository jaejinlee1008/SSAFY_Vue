<script setup>

defineProps({
    customer: Object
})

</script>

<template>
    <tr>
        <td>{{ customer.num }}</td>
        <td>
            <RouterLink :to="{ name: 'detail', params: { num: customer.num } }">{{ customer.name }}</RouterLink>
        </td>
    </tr>
</template>

<style scoped></style>