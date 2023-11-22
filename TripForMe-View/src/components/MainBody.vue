<script setup>

</script>

<template>
    <v-carousel hide-delimiters height="auto" :cycle="true" :interval="2500">
        <v-carousel-item>
            <v-img src="/assets/images/jejudo.jpg" aspect-ratio="24/7" cover height="800">
                <div class="d-flex flex-column fill-height justify-center align-center text-white">
                    <h4 class="text-h4 font-weight-black">
                        에메랄드 빛 바다와 한라산, 한라봉과 돌하르방 그리고... 유채꽃
                    </h4>
                    <h1 class="area">
                        [제주도]
                    </h1>
                </div>
            </v-img>
        </v-carousel-item>

        <v-carousel-item>
            <v-img src="/assets/images/seoul.jpg" aspect-ratio="24/7" cover height="800">
                <div class="d-flex flex-column fill-height justify-center align-center text-white">
                    <h4 class="text-h4 font-weight-black">
                        과거와 현재와 미래가 공존하는 도시
                    </h4>
                    <h1 class="area">
                        [서울]
                    </h1>
                </div>
            </v-img>
        </v-carousel-item>

        <v-carousel-item>
            <v-img src="/assets/images/busan.jpg" aspect-ratio="24/7" cover height="800">
                <div class="d-flex flex-column fill-height justify-center align-center text-white">
                    <h4 class="text-h4 font-weight-black">
                        부산행
                    </h4>
                    <h1 class="area">
                        [부산]
                    </h1>
                </div>
            </v-img>
        </v-carousel-item>

        <v-carousel-item>
            <v-img src="https://www.namhae.go.kr/tour/_res/tour/img/inc/v1p02.jpg" aspect-ratio="24/7" cover height="800">
                <div class="d-flex flex-column fill-height justify-center align-center text-white">
                    <h4 class="text-h4 font-weight-black">
                        시원하고 상쾌한 바다내음 속에서 여유와 힐링을 즐기는 보물섬 남해로 떠나보세요!
                    </h4>
                    <h1 class="area">
                        [남해]
                    </h1>
                </div>
            </v-img>
        </v-carousel-item>

        <v-carousel-item>
            <v-img src="https://www.gyeongju.go.kr/design/tour2019/img/sub/course/autumn1.jpg" aspect-ratio="24/7" cover
                height="800">
                <div class="d-flex flex-column fill-height justify-center align-center text-white">
                    <h4 class="text-h4 font-weight-black">
                        오감을 충전하는 가을 여행
                    </h4>
                    <h1 class="area">
                        [경주]
                    </h1>
                </div>
            </v-img>
        </v-carousel-item>

        <v-carousel-item>
            <v-img src="/assets/images/junju.jpg" aspect-ratio="24/7" cover height="800">
                <div class="d-flex flex-column fill-height justify-center align-center text-white">
                    <h4 class="text-h4 font-weight-black">
                        가장 한국적인 도시
                    </h4>
                    <h1 class="area">
                        [전주]
                    </h1>
                </div>
            </v-img>
        </v-carousel-item>

        <v-carousel-item>
            <v-img src="https://www.incheon.go.kr/humanframe/theme/incheon/assets/image/incheon04/img-0101-01.jpg"
                aspect-ratio="24/7" cover height="800">
                <div class="d-flex flex-column fill-height justify-center align-center text-white">
                    <h4 class="text-h4 font-weight-black">
                        모든 길은 인천으로 통한다
                    </h4>
                    <h1 class="area">
                        [인천]
                    </h1>
                </div>
            </v-img>
        </v-carousel-item>

    </v-carousel>
</template>

<style scoped>
.area {
    font-family: 'WandohopeR';
    font-size: 80px;
}
</style>