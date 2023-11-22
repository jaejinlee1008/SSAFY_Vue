<script setup>

    import VKakaoMap from './common/VKakaoMap.vue';
    import AttractionInfoSheet from './AttractionInfoSheet.vue';

    import { ref, watch } from 'vue';

    const props = defineProps({ attractions: Array});
    const attractions = ref([]);
    const selectAttraction = ref({});

    const isSheetShow = ref(false);

    watch(
        () => props.attractions.value,
        () => {
            attractions.value = props.attractions
        },
        { deep: true }
    );

    const setAttraction = (attraction) => {
        selectAttraction.value = attraction;
        isSheetShow.value = true;
    }

    const close = () => {
        isSheetShow.value = false;
        selectAttraction.value = { ...selectAttraction.value }
    }

</script>

<template>
<v-container>
        <v-row>
            <v-col cols="8">
                <v-card height="800">

                    <VKakaoMap class="rounded-lg" 
                        :attractions="props.attractions" 
                        :selectAttraction="selectAttraction"
                        :isInsert="false"
                        @set-attraction="setAttraction">

                        <AttractionInfoSheet 
                            :isShow="isSheetShow" 
                            :selectAttraction="selectAttraction"
                            :isInsert="false"
                            @close="close">
                        </AttractionInfoSheet>

                    </VKakaoMap>

                </v-card>
            </v-col>
            <v-col>
                <v-card height="800">
                    <v-container>
                        <v-text class="course">코스 정보</v-text>

                        <v-virtual-scroll :items="attractions" height="750">
                            <template v-slot:default="{ item }">
                                <v-card height="80" class="mb-5 my-3 elevation-4">

                                    <v-row class="py-4">
                                        <v-col @click="setAttraction(item)">
                                            <h3 class="pa-3">{{ item.title }}</h3>
                                        </v-col>

                                    </v-row>
                                </v-card>
                            </template>
                        </v-virtual-scroll>

                    </v-container>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>

</style>