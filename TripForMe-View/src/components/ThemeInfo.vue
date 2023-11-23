<script setup>

    const props = defineProps(["theme"]);

</script>

<template>
    <v-container>
        <v-card>
            <v-container class="title">
                테마 소개
            </v-container>

            <v-container>

                <v-row>
                    <v-col>
                        <v-card height="75">
                            <h2 class="pa-4 text">{{ props.theme.title }}</h2>
                        </v-card>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col>
                        <v-card class="h-auto" style="min-height: 200px !important;">
                            <p class="pa-2 text">
                                {{ props.theme.description }}
                            </p>
                        </v-card>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col>
                        <v-card height="50">
                            <p class="ma-3 text">추천 인원 : {{ props.theme.recomandCompanion }}</p>
                        </v-card>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col>
                        <v-card height="50">
                            <p class="ma-3 text">기간 : {{ props.theme.expectedPeriod }}</p>
                        </v-card>
                    </v-col>

                    <v-col>
                        <v-card height="50">
                            <p class="ma-3 text">예산 : {{ props.theme.budget }}</p>
                        </v-card>
                    </v-col>
                    
                </v-row>

            </v-container>
        </v-card>

    </v-container>
</template>

<style scoped>
.sign {
    font-family: "Maplestory-Bold";
    font-size: 20px;
}

.title {
    font-family: "Maplestory-Bold";
    font-size: 25px;
}

.text {
    font-family: "Maplestory-Light";
}
</style>