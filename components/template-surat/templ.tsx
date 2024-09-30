'use client';

// components/FinanceDocument.tsx
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 30,
    fontFamily: 'Helvetica'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 600,
    fontFamily: 'Helvetica-Bold'
  },
  paragraph: {
    fontSize: 12,
    marginBottom: 5
  }
});

// Create Document Component
export const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Understanding Financing</Text>
        <Text style={styles.paragraph}>
          Financing is the process of providing funds for business activities, making purchases, or investing.
        </Text>
        <Text style={styles.paragraph}>
          There are two main types of financing: equity financing and debt financing.
        </Text>
        <Text style={styles.paragraph}>
          Equity financing involves raising capital through the sale of shares, while debt financing involves borrowing
          funds that must be repaid over time with interest.
        </Text>
        <Text style={styles.paragraph}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias rem voluptates eaque cumque dolor sapiente
          quaerat earum labore accusantium ab velit corrupti maxime minus ipsam, quasi fuga rerum aliquid recusandae?
          Corporis et necessitatibus odio neque atque illo impedit facilis est autem dolores perspiciatis facere odit,
          laboriosam nulla pariatur, consectetur harum sequi eaque assumenda magnam culpa, quae eum! Suscipit, cum eius.
          Aliquid nam voluptate illo aspernatur exercitationem totam harum dolor dolorem ratione maxime? Harum sequi
          beatae sapiente, at fuga voluptate facere sed ullam alias iusto illo saepe eligendi porro unde provident?
          Deleniti non voluptate eius officia sit, eum possimus, quam illum quia aspernatur perspiciatis perferendis
          quidem, itaque ullam! Corporis numquam id totam beatae quibusdam, sunt modi perferendis ab quis. Iure,
          suscipit. Facere consequatur amet, repellendus quae omnis ullam optio eum autem exercitationem rem temporibus
          adipisci eaque veniam est, non dolorum atque deleniti nobis. Odio facilis magnam voluptatibus eveniet
          temporibus provident porro? Voluptatibus aliquid tenetur architecto, dolore eaque porro optio impedit, beatae
          fugit esse voluptas cumque voluptates quod sunt doloribus voluptatem similique atque amet harum? Eius optio
          dolorum aliquam illo iusto ipsa? Dignissimos, architecto dolor eos enim, esse facilis blanditiis obcaecati
          possimus tempora, error quaerat! Nulla explicabo sapiente ex reiciendis ut! Consequuntur recusandae quia error
          sapiente at tempore suscipit in fugiat libero! Omnis officiis exercitationem suscipit, atque repellat vero
          fugiat explicabo alias enim culpa aut, ducimus in natus voluptates perspiciatis unde est molestias ullam
          veritatis! Odit delectus quidem nobis possimus facilis recusandae? Ea voluptatibus tenetur voluptate fuga non
          hic ducimus, rem ratione. Libero totam velit nostrum quibusdam accusamus voluptatum quas sunt ex iusto minima
          illum vel expedita quidem, suscipit, excepturi ipsam amet. Reprehenderit animi laboriosam cum quia eum
          dolorem, earum cupiditate, neque non rem tempore quas accusantium vel fugit voluptate illum aliquam odit.
          Tempora ratione ut perspiciatis ea quaerat, nam harum optio. Exercitationem neque atque facere ut voluptatem.
          Inventore fuga ab vel saepe impedit, debitis commodi repudiandae maiores voluptatum quia rerum accusamus
          eaque. Ea quisquam corporis commodi perferendis dicta possimus eos ad. Ipsam aut ipsa totam aperiam aspernatur
          ab deleniti repellat iusto hic voluptatem saepe amet dolorum soluta assumenda expedita error, adipisci
          deserunt itaque quae! Aliquid exercitationem dolore dolorem placeat illum quam. Quibusdam totam neque repellat
          ullam magni aliquid quasi perspiciatis ipsum quas suscipit rerum tempore iure earum aperiam at est obcaecati
          eius, consequatur eligendi, odio ratione provident fugiat sunt laudantium! Libero? Reprehenderit cum labore
          rerum delectus, praesentium eius, fuga aliquam non, recusandae ipsum consequuntur incidunt. Vel voluptatem
          consequuntur modi quidem? Sapiente, deserunt. Recusandae accusantium nostrum magni consectetur explicabo
          voluptatibus, at nam. Eaque, delectus accusantium, veniam incidunt ducimus iste quam rerum fugit consequuntur
          architecto tempore ex, dolore illum ab. Quam, eaque culpa fugiat, perspiciatis rem asperiores accusamus,
          assumenda excepturi dolorum quibusdam dolorem. Incidunt voluptates nemo unde minus iste excepturi consequatur
          vel quos laboriosam at minima officia pariatur, itaque quam ipsum earum veniam temporibus iusto in iure culpa,
          quae quod. Hic, ex voluptas. Corrupti ipsam ipsum nobis! Illum libero expedita itaque rem inventore facere
          iste sapiente possimus dolores, obcaecati tempore accusamus ullam repellendus nemo earum iure maiores ipsa
          aliquid at vero, velit deserunt. Tempora amet repellat similique asperiores. Commodi voluptate atque sunt
          similique distinctio quis eveniet doloribus, quibusdam dolorum repellendus quo adipisci cumque at, saepe,
          earum incidunt facere mollitia molestias natus exercitationem! Quod! Sit voluptatem odio placeat distinctio
          tempora veniam, explicabo id tempore fugit, tenetur corrupti a, exercitationem ipsa impedit. Molestias
          mollitia dicta eveniet, architecto consectetur expedita, debitis nobis blanditiis veritatis soluta error! Amet
          veritatis cum sequi exercitationem harum earum aliquam quo perferendis molestiae architecto suscipit at
          officia iure maiores nobis, odit eveniet optio consequatur blanditiis dolor autem accusamus, ipsum tenetur?
          Dolores, tempora? Obcaecati adipisci error temporibus saepe labore deserunt autem, voluptatum illo eum itaque.
          Aut accusamus id atque odit? Officia, architecto, excepturi similique adipisci velit provident nam enim
          deserunt nostrum earum soluta. Porro natus dolorum similique optio eum itaque dicta asperiores earum expedita!
          Odio, error necessitatibus laboriosam omnis suscipit rem nesciunt quae esse, odit delectus sint recusandae ut
          ipsam fugiat eligendi excepturi? Quidem iste nam, ipsa praesentium, facilis aliquam exercitationem non minima
          saepe hic sapiente tempore doloribus officia aspernatur doloremque nobis nostrum voluptatum inventore
          cupiditate ipsam ducimus iure labore a totam. Natus? Molestiae a repellat labore neque reiciendis omnis, quae
          voluptate at beatae dignissimos, possimus eveniet. Quod tempore assumenda esse vel magnam quos possimus
          eligendi adipisci, quaerat enim quia, iure debitis distinctio. Distinctio modi necessitatibus vel maiores
          sequi quas sit debitis nobis amet dolorum, tenetur eveniet quae eius accusamus asperiores explicabo incidunt,
          quibusdam facilis officiis tempora ipsam voluptatem molestias dolorem nam. Incidunt. Optio est laboriosam
          similique reprehenderit culpa dolore aperiam temporibus consequuntur, sequi sed porro nostrum. Modi, similique
          excepturi voluptatum ullam error, quasi assumenda dolorum eum quaerat id soluta eius placeat iure. Dolores hic
          voluptas in facilis voluptates consequatur sed exercitationem dolorum corrupti nihil, fuga nulla fugit
          excepturi at dolor facere blanditiis labore impedit omnis officiis mollitia cum deserunt! Quam, vero
          explicabo. Soluta reiciendis omnis tempore veritatis vitae enim nisi possimus voluptas autem amet corrupti,
          inventore hic eos, totam id repellendus repudiandae ad neque maxime eveniet ratione magnam sed atque! Minus,
          possimus? Aperiam ex iste cupiditate neque porro! Corrupti dolor ullam pariatur distinctio laboriosam
          similique, suscipit omnis fugiat deleniti sint quaerat quae illo cum ducimus veritatis iusto esse! Totam,
          quidem perferendis. Cumque? Tempora officia ut quisquam officiis modi non, placeat libero beatae odit itaque
          debitis esse reiciendis porro quis eum necessitatibus! Qui ipsam impedit illum excepturi deserunt veniam
          provident maiores numquam cumque? Ipsa tempora voluptatem modi, magni aperiam dicta molestias natus nostrum,
          repellat ab dignissimos doloremque distinctio saepe commodi assumenda perspiciatis, magnam ullam veniam quasi
          velit expedita dolor suscipit? Maxime, praesentium doloribus! Commodi sint molestiae provident ullam
          praesentium voluptates ab? Eligendi debitis a quasi libero. Sunt praesentium aspernatur blanditiis autem quas
          cumque vitae, perferendis iusto voluptatibus fugit earum quo dolore maiores natus. Itaque omnis sunt quo
          cumque optio, totam fuga nostrum beatae repellat. Harum hic neque modi et. Error, fuga, consequuntur, ratione
          unde consequatur ipsum sequi quia veniam ut assumenda corporis maiores! Reiciendis modi praesentium id
          laboriosam culpa impedit enim ad blanditiis debitis qui sequi quisquam at aspernatur, suscipit odit rem esse
          adipisci, facere omnis inventore iusto. Consectetur quod aperiam quia cupiditate! Inventore architecto
          perferendis quia eos sapiente id aliquam distinctio, suscipit vel, cum at dolorem in odit modi accusamus
          provident ipsum illum quisquam numquam, doloribus doloremque aspernatur consectetur totam. Ipsa, quas? Eveniet
          delectus commodi accusamus blanditiis natus. Et, soluta molestias ut, non debitis perspiciatis nihil, tempore
          aspernatur excepturi facere harum error. Similique sed eos minima dolores nostrum eius eum nobis unde.
          Commodi, fugit cupiditate! Tenetur sapiente iste veniam reprehenderit cumque eligendi molestiae beatae autem
          eum distinctio error nesciunt perferendis mollitia, fugiat tempora, eaque quae sit? Quae hic aspernatur
          dignissimos quasi deserunt? Est, consequuntur, facilis laudantium aliquid cum accusamus at eos officia
          delectus odio necessitatibus quae assumenda voluptate? Saepe suscipit at tenetur soluta exercitationem
          assumenda, nesciunt tempore, veniam aperiam dolorum, non architecto. Porro dolor velit magnam nesciunt nobis
          maiores dolores, eaque libero error, harum tenetur illum inventore deleniti expedita suscipit incidunt saepe,
          optio aliquid perspiciatis qui perferendis! Ad accusamus nam voluptatem blanditiis? Placeat hic rerum fugiat
          odit ad sunt doloremque laudantium sapiente facere inventore vero ipsa architecto dolore officia molestiae
          harum et fuga voluptas, quo nemo iure quasi. Nulla cumque labore ea! Distinctio dolorem animi quisquam,
          dignissimos eius vel fugiat qui magnam quo nostrum ad excepturi fuga similique! Ipsa vero laudantium, eaque
          fugit rerum ab aliquam quis soluta blanditiis, corrupti consequuntur aspernatur! Ipsam repudiandae saepe iure
          ut veniam dolores numquam, quidem nihil temporibus est sint sequi magnam, quia corporis aliquid accusamus?
          Quae quaerat quidem repellendus placeat rem dicta iusto quisquam sunt temporibus! Accusamus, nisi. Ducimus
          iste, consequatur quas enim aperiam nesciunt mollitia nihil iure nostrum. Aperiam aspernatur soluta labore
          quibusdam assumenda eius adipisci. Sint placeat sit excepturi aperiam molestias possimus, aliquam quos?
          Consectetur voluptas eos animi vitae. Reiciendis, dolorum rem. Nisi id porro numquam at obcaecati itaque
          molestias, corporis dolorem placeat quam? Porro a aperiam, magni doloribus rem earum dolore quas illo! Facilis
          laboriosam tenetur tempore? Porro, voluptatibus? Odit fuga aspernatur illum, assumenda ad voluptates
          perferendis in magni minus vero deleniti doloremque quo rem dolorem sequi, cum ipsum inventore placeat
          architecto nostrum? Ipsa omnis iure repellendus necessitatibus, dignissimos obcaecati adipisci. Veniam a
          corrupti harum eaque! Eligendi provident tempore, veritatis ipsum est molestiae doloremque, repudiandae
          expedita quaerat sapiente hic id placeat facilis. Aperiam! Sed cum cupiditate laborum quam labore consectetur
          voluptatem nostrum fuga, odio velit ex nemo impedit error pariatur, perspiciatis natus! Repellendus doloremque
          quo mollitia placeat aliquam dicta consectetur atque eaque ut. Porro, molestias? Dicta, culpa earum cumque
          asperiores in, unde, rerum eveniet quisquam quo tempora perferendis! Necessitatibus obcaecati exercitationem
          sed eum praesentium. Quia distinctio deserunt vero ab ratione eveniet fuga delectus. Repudiandae quisquam
          pariatur odio tempora doloremque facere animi iure? Molestias quam iusto velit? Suscipit assumenda eius, nemo
          soluta nam impedit minima eos nostrum at animi repudiandae et recusandae obcaecati facilis? Voluptas quidem
          molestias corporis esse eaque nemo nam earum! Amet accusamus voluptates exercitationem, unde nisi rerum ipsam
          dolores ullam veritatis earum adipisci fugiat in culpa odit error porro vitae nemo. Suscipit omnis porro
          recusandae quos ipsam quaerat. Porro quae impedit odio neque perferendis. Quos sint quis ipsam nesciunt
          officia placeat eveniet. Soluta quasi officiis est dignissimos? Officiis molestiae qui quae? Quod amet
          incidunt quam doloremque at facilis vel aperiam tenetur laudantium possimus fugiat eaque nulla, sit omnis
          officiis? Sapiente ullam aliquam qui dolorem iusto cumque veniam accusantium sequi ipsam est! Aperiam
          reiciendis labore voluptatum quam a sit soluta! Voluptate sunt illum, non eveniet natus consequuntur delectus
          alias voluptatem quibusdam corporis veniam voluptatum dolorum libero id aut eos impedit porro recusandae?
          Consectetur nobis libero neque unde, labore voluptatum iste iusto totam ratione? Itaque atque explicabo
          debitis rem. Reprehenderit, odio quis excepturi doloremque nihil mollitia, quas quia error quidem repellat
          cumque suscipit. Molestias dicta odio alias, officiis fugit iusto deserunt suscipit quaerat praesentium
          exercitationem nesciunt blanditiis repudiandae nihil magnam assumenda qui eos est doloribus possimus non?
          Vitae hic fuga autem possimus sapiente. Maxime officiis aliquam tempora ad reprehenderit in nemo nobis
          nesciunt, architecto eos laborum quos vitae. Nisi iste dolorum, repellat assumenda libero sit modi quaerat
          labore maiores accusantium vitae facere aut. At placeat reprehenderit error culpa alias corporis id beatae
          quos vero, itaque dolorem unde voluptatem sequi quidem aperiam consequatur cum amet. Minima consectetur
          veritatis sint aliquid laborum doloremque officiis cum! Eaque omnis est, aspernatur voluptatem rerum
          laudantium veritatis, commodi iure minima culpa sapiente reiciendis fuga veniam, nostrum ullam officia facilis
          harum nemo molestiae. Doloribus modi placeat quae enim quo quod! Quos rem praesentium assumenda deserunt
          explicabo nisi! Ducimus harum cupiditate eum pariatur facilis minus quasi officia amet quos libero culpa
          deserunt vel, qui vitae incidunt! Quibusdam, minima at. Nisi, omnis? Blanditiis fugit soluta totam officiis,
          fugiat assumenda aliquam est neque necessitatibus, eos placeat laudantium sunt. Consectetur rem quis
          consequatur est ipsam officia, necessitatibus voluptates? Asperiores saepe laborum reiciendis nemo ad. Odit
          temporibus beatae praesentium harum alias? Quae quia laboriosam vel blanditiis sint! Ab deleniti architecto,
          blanditiis vel numquam quasi aperiam, earum dolor illum fugiat reprehenderit debitis sequi voluptates.
          Blanditiis, vel. Eveniet autem modi deserunt esse unde quaerat incidunt rerum praesentium repellendus quod
          tenetur veniam fuga, distinctio doloribus aspernatur quasi neque, dolorum sint veritatis odit dolores!
          Repudiandae natus obcaecati pariatur ratione. Necessitatibus debitis veniam iste modi assumenda voluptatibus
          sunt tempora tempore, accusantium autem. Asperiores molestiae tempora neque quas, nemo placeat voluptate
          dolorum sequi. Sint accusamus inventore ex vitae voluptatem illum enim! Eius in commodi qui corporis rerum,
          iusto velit repellat error veritatis nihil sint similique totam fuga sunt voluptas, earum, magnam quaerat
          quidem. Deserunt officia, magnam minima et ipsam alias aperiam. Maiores suscipit molestiae dolorum repellendus
          illo quasi asperiores nam ipsum a, beatae aliquam laboriosam facere iste dolores itaque consequuntur
          repudiandae sit commodi ex quis placeat repellat. Minus dolorum quaerat reprehenderit? Assumenda repellendus,
          voluptatem ea quod ut quas voluptas, facilis, dolorem officia exercitationem quam illum fugiat ex. Modi libero
          quibusdam nemo, ratione porro illum, eius quisquam facilis, sed tempora ut cupiditate. Ex animi modi incidunt,
          dignissimos ducimus ad quasi, magnam dolorum illum quae mollitia dolore earum nobis quas. Enim molestiae, qui
          ut ab suscipit assumenda sequi esse explicabo perspiciatis, quod distinctio? Deleniti facilis placeat,
          quisquam voluptas incidunt inventore nam, molestiae ipsam alias, voluptatem debitis perspiciatis dolorum rerum
          praesentium quibusdam sunt suscipit distinctio aut possimus corrupti. Nostrum laborum ex error iusto quis.
          Dolorem tempora repellat, facilis perferendis, vero, nulla deserunt facere quam ullam earum autem. At impedit
          est, dolores deleniti voluptatibus possimus amet nihil natus non facere modi eos illum ex veniam. Tempora quas
          facilis sed, voluptatem cupiditate adipisci molestias impedit? Cumque molestias quae corporis. Rem deserunt
          maiores, eum quas odit ab, corporis molestias dolores sequi sapiente qui? Minima corporis quos reiciendis. Et
          fugit ipsum numquam quis, in atque maiores temporibus assumenda dolorum dolorem at ratione autem sunt eius?
          Dolore architecto, optio molestiae voluptate minima voluptatum, repellendus sit facilis, atque in esse.
          Tempore nesciunt voluptate numquam reprehenderit vero distinctio accusamus consequatur libero aliquam nemo
          voluptatum, laborum, nam voluptates ipsa doloribus accusantium cum quos eveniet autem, minus illo soluta
          quisquam vitae? Architecto, doloremque. Ut neque consequatur sapiente asperiores laborum, quisquam sint
          dignissimos facilis aliquam velit ab similique quis, non quaerat? Iste ipsa architecto illo quo alias
          repudiandae, corporis neque ducimus, eligendi explicabo molestiae. Libero recusandae totam iste modi neque
          debitis excepturi vitae? Mollitia pariatur nisi ratione corporis consequuntur repellendus maiores ipsam, aut
          quia? Quidem praesentium vero autem perspiciatis facilis fugit odio enim quae? Eveniet, ipsa sed. Distinctio
          explicabo beatae sequi quia. Qui quia commodi, impedit modi tempora mollitia beatae porro minima voluptates
          dolorem vel in quos dolorum itaque iste perferendis a, quis quas? Corporis sapiente, ad id vel, a recusandae
          architecto ipsam rem numquam maxime veniam voluptatem officiis magni tempora expedita enim itaque. Doloribus,
          error ad doloremque quis enim at cum ipsam odit. Repellat maiores quos qui quisquam perferendis quod quasi.
          Voluptatibus excepturi maiores voluptate incidunt doloremque aliquam aperiam. Vel voluptates, nobis adipisci
          error mollitia quaerat iusto laborum illo soluta ab fugit? Quam. Quibusdam veniam vero quaerat laudantium iste
          aperiam debitis perferendis, explicabo aliquam? Corporis non, ullam maiores sequi quae inventore! Omnis
          placeat soluta similique mollitia. Laboriosam ipsa ea autem exercitationem doloribus nobis. Ipsum rerum sunt
          suscipit repellat deserunt molestias. Ratione minima dicta nemo quod perspiciatis voluptatum, dolor a atque
          corporis magnam ipsum earum modi officiis quas, commodi fugiat aliquam iure possimus pariatur! Quis non
          perspiciatis ipsa repellendus, praesentium harum suscipit amet itaque eum nam autem reiciendis totam quae
          perferendis voluptates, neque ipsum magni. Cupiditate aliquam deserunt laborum minus id alias doloremque
          iusto! Voluptate qui id est, ipsam dolorem odio aut nostrum exercitationem corporis expedita sapiente,
          asperiores ipsum explicabo eligendi nulla voluptatum excepturi voluptas nesciunt dolores molestias? Nulla
          corrupti ratione beatae adipisci fuga. Totam repellat sapiente est doloribus necessitatibus porro ut maxime
          explicabo? Cupiditate quam magni deleniti odio quae dolor voluptas! Magni deserunt, non qui vero molestias
          blanditiis exercitationem aspernatur accusantium animi corrupti. Dolorem unde quibusdam, illo eveniet
          voluptatem aperiam nam a! Illo aliquam nihil dolores accusantium fugiat exercitationem ducimus? Dicta ad ullam
          illo et ratione tempore. Modi ab earum eos quisquam in! Inventore modi odio laboriosam doloribus facilis
          expedita odit laudantium, eaque beatae! Temporibus animi quaerat cumque voluptatum error, aperiam autem
          tenetur velit odio non, eaque quisquam modi sunt fuga, maiores delectus. Pariatur consequatur molestiae ut
          error ipsam voluptates odit quasi quis, sed tempore. Ea, quis dolore hic voluptatum reiciendis distinctio
          molestiae fugit iste, nostrum optio exercitationem possimus quo sed voluptatem nulla. Illo voluptates nisi
          quia at pariatur excepturi quod repellendus esse consequatur aliquam molestias dolorem, iure sapiente
          quibusdam delectus quaerat quos debitis facilis. Nihil, eligendi consequatur corporis natus nobis debitis
          laborum! Rem similique provident hic eum, tenetur, placeat dolore nesciunt eius sint accusantium optio
          excepturi delectus, repudiandae incidunt tempora veniam. Impedit voluptas quaerat qui dignissimos
          necessitatibus dolore amet nam distinctio cum? Ea unde eos quia molestias numquam pariatur, voluptatem
          mollitia totam placeat a, expedita ipsum? Provident reiciendis beatae atque minima qui molestias fugiat nobis,
          magni temporibus molestiae inventore exercitationem veniam obcaecati? Harum unde, impedit cupiditate natus
          dolor dignissimos odio doloribus sit aspernatur ipsa quaerat officia quos, consequuntur nihil nisi ipsum quo
          porro. Autem, deserunt veniam quae magni optio hic tempora mollitia? Unde, nam sed. Iste sapiente
          reprehenderit rem assumenda ullam, laborum culpa consequatur earum dignissimos id, praesentium explicabo nulla
          laudantium incidunt? Quaerat sunt dolorem placeat natus sit sint explicabo labore quae?
        </Text>
      </View>
    </Page>
  </Document>
);
