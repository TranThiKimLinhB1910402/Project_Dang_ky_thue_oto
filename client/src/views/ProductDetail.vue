<script>
import FormRegisterCar from '../components/FormRegisterCar.vue';
import Calendar from '../components/Calendar.vue';
import CarService from '../services/car.service';
export default {
    components: {
        FormRegisterCar,
        Calendar
    },

    data() {

        return {

            car: Object,
            daytemp: [
                {
                    days: {
                        ngaynhan: ""
                    }
                }
            ],
            listday: []
        }
    },
    methods: {
        async get(id) {
            try {
                this.car = await CarService.get(id);
            } catch (error) {
                console.log(id);
            }
        },
        getDate(date) {
            return date.substring(date.indexOf(" "))
        },
        async getDayBS() {
            try {
                this.daytemp = await CarService.getDayBS(this.$route.params.id);
                setTimeout(() => {
                    for (var i = 0; i <= this.daytemp.length; i++) {
                        const item = this.getDate(this.daytemp[i].days.ngaynhan);
                        this.listday.push(item);
                    }
                }, 1000
                )
                console.log(this.listday);
            } catch (error) {
                console.log(error);
            }
        },
        formatPrice(value) {
            let val = (value / 1).toFixed(0).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        }
    },

    mounted() {
        this.get(this.$route.params.id);
        this.getDayBS()
    }

}
</script>
<template>
    <div class="container-fluid product-detail">
        <div class="row m-3 row-cols-md-2 row-cols-1">
            <div class="col col-md-8 img-detail">
                <img :src="'../src/assets/images/products/' + car.hinh_anh" alt="">
            </div>
            <div class="col col-md-4 mt-5">
                <div class="card card-detail">
                    <div class="card-header">
                        {{ car.ten_xe }}
                    </div>
                    <div class="card-body">
                        <ul>
                            <li v-if="car.so_cho < 16">
                                Gi?? thu?? theo ng??y: <span>{{ formatPrice(car.gia_thue_ngay) }} ??</span>
                            </li>
                            <li>
                                Gi?? thu?? theo s??? km: <span>{{ formatPrice(car.gia_thue_theo_km) }} ??</span>
                            </li>
                            <li>
                                S??? ch???: <span>{{ car.so_cho }}</span>
                            </li>

                            <li>
                                H??ng: <span>{{ car.ten_hang }}</span>
                            </li>
                            <li>
                                N??m s???n xu???t: <span>{{ car.nam_sx }}</span>
                            </li>
                            <li>
                                Lo???i m??y: <span>{{ car.loai_may }}</span>
                            </li>
                            <li>
                                M??u: <span>{{ car.mau_xe }}</span>
                            </li>
                            <li>
                                Th???i gian ????ng ki???m: <span>{{ car.tg_dang_kiem }}</span>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="row row-cols-md-2 row-cols-1 mb-5">
            <div class="col col-md-5">
                <div class="card card-p">
                    <div class="card-body">
                        <h4>CAM K???T D???CH V???</h4>
                        <ul>
                            <li>
                                Gi?? thu?? xe lu??n c???nh tranh, t???t nh???t th??? tr?????ng C???n Th??
                            </li>
                            <li>
                                To??n b??? xe t???i AutoCar ?????u l?? xe ?????i m???i.
                            </li>
                            <li>
                                Xe lu??n ???????c ki???m tra k?? thu???t k??? c??ng tr?????c khi l??n ???????ng.
                            </li>
                            <li>
                                Xe lu??n c?? m???t ????ng gi??? h???n c???a kh??ch h??ng
                            </li>
                            <li>
                                L??i xe vui v??? th??n thi???n lu??n ph???c v??? h??i l??ng qu?? kh??ch
                            </li>
                            <li>
                                Ch??ng t??i cam k???t ??em l???i ch???t l?????ng d???ch v??? cho thu?? xe t???t nh???t t???i kh??ch h??ng.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col col-md-7">
                <FormRegisterCar :car="car" />
            </div>
        </div>
    </div>
</template>
<style lang="scss">
.product-detail {
    .img-detail img {
        width: 75%;
        margin-left: 8%;
    }

    .card-detail {
        border: none;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        width: 100%;
        margin-bottom: 8%;
        border-radius: 5px;
    }

    .card-detail .card-header {
        background-color: var(--info-dark);
        border-bottom: none;
        padding: 10px 35px;
        font-size: 1.5rem;
        font-weight: 800;
        color: var(--primary-color);
    }

    .card-detail .card-body ul li {
        list-style-type: none;
        font-size: 1.2rem;
        padding: 5px 20px;
        font-style: italic;
        font-weight: 500;
    }

    .card-detail .card-body ul li span {
        font-size: 1.2rem;
        color: var(--danger-color);
        margin-left: 10px;
    }

    .card-calendar {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        border: none;

    }
}

.card-p {
    border: 2px dashed #f77213 !important;

    .card-body {
        padding-left: 8%;
        background-color: #fcf1d3;
        h4{
            font-size: 1.4rem;
            font-style: italic;
            color: rgb(106, 106, 106);
        }
        ul li {
            list-style-type: decimal;
            font-size: 1.3rem !important;
            padding-top: 2%;
            font-style: italic;
            color: rgb(106, 106, 106);

        }
    }
}
</style>