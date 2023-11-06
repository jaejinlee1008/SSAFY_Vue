<script setup>

</script>

<template>
    <div>
        <h1>Vue Customer Management</h1>
        <div class="container">
            <form id="form1" class="form-horizontal">
                <h2>SpringBoot REST Customer Management</h2>
                <div class="form-group">
                    <label>번호:</label> <input type="text" class="form-control" id="num">
                </div>
                <div class="form-group">
                    <label>이름:</label> <input type="text" class="form-control" id="name">
                </div>

                <div class="form-group">
                    <label>주소:</label> <input type="text" class="form-control"
                        id="address">
                </div>

                <div class="btn-group">
                    <input type="button" class="btn btn-primary" value="등록" id="btnInsert" onclick="customerInsert()"/> 
                    <input type="button" class="btn btn-primary" value="수정" id="btnUpdate" onclick="customerUpdate()"/> 
                    <input type="button" class="btn btn-primary" value="삭제" id="btnDelete" onclick="customerDelete()"/>
                    <input type="button" class="btn btn-primary" value="검색" id="btnSearch" onclick="customerSearch()"/>
                    <input type="button" class="btn btn-primary" value="전체" id="btnAll" onclick="selectAll()"/> 			
                    <input type="reset" class="btn btn-primary" value="초기화" id="btnInit"/>
                </div>
            </form>
        </div>
        <hr />
        <div class="container">
            <h2>사용자 목록</h2>
            <table class="table text-center">
                <thead>
                    <tr>
                        <th class="text-center">번호</th>
                        <th class="text-center">이름</th>
                        <th class="text-center">주소</th>
                    </tr>
                </thead>
                <tbody id="tb"></tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>

</style>