function toDecimal(val) {
    return Number(val.toString().replace(/[^0-9]/g, ''))
}

Vue.filter('toCurrency', function (val) {
    if (typeof val !== "number") {
        return val;
    }
    var formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    });
    return formatter.format(val);
});

new Vue({
    el: '#app',
    data: () => ({
        harga: 500000,          // per bulan
        potonganHarga: 5000,    // per orang
        jumlahKamar: 5,
        money: {
            decimal: ',',
            thousands: '.',
            precision: 0
        },
        resultHeaders: [
            {
                text: 'Penghuni (Orang)',
                align: 'left',
                sortable: false,
                value: 'penghuni'
            },
            {text: 'Harga (/bulan)', value: 'harga', sortable: false},
            {text: 'Penghasilan (/bulan)', value: 'penghasilan', sortable: false},
            {text: 'Penghasilan konvensional (/bulan)', value: 'penghasilanKonvensional', sortable: false},
            {text: 'Biaya iklan (/bulan)', value: 'iklan', sortable: false},
        ],
    }),
    computed: {
        kost: function() {
            var harga = toDecimal(this.harga)
            var potonganHarga = toDecimal(this.potonganHarga)
            var jumlahKamar = this.jumlahKamar
            var dataPenghuni = []
            for(var i = 0; i <= jumlahKamar; i++) {
                var hargaApps = harga-(i*potonganHarga)
                dataPenghuni[i] = {
                    penghuni: i,
                    harga: hargaApps,
                    penghasilan: hargaApps*i,
                    penghasilanKonvensional: harga*i,
                    iklan: potonganHarga*i*i
                }
            }
            return dataPenghuni
        }
    }
})