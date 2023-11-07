<script setup>
import { ref, reactive, watchEffect } from "vue";

const userid = ref('')
const title = ref('')
const content = ref('')

function boardWrite() {

}
// document.querySelector("#btn-register").addEventListener("click", function () {
//     if (!document.querySelector("#subject").value) {
//         alert("제목 입력!!");
//         return;
//     } else if (!document.querySelector("#content").value) {
//         alert("내용 입력!!");
//         return;
//     } else {
//         let form = document.querySelector("#form-register");
//         form.setAttribute("action", "/board/register");
//         form.submit();
//     }
// });

</script>

<template>
    <div>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-10">
                    <h2 class="my-3 py-3 shadow-sm bg-light text-center">
                        <mark class="sky">글쓰기</mark>
                    </h2>
                </div>
                <div class="col-lg-10">
                    <form id="form-register">
                        <div class="mb-3">
                            <label for="userid" class="form-label">작성자 ID : </label>
                            <input type="text" class="form-control" id="userid" name="userid" v-model="userid"
                                placeholder="작성자ID..." />
                        </div>
                        <div class="mb-3">
                            <label for="subject" class="form-label">제목 : </label>
                            <input type="text" class="form-control" id="subject" name="subject" v-model="title"
                                placeholder="제목..." />
                        </div>
                        <div class="mb-3">
                            <label for="content" class="form-label">내용 : </label>
                            <textarea class="form-control" id="content" name="content" rows="7"
                                v-model="content"></textarea>
                        </div>
                        <div class="col-auto text-center">
                            <button type="button" id="btn-register" class="btn btn-outline-primary mb-3"
                                @click="boardWrite">
                                글작성
                            </button>
                            <button type="reset" class="btn btn-outline-danger mb-3">초기화</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>