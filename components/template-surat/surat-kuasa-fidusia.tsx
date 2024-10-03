'use client';

// components/SuratKuasaPDF.tsx
import { Document, Page, Text, View } from '@react-pdf/renderer';
import { styles } from './common-styles';
import VerticalSpacing from './vertical-spacing';

const financingObjeckDataLabels = [
  'Merk/Type',
  'Nomor Mesin',
  'Nomor Rangka',
  'Nomor Polisi',
  'Nomor BPKB',
  'Warna',
  'Tahun Pembuatan',
  'BPKB atas nama',
  'Kondisi'
];

// The component for the "Surat Kuasa"
const SuratKuasaPDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Title */}
      <Text
        style={{
          ...styles.title,
          textDecoration: 'underline',
          letterSpacing: '3px'
        }}
      >
        SURATKUASA
      </Text>

      {/* Body */}
      <View style={styles.section}>
        <Text style={styles.text}>Yang bertanda tangan di bawah ini :</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Nama</Text>
          <Text style={styles.value}>:</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Alamat</Text>
          <Text style={styles.value}>:</Text>
        </View>
        {/* vertical spacing */}
        <View style={styles.row} />
        <View style={styles.row} />
        <View style={styles.row} />

        <View style={styles.row}>
          <Text style={styles.label}>NIK</Text>
          <Text style={styles.value}>:</Text>
        </View>
        <Text style={styles.text}>(selanjutnya disebut “Pemberi Kuasa”)</Text>

        <Text style={styles.text}>Dengan ini memberi kuasa dengan hak substitusi, kepada :</Text>
        <View style={styles.row}>
          <Text
            style={{
              ...styles.label,
              width: '190px'
            }}
          >
            Nama Perusahaan
          </Text>
          <Text style={styles.value}>: PT. SINAR MITRA SEPADAN FINANCE</Text>
        </View>
        <View style={styles.row}>
          <Text
            style={{
              ...styles.label,
              width: '190px'
            }}
          >
            Alamat Kantor Pusat
          </Text>
          <Text style={styles.value}>: Agro Plaza Lt. 16-17 Jl. HR Rasuna Said X-2 No. 1, Jakarta 12950</Text>
        </View>
        <VerticalSpacing height="14px" />
        <Text style={styles.text}>(selanjutnya disebut “Penerima Kuasa”)</Text>

        <Text style={styles.text}>
          ---------------------------------------------------------------KHUSUS:------------------------------------------------
        </Text>

        <Text style={styles.text}>
          Untuk dan atas nama serta sah mewakili Pemberi Kuasa melakukan pembuatan dan pendaftaran jaminan fidusia
          sesuai dengan ketentuan-ketentuan yang berlaku, berdasarkan Perjanjian Pembiayaan:
        </Text>

        <View style={styles.text}>
          <View style={styles.row}>
            <Text style={styles.label}>Nomor</Text>
            <Text style={styles.value}>:</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Tanggal</Text>
            <Text style={styles.value}>:</Text>
          </View>
        </View>

        <Text style={styles.text}>Atas Objek Pembiayaan, dengan data-data sebagai berikut:</Text>

        <View style={styles.indent}>
          {financingObjeckDataLabels.map((label) => (
            <View style={styles.row}>
              <Text style={styles.label}>{label}</Text>
              <Text style={styles.value}>:</Text>
            </View>
          ))}
        </View>

        <Text style={styles.text}>
          Sehubungan dengan hal tersebut diatas, Penerima Kuasa berhak menghadap Notaris dan/atau pejabat yang
          berwenang, minta atau memberikan keterangan, membuat atau suruh membuat, menandatangani akta pembebanan
          jaminan fidusia, perjanjian/pernyataan, formulir-formulir dan surat-surat lain yang berkaitan dengan
          pembebanan dan pendaftaran jaminan fidusia tersebut, melakukan segala sesuatu yang dipandang baik sehubungan
          dengan pembebanan dan pendaftaran jaminan fidusia tersebut.
        </Text>

        <Text style={styles.text}>Demikian Surat Kuasa ini dibuat untuk dipergunakan seperlunya.</Text>
      </View>

      {/* footer */}
      <View style={styles.row}>
        {/* left column */}
        <View style={styles.column}>
          <Text style={styles.text}>Pemberi Kuasa,</Text>
          <VerticalSpacing height="12px" />
          <View
            style={{
              borderWidth: '2px',
              borderColor: '#D1D5DB',
              width: '40px',
              aspectRatio: 1 / 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text style={{ fontSize: '8px' }}>Materai</Text>
            <Text style={{ fontSize: '8px' }}>10.000</Text>
          </View>
          <VerticalSpacing height="72px" />
          <Text
            style={{
              fontWeight: 700,
              color: '#9CA3AF',
              textTransform: 'uppercase'
            }}
          >
            FIDUSIA
          </Text>
        </View>
        {/* right column */}
        <View style={styles.column}>
          <Text style={styles.text}>Penerima Kuasa,</Text>
          <Text
            style={{
              ...styles.text,
              fontFamily: 'Helvetica-Bold'
            }}
          >
            PT. SINAR MITRA SEPADAN FINANCE
          </Text>
          <VerticalSpacing height="62px" />
          <Text style={styles.text}>Kepala Cabang</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default SuratKuasaPDF;
