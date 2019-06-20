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
        money: {
            decimal: ',',
            thousands: '.',
            precision: 0
        },
        input1: {
            harga: 500000,              // per bulan
            maxPotonganHarga: 50000,    // per orang
            jumlahKamar: 5,
            jumlahPenghuni: 0,
            kostateFee: 0.1     // 90% dari iklan ke penghuni, 10% dari iklan ke kostate
        },
        headers: [
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
            {text: 'Penghasilan Kostate (/bulan)', value: 'penghasilanKostate', sortable: false},
        ],
    }),
    computed: {
        output1: function() {
            var harga = toDecimal(this.input1.harga)
            var jumlahKamar = this.input1.jumlahKamar
            var jumlahPenghuni = this.input1.jumlahPenghuni
            var potonganHarga = toDecimal(this.input1.maxPotonganHarga)/jumlahKamar
            var kostateFee = this.input1.kostateFee
            var dataPenghuni = []
            for(var i = 0; i <= jumlahPenghuni; i++) {
                var iklan = potonganHarga*i*i
                var hargaApps = harga-(iklan*(1-kostateFee)/i)
                hargaApps = hargaApps ? hargaApps : harga
                var penghasilanKostate = iklan*kostateFee
                dataPenghuni[i] = {
                    penghuni: i,
                    harga: hargaApps,
                    penghasilan: (hargaApps*i)-penghasilanKostate,
                    penghasilanKonvensional: harga*i,
                    iklan: potonganHarga*i*i,
                    penghasilanKostate: penghasilanKostate,
                }
            }
            return dataPenghuni
        }
    }
})