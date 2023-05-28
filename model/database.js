require("dotenv").config();
const mysql = require("mysql");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
  host: DB_HOST || "127.0.0.1",
  user: DB_USER || "root",
  password: DB_PASS,
  database: DB_NAME || "fromageria",
  multipleStatements: true,
});

const SQL = `
  DROP TABLE if exists order_has_product;
  CREATE TABLE order_has_product (
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity FLOAT NOT NULL,
    PRIMARY KEY (order_id,product_id)
  );

  DROP TABLE if exists products;
  CREATE TABLE products
  (
    id                   int auto_increment
        primary key,
    product_name         varchar(100) null,
    product_description  varchar(255) null,
    product_half_price   float        null,
    product_whole_price  float        null,
    product_half_weight  float        null,
    product_whole_weight float        null,
    product_pairing      varchar(400) null,
    product_slogan       varchar(400) null,
    product_category     varchar(255) null,
    product_main_image   varchar(400) null,
    product_extra_image  varchar(400) null
);

  INSERT INTO products (product_name, product_description, product_half_price, product_whole_price, product_half_weight, product_whole_weight, product_pairing, product_slogan, product_category, product_main_image, product_extra_image) VALUES ('juri', 'Castanha de Cajú e Tâmara', 32, 49, 230, 460, 'Café, licores, vinhos rosés, vinho do Porto, vinhos Jerez, vinhos tintos italianos ou cervejas do tipo Lager.', 'Um queijo com sabor suave. Deixa na boca um gostinho amanteigado da castanha de cajú com um toque adocicado da tâmara.', 'Castanhas e Frutas Secas', './public/images/cheese_pictures/juri/juri1.jpg', './public/images/cheese_pictures/juri/juri2.jpg');
  INSERT INTO products (product_name, product_description, product_half_price, product_whole_price, product_half_weight, product_whole_weight, product_pairing, product_slogan, product_category, product_main_image, product_extra_image) VALUES ('zasfage', 'Pistache e Figo Turco', 32, 49, 230, 460, 'Vinhos brancos, espumantes demi-sec ou cervejas dos tipos Sour, Witbier, Weissbier, Saison.', 'Um queijo com uma combinação interessante: um certo toque mentolado do pistache com as sementinhas do figo seco, que provocam pequenas explosões de sabor a cada mordida.', 'Castanhas e Frutas Secas', './public/images/cheese_pictures/zasfage/zasfage1.jpg', './public/images/cheese_pictures/zasfage/zasfage2.jpg');
  INSERT INTO products (product_name, product_description, product_half_price, product_whole_price, product_half_weight, product_whole_weight, product_pairing, product_slogan, product_category, product_main_image, product_extra_image) VALUES ('namenit', 'Raspas de Laranja e Limão Siciliano', 31, 47, 230, 460, 'Vinhos verdes, vinhos brancos e rosés, vinhos tintos leves ou cervejas do tipo Saison.', 'Um queijo cítrico e refrescante. As raspas das cascas do limão e da laranja dão um aroma marcante ao queijo, equilibrando muito bem ácido e doce.', 'Aromáticos', './public/images/cheese_pictures/namenit/namenit1.jpg', './public/images/cheese_pictures/namenit/namenit2.jpg');
  INSERT INTO products (product_name, product_description, product_half_price, product_whole_price, product_half_weight, product_whole_weight, product_pairing, product_slogan, product_category, product_main_image, product_extra_image) VALUES ('tesi', 'Pimenta Rosa e Alecrim', 26, 40, 230, 460, 'Mel, azeite, espumantes Brut ou frisantes rosé.', 'A pimenta rosa é a cereja do bolo (no caso, do queijo). Ela traz todo o seu charme para somar à refrescância do alecrim e deixar o queijo suavemente picante, com um aroma incrível de especiarias.', 'Aromáticos', './public/images/cheese_pictures/tesi/tesi1.jpg', './public/images/cheese_pictures/tesi/tesi2.jpg');
  INSERT INTO products (product_name, product_description, product_half_price, product_whole_price, product_half_weight, product_whole_weight, product_pairing, product_slogan, product_category, product_main_image, product_extra_image) VALUES ('baqua', 'Pimenta Biquinho', 26, 40, 230, 460, 'Cervejas do tipo Pilsen, espumantes, vinhos brancos, vinhos tintos de meio corpo ou bebidas destiladas.', 'Essa variedade de pimenta não arde como as outras, mas traz para o queijo uma dose extra de aroma e sabor.', 'Temperados', './public/images/cheese_pictures/baqua/baqua1.jpg', './public/images/cheese_pictures/baqua/baqua2.jpg');
  INSERT INTO products (product_name, product_description, product_half_price, product_whole_price, product_half_weight, product_whole_weight, product_pairing, product_slogan, product_category, product_main_image, product_extra_image) VALUES ('bicel', 'Bacon', 31, 47, 230, 460, 'Vinhos tintos de meio corpo ou cervejas do tipo Pilsen.', 'Essa iguaria tão utilizada nas receitas brasileiras não poderia faltar nos nossos queijos. Além de trazer um toque a mais de sal, o sabor defumado do bacon aciona aquela memória afetiva de comida feita a lenha.', 'Temperados', './public/images/cheese_pictures/bicel/bicel1.jpg', './public/images/cheese_pictures/bicel/bicel2.jpg');
  INSERT INTO products (product_name, product_description, product_half_price, product_whole_price, product_half_weight, product_whole_weight, product_pairing, product_slogan, product_category, product_main_image, product_extra_image) VALUES ('chama', 'Chimichurri', 26, 40, 230, 460, 'Mel, vinhos brancos, espumantes, frisantes, vinhos tintos não muito tânicos ou cervejas do tipo IPA.', 'Chimichurri é uma mistura de temperos típica da Argentina e Uruguai. Cada ingrediente dessa mistura eleva ainda mais o sabor do queijo: orégano, folhas de louro, pimenta calabresa, alho, salsinha, manjericão e azeite!', 'Temperados', './public/images/cheese_pictures/chama/chama1.jpg', './public/images/cheese_pictures/chama/chama2.jpg');
  INSERT INTO products (product_name, product_description, product_half_price, product_whole_price, product_half_weight, product_whole_weight, product_pairing, product_slogan, product_category, product_main_image, product_extra_image) VALUES ('ftare', 'Alho Frito', 20, 40, 230, 460, 'Cervejas do tipo APA, espumantes do tipo Brut, vinhos brancos e rosés.', ' queijo bem temperado, com um sabor delicioso de alho fritinho.', 'Temperados', 'api/public/images/cheese_pictures/ftare/ftare1.jpg', './public/images/cheese_pictures/ftare/ftare2.jpg');
  INSERT INTO products (product_name, product_description, product_half_price, product_whole_price, product_half_weight, product_whole_weight, product_pairing, product_slogan, product_category, product_main_image, product_extra_image) VALUES ('socemil', 'Tomate Seco e Manjericão', 31, 47, 230, 460, 'Azeite, vinhos tintos italianos, vinhos rosés encorpados ou cerveja tipo Saison.', 'Um mix delicioso do aroma fresco do manjericão e o tomate seco artesanal super bem temperado.', 'Temperados', './public/images/cheese_pictures/socemil/socemil1.jpg', './public/images/cheese_pictures/socemil/socemil2.jpg');
  INSERT INTO products (product_name, product_description, product_half_price, product_whole_price, product_half_weight, product_whole_weight, product_pairing, product_slogan, product_category, product_main_image, product_extra_image) VALUES ('telo', 'Pepperoni', 31, 47, 230, 460, 'Vinhos tintos tânicos.', 'Um queijo bem untuoso (massa bem cremosa) com sabor de salame fresco, ligeiramente picante.', 'Temperados', './public/images/cheese_pictures/telo/telo1.jpg', './public/images/cheese_pictures/telo/telo2.jpg');
  INSERT INTO products (product_name, product_description, product_half_price, product_whole_price, product_half_weight, product_whole_weight, product_pairing, product_slogan, product_category, product_main_image, product_extra_image) VALUES ('zac', 'Picante', 26, 40, 230, 460, 'Vinhos tintos de meio corpo ou cervejas leves.', 'Receita elaborada combinando precisamente a quantidade de cada especiaria: pimenta calabresa, pimenta do reino, orégano e páprica picante defumada. O sabor final é surpreendente!', 'Temperados', './public/images/cheese_pictures/zac/zac1.jpg', './public/images/cheese_pictures/zac/zac2.jpg');
  INSERT INTO products (product_name, product_description, product_half_price, product_whole_price, product_half_weight, product_whole_weight, product_pairing, product_slogan, product_category, product_main_image, product_extra_image) VALUES ('zazzot', 'Lemon Pepper', 26, 40, 230, 460, 'Cervejas maltadas, cachaças envelhecidas, vinhos brancos ou espumantes.', 'Um queijo salgadinho, com o frescor das raspas de limão misturado à ardência branda da pimenta-do-reino.', 'Temperados', './public/images/cheese_pictures/zozzot/zazoot1.jpg', './public/images/cheese_pictures/zozzot/zozzot2.jpg');
  INSERT INTO products (product_name, product_description, product_half_price, product_whole_price, product_half_weight, product_whole_weight, product_pairing, product_slogan, product_category, product_main_image, product_extra_image) VALUES ('nogte', 'Alho Negro', 34, 52, 230, 460, 'Cervejas do tipo Red Ale e Porter ou vinhos tintos leves.', 'O alho negro é um alho maturado sob condições de temperatura e umidade controladas. Seu sabor é único e dá ao queijo um toque adocicado, com notas de vinagre balsâmico e tamarindo.', 'Temperados', './public/images/cheese_pictures/nogte/nogte1.jpg', './public/images/cheese_pictures/nogte/nogte2.jpg');
  INSERT INTO products (product_name, product_description, product_half_price, product_whole_price, product_half_weight, product_whole_weight, product_pairing, product_slogan, product_category, product_main_image, product_extra_image) VALUES ('rtufi', 'Creme de Trufas', 40, 62, 230, 460, 'Vinhos tintos de meio corpo ou vinhos brancos.', 'Um queijo com sabor arrebatador, isso porque a trufa -um tipo de fungo-  agrega uma complexidade de aromas e paladares. O sabor do queijo tem a essência da natureza, da floresta e da umidade da terra. Lembra um pouco o amanteigado das castanhas com um toque frutado.', 'Temperados', './public/images/cheese_pictures/rtufi/rtufi1.jpg', './public/images/cheese_pictures/rtufi/rtufi2.jpg');
  INSERT INTO products (product_name, product_description, product_half_price, product_whole_price, product_half_weight, product_whole_weight, product_pairing, product_slogan, product_category, product_main_image, product_extra_image) VALUES ('biula', 'Baunilha', 34, 52, 230, 460, 'Café, geleia de café, licores, vinhos Jerez e cervejas carameladas.', 'Um queijo suave e delicado, assim como o sabor da baunilha.', 'To Sweeten Life', './public/images/cheese_pictures/biula/biula1.jpg', './public/images/cheese_pictures/biula/biula2.jpg');
  INSERT INTO products (product_name, product_description, product_half_price, product_whole_price, product_half_weight, product_whole_weight, product_pairing, product_slogan, product_category, product_main_image, product_extra_image) VALUES ('noaro', 'Doce de Leite', 26, 40, 230, 460, 'Café, licores, geléia de café, canela em pó, vinhos Jerez, vinho do Porto ou cervejas dos tipos Porter e Bock.', 'O azedinho do queijo equilibra perfeitamente o açúcar do doce de leite.', 'To Sweeten Life', './public/images/cheese_pictures/noaro/noaro1.jpg', './public/images/cheese_pictures/noaro/noaro2.jpg');
  INSERT INTO products (product_name, product_description, product_half_price, product_whole_price, product_half_weight, product_whole_weight, product_pairing, product_slogan, product_category, product_main_image, product_extra_image) VALUES ('ciscie', 'Goiabada Cascão', 26, 40, 230, 460, 'Café, licores ou cervejas do tipo Sour.', 'Goiabada, queijo e um café: tem combinação mais deliciosa?', 'To Sweeten Life', './public/images/cheese_pictures/ciscie/ciscie1.jpg', './public/images/cheese_pictures/ciscie/ciscie2.jpg');
  INSERT INTO products (product_name, product_description, product_half_price, product_whole_price, product_half_weight, product_whole_weight, product_pairing, product_slogan, product_category, product_main_image, product_extra_image) VALUES ('zinori', 'Paleta de Queijos', null, 39, null, 250, 'Vinhos ou Cervejas', 'Surpreenda-se! Escolhemos 3 queijos do nosso cardápio e montamos a paleta surpresa. Você só precisa pensar no momento especial para degustar essas delícias.', 'To Enjoy', './public/images/cheese_pictures/zinori/zinori1.jpg', './public/images/cheese_pictures/zinori/zinori2.jpg');
  DROP TABLE if exists orders;
  CREATE TABLE orders
  (
    id             int auto_increment
    primary key,
    date           timestamp default (now()) null,
    total_amount   float        null,
    client_name    varchar(255) null,
    client_email   varchar(255) null,
    client_phone   varchar(20)  null,
    client_address varchar(480) null
  );
  
  ALTER TABLE order_has_product ADD CONSTRAINT order_has_product_fk0 FOREIGN KEY (order_id) REFERENCES orders(id);
  ALTER TABLE order_has_product ADD CONSTRAINT order_has_product_fk1 FOREIGN KEY (product_id) REFERENCES products(id);
`;

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  con.query(SQL, function (err, result) {
    if (err) throw err;
    console.log("All tables were created successfully!");
  });
  con.end();
});
