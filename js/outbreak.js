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
        cases = this.Cases * ((1 - this.WashingHands)+this.Contacts) * virname.Contagiousness * (Math.random()*10) * Math.random();
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


var DRC = new Population("DRC", 10, 0.5, 10);
var US = new Population("US", 2, 0.7, 5);

var ebola = new Virus("Ebola", false, true, 2);
var rhinovirus = new Virus("rhinovirus", true, true, 6);

var countryData = {
  DRC: [10, 0.5, 10],
  US:  [2,  0.7, 5]
};

var virusData = {
  Ebola:      [false, true, 2],
  rhinovirus: [true,  true, 6]
}; 


$("button").on('click', function(e){
  e.preventDefault();
  var countryName = $("#countries option:selected").val();
  var virusName = $("#viruses option:selected").val();
    
  var country = new Population(countryName, countryData[countryName][0], countryData[countryName][1], countryData[countryName][2]);
  var virus = new Virus(virusName, virusData[virusName][0], virusData[virusName][1], virusData[virusName][2]);

  $("#Output").append('<p>' + country.report(virus) + '</p>');

});
  
