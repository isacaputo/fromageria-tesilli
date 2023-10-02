"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Products", [
      {
        product_name: "Juri",
        product_description: "Castanha de Cajú e Tâmara",
        product_half_price: 32.0,
        product_whole_price: 49.0,
        product_half_weight: 230,
        product_whole_weight: 460,
        product_pairing:
          "Café, licores, vinhos rosés, vinho do Porto, vinhos Jerez, vinhos tintos italianos ou cervejas do tipo Lager.",
        product_slogan:
          "Um queijo com sabor suave. Deixa na boca um gostinho amanteigado da castanha de cajú com um toque adocicado da tâmara.",
        product_category: "Castanhas e Frutas Secas",
        product_main_image: "/images/cheese_pictures/juri/juri1.png",
        product_extra_image: "/images/cheese_pictures/juri/juri2.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_name: "Zasfage",
        product_description: "Pistache e Figo Turco",
        product_half_price: 32.0,
        product_whole_price: 49.0,
        product_half_weight: 230,
        product_whole_weight: 460,
        product_pairing:
          "Vinhos brancos, espumantes demi-sec ou cervejas dos tipos Sour, Witbier, Weissbier, Saison.",
        product_slogan:
          "Um queijo com uma combinação interessante: um certo toque mentolado do pistache com as sementinhas do figo seco, que provocam pequenas explosões de sabor a cada mordida.",
        product_category: "Castanhas e Frutas Secas",
        product_main_image: "/images/cheese_pictures/zasfage/zasfage1.png",
        product_extra_image: "/images/cheese_pictures/zasfage/zasfage2.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_name: "Namenit",
        product_description: "Raspas de Laranja e Limão Siciliano",
        product_half_price: 31.0,
        product_whole_price: 47.0,
        product_half_weight: 230,
        product_whole_weight: 460,
        product_pairing:
          "Vinhos verdes, vinhos brancos e rosés, vinhos tintos leves ou cervejas do tipo Saison.",
        product_slogan:
          "Um queijo cítrico e refrescante. As raspas das cascas do limão e da laranja dão um aroma marcante ao queijo, equilibrando muito bem ácido e doce.",
        product_category: "Aromáticos",
        product_main_image: "/images/cheese_pictures/namenit/namenit1.png",
        product_extra_image: "/images/cheese_pictures/namenit/namenit2.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_name: "Tesi",
        product_description: "Pimenta Rosa e Alecrim",
        product_half_price: 26.0,
        product_whole_price: 40.0,
        product_half_weight: 230,
        product_whole_weight: 460,
        product_pairing: "Mel, azeite, espumantes Brut ou frisantes rosé.",
        product_slogan:
          "A pimenta rosa é a cereja do bolo (no caso, do queijo). Ela traz todo o seu charme para somar à refrescância do alecrim e deixar o queijo suavemente picante, com um aroma incrível de especiarias.",
        product_category: "Aromáticos",
        product_main_image: "/images/cheese_pictures/tesi/tesi1.png",
        product_extra_image: "/images/cheese_pictures/tesi/tesi2.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_name: "Baqua",
        product_description: "Pimenta Biquinho",
        product_half_price: 26.0,
        product_whole_price: 40.0,
        product_half_weight: 230,
        product_whole_weight: 460,
        product_pairing:
          "Cervejas do tipo Pilsen, espumantes, vinhos brancos, vinhos tintos de meio corpo ou bebidas destiladas.",
        product_slogan:
          "Essa variedade de pimenta não arde como as outras, mas traz para o queijo uma dose extra de aroma e sabor.",
        product_category: "Temperados",
        product_main_image: "/images/cheese_pictures/baqua/baqua1.png",
        product_extra_image: "/images/cheese_pictures/baqua/baqua2.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_name: "Bicel",
        product_description: "Bacon",
        product_half_price: 31.0,
        product_whole_price: 47.0,
        product_half_weight: 230,
        product_whole_weight: 460,
        product_pairing:
          "Vinhos tintos de meio corpo ou cervejas do tipo Pilsen.",
        product_slogan:
          "Essa iguaria tão utilizada nas receitas brasileiras não poderia faltar nos nossos queijos. Além de trazer um toque a mais de sal, o sabor defumado do bacon aciona aquela memória afetiva de comida feita a lenha.",
        product_category: "Temperados",
        product_main_image: "/images/cheese_pictures/bicel/bicel1.png",
        product_extra_image: "/images/cheese_pictures/bicel/bicel2.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_name: "Chama",
        product_description: "Chimichurri",
        product_half_price: 26.0,
        product_whole_price: 40.0,
        product_half_weight: 230,
        product_whole_weight: 460,
        product_pairing:
          "Mel, vinhos brancos, espumantes, frisantes, vinhos tintos não muito tânicos ou cervejas do tipo IPA.",
        product_slogan:
          "Chimichurri é uma mistura de temperos típica da Argentina e Uruguai. Cada ingrediente dessa mistura eleva ainda mais o sabor do queijo: orégano, folhas de louro, pimenta calabresa, alho, salsinha, manjericão e azeite!",
        product_category: "Temperados",
        product_main_image: "/images/cheese_pictures/chama/chama1.png",
        product_extra_image: "/images/cheese_pictures/chama/chama2.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_name: "Ftare",
        product_description: "Alho Frito",
        product_half_price: 20.0,
        product_whole_price: 40.0,
        product_half_weight: 230,
        product_whole_weight: 460,
        product_pairing:
          "Cervejas do tipo APA, espumantes do tipo Brut, vinhos brancos e rosés.",
        product_slogan:
          "Queijo bem temperado, com um sabor delicioso de alho fritinho.",
        product_category: "Temperados",
        product_main_image: "/images/cheese_pictures/ftare/ftare1.png",
        product_extra_image: "/images/cheese_pictures/ftare/ftare2.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_name: "Socemil",
        product_description: "Tomate Seco e Manjericão",
        product_half_price: 31.0,
        product_whole_price: 47.0,
        product_half_weight: 230,
        product_whole_weight: 460,
        product_pairing:
          "Azeite, vinhos tintos italianos, vinhos rosés encorpados ou cerveja tipo Saison.",
        product_slogan:
          "Um mix delicioso do aroma fresco do manjericão e o tomate seco artesanal super bem temperado.",
        product_category: "Temperados",
        product_main_image: "/images/cheese_pictures/socemil/socemil1.png",
        product_extra_image: "/images/cheese_pictures/socemil/socemil2.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_name: "Telo",
        product_description: "Pepperoni",
        product_half_price: 31.0,
        product_whole_price: 47.0,
        product_half_weight: 230,
        product_whole_weight: 460,
        product_pairing: "Vinhos tintos tânicos.",
        product_slogan:
          "Um queijo bem untuoso (massa bem cremosa) com sabor de salame fresco, ligeiramente picante.",
        product_category: "Temperados",
        product_main_image: "/images/cheese_pictures/telo/telo1.png",
        product_extra_image: "/images/cheese_pictures/telo/telo2.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_name: "Zac",
        product_description: "Picante",
        product_half_price: 26.0,
        product_whole_price: 40.0,
        product_half_weight: 230,
        product_whole_weight: 460,
        product_pairing: "Vinhos tintos de meio corpo ou cervejas leves.",
        product_slogan:
          "Receita elaborada combinando precisamente a quantidade de cada especiaria: pimenta calabresa, pimenta do reino, orégano e páprica picante defumada. O sabor final é surpreendente!",
        product_category: "Temperados",
        product_main_image: "/images/cheese_pictures/zac/zac1.png",
        product_extra_image: "/images/cheese_pictures/zac/zac2.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_name: "Zazzot",
        product_description: "Lemon Pepper",
        product_half_price: 26.0,
        product_whole_price: 40.0,
        product_half_weight: 230,
        product_whole_weight: 460,
        product_pairing:
          "Cervejas maltadas, cachaças envelhecidas, vinhos brancos ou espumantes.",
        product_slogan:
          "Um queijo salgadinho, com o frescor das raspas de limão misturado à ardência branda da pimenta-do-reino.",
        product_category: "Temperados",
        product_main_image: "/images/cheese_pictures/zazzot/zazzot1.png",
        product_extra_image: "/images/cheese_pictures/zazzot/zazzot2.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_name: "Nogte",
        product_description: "Alho Negro",
        product_half_price: 34.0,
        product_whole_price: 52.0,
        product_half_weight: 230,
        product_whole_weight: 460,
        product_pairing:
          "Cervejas do tipo Red Ale e Porter ou vinhos tintos leves.",
        product_slogan:
          "O alho negro é um alho maturado sob condições de temperatura e umidade controladas. Seu sabor é único e dá ao queijo um toque adocicado, com notas de vinagre balsâmico e tamarindo.",
        product_category: "Temperados",
        product_main_image: "/images/cheese_pictures/nogte/nogte1.png",
        product_extra_image: "/images/cheese_pictures/nogte/nogte2.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_name: "Rtufi",
        product_description: "Creme de Trufas",
        product_half_price: 40.0,
        product_whole_price: 62.0,
        product_half_weight: 230,
        product_whole_weight: 460,
        product_pairing: "Vinhos tintos de meio corpo ou vinhos brancos.",
        product_slogan:
          "Um queijo com sabor arrebatador, isso porque a trufa -um tipo de fungo-  agrega uma complexidade de aromas e paladares. O sabor do queijo tem a essência da natureza, da floresta e da umidade da terra. Lembra um pouco o amanteigado das castanhas com um toque frutado.",
        product_category: "Temperados",
        product_main_image: "/images/cheese_pictures/rtufi/rtufi1.png",
        product_extra_image: "/images/cheese_pictures/rtufi/rtufi2.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_name: "Biula",
        product_description: "Baunilha",
        product_half_price: 34.0,
        product_whole_price: 52.0,
        product_half_weight: 230,
        product_whole_weight: 460,
        product_pairing:
          "Café, geleia de café, licores, vinhos Jerez e cervejas carameladas.",
        product_slogan:
          "Um queijo suave e delicado, assim como o sabor da baunilha.",
        product_category: "To Sweeten Life",
        product_main_image: "/images/cheese_pictures/biula/biula1.png",
        product_extra_image: "/images/cheese_pictures/biula/biula2.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_name: "Noaro",
        product_description: "Doce de Leite",
        product_half_price: 26.0,
        product_whole_price: 40.0,
        product_half_weight: 230,
        product_whole_weight: 460,
        product_pairing:
          "Café, licores, geléia de café, canela em pó, vinhos Jerez, vinho do Porto ou cervejas dos tipos Porter e Bock.",
        product_slogan:
          "O azedinho do queijo equilibra perfeitamente o açúcar do doce de leite.",
        product_category: "To Sweeten Life",
        product_main_image: "/images/cheese_pictures/noaro/noaro1.png",
        product_extra_image: "/images/cheese_pictures/noaro/noaro2.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_name: "Ciscie",
        product_description: "Goiabada Cascão",
        product_half_price: 26.0,
        product_whole_price: 40.0,
        product_half_weight: 230,
        product_whole_weight: 460,
        product_pairing: "Café, licores ou cervejas do tipo Sour.",
        product_slogan:
          "Goiabada, queijo e um café: tem combinação mais deliciosa?",
        product_category: "To Sweeten Life",
        product_main_image: "/images/cheese_pictures/ciscie/ciscie1.png",
        product_extra_image: "/images/cheese_pictures/ciscie/ciscie2.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_name: "Zinori",
        product_description: "Paleta de Queijos",
        product_half_price: null,
        product_whole_price: 39.0,
        product_half_weight: null,
        product_whole_weight: 250,
        product_pairing: "Vinhos ou Cervejas",
        product_slogan:
          "Surpreenda-se! Escolhemos 3 queijos do nosso cardápio e montamos a paleta surpresa. Você só precisa pensar no momento especial para degustar essas delícias.",
        product_category: "To Enjoy",
        product_main_image: "/images/cheese_pictures/zinori/zinori1.png",
        product_extra_image: "/images/cheese_pictures/zinori/zinori2.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
