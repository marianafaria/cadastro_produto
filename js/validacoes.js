$(function(){
    $("#produto_value_fab").maskMoney(
      {symbol:'R$ ', showSymbol:true, thousands:'.', decimal:',', symbolStay: true});
    $("#produto_value").maskMoney(
      {symbol:'R$ ', showSymbol:true, thousands:'.', decimal:',', symbolStay: true});
  })

$(document).ready( function() {

    // Data de cadastro
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    var today = day + "/" + month + "/" + year;       
    $("#produto_register").attr("value", today);

    // Calculo da porcentagem
    $('#produto_value_fab, #produto_lucro').blur(function(){
        var valor 		= $('#produto_value_fab').val(); 
        var porcentagem = $('#produto_lucro').val(); 
        
        if(valor == "") valor = 0;
        if(porcentagem == "") porcentagem = 0;
        
        var resultado 	= 'R$ '+ (parseFloat(valor.replace('R$ ','')) + ((parseFloat(valor.replace('R$ ','')) * parseFloat(porcentagem)) / 100));

        $('#produto_value').val(resultado.replace('.',','));
    });

    // Porcentagem
    $("#produto_lucro").blur (function(){
        var lucro = $('#produto_lucro').val();
        $('#produto_lucro').val(lucro + '%');
    });
     
});

function validar_form (){
    
    if(document.getElementById("produto_name").value == ""){
        alert('Por favor, preencha o campo Nome do Produto');
        document.getElementById("produto_name").focus();
        return false
    }

    if(document.getElementById("produto_value_fab").value == ""){
        alert('Por favor, preencha o campo Valor de Fabricação');
        document.getElementById("produto_value_fab").focus();
        return false
    }

    if(document.getElementById("produto_lucro").value == ""){
        alert('Por favor, preencha o campo Porcentagem de Lucro');
        document.getElementById("produto_lucro").focus();
        return false
    }

    localStorages();


};

var d = document;
    
function processar(idTabela){
    var newRow = d.createElement('tr');

    if (d.getElementsByName('produto_name')[0].value.length > 0
        && d.getElementsByName('produto_value_fab')[0].value != 'R$ 0,00'
        && d.getElementsByName('produto_lucro')[0].value.length > 0)
    {
        newRow.insertCell(0).innerHTML = d.getElementsByName('produto_id')[0].value++;
        newRow.insertCell(1).innerHTML = d.getElementsByName('produto_name')[0].value;
        newRow.insertCell(2).innerHTML = d.getElementsByName('produto_register')[0].value;
        newRow.insertCell(3).innerHTML = d.getElementsByName('produto_value_fab')[0].value;
        newRow.insertCell(4).innerHTML = d.getElementsByName('produto_lucro')[0].value;
        newRow.insertCell(5).innerHTML = d.getElementsByName('produto_value')[0].value;
        newRow.insertCell(6).innerHTML = '<button class="btn btn-danger" type="submit" >Excluir</button>';

    }
    d.getElementById(idTabela).appendChild(newRow);

    document.getElementById("produto_name").value = "";
    document.getElementById("produto_value_fab").value = "";
    document.getElementById("produto_lucro").value = "";
    document.getElementById("produto_value").value = "";
    
    return false;
}


function localStorages(){ 

    var cliente = JSON.stringify({
        Index    : Math.floor((Math.random() * 100000) + 1),
        Id       : $("#produto_id").val(),
        Nome     : $("#produto_name").val(),
        Registro : $("#produto_register").val(),
        Valor    : $("#produto_value_fab").val(),
        Lucro    : $("#produto_lucro").val(),
        ValorFinal: $("#produto_value").val()
    });
    var clientes = JSON.parse(cliente); 
    localStorage.setItem((clientes['Index']), cliente);


}

function getFromLocalStorage(idTabela){

    d.getElementsByName('produto_id')[0].value = Math.floor((Math.random() * 100000) + 1);

    for (var i = 0; i < localStorage.length; i++){
    var dados = localStorage.getItem(localStorage.key(i));
    
    var dados      = JSON.parse(dados);
    var index      = dados['Index'];
    var id         = dados['Id'];
    var nome       = dados['Nome'];
    var registro   = dados['Registro'];
    var valor      = dados['Valor'];
    var lucro      = dados['Lucro'];
    var valorFinal = dados['ValorFinal'];

    var newRow = d.createElement('tr');

        newRow.insertCell(0).innerHTML = id;
        newRow.insertCell(1).innerHTML = nome;
        newRow.insertCell(2).innerHTML = registro;
        newRow.insertCell(3).innerHTML = valor;
        newRow.insertCell(4).innerHTML = lucro;
        newRow.insertCell(5).innerHTML = valorFinal;

        newRow.insertCell(6).innerHTML = '<button class="btn btn-danger" type="submit" onclick=Excluir('+index+') >Excluir</button>';
    
    d.getElementById(idTabela).appendChild(newRow);


    }
    
    return false;
}


function Excluir(id) {
      var confirma = window.confirm("Apagar Produto?"); 
      if(confirma)  {
        localStorage.removeItem(id);
        document.location.reload(true);
      }  
}