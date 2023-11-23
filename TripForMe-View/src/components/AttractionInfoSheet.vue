<script setup>

const props = defineProps({ isShow: Boolean, selectAttraction: Object, isInsert: Boolean });
const emits = defineEmits(["addCourse", "close"]);

function close() {
    emits("close");
}

function addCourse() {
    emits("addCourse");
}

</script>

<template>
    <v-sheet 
        
        class="sheet text-center justify-center rounded-lg" 
        :class="[{ info : props.isShow }, props.isInsert ? 'write' : 'read']"
        elevation=8
    >
        <h2 class="mt-4 title">
            {{ props.selectAttraction?.title }}
        </h2>

        <h4 class="my-2 title">
            {{ props.selectAttraction.addr1 }}
        </h4>

        <v-img 
            :src="props.selectAttraction.firstImage 
                    ? props.selectAttraction.firstImage 
                    : `/assets/images/no_image.jpg`"
            width="75%" height="30%"
            class="mx-12"
        ></v-img>

        <v-card 
            class="mt-2 mx-4 text-start overflow-auto" 
            height="40%"
            elevation="0"
        >
            {{ props.selectAttraction.overview }}
        </v-card>

        <v-container class="text-end">
            <v-btn
                v-if="isInsert"
                class="text-none mr-2 btn"
                color="success"
                rounded
                variant="flat"
                width="90"
                @click="addCourse"
            >
                추가하기
            </v-btn>

            <v-btn
                class="text-none btn"
                color="red-darken-1"
                rounded
                variant="flat"
                width="90"
                @click="close"
            >
                닫기
            </v-btn>
        </v-container>
    </v-sheet>
</template>

<style scoped>

.sheet{
  position: absolute;
  left: 2%;
  bottom: 3%;
}

.read {
    height: 90%;
    width: 40%;
}

.write {
    height: 75%;
    width: 45%;
}

.info {
  z-index: 100;
}

.title {
    font-family: "TAEBAEK-milkyway";
}

.btn {
    font-family: "NPSfont_bold";
}

</style>