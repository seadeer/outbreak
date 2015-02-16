/* 
The virus object includes 3 variables: Fomite (whether the virus is spread through people touching fomites and not washing hands afterwards), CloseContact (whether the virus is spread through people coming in very close contact with each other), and Contagiousness (the R0 number, or the number of people one person will likely infect)
*/

  var Virus = function(virname, f, cc, cont){
    this.Virname = virname;
        this.Fomite = f;
    this.CloseContact = cc;
    this.Contagiousness = cont;
  }

/* 
The population object describes a population. Cases is the number of people who have initially become infected with the virus. WashingHands is the rate at which people in the population routinely wash hands. Contacts is the number of contacts that each person has.
*/

  var Population = function(popname, cases, wash, contact)
  {
      
        this.popname = popname;
        this.Cases = cases;
        this.WashingHands = wash;
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
              
              // Example
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
              return "In " + this.popname + ", there are " + Math.floor(this.infected(virname)) + " new cases of " + virname.Virname;
          };
              
   }

  var population1 = new Population("DRC", 10, 0.5, 10);
  var population2 = new Population("US", 2, 0.7, 5);

  var ebola = new Virus("Ebola", false, true, 2);
  var rhinovirus = new Virus("rhinovirus", true, true, 6);

alert(population1.report(ebola));

/*
Adding 
*/
var UserInput = prompt ("Is the outbreak spreading? (y/n)");
while (UserInput == "y")
{
  alert(population1.report(ebola));
  UserInput = prompt ("Is the outbreak spreading? (y/n)");
}