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
    }
        
    d.getElementById(idTabela).appendChild(newRow);

    document.getElementById("produto_name").value = "";
    document.getElementById("produto_value_fab").value = "";
    document.getElementById("produto_lucro").value = "";
    document.getElementById("produto_value").value = "";
    
    return false;
}