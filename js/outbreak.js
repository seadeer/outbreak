var Virus = function(virname, f, cc, cont){
  this.Virname = virname;
  
  // Fomite determines whether the virus is spread through people touching fomites and not washing hands afterwards.
  this.Fomite = f;

  // CloseContact determines whether the virus is spread through people coming in very close contact with each other.
  this.CloseContact = cc;

  // Contagiousness determines the R0 number, or the number of people one person will likely infect.
  this.Contagiousness = cont;
}

var Population = function(popname, cases, wash, contact)
{
  this.popname = popname;

  // Cases determines the number of people who have become infected with the virus. 
  this.Cases = cases;

  // WashingHands is the rate at which people in the population routinely wash hands. 
  this.WashingHands = wash;

  // Contacts is the number of contacts that each person has.
  this.Contacts = contact;

  this.infected = function(virname)
  {
      
    if (virname.WashingHands == true && virname.CloseContact == false)
    {
        this.Cases = this.Cases * (1 - this.WashingHands) * virname.Contagiousness * (Math.random()*10) * Math.random();
        return this.Cases;
    }

    else if (virname.CloseContact == true && virname.Fomite == false)
    {
        this.Cases = this.Cases * this.Contacts * virname.Contagiousness * Math.random();
        return this.Cases;
    }
    
    else if (virname.CloseContact == true && virname.Fomite == false)
    {
        this.Cases = this.Cases * this.Contacts * virname.Contagiousness * Math.random();
        return this.Cases;
    }
    
    else if (virname.Fomite == true && virname.CloseContact == true)
    {
        this.Cases = this.Cases * ((1 - this.WashingHands)+this.Contacts) * virname.Contagiousness * (Math.random()*10) * Math.random();
        return this.Cases;
    }

    else 
    {
        return 0;
    }
      
  };

  this.report = function(virname)
  {
      return "<strong>" + " Outbreak " + "</strong>" + "of " + "<strong>" + virname.Virname + "</strong>" + " in " + this.popname + "!" + "\n" + "<strong>" + Math.floor(this.infected(virname)) + "</strong>" + " new cases.";
  };

}

var countryData = {
  DRC: [10, 0.5, 10],
  US:  [2,  0.7, 5]
};

var virusData = {
  Ebola:      [false, true, 2],
  Zombievirus: [false, true, 2],
  rhinovirus: [true, true, 6]
}; 

var country, virus;

$(".initial").on('click', function(e){
  e.preventDefault();
  

//adding the outbreak report to the html
  if($(this).hasClass("initial")) {
    var countryName = $("#countries option:selected").val();
    var virusName = $("#viruses option:selected").val();

    var cData = countryData[countryName];
    var vData = virusData[virusName];

    country = new Population(countryName, cData[0], cData[1], cData[2]);
    virus = new Virus(virusName, vData[0], vData[1], vData[2]);
    $("#Input").append('<h3>Is the outbreak still continuing?</h3>' + '<select id="continue"><option value = "yes">yes</option><option value = "no">no</option></select>');

    $("#Input").append('<section id="Output"><h4>' + country.report(virus) + '</h4></section>');
  }
  else if($(this).hasClass('continue')) {
    console.log("cont pressed");
    if ($("#continue").val() == "yes"){
      $('#Output>h4').remove();
      console.log("cont yes");
      $("#Output").append('<h4>' + country.report(virus) + '</h4>');
    }
    else if ($("#continue").val() == "no"){
      $("#Output").append('<h4>' + "The outbreak is over!" + '</h4>');
      console.log("cont no");
    }
  }
//changing the behavior of "Submit" button

  
  $(this).removeClass('initial');
  $('button').addClass('continue');
});


  
