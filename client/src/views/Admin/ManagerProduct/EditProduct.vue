<script>
import CarService from '@/services/car.service';
import FormAddCar from '../components/FormAddProduct.vue';
export default {
    components: {
        FormAddCar
    },
    data(){
        const _id =  this.$route.params.id;
        return{
            _id
        }
    }
}
</script>
<template>
        <FormAddCar :id="this._id" />

</template>