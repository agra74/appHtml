$(function(){
  $('#next').on('click', function(){
    $('#step1').fadeOut(300, function(){
      $('#step2').fadeIn(300);
    });
  });

  $('#back').on('click', function(){
    $('#step2').fadeOut(300, function(){
      $('#step1').fadeIn(300);
    });
  });

  $('#create').on('click', function(){
    var data = {
      nom_agence: $('#nom_agence').val(),
      code_agence: $('#code_agence').val(),
      matricule: $('#matricule').val(),
      nomeprenom: $('#nomeprenom').val(),
      role: $('#role').val(),
      motdepasse: $('#motdepasse').val()
    };
    $('#status').text('Création en cours...').show();
    $.ajax({
      method: 'POST',
      url: '/setup',
      contentType: 'application/json',
      data: JSON.stringify(data)
    }).done(function(){
      $('#status').text('Création terminée').fadeOut(2000);
    }).fail(function(){
      $('#status').text("Erreur lors de la création");
    });
  });
});
