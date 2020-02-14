'use strict';

window.onload = function(){


// date non dispo dans JSON
  function date()
{
    return new Date().getFullYear();
}


// Total prix des 3 items
function total(data)
{
    var toto = 0;
    for (var i = 0; i < data.length;i++)
    {
        toto += data[i].price/100;
        // console.log(toto);
    }
    return toto;
}

// affichage des infos-bons de commande sur page Home
function ordersTemplate(e)
{
    // console.log(e.items);
    return '<section class="bon">' +
            '<h2>Table N° ' + e.table + '</h2> ' +
            '<ul class="list">' +
                '<li>'+ e.id + '</li>' +
                '<li class="number"><i class="fas fa-utensils fa-2x"></i>' + e.table + '</li>' +
                '<li class="number"><i class="far fa-grin-beam fa-2x"></i>' + e.guests + '</li>' +
                '<li> 23 JUIN ' + date() + '</li>' +
                '<li class="price">' + total(e.items) + ' €</li>' +
                '<li><a class="click" id='+e.id+' href="detail.html?id=' +e.id + '">Détail de la commande</li></a>' +
                // '<a id='+e.id+' href="#">Détail de la commande</a>' +
            '</ul>' +
        '</section>';
}

// affichage détail des commandes celui l'Id récup
function ordersDetail(items) {
  // console.log(window.location.href);
  var url = new URL(window.location.href);
  var query_string = url.search;
  var search_params = new URLSearchParams(query_string);
  var id = search_params.get('id');

  // console.log(id);
  // console.log(items.id);
  // console.log(items.table);
  if (items.id == id) {
    console.log('ok');
    var lulu = [];

    for(var i = 0; i < items.items.length; i++){
      // console.log(id.items.length);
      var info = document.querySelector('.info');
      var name = items.items[i].name;
      var price = items.items[i].price / 100;

      var currency = items.items[i].currency;
      var color = items.items[i].color;

      lulu.push('<li class="list-detail" style = "color:'+ color +'">' + name + ' ' + price + currency);
      // info.appendChild(lulu);
      // console.log(lulu);
    }

    return '<h1>Detail de la table N°'+items.table+'</h1><ul class="bon">' + lulu +'</ul><h3>Montant total à régler : <span>'+total(items.items)+' €</span></h3>';

  } else{
    console.log('no');
  }
}

// récup donnés JSON
fetch('https://raw.githubusercontent.com/popina/test-javascript/master/data.json')
    .then(res => {
        return res.json();
    })
    .then((data) => {
        console.log(data.orders);
        if(window.location.href.indexOf('/index') !== -1) {
          document.getElementById('total').innerHTML = data.orders.map(ordersTemplate).join('');

        } else if(window.location.href.indexOf('/detail') !== -1) {
          document.getElementById('detail').innerHTML = data.orders.map(ordersDetail).join('');

        }
        // console.log(data.orders[0].id);
    })
    .catch(error => console.log('ERROR : ' + error));
 }
