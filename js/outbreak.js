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
      return "In " + this.popname + ", there are " + Math.floor(this.infected(virname)) + " new cases of " + virname.Virname + ".";
  };

}

var countryData = {
  DRC: [10, 0.5, 10],
  US:  [2,  0.7, 5]
};

var virusData = {
  Ebola:      [false, true, 2],
  rhinovirus: [true,  true, 6]
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
    $("#Input").append('<label>Is the outbreak still continuing? </label>' + '<select id="continue"><option value = "yes">yes</option><option value = "no">no</option></select>');

    $("#Input").append('<section id="Output"><p>' + country.report(virus) + '</p></section>');
  }
  else if($(this).hasClass('continue')) {
    console.log("cont pressed");
    if ($("#continue").val() == "yes"){
      $('#Output>p').remove();
      console.log("cont yes");
      $("#Output").append('<p>' + country.report(virus) + '</p>');
    }
    else if ($("#continue").val() == "no"){
      $("#Output").append('<p>' + "The outbreaks is over!" + '</p>');
      console.log("cont no");
    }
  }
//changing the behavior of "Submit" button

  $(this).text('Continue');
  $(this).removeClass('initial');
  $('button').addClass('continue');
});


  
