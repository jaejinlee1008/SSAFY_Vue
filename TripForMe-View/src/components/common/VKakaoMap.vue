<script setup>
import { ref, watch, onMounted } from "vue";

var map;
const positions = ref([]);
const markers = ref([]);

const props = defineProps({ attractions: Array, selectAttraction: Object, isInsert: Boolean });
const emits = defineEmits(["setAttraction"]);

watch(
  () => props.selectAttraction.value,
  () => {
    // 이동할 위도 경도 위치를 생성합니다
    var moveLatLon = new kakao.maps.LatLng(props.selectAttraction.latitude, props.selectAttraction.longitude);

    // 지도 중심을 부드럽게 이동시킵니다
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
    map.panTo(moveLatLon);
  },
  { deep: true }
);

onMounted(() => {
  initMap();
});

watch(
  () => props.attractions.value,
  () => {
    positions.value = [];
    props.attractions.forEach((attraction) => {

      let obj = {};
      obj.latlng = new kakao.maps.LatLng(attraction.latitude, attraction.longitude);
      obj.attraction = attraction;

      positions.value.push(obj);
    });

    loadMarkers();
  },
  { deep: true }
);

const initMap = () => {
  const container = document.getElementById("map");
  const options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 3,
  };
  map = new kakao.maps.Map(container, options);

  // loadMarkers();
};

const loadMarkers = () => {
  // 현재 표시되어있는 marker들이 있다면 map에 등록된 marker를 제거한다.
  deleteMarkers();

  if (positions.value.length < 1) {
    alert("해당 옵션의 관광지가 존재하지 않습니다");
    return ;
  };

  // 마커를 생성합니다
  markers.value = [];
  positions.value.forEach((position) => {
    const marker = new kakao.maps.Marker({
      map: map, // 마커를 표시할 지도
      position: position.latlng, // 마커를 표시할 위치
      clickable: true, // // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
    });

    kakao.maps.event.addListener(marker, 'click', clickMarker(position.attraction));
    // kakao.maps.event.addListener(marker, 'click', clickMarker(position));

    markers.value.push(marker);
  });

  map.panTo(positions.value[0].latlng);
};

const deleteMarkers = () => {
  if (markers.value.length > 0) {
    markers.value.forEach((marker) => marker.setMap(null));
  }
};

function clickMarker(attraction) {
  return function() {
    emits("setAttraction", attraction);
  };
}

</script>

<template>
  <span>
    <slot></slot>
    <v-container id="map" v-bind:class="[ props.isInsert ? 'write' : 'read']">
    </v-container>
  </span>
</template>

<style>
.read {
  width: 100%;
  height: 100%;
}

.write {
  width: 97%;
  height: 78%;
}
</style>
